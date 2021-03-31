import { findPassKey, getTorrentsFromBody, movieCategory, parseHTML, scrapeResult, seriesCategory } from "./scraper";

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

export async function getPassKey(): Promise<string> {
	const body = parseHTML(await fetchHTML(PROFILE_URL));
	return findPassKey(body);
}

export async function getTorrents(search: searchByTitleOptions | searchByImdbOptions): Promise<scrapeResult> {
	let html: string;

	if ('imdb' in search) {
		html = await fetchByIMDB(search);
	} else {
		html = await fetchByTitle(search);
	}

	return getTorrentsFromBody(parseHTML(html));
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
	types?: (movieCategory | seriesCategory)[],
	tags?: string[],
	page?: number
}

export type searchByTitleOptions = torrentSearchOptions & {
	title: string
};

export type searchByImdbOptions = torrentSearchOptions & {
	imdb: string
};

export async function fetchByTitle({ title, types, tags, page }: searchByTitleOptions) {
	return fetchTorrents({
		'kivalasztott_tipus': types,
		'mire': title,
		'miben': 'name',
		'tipus': 'kivalasztottak_kozott',
		'tags': tags,
		oldal: page
	});
}

export async function fetchByIMDB({ imdb, types, page }: searchByImdbOptions) {
	return fetchTorrents({
		'kivalasztott_tipus': types,
		'mire': imdb,
		'miben': 'imdb',
		'tipus': 'kivalasztottak_kozott',
		oldal: page
	});
}