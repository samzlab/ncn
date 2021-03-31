import { parseHTML, getTorrentsFromBody, parseTorrentIdFromURL, getTorrentInfoFromRow, parseTorrentCategoryFromUrl, findPassKey } from '../src/scraper';
import * as mocks from '../mock';

function fromHTML(html: string): HTMLElement {
	const div = document.createElement('div');
	div.innerHTML = html;
	return div.children[0] as HTMLElement;
}

const movieTorrentList = parseHTML(mocks.movieTorrentList);

describe('should parse a full HTML', () => {

	test('Should parse HTML', () => {
		expect(movieTorrentList).toBeInstanceOf(HTMLBodyElement);
	});

	test('Should throw error on empty page', () => {
		expect(() => getTorrentsFromBody(null)).toThrow();
	});

	let parsed;

	test('Parse HTML Body without errors', () => {
		parsed = getTorrentsFromBody(movieTorrentList);
		expect(parsed).toHaveProperty('torrents');
		expect(parsed).toHaveProperty('pageCount');
	});

	test('Page number and torrent list', () => {
		expect(parsed.pageCount).toBe(2142);
		expect(parsed.torrents.length).toBeGreaterThan(0);
	});

	test('Should ignore invalid rows (missing/malformed torrent data)', () => {
		expect(parsed.torrents.find((torrent) => torrent.id === 3161854)).toBeUndefined();
	});

});

describe('A.Cinderella.Story.2004.1080p.BluRay.x264.Hun-Made', () => {

	const row = fromHTML(mocks.movieRow);

	const torrent = getTorrentInfoFromRow(row as HTMLDivElement);

	test('Should find and parse torrent id', () => {
		expect(torrent.id).toBe(3161854);
	});

	test('Should find torrent name', () => {
		expect(torrent.name).toBe('A.Cinderella.Story.2004.1080p.BluRay.x264.Hun-Made');
	});

	test('Should find cover image', () => {
		expect(torrent.cover).toBe('https://nc-img.cdn.l7cache.com/covers/jgBmpLy7SRwflX8z?26939893');
	});

	test('Should be parsed as movie', () => {
		expect(torrent.type).toBe('movie');
	});

	test('Should be categorized as "hd_hun"', () => {
		expect(torrent.category).toBe('hd_hun');
	});

	test('Should not have series info', () => {
		expect(torrent.series).toBeNull();
	});

	test('Should have info from torrent name', () => {
		expect(torrent.info).toBeInstanceOf(Object);
	});

	test('Should have IMDB ID and rating', () => {
		expect(torrent.imdb).toBeTruthy();
		expect(torrent.rating).toBe(5.9);
	});

	test('Should find upload date', () => {
		const uploaded = Math.floor(Date.parse('2021-03-22 07:13:16') / 1000);
		expect(torrent.uploaded).toBe(uploaded);
	});

	test('Should find file size', () => {
		expect(torrent.size).toBe('6.88 GiB');
	});

	test('Should find seeders count', () => {
		expect(torrent.seeds).toBe(1);
	});

});

describe('Series', () => {

	const body = fromHTML(mocks.mixedTorrentList);
	const result = getTorrentsFromBody(body as HTMLBodyElement);

	test('Should detect series', () => {
		const bosszuS04 = result.torrents.find(({ id }) => id === 1974451);

		expect(bosszuS04).toBeInstanceOf(Object);
		expect(bosszuS04.type).toBe('series');
		expect(bosszuS04.series).toBeInstanceOf(Object);
	});

});

describe('Other utils', () => {

	const profileBody = fromHTML(mocks.profile);

	test('Should find passkey on profile page', () => {
		expect(findPassKey(profileBody as HTMLBodyElement)).toBe('qweasdasd');
	});

	const row = fromHTML(mocks.malformedRow);

	const torrent = getTorrentInfoFromRow(row as HTMLDivElement);

	test('Should fix missing title from torrent name', () => {
		expect(torrent.title).toBe('Who Put The Klan Into Ku Klux Klan');
	});

	test('Should throw error on invalid category link', () => {
		expect(() => parseTorrentCategoryFromUrl('/torrents.php')).toThrowError();
	});

	test('Should throw error on invalid torrent link', () => {
		expect(() => parseTorrentIdFromURL('/torrents.php')).toThrowError();
	});

	test('Should handle empty result list', () => {
		const page = fromHTML(mocks.emptyList);

		const torrents = getTorrentsFromBody(page as HTMLBodyElement);

		expect(torrents.pageCount).toBe(0);
	});

	test('Should fix pages count when on last page', () => {
		const page = fromHTML(mocks.lastPage);

		const torrents = getTorrentsFromBody(page as HTMLBodyElement);

		expect(torrents.pageCount).toBe(2);
	});

});