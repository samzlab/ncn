export type parsedInfo = {
	source?: string,
	resolution?: string,
	year?: number,
	releaser?: string
};

/**
 * Visszaadja a felbontásra vonatkozó tokent
 *
 * @param torrentName Torrent file neve
 * @param full `true` esetén a teljes tokent visszadja (pl: `"720p"`)
 */
export function getResolution(torrentName: string, full:boolean = false): string {
	let match = torrentName.toLowerCase().match(/(720|1080|2160)(p|i)/ui);
	return (match && match.length > 1) ? match[full ? 0 : 1].toLowerCase() : null;
}


const SOURCES = ['bd', '(ld|bd|dvd|web)rip', 'blu([\-e])?ray', 'bd50', 'dvd9', 'web-?dl'].join('|');
const SOURCE_NORMALIZE = Object.entries({ 'bd': 'bluray', 'blu-ray': 'bluray', 'blueray': 'bluray', 'webdl': 'web-dl' });
const SOURCES_REGEXP = new RegExp('[^w](' + SOURCES + ')[^w]', 'iu');

/**
 * Visszaadja a videóanyag forrását. Pl: `"bdrip"`
 *
 * @param torrentName Torrent file neve
 */
export function getSource(torrentName: string): string {
	// title.Web-DL.720p...
	let match = torrentName.match(SOURCES_REGEXP);
	if (match) {
		return SOURCE_NORMALIZE.reduce(
			(result, [from, to]) => from === result ? to : result,
			match[1].toLocaleLowerCase()
		);
	}

	return null;
}


/**
 * Visszaadja a torrent nevében található évet.
 * Nem számít érvényesnek az évszám ha:
 * - 1950 előtti
 * - a jelenlegi évszámnál nagyobb
 *
 * @param torrentName Torrent file neve
 */
export function getValidYear(torrentName: string): number {
	// title.2019.HUN...
	let match = torrentName.match(/\.((19|20)\d{2})\./);

	if (!match) {
		return null;
	}

	let year = parseInt(match[1]);

	return (year > 1950 && year <= new Date().getFullYear()) ? year : null;
}


/**
 * Visszaadja a releaser (csapat) nevét amely a
 * torrent nevének végén található.
 * Pl: `"no1"`
 *
 * @param torrentName Torrent file neve
 */
export function getReleaser(torrentName: string): string|null {
	// title.720p.HUN-no1
	let match = torrentName.match(/\-([^\- ]+)$/);
	return (match && match.length > 1) ? match[1] : null;
}


export type seriesInfo = {
	match: string,
	seasons: number[],
	episodes: number[]
};

function createRange(from: number, to: number): number[] {
	const result = [];

	for (let i = from; i <= to; i++) {
		result.push(i);
	}

	return result;
}

/**
 * Visszaadja milyen évadokat és/vagy epizódokat tartalmaz a torrent.
 * Felismert formátumok: S01, S01-S12, S01E02, S01E23E24, E351
 *
 * Pl: "The.Big.Bang.Theory.S11E23E24.720p..." esetén
 * ```
 * { match: "S11", seasons: [11], episodes: [23, 24] }
 * ```
 * vagy "The.Big.Bang.Theory.S01-S12.720p..." esetén
 * ```
 * { match: "S01-S12", seasons: [1, 2, ..., 12], episodes: [] }
 * ```
 *
 * @param torrentName Torren file neve
 */
export function getSeriesInfo(torrentName: string): seriesInfo | null {

	// title.S01-S05.720p...
	const multiSeason = torrentName.match(/[^\w](S(\d+)-S(\d+))/ui);
	if (multiSeason) {
		return {
			match: multiSeason[1],
			seasons: createRange(parseInt(multiSeason[2]), parseInt(multiSeason[3])),
			episodes: []
		}
	}

	// title.S01E08E09.720p...
	const seasonMultiEpisode = torrentName.match(/[^\w](S(\d+)E([E\d]+)+)/ui);
	if (seasonMultiEpisode) {
		const episodes = seasonMultiEpisode[3]
			.split(/e/ui)
			.map((s: string) => parseInt(s));

		return {
			match: seasonMultiEpisode[1],
			seasons: [parseInt(seasonMultiEpisode[2])],
			episodes
		};
	}

	// title.S01E08.720p...
	const seasonSingleEpisode = torrentName.match(/[^\w](S(\d+)E(\d+))/ui);
	if (seasonSingleEpisode) {
		return {
			match: seasonSingleEpisode[1],
			seasons: [parseInt(seasonSingleEpisode[2])],
			episodes: [parseInt(seasonSingleEpisode[3])]
		}
	}


	// title.S01.720p...
	const singleSeason = torrentName.match(/[^\w](S(\d+))/ui);
	if (singleSeason) {
		return {
			match: singleSeason[1],
			seasons: [ parseInt(singleSeason[2]) ],
			episodes: []
		}
	}

	// title.E341.720p...
	const singleEpisode = torrentName.match(/[^\w](E(\d+))/);
	if (singleEpisode) {
		return {
			match: singleEpisode[1],
			seasons: [],
			episodes: [parseInt(singleEpisode[2])]
		}
	}

	return null;
}

export function parseTorrentName(torrentName: string): parsedInfo {
	return {
		source: getSource(torrentName),
		resolution: getResolution(torrentName),
		year: getValidYear(torrentName),
		releaser: getReleaser(torrentName)
	};
}