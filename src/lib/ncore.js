import { objectToUri, parseHTML, isUserScript, wait } from './utils';
import { BASE_URL, PROFILE_URL, XHR_THROTTLE } from './config'

const
	// parser helpers
	sources = [ 'bdremux', 'bdrip', 'blue?ray', 'dvdrip', 'bd50', 'dvd9', 'web-dl', 'LDRip' ].join('|'),
	sourceRegexp = new RegExp('\.('+sources+')\.', 'i');

function getResolution(title){
	let match = title.toLowerCase().match(/(720|1080|2160)(p|i)/);
	return (match && match.length > 1) ? match[1] : 'other';
}

function getFullResolution(title){
	let match = title.toLowerCase().match(/(720|1080|2160)(p|i)/);
	return (match && match.length > 1) ? match[0] : false;
}

function getSource(title){
	let match = title.match(sourceRegexp);
	return (match && match.length > 1) ? match[1] : null;
}

function getValidYear(title){
	let year = title.match(/\.((19|20)\d{2})\./);
	year = year && Number(year[1]);
	return (year > 1950 && year <= new Date().getFullYear()) ? year : false;
}

function getReleaser(title){
	let match = title.match(/\-([^\- ]+)$/);
	return (match && match.length > 1) ? match[1] : false;
}

const infos = Object.entries({
	'resolution': { test: getResolution },
	'fullResolution': { test: getFullResolution },
	'source':    { test: getSource },
	'year':      { test: getValidYear },
	'releaser':  { test: getReleaser }
});

export const searchTypes = {
	'movies': {
		'hd_en': 'hd',
		'hd_hu': 'hd_hun',
		'sd_en': 'xvid',
		'sd_hu': 'xvid_hun',
		'dvd4_en': 'dvd',
		'dvd4_hu': 'dvd_hun',
		'dvd9_en': 'dvd9',
		'dvd9_hu': 'dvd9_hun'
	},
	'series': {
		'hd_en': 'hdser',
		'hd_hu': 'hdser_hun',
		'sd_en': 'xvidser',
		'sd_hu': 'xvidser_hun',
		'dvd4_en': 'dvdser',
		'dvd4_hu': 'dvdser_hun',
	}
};

searchTypes.movies.all = Object.values(searchTypes.movies);
searchTypes.series.all = Object.values(searchTypes.series);

const SEASON_AND_EPISODE = /S(\d+)(E(\d+))?/, EPISODE = /((E))(\d+)/;

function getSeasonAndEpisode(title) {
	const [id, season,,episode] = title.match(SEASON_AND_EPISODE) || title.match(EPISODE) || [false];
	return [id, Number(season), Number(episode)];
}

function getPage(a) {
	return a.getAttribute('href').match(/oldal=(\d+)/)[1] || 0;
}

function getTorrentsFromBody(body){
	if( !body ) throw new Error('missing HTML to get torrent details :(');

	const torrents = [];
	const $rows = body.querySelectorAll('#main_tartalom .box_torrent');

	for( let i = 0, len = $rows.length; i < len; i++ ){
		const $row =  $rows[i];

		try {
			const
				$link 		= $row.querySelector('.torrent_txt a[href^="torrents.php?action=details"], .torrent_txt2 a[href^="torrents.php?action=details"]'),
				$cover 		= $row.querySelector('.infobar img'),
				$siterank 	= $row.querySelector('.siterank'),
				$title 		= $siterank && $siterank.querySelector('span'),
				$infolink	= $siterank && $siterank.querySelector('.infolink'),

				isSeries 	= !!$row.querySelector('a[href^="/torrents.php?tipus="]').getAttribute('href').match(/ser/),
				_type  		= $row.querySelector('.box_alap_img img').getAttribute('alt').toUpperCase().split('/'),
				name 		= $link.getAttribute('title'),

				result = {
					type:     _type[0],
					series:   isSeries ? getSeasonAndEpisode(name) : false,
					name,
					title:    $title && $title.getAttribute('title'),
					id:       $link.getAttribute('href').match(/id=(\d+)/)[1],
					uploaded: $row.querySelector('.box_feltoltve2').textContent,
					size:     $row.querySelector('.box_meret2').textContent,
					seeds:    Number($row.querySelector('.box_s2 a[href$="#peers"]').textContent),
					cover:    $cover && $cover.getAttribute('onmouseover').match(/mutat\('([^']*)/)[1],
					imdb:     $infolink && $infolink.getAttribute('href').match(/tt\d+/).toString(),
					rating:   $infolink && Number(String($infolink.textContent.match(/\d\.\d/)))
				};

			result.uploaded = result.uploaded.slice(0,10) + ' ' + result.uploaded.slice(10);
			result.date = Date.parse(result.uploaded) / 1000;
			result.lang = _type[1] === 'HU' ? 'hun' : 'eng';

			infos.forEach(([ key, parser ]) => result[key] = parser.test(result.name));

			if (!result.title) {
				// try to figure out from the torrent name
				const beforeYear = result.name.match(new RegExp(`^(.*)\.${result.year}\.`));

				if (beforeYear) {
					result.title = beforeYear[1].replace(/\./g, ' ');
				}
			}

			if( result.type == 'SD' ) {
				result.resolution = 'SD';
			}

			torrents.push(result);
		} catch(e) {
			console.log('this row is too funky :/', $row);
			console.error(e);
		}
	}

	let pages = 0;

	const $lastPageLink = [...body.querySelectorAll('#pager_top a[href^="/torrents.php"]')].pop();

	if ($lastPageLink) {
		pages = $lastPageLink.getAttribute('href').match(/oldal=(\d+)/)[1];
		if ($lastPageLink.textContent !== 'Utolsó') { // ha az utso oldalon vagyunk, azaz az utolso link nem oda mutat
			pages++;
		}
	}

	return { pages, torrents };
}

const queue = [];
let queued = 0;
export function enQueue(fn) {
	const promise = new Promise((resolve) => {
		queue.push([fn, resolve]);
	});

	if (queue.length === 1) {
		runQueue();
	}

	return promise;
}

async function runQueue() {
	if (queue.length) {
		await wait(XHR_THROTTLE);
		const [fn, cb] = queue.shift();
		cb(fn());
		queued = queue.length;
		if (queue.length) {
			runQueue();
		}
	}
}

async function fetchHTML(url) {
	return enQueue(async() => {
		return (await fetch(url)).text();
	});
}

export async function fetchPassKey() {
	const body = parseHTML(await fetchHTML(PROFILE_URL));
	try {
		return [...body.querySelectorAll('#profil_right li')].find(li => li.textContent.match(/Passkey/)).children[0].textContent;
	} catch (err) {
		console.error('can not get passkey :(');
		console.error(err);
		return null;
	}
}

export async function fetchTorrents(query) {
	let base = BASE_URL.replace('$oldal', query.oldal || 1); // temp dev hekk
	return getTorrentsFromBody(
		parseHTML(
			await fetchHTML(`${base}${objectToUri(query)}`)
		)
	);
}

export async function fetchByTitle(title, types, tags, oldal) {
	return fetchTorrents({
		'kivalasztott_tipus': types,
		'mire': title,
		'miben': 'name',
		'tipus': 'kivalasztottak_kozott',
		'tags': tags,
		oldal
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
}