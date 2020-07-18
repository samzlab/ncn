<template>
    <div>
        <div class="flex align-items-center cursor-default my-8 text-sm leading-8">
            <span class="ml-8 text-gray-500">Nyelv:</span>
            <span v-for="lang in ['HU', 'EN']" :key="lang" :class="filters.langs.includes(lang) ? 'bg-orange-600' : 'bg-opacity-50 bg-gray-900 hover:bg-orange-600 hover:bg-opacity-25'" class="inline-block transition-colors ease-in-out duration-200 font-bold uppercase tracking-wider ml-2 rounded px-2" @click="toggleFilter('langs', lang)">{{ lang }}</span>
            <span class="ml-8 text-gray-500">Típusok:</span>
            <span v-for="(typeName, type) in types" :key="type" :class="filters.resolutions.includes(type) ? 'bg-orange-600' : 'bg-opacity-50 bg-gray-900 hover:bg-orange-600 hover:bg-opacity-25'" class="inline-block transition-colors ease-in-out duration-200 font-bold uppercase tracking-wider ml-2 rounded px-2" @click="toggleFilter('resolutions', type)">{{ typeName }}</span>
            <span class="ml-8 text-gray-500">Rendezés:</span>
            <span :class="sort === 'byFirstRelease' ? 'bg-orange-600' : 'bg-opacity-50 bg-gray-900 hover:bg-orange-600 hover:bg-opacity-25'" class="inline-block transition-colors ease-in-out duration-200 font-bold uppercase tracking-wider ml-2 rounded px-2" @click="sort = 'byFirstRelease'">Újdonságok</span>
            <span :class="sort === 'byYear' ? 'bg-orange-600' : 'bg-opacity-50 bg-gray-900 hover:bg-orange-600 hover:bg-opacity-25'" class="inline-block transition-colors ease-in-out duration-200 font-bold uppercase tracking-wider ml-2 rounded px-2" @click="sort = 'byYear'">Év szerint</span>
            <span :class="sort === 'byImdb' ? 'bg-orange-600' : 'bg-opacity-50 bg-gray-900 hover:bg-orange-600 hover:bg-opacity-25'" class="inline-block transition-colors ease-in-out duration-200 font-bold uppercase tracking-wider ml-2 rounded px-2" @click="sort = 'byImdb'">IMDB szerint</span>
        </div>
    </div>
    <div class="grid hd:grid-cols-2 uhd:grid-cols-3 gap-8">
        <Torrent v-for="torrent in torrents" :key="torrent.id" :torrent="torrent">
            <template #default="{ releases }">
                <div v-for="release in releases.filter(filterReleases)" :key="release.id" class="relative variant-group my-1 p-2 rounded bg-gray-700 bg-opacity-0 hover:bg-opacity-25 hover:shadow transition-colors ease-in-out duration-200">
                    <a target="_blank" :href="`/torrents.php?action=download&id=${release.id}&key=${passKey}`" :title="release.name" class="block truncate w-full release-title">{{ release.name }}</a>
                    <span class="absolute right-0 top-0 inline-block uppercase tracking-wider text-xs py-1 px-2 mt-2 mr-10 opacity-50 pointer-events-none whitespace-no-wrap"><UploadIcon class="align-bottom" size="16" /> {{ release.seeds }}</span>
                    <a class="absolute right-0 top-0 inline-block uppercase tracking-wider transition-opacity duration-200 text-xs py-3 px-4 release-button cursor-pointer text-orange-500" title="Hozzáadás a &quot;Filmek&quot; listához" @click.prevent="bookmark(release)"><RssIcon size="16" /></a>
                    <!-- <a class="inline-block uppercase tracking-wider bg-orange-600 transition-opacity duration-200 opacity-0 text-xs rounded ml-2 py-1 px-2 shadow download" :href="`/torrents.php?action=download&id=${release.id}&key=${passKey}`">Torrent ({{ release.seeds }})</a> -->
                </div>
            </template>
        </Torrent>
    </div>
</template>

<script>
    import { onMounted, reactive, ref, computed, inject } from 'vue';

    import { fetchByTitle, searchTypes, fetchPassKey } from 'lib/ncore';
    import { indexByImdb, loadFromStorage, saveToStorage } from 'lib/db';
    import { intersects, wait, isUserScript } from 'lib/utils';

    import Torrent from 'components/Torrent.vue';
    import RssIcon from 'components/icons/rss.vue';
    import UploadIcon from 'components/icons/upload.vue';

    const types = {
        'sd': 'SD',
        '720': 'Kis HD',
        '1080': 'Full HD',
        '2160': 'Ultra HD'
    };

    const sorters = {
        byFirstRelease: (doc1, doc2) => doc1.firstRelease < doc2.firstRelease ? 1 : -1,
        byYear: (doc1, doc2) => doc2.year - doc1.year,
        byImdb: (doc1, doc2) => doc2.rating - doc1.rating
    };

    export default {
        components: {
            Torrent,
            RssIcon,
            UploadIcon
        },
        setup() {
            const loading = inject('loading');

            const index = {};
            const allTorrents = reactive([]);
            const limit = ref(20);
            const sort = ref('byFirstRelease');
            const passKey = ref(null);

            // filters
            const filters = {
                langs: reactive(['HU']),
                resolutions: reactive(['1080']),
                kind: ref('movies')
            };

            function bookmark(release) {
                console.log(release);
            }

            function loaded(results) {
                indexByImdb(results, index);
                allTorrents.push(...Object.values(index));
                loading.value = false;
            }

            const storedTorrents = loadFromStorage('torrents') || [];

            (async()=>{

                // load passKey from profile
                passKey.value = await fetchPassKey();

                if (storedTorrents.length > 10000) {
                    // cleanup
                    storedTorrents.splice(0, 100);
                    saveToStorage('torrents', storedTorrents);
                }

                if (!storedTorrents.length) { // first run, load the first 200 torrent

                    let temp = [];

                    for (let i = 1; i <= 4; i++) {
                        temp.push(...await fetchByTitle(null, [searchTypes.movies.hd_hu], null, i));
                        loading.value = `${i} / 4 oldal beolvasva`;
                    }

                    loaded(temp);
                    saveToStorage('torrents', temp);
                } else {
                    loaded(storedTorrents);
                    storedTorrents.length = 0;
                }

            })();

            // results
            const torrents = computed(() => {
                let found = 0;
                const filtered = allTorrents.filter(doc => {
                    if (found >= limit.value) {
                        return false;
                    }

                    if (filters.langs.length && !intersects(doc.langs, filters.langs)){
                        return false;
                    }

                    if (filters.resolutions.length && !intersects(doc.resolutions, filters.resolutions)){
                        return false;
                    }

                    found++;

                    return true;
                });

                filtered.sort(sorters[sort.value]);
                return filtered;
            });

            function filterReleases(release) {
                if (filters.langs.length && !filters.langs.includes(release.lang)) {
                    return false;
                }

                if (filters.resolutions.length && !filters.resolutions.includes(release.resolution)) {
                    return false;
                }

                return true;
            }

            function toggleFilter(filterType, val) {
                const idx = filters[filterType].indexOf(val);

                if (~idx) {
                    filters[filterType].splice(idx, 1);
                } else {
                    filters[filterType].push(val);
                }
            }

            return {
                sort,
                torrents,
                passKey,
                filters,
                // static
                types,
                // helpers
                filterReleases,
                // methods
                bookmark,
                toggleFilter
            };
        }
    }
</script>