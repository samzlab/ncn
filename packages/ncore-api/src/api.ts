import { Category, findPassKey, getTorrentsFromBody, parseHTML, scrapeResult } from "./scraper";

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

export type TorrentSearchQuery = {
	kivalasztott_tipus?: Category[],
	mire?: string,
	miben?: 'name' | 'imdb',
	tags?: string[],
	tipus?: 'kivalasztottak_kozott', // no other supported yet
	oldal?: number
};

export async function fetchTorrents(query: TorrentSearchQuery): Promise<string> {
	return fetchHTML(`${TORRENTS_URL}${objectToUri(query)}`);
}

export type TorrentSearchOptions = {
	categories?: Category[],
	tags?: string[],
	page?: number
}

export type SearchByTitleOptions = TorrentSearchOptions & {
	title: string
};

export type SearchByImdbOptions = TorrentSearchOptions & {
	imdb: string
};

export async function fetchByTitle({ title, categories, tags, page }: SearchByTitleOptions) {
	return fetchTorrents({
		'kivalasztott_tipus': categories,
		'mire': title,
		'miben': 'name',
		'tipus': 'kivalasztottak_kozott',
		'tags': tags,
		oldal: page
	});
}

export async function fetchByIMDB({ imdb, categories, page }: SearchByImdbOptions) {
	return fetchTorrents({
		'kivalasztott_tipus': categories,
		'mire': imdb,
		'miben': 'imdb',
		'tipus': 'kivalasztottak_kozott',
		oldal: page
	});
}


export async function getTorrents(search: SearchByTitleOptions | SearchByImdbOptions): Promise<scrapeResult> {
	let html: string;

	if ('imdb' in search) {
		html = await fetchByIMDB(search);
	} else {
		html = await fetchByTitle(search);
	}

	return getTorrentsFromBody(parseHTML(html));
}
