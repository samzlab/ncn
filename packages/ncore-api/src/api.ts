import { getPassKey, movieCategory, parseHTML, seriesCategory } from "./scraper";

// innen toltjuk be a profilt (passKey kiolvasasahoz)
export const PROFILE_URL = 'profile.php?action=other';
export const TORRENTS_URL = '/torrents.php?';

async function fetchHTML(url: string) {
	return (await fetch(url)).text();
}

// URL utils
function encodePair(...pair: string[]): string {
	return pair.map(encodeURIComponent).join('=');
}

export function objectToUri(object: Object = {}) {
	let entries = [];

	for (let entry of Object.entries(object) ) {
		if (!entry[1]) {
			continue;
		}

		if (entry[1] instanceof Array) {
			for (let item of entry[1]) {
				entries.push(encodePair(`${entry[0]}[]`, item));
			}
		} else {
			entries.push(encodePair(...entry as [string, string]));
		}
	}

	return entries.join('&');
}

export function uriToObject(uri: string = ''): Object {
	const result = {};

	if (uri.length > 0) {
		new URLSearchParams(uri).forEach((val, key) => result[key] = val);
	}

	return result;
}

export async function fetchPassKey(): Promise<string> {
	const body = parseHTML(await fetchHTML(PROFILE_URL));
	try {
		return getPassKey(body);
	} catch (err) {
		console.error('can not get passkey :(');
		console.error(err);
		return null;
	}
}

export type torrentSearchQuery = {
	kivalasztott_tipus?: (movieCategory | seriesCategory)[],
	mire?: string,
	miben?: 'name' | 'imdb',
	tags?: string[],
	tipus?: 'kivalasztottak_kozott', // no other supported yet
	oldal?: number
};

export async function fetchTorrents(query: torrentSearchQuery): Promise<string> {
	return fetchHTML(`${TORRENTS_URL}${objectToUri(query)}`);
}

export type torrentSearchOptions = {
	title?: string,
	types?: (movieCategory | seriesCategory)[],
	tags?: string[],
	page?: number
}

export async function fetchByTitle({ title, types, tags, page }: torrentSearchOptions) {
	return fetchTorrents({
		'kivalasztott_tipus': types,
		'mire': title,
		'miben': 'name',
		'tipus': 'kivalasztottak_kozott',
		'tags': tags,
		oldal: page
	});
}

export async function fetchByIMDB(imdbId, types, oldal) {
	return fetchTorrents({
		'kivalasztott_tipus': types,
		'mire': imdbId,
		'miben': 'imdb',
		'tipus': 'kivalasztottak_kozott',
		oldal
	});