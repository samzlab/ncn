import { computed, reactive, ref, watch, watchEffect } from 'vue';
import { getTorrents, TorrentInfo, TorrentType, Category, ParsedInfo } from 'ncore-api/src/index';

const PAGE_LIMIT = 10;

const resolutions = [ 'SD', 'DVD', 'DVD9', '720', '1080', '2160' ] as const;

export type Resolution = typeof resolutions[number];
export type Lang = 'hu' | 'en';

export type Filters = {
	langs?: Lang[],
	multilang?: boolean,
	resolutions?: Resolution[],
	tags?: string[],
	type?: TorrentType,
	title?: string,
	imdb?: string
};

export type VideoInfo = Pick<TorrentInfo, "category" | "cover" | "imdb" | "rating" | "title">;
export type VideoTorrentInfo = Pick<TorrentInfo, "id" | "name" | "seeds" | "series" | "size" | "uploaded">;

export type Video = VideoInfo & {
	torrents: VideoTorrentInfo[]
}

const categoryPrefixes = ['xvid', 'dvd', 'dvd9', 'hd'] as const;

const resolutionPrefixes: Record<Resolution, typeof categoryPrefixes[number]> = {
	'SD': 'xvid',
	'DVD': 'dvd',
	'DVD9': 'dvd9',
	'720': 'hd',
	'1080': 'hd',
	'2160': 'hd'
};

export function getCategories(type: TorrentType, resolutionFilters: Resolution[], langFilters: Lang[]): Category[] {
	const cateogires: Category[] = [];
	const typeSuffix = type === 'series' ? 'ser' : '';

	for (let resolution of resolutions) {
		for (let lang of langFilters) {
			const langSuffix = lang === 'hu' ? '_hun' : '';
			cateogires.push(`${resolutionPrefixes[resolution]}${typeSuffix}${langSuffix}` as Category);
		}
	}

	return cateogires;
}

export function getQuality({ resolution, source }: ParsedInfo): Resolution {
	if (resolution in resolutionPrefixes) {
		return resolution as Resolution;
	}

	source = source.toUpperCase();
	if (source in resolutionPrefixes) {
		return source as Resolution;
	}

	return 'SD';
}

function getVideoInfo({ title, category, cover, imdb, rating }: TorrentInfo): VideoInfo {
	return { title, category, cover, imdb, rating };
}

function getVideoTorrentInfo({ id, name, series, seeds, size, uploaded }: TorrentInfo): VideoTorrentInfo {
	return { id, name, series, seeds, size, uploaded };
}

/**
 * Torrentek keresésére és szűrésére alkalmas hook
 *
 */
export default function useTorrents(filters: Filters) {

	const results = reactive<Video[]>([]);

	let done;

	let loading;

	const categories = computed(() => {
		return getCategories(filters.type, filters.resolutions, filters.langs);
	});

	async function loadPage(page: number) {
		return getTorrents({
			imdb: 		filters.imdb,
			title: 		filters.title,
			page: 		page,
			tags: 		filters.tags,
			categories: categories.value
		});
	}

	function getVideo(imdb: string, fallback: VideoInfo): Video {
		let result = results.find( video => video.imdb === imdb );
		if (!result) {
			result = {
				...fallback,
				torrents: []
			};
			results.push(result);
		}
		return result;
	}

	function addTorrent(torrent: TorrentInfo) {
		if (!torrent.imdb) return;

		const video = getVideo(torrent.imdb, getVideoInfo(torrent));
		video.torrents.push(getVideoTorrentInfo(torrent));
	}

	async function load() {
		console.log('load() triggered');

		// get torrents from API
		let page = 1;
		// let temp: Video[] = [];
		let totalPages = 0;

		const { resolutions, multilang } = filters;

		// h4x to activate  watch on push(), splice(), etc mutations
		// since it's iterated in an async loop
		// @see https://github.com/vuejs/vue-next/issues/1351
		[...resolutions];

		// loading = new Promise((resolve) => {
		// 	done = resolve;
		// });

		do {
			let { torrents, pageCount } = await loadPage(page++);
			totalPages = pageCount;

			torrents.filter(( { info } ) => {
				// by quality
				if (!resolutions.includes(getQuality(info))) {
					return false;
				}

				if (!multilang === true && !info.multiLang) {
					return false;
				}

				return true;
			}).forEach(addTorrent);

		} while(page <= totalPages && page < PAGE_LIMIT);

		// results.push(...temp);

		done && done();
		loading = null;
	};

	watchEffect(load);

	return {
		results,
		loaded: () => loading || new Promise((resolve) => {
			done = resolve;
		}),
		// methods
		reload: () => { results.splice(0, results.length); load(); }
	}
}
