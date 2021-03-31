import { getSeriesInfo, parsedInfo, parseTorrentName, seriesInfo } from "./parser"

export type torrentType = 'series' | 'movie';
export type movieCategory = 'hd' | 'hd_hun' | 'xvid' | 'xvid_hun' | 'dvd' | 'dvd_hun' | 'dvd9' | 'dvd9_hun';
export type seriesCategory = 'hdser' | 'hdser_hun' | 'xvidser' | 'xvidser_hun' | 'dvdser' | 'dvdser_hun';

const movieCategories  = [ 'hd', 'hd_hun', 'xvid', 'xvid_hun', 'dvd', 'dvd_hun', 'dvd9', 'dvd9_hun' ];
const seriesCategories = [ 'hdser', 'hdser_hun', 'xvidser', 'xvidser_hun', 'dvdser', 'dvdser_hun' ];

export type torrentInfo = {
	type:     torrentType,
	category: movieCategory | seriesCategory | string,
	series?:  seriesInfo,
	info:     parsedInfo,
	name:	  string,
	title?:	  string,
	id:       number,
	uploaded: number, // unix timestamp
	size:     string,
	seeds:    number,
	cover?:   string,
	imdb?:    string,
	rating?:  number
};

export type scrapeResult = {
	pageCount: number,
	torrents: torrentInfo[]
};

export function getRowsFromBody(body: HTMLBodyElement): NodeListOf<HTMLDivElement> {
	return body.querySelectorAll('#main_tartalom div.box_torrent');
}

export function getTorrentLink(row: HTMLDivElement): HTMLAnchorElement {
	// return row.querySelector('div.torrent_txt > a[href^="torrents.php?action=details"], div.torrent_txt2 > a[href^="torrents.php?action=details"]');
	return row.querySelector('div.torrent_txt > a, div.torrent_txt2 > a');
}

export function getInfobarImage(row: HTMLDivElement): HTMLImageElement | null {
	return row.querySelector('div.infobar img');
}

export function readAttr(el: HTMLElement, attrName: string): string | null {
	if (el) {
		return el.getAttribute(attrName);
	}

	return null;
}

export function getSpanFromSiterank(siterank: HTMLDivElement): HTMLSpanElement | null {
	return siterank.querySelector('span');
}

export function getInfoLinkFromSiterank(siterank: HTMLDivElement): HTMLAnchorElement | null {
	return siterank.querySelector('a.infolink') || null;
}

export function getSiterank(row: HTMLDivElement): HTMLDivElement | null {
	return row.querySelector('div.siterank');
}

export function getTorrentCategoryLink(row: HTMLDivElement): HTMLAnchorElement {
	return row.querySelector('div.box_alap_img > a');
}

export function getTorrentUpload(row: HTMLDivElement): string {
	const nodes = row.querySelector('.box_feltoltve2').childNodes;
	return `${nodes[0].textContent} ${nodes[2].textContent}`;
}

export function getTorrentSize(row: HTMLDivElement): HTMLDivElement {
	return row.querySelector('.box_meret2');
}

export function getTorrentSeeds(row: HTMLDivElement): HTMLDivElement {
	return row.querySelector('.box_s2 a[href$="#peers"]');
}

export function getPage(a: HTMLAnchorElement): number {
	return parseInt(a.getAttribute('href').match(/oldal=(\d+)/)[1]);
}

export function parseImdbIdFromURL(url: string): string | null {
	const imdbID = url.match(/tt\d+/);
	return imdbID ? imdbID.toString() : null;
}

export function parseTorrentCategoryFromUrl(url: string): string {
	const match = url.match(/tipus=([\w_]+)/);

	if (!match) {
		throw Error(`Can not find "tipus" parameter in url: ${url}`);
	}

	return match[1];
}

export function parseTorrentIdFromURL(url: string): number {
	const id = url.match(/id=(\d+)/);

	if (!id) {
		throw Error(`Can not parse torrent id from url: ${url}`);
	}

	return parseInt(id[1]);
}

export function parseCoverLinkFromMouseOverScript(script: string): string | null {
	const url = script.match(/mutat\('([^']*)/u);

	// if (!url) {
	// 	console.log(`Can not parse cover image from script: ${script}`);
	// }

	return url ? url[1] : null;
}

export function parseImdbRating(text: string): number {
	// "[7.5]" => 7.5
	const match = text.match(/\d\.\d/);
	return match ? parseFloat(match.toString()) : null;
}

/* unused */
// export function parseTorrentTypeFromURL(url: string): torrentType {
// 	return url.match(/ser/) ? 'series' : 'movie';
// }

export function getTextContent(el: HTMLElement): string {
	return el.textContent;
}

