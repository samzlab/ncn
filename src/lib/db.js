import { fetchByTitle, searchTypes } from 'lib/ncore';
import { unique, intersect, intersects } from 'lib/utils';

export function loadFromStorage(item) {
	const result = localStorage.getItem(item);
	return result && JSON.parse(result);
}

export function saveToStorage(item, data) {
	localStorage.setItem(item, JSON.stringify(data));
}

export function find(collection, where) {
	return Object.entries(where).reduce((result, [key, value]) => {
		return result.filter(doc => doc[key] == value);
	}, collection);
}

export function findById(collection, id) {
	return collection.find( doc => doc.id === id );
}

export function findByIds(collection, ids) {
	return collection.filter( doc => ids.includes(doc.id) );
}

export function findByLangs(collection, langs) {
	return collection.filter(doc => intersects(doc.langs, langs));
}

export function findByResolutions(collection, resolutions) {
	return collection.filter(doc => intersects(doc.resolutions, resolutions));
}

export function indexByImdb(torrents, index = {}, onCreate) {
	for (let i = 0, len = torrents.length; i < len; i++) {
		const { id, title, imdb, rating, year, date, lang, resolution, cover } = torrents[i];

		if ( !imdb ) continue;

		if ( imdb in index ) {

			const item = index[imdb];

			if (item.releases.includes(id)){
				continue;
			}

			if (item.firstRelease > date) {
				item.firstRelease = date;
			}

			if (!item.langs.includes(lang)) {
				item.langs.push(lang);
			}

			if (!item.resolutions.includes(resolution)) {
				item.resolutions.push(resolution);
			}

			item.releases.push(id);
		} else {
			index[imdb] = {
				refreshing: false,
				title,
				imdb,
				rating,
				year,
				cover,
				firstRelease: date,
				releases: [ id ],
				langs: [ lang ],
				resolutions: [ resolution ]
			};

			onCreate && onCreate(index[imdb]);
		}
	}

	return index;
}
