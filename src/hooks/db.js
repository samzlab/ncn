import { ref, reactive, watch, computed, toRaw } from 'vue';
import { loadFromStorage, indexByImdb, findById, findByIds, saveToStorage } from 'lib/db';
import { unique, intersects } from 'lib/utils';
import { fetchByTitle, fetchByIMDB, searchTypes, enQueue } from 'lib/ncore';
import { DB_VERSION, MOVIE_PER_PAGE, PAGE_PER_IMDB_SCAN } from 'lib/config';

// init
const settings = loadFromStorage('ncn-settings') || {};
if ( settings.dbVersion !== DB_VERSION) {
	saveToStorage('torrents', []); // db reset

	settings.dbVersion = DB_VERSION; // atallitjuk az aktualis verziot
	saveToStorage('ncn-settings', settings);
}

const allTorrents = loadFromStorage('torrents') || [];
const imdbIndex = reactive(indexByImdb(allTorrents));
const idIndex = new Set(allTorrents.map(doc => doc.id));

const typesMap = {
	'720': 'hd',
	'1080': 'hd',
	'2160': 'hd',
	'sd': 'xvid',
	'dvd4': 'dvd',
	'dvd9': 'dvd9'
};

const sorters = {
	byFirstRelease: (doc1, doc2) => doc1.firstRelease < doc2.firstRelease ? 1 : -1,
	byImdb: (doc1, doc2) => Number(doc2.imdb.substring(2)) - Number(doc1.imdb.substring(2)),
	byYear: (doc1, doc2) => doc2.year - doc1.year,
	byRating: (doc1, doc2) => doc2.rating - doc1.rating
};

async function loadAllByImdb(index) {
	index.fresh = false;

	// return;
	const types = Object.values(searchTypes[index.isSeries ? 'series' : 'movies']).join(',');

	for( let i = 1; i <= PAGE_PER_IMDB_SCAN; i++ ) {
		const { torrents: result, pages } = await fetchByIMDB(index.imdb, types, i);
		// console.log('adding torrents by imdb ', index.imdb, `${i} / ${pages}`);
		addTorrents(result);

		if (i >= pages) {
			break;
		}
	}

	saveToStorage('torrents', allTorrents);
}

async function refreshIndex(index, forced = false) {
	if ((index.fresh && !index.refreshing) || forced) {
		// progress.value = `${index.imdb} frissítése...`;
		// console.log(index.imdb, index);
		index.refreshing = true;
		await loadAllByImdb(index);
		index.refreshing = false;
		// progress.value = '';
	}
}

function addTorrents(torrents) {
	const results = torrents.filter(doc => !idIndex.has(doc.id));

	indexByImdb(results, imdbIndex, (index) => index.fresh = true);

	// allTorrents.push(...results);
	let newTorrents = [];
	torrents.forEach(torrent => {
		if (idIndex.has(torrent.id)) {
			// const idx = allTorrents.find(torrent);
			// Object.assign(allTorrents[idx], torrent);
			// console.log();
			Object.assign(findById(allTorrents, torrent.id), torrent);
		} else {
			newTorrents.push(torrent);
		}
	});

	allTorrents.push(...newTorrents);

	results.forEach( ({ id }) => idIndex.add(id) );

	return results;
}

let dbInstance = null;
function DB() {
	const resolutions = reactive(['1080']);
	const langs = reactive(['hun']);
	const tags = reactive([]);
	const text = ref('');
	const category = ref(null); // movies vagy series

	const limit = ref(MOVIE_PER_PAGE);
	const sort = ref('byFirstRelease');

	const progress = ref(false);

	const currentResults = reactive([]);

	let currentSearch = 0;

	// real (ncore) types
	const types = computed(() => {
		let result = [];
		const qualities = unique(resolutions.map(res => typesMap[res]));

		if (!qualities.length) {
			qualities.push('xvid', 'hd', 'dvd');
			if (category.value === 'movies') {
				qualities.push('dvd9');
			}
		}
		const series = category.value === 'movies' ? '' : 'ser';

		(langs.length ? langs : ['hun', 'eng']).forEach(lang => {
			const langSuffix = lang === 'hun' ? '_hun' : '';
			qualities.forEach(quality => {
				result.push(`${quality}${series}${langSuffix}`);
			});
		});

		return result.join(',');
	});

	function filterReleases(release) {
		if (langs.length && !langs.includes(release.lang)) {
			return false;
		}

		if (resolutions.length && !resolutions.includes(release.resolution)) {
			return false;
		}

		return true;
	}

	function getFirstRelease(releases) {
		return releases.reduce((result, release) => (result && (release.date > result)) ? result : release.date, 0);
	}

	function getFilteredReleases(index) {
		return index.releases.map( id => allTorrents.find( doc => doc.id === id )).filter(filterReleases);
	}

	function sortByFirstRelease(a, b) {
		return getFirstRelease(getFilteredReleases(b)) - getFirstRelease(getFilteredReleases(a));
	}

	const results = computed(() => {
		let found = 0;

		const sortFn = sort.value === 'byFirstRelease' ? sortByFirstRelease : sorters[sort.value];

		const filtered = currentResults.map(imdbId => imdbIndex[imdbId]).sort(sortFn).filter(doc => {
			if (found >= limit.value) {
				return false;
			}

			if (langs.length && !intersects(doc.langs, langs)){
				return false;
			}

			if (resolutions.length && !intersects(doc.resolutions, resolutions)){
				return false;
			}

			found++;

			return true;
		});

		return filtered;
	});

	async function search(text, types, tags) {

		currentResults.splice(0);

		let searchId = ++currentSearch;

		for( let i = 1; i <= 8; i++ ) { // max 8 oldal scannelése
			progress.value = `${i}. oldal scannelése`;
			const { torrents: result, pages } = await fetchByTitle(text.value, types.value, tags.join(','), i);
			addTorrents(result);

			if (currentSearch != searchId) {
				break;
			}

			result.forEach(({ imdb }) => {
				if (imdb && !currentResults.includes(imdb)) currentResults.push(imdb);
			});


			if (i >= pages ) { // || results.value.length >= MOVIE_PER_PAGE
				// currentResults.splice(MOVIE_PER_PAGE);
				break;
			}
		}

		progress.value = ''; // `${results.value.length} találat`;

		saveToStorage('torrents', allTorrents);

		return currentResults;
	}

	watch(results, () => {
		enQueue(async() => {
			progress.value = 'aktualizálás...';
			console.log('checking results to update index...');
			for (let i = 0, len = results.value.length; i < len; i++) {
				await refreshIndex(results.value[i]);
			}
			progress.value = '';
		});
	});

	let lastTypes = null, lastText = '';
	watch([ text, types, tags ], () => {
		// the 'types' computed triggers change even if the final result is the same...
		if (category.value && (types.value !== lastTypes || text.value !== lastText)) {
			lastText = text.value;
			lastTypes = types.value;
			search(text, types, tags);
		}
	});

	return {
		results,
		resolutions,
		langs,
		sort,
		limit,
		text,
		category,
		progress,
		findByIds: (ids) => findByIds(allTorrents, ids),
		refreshIndex,
		search
	};
}

export default function useDB(category, langs, resolutions, tags) {
	if (!dbInstance) {
		dbInstance = DB();
	}

	dbInstance.category.value = category;
	dbInstance.langs.splice(0, dbInstance.langs.length, ...langs);
	dbInstance.resolutions.splice(0, dbInstance.resolutions.length, ...resolutions);

	return dbInstance;
}