export function getPageCountFromLinks(links: NodeListOf<HTMLAnchorElement>): number {
	if (links.length === 0) {
		return 0;
	}

	const $lastPageLink = links[links.length - 1];
	let pages = 0;

	if ($lastPageLink) {
		// pages = parseInt($lastPageLink.getAttribute('href').match(/oldal=(\d+)/)[1]);
		pages = getPage($lastPageLink);
		if ($lastPageLink.textContent !== 'Utolsó') { // ha az utso oldalon vagyunk, azaz az utolso link nem oda mutat
			pages++;
		}
	}

	return pages;
}

export function getTorrentInfoFromRow(row: HTMLDivElement): torrentInfo {
	const torrent: torrentInfo = {
		type: 		'movie',
		category:   'dvd',
		series:		null,
		info:		null,
		name: 		'',
		title:	  	'',
		id:       	0,
		uploaded: 	null,
		size:     	'',
		seeds:    	0,
		cover:   	'',
		imdb:    	'',
		rating:  	0
	};

	// torrent linkje	div.torrent_txt > a
	const linkEl 		= getTorrentLink(row);

	// torrent neve		[title]
	torrent.name 		= readAttr(linkEl, 'title');
	torrent.id 			= parseTorrentIdFromURL(readAttr(linkEl, 'href'));

	// torrent tipusa
	typeLink: {
		const href 			= readAttr(getTorrentCategoryLink(row), 'href');
		const category      = parseTorrentCategoryFromUrl(href);
		torrent.category	= category;

		const isSeries      = seriesCategories.includes(category);
		torrent.type        = isSeries ? 'series' : 'movie';

		if (isSeries) {
			torrent.series = getSeriesInfo(torrent.name);
		}
	}

	// feltoltes datuma	.box_feltoltve2
	torrent.uploaded 	= Math.floor(Date.parse(getTorrentUpload(row)) / 1000);
	// meret			.box_meret2
	torrent.size        = getTextContent(getTorrentSize(row));
	// seederek			.box_s2 a[href$="#peers"]
	torrent.seeds       = parseInt(getTextContent(getTorrentSeeds(row)));

	// boritokép		div.infobar > img
	const coverEl 		= getInfobarImage(row);
	if (coverEl) {
		const mouseover 	= readAttr(coverEl, 'onmouseover');
		torrent.cover   	= parseCoverLinkFromMouseOverScript(mouseover);
	}

	// extra infok		div.siterank
	const siterankEl	= getSiterank(row);

	if (siterankEl) {
		title: { // 			> span[title]
			const span  		= getSpanFromSiterank(siterankEl);
			torrent.title 		= readAttr(span, 'title');
		}

		// imdb link 		> a.infolink
		const imdbLinkEl	= getInfoLinkFromSiterank(siterankEl);

		if (imdbLinkEl) {
			// imdb id:			[href]
			const href  		= readAttr(imdbLinkEl, 'href');
			torrent.imdb 		= parseImdbIdFromURL(href);

			// imdb rating:		textContent
			torrent.rating		= parseImdbRating(getTextContent(imdbLinkEl));
		}
	}

	torrent.info = parseTorrentName(torrent.name);

	// fix missing title
	if (torrent.title === '') {
		torrent.title = getTorrentTitleFromName(torrent);
	}

	return torrent;
}

export function getTorrentTitleFromName(torrent: torrentInfo): string {
	const beforeYear = torrent.name.match(new RegExp(`^(.*)\.${torrent.info.year}\.`));

	if (beforeYear) {
		return beforeYear[1].replace(/\./g, ' ');
	}

	return 'n/a';
}

export function getTorrentsFromBody(body: HTMLBodyElement): scrapeResult {
	if( !body ) throw new Error('missing HTML to get torrent details :(');

	const torrents: torrentInfo[] = [];
	const rows = getRowsFromBody(body);

	for( let i = 0, len = rows.length; i < len; i++ ){
		const row: HTMLDivElement = rows[i];

		try {
			const torrent = getTorrentInfoFromRow(row);

			torrents.push(torrent);
		} catch(e) {
			// console.log('this row is too funky :/', row.outerHTML);
			// console.error(e);
		}
	}

	const $pageLinks: NodeListOf<HTMLAnchorElement> = body.querySelectorAll('#pager_top a[href^="/torrents.php"]');
	const pageCount = getPageCountFromLinks($pageLinks);

	return {
		pageCount,
		torrents
	};
}

export function findPassKey(body: HTMLBodyElement): string {
	return [...body.querySelectorAll('#profil_right li')].find(li => li.textContent.match(/Passkey/)).children[0].textContent;
}

export function parseHTML(html): HTMLBodyElement {
	var doc = document.implementation.createHTMLDocument("temp");
	doc.documentElement.innerHTML = html;
	return doc.body as HTMLBodyElement;
}
