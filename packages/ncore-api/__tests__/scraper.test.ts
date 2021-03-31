import { parseHTML, getTorrentsFromBody, parseTorrentIdFromURL, getTorrentInfoFromRow, parseTorrentCategoryFromUrl, getPassKey } from '../src/scraper';
import torrentList01HTML from '../src/mock/torrent-list';
import torrentList02HTML from '../src/mock/empty-list';
import torrentList03HTML from '../src/mock/last-page';
import torrentList04HTML from '../src/mock/mixed-list';
import profileHTML from '../src/mock/profile';

const torrentList01Body = parseHTML(torrentList01HTML);

function fromHTML(html: string): HTMLElement {
	const div = document.createElement('div');
	div.innerHTML = html;
	return div.children[0] as HTMLElement;
}

describe('should parse a full HTML', () => {

	test('Should parse HTML', () => {
		expect(torrentList01Body).toBeInstanceOf(HTMLBodyElement);
	});

	test('Should throw error on empty page', () => {
		expect(() => getTorrentsFromBody(null)).toThrow();
	});

	let parsed;

	test('Parse HTML Body without errors', () => {
		parsed = getTorrentsFromBody(torrentList01Body);
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

	const row = fromHTML(`
		<div class="box_torrent">
		<div class="box_alap_img">
			<a href="/torrents.php?tipus=hd_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hd_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású filmek, magyarul."></a>
		</div>
		<div class="box_nagy2">
			<div class="box_nev2">
			<div style="display:none;" id="borito3161854"></div>			<div class="tabla_szoveg">
					<div style="cursor:pointer" onclick="konyvjelzo('3161854');" class="torrent_konyvjelzo2"></div>
						<div class="torrent_txt">
							<a href="torrents.php?action=details&amp;id=3161854" onclick="torrent(3161854); return false;" title="A.Cinderella.Story.2004.1080p.BluRay.x264.Hun-Made"><nobr>A.Cinderella.Story.2004.1080p.BluRay.x264.Hun-Made</nobr></a>
							<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito3161854')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/jgBmpLy7SRwflX8z?26939893', '268', 'borito3161854', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Los Angeles-i tündérmese">Los Angeles-i tündérmese</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0356470/"><b>[</b>imdb: 5.9<b>]</b></a> </div></div>					</div>
					</div>

					<div class="torrent_unchecked" title="Ellenőrizetlen torrent"></div>			</div>
				<div class="users_box_sepa"></div>
				<div class="box_feltoltve2">2021-03-22<br>07:13:16</div>
				<div class="users_box_sepa"></div>
				<div class="box_meret2">6.88 GiB</div>
				<div class="users_box_sepa"></div>
				<div class="box_d2">0</div>
				<div class="users_box_sepa"></div>
				<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=3161854&amp;peers=1#peers">1</a></div>
				<div class="users_box_sepa"></div>
				<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=3161854&amp;peers=1#peers">48</a></div>
				<div class="users_box_sepa"></div>
				<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
			</div>
		</div>`);

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

	const body = fromHTML(torrentList04HTML);
	const result = getTorrentsFromBody(body as HTMLBodyElement);

	test('Should detect series', () => {
		const bosszuS04 = result.torrents.find(({ id }) => id === 1974451);

		expect(bosszuS04).toBeInstanceOf(Object);
		expect(bosszuS04.type).toBe('series');
		expect(bosszuS04.series).toBeInstanceOf(Object);
	});

});

describe('Other utils', () => {

	const profileBody = fromHTML(profileHTML);
	test('Should find passkey on profile page', () => {
		expect(getPassKey(profileBody as HTMLBodyElement)).toBe('qweasdasd');
	});


	const row = fromHTML(`<div class="box_torrent">
		<div class="box_alap_img">
			<a href="/torrents.php?tipus=hd"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hd.gif" class="categ_link" alt="HD/EN" title="Nagyfelbontású filmek, angolul és egyéb nyelveken."></a>
		</div>
		<div class="box_nagy2">
			<div class="box_nev2">
						<div class="tabla_szoveg">
					<div style="cursor:pointer" onclick="konyvjelzo('3161819');" class="torrent_konyvjelzo"></div>
						<div class="torrent_txt2">
							<a href="torrents.php?action=details&amp;id=3161819" onclick="torrent(3161819); return false;" title="Who.Put.The.Klan.Into.Ku.Klux.Klan.2018.720p.WEB.h264-OPUS"><nobr>Who.Put.The.Klan.Into.Ku.Klux.Klan.2018.720p.WEB.h264-O...</nobr></a>
												</div>
					</div>

					<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
				<div class="users_box_sepa"></div>
				<div class="box_feltoltve2">2021-03-22<br>05:45:32</div>
				<div class="users_box_sepa"></div>
				<div class="box_meret2">2.26 GiB</div>
				<div class="users_box_sepa"></div>
				<div class="box_d2">+</div>
				<div class="users_box_sepa"></div>
				<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=3161819&amp;peers=1#peers">7</a></div>
				<div class="users_box_sepa"></div>
				<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=3161819&amp;peers=1#peers">1</a></div>
				<div class="users_box_sepa"></div>
				<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
			</div>
		</div>
	`);

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
		const page = fromHTML(torrentList02HTML);
		const torrents = getTorrentsFromBody(page as HTMLBodyElement);

		expect(torrents.pageCount).toBe(0);
	});

	test('Should fix pages count when on last page', () => {
		const page = fromHTML(torrentList03HTML);
		const torrents = getTorrentsFromBody(page as HTMLBodyElement);

		expect(torrents.pageCount).toBe(2);
	});

});