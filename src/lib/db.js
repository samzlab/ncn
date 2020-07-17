export function loadFromStorage() {
	return JSON.parse(localStorage.getItem('torrents') || '[]');
}

export function saveToStorage(torrents) {
	localStorage.setItem('torrents', JSON.stringify(torrents));
}

export function find(collection, where) {
	return Object.entries(where).reduce((result, [key, value]) => {
		return result.filter(doc => doc[key] == value);
	}, collection);
}

export function indexByImdb(torrents, index = {}, limit = 0) {
	let unique = 0;

	for (let i = 0, len = torrents.length; i < len; i++) {
		const doc = torrents[i];

		if ( !doc.imdb ) continue;

		if ( doc.imdb in index ) {

			if (index[doc.imdb].torrents.find(torrent => torrent.id === doc.id)){
				continue;
			}

			if( index[doc.imdb].firstRelease > doc.date ) {
				index[doc.imdb].firstRelease = new Date(doc.date * 1000);
			}

			if (!index[doc.imdb].langs.includes(doc.lang)) {
				index[doc.imdb].langs.push(doc.lang);
			}

			if (!index[doc.imdb].resolutions.includes(doc.resolution)) {
				index[doc.imdb].resolutions.push(doc.resolution);
			}

			index[doc.imdb].torrents.push(doc);
		} else {
			index[doc.imdb] = { ...doc, firstRelease: new Date(doc.date * 1000), torrents: [ doc ], langs: [ doc.lang ], resolutions: [ doc.resolution ] };

			if (limit && ++unique >= limit) {
				break;
			}
		}
	}

	return index;
}
