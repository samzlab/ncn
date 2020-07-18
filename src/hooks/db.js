import { ref, reactive, watch, computed, toRaw } from 'vue';
import { loadFromStorage, indexByImdb, findById, findByIds, saveToStorage } from 'lib/db';
import { unique, intersects } from 'lib/utils';
import { fetchByTitle } from 'lib/ncore';

const MOVIE_PER_PAGE = 40;

function getId(doc) {
	return doc.id;
}

// init
const allTorrents = loadFromStorage('torrents') || [];
const imdbIndex = reactive(indexByImdb(allTorrents));
const idIndex = new Set(allTorrents.map(getId));

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

function addTorrents(torrents) {
	const results = torrents.filter(doc => !idIndex.has(doc.id));

	indexByImdb(results, imdbIndex);
	results.forEach( ({ id }) => idIndex.add(id) );

	allTorrents.push(...results);

	return results;
}

let dbInstance = null;
function DB() {
	// filters
	// const filters = reactive({
	// 	resolutions: [],
	// 	langs: []
	// });
	const resolutions = reactive(['1080']);
	const langs = reactive(['hun']);
	const tags = reactive([]);
	const text = ref('');
	const category = ref(null);

	const limit = ref(20);
	const sort = ref('byFirstRelease');

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


	const results = computed(() => {
		let found = 0;

		const filtered = currentResults.map(imdbId => imdbIndex[imdbId]).filter(doc => {
			if (found >= limit.value) {
				return false;
			}

			// if (!doc) {
			// 	console.log(doc);
			// 	return false;
			// }

			if (langs.length && !intersects(doc.langs, langs)){
				return false;
			}

			if (resolutions.length && !intersects(doc.resolutions, resolutions)){
				return false;
			}

			found++;

			return true;
		});

		filtered.sort(sorters[sort.value]);

		return filtered;
	});

	async function search(text, types, tags) {

		currentResults.splice(0);

		let searchId = ++currentSearch;

		for( let i = 1; i < 8; i++ ) {
			const result = await fetchByTitle(text.value, types.value.split(','), toRaw(tags), i);
			addTorrents(result);

			if (currentSearch != searchId) {
				break;
			}

			result.forEach(({ imdb }) => {
				if (imdb && !currentResults.includes(imdb)) currentResults.push(imdb);
			});


			if (currentResults.length >= MOVIE_PER_PAGE) {
				currentResults.splice(MOVIE_PER_PAGE);
				break;
			}
		}

		saveToStorage('torrents', allTorrents);

		return currentResults;
	}

	let lastTypes = null;
	watch([ text, types, tags ], () => {
		if (category.value && types.value !== lastTypes) {
			// console.log('types', types.value, lastTypes);
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
		findByIds: (ids) => findByIds(allTorrents, ids)
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