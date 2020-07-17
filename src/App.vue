<template>
    <div v-if="loading" class="absolute left-0 top-0 flex w-full h-full">
        <span class="mx-auto px-4 py-2 bg-gray-900 rounded self-center shadow z-50">{{ loading }}</span>
    </div>
    <div class="container mx-auto layout h-full transition-colors duration-200 ease-linear text-gray-200">
        <header class="flex items-center justify-between h-12">
            <h1 class="text-3xl center">
                <span class="relative">nCore<span class="text-sm text-orange-500 absolute top right-0 font-bold">next</span></span><span class="ml-2 text-sm text-gray-600">0.1.alpha</span>
            </h1>
            <nav>
                <a href="#" class="px-2">Filmek</a>
                <a href="#" class="px-2">Sorozatok</a>
            </nav>
            <nav>
                <a href="#" class="px-2">Beállítások</a>
                <a href="/" class="px-2">Bezárás</a>
            </nav>
        </header>
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
        <main class="col-span-7">
            <div class="grid hd:grid-cols-2 uhd:grid-cols-3">
                <div v-for="torrent in torrents" :key="torrent.id" class="relative p-4 torrent-wrapper">
                    <div class="bg-gray-900 bg-opacity-50 z-10 p-4 shadow-lg flex torrent">
                        <div class="flex-initial torrent-image self-center">
                            <img class="w-100" :src="torrent.cover || 'https://via.placeholder.com/182x268.png?text=Nincs+kep'">
                        </div>
                        <div class="flex-auto px-4">
                            <div class="flex">
                                <a v-if="torrent.rating" href="#" class="inline-block uppercase tracking-wider mr-4 bg-blue-600 bg-opacity-50 text-xs rounded py-1 px-2">IMDB: <span class="font-bold">{{ torrent.rating }}</span></a>
                                First release: {{ toRelativeDate(torrent.firstRelease) }}
                                <a href="#" class="inline-block uppercase tracking-wider ml-auto bg-gray-600 bg-opacity-50 text-xs rounded py-1 px-2">{{ torrent.isSeries ? 'Sorozat' : 'Film' }} követése</a>
                            </div>
                            <h2 class="text-2xl mb-2 font-bold">
                                {{ torrent.title }} <span v-if="torrent.year" class="font-hairline">({{ torrent.year }})</span>
                            </h2>
                            <p class="uppercase text-gray-500 mb-2 mt-4">
                                Változatok
                            </p>

                            <div v-for="release in torrent.torrents.filter(filterReleases)" :key="release.id" class="w-100 variant-group my-1 p-2 rounded flex justify-start bg-gray-700 bg-opacity-0 hover:bg-opacity-25 hover:shadow transition-colors ease-in-out duration-200">
                                <span :title="release.name" class="release-title inline-block truncate">{{ release.name }}</span>
                                <a class="inline-block uppercase tracking-wider bg-green-600 transition-opacity duration-200 opacity-0 text-xs rounded ml-auto py-1 px-2 shadow download">+RSS</a>
                                <a class="inline-block uppercase tracking-wider bg-orange-600 transition-opacity duration-200 opacity-0 text-xs rounded ml-2 py-1 px-2 shadow download" :href="`/torrents.php?action=download&id=${release.id}&key=${passKey}`">Torrent ({{ release.seeds }})</a>
                            </div>
                        </div>
                    </div>
                    <div :style="`background-image: url(${torrent.cover || 'https://via.placeholder.com/182x268.png?text=Nincs+kep'})`" class="transition-opacity duration-200 absolute bg-cover opacity-25 left-0 top-0 w-full h-full bg-center" />
                </div>
            </div>
        </main>
    </div>
</template>
<script>
    import { fetchByTitle, searchTypes, fetchPassKey } from './lib/ncore';
    import { onMounted, reactive, ref, computed } from 'vue';
    import { indexByImdb, loadFromStorage, saveToStorage } from './lib/db';
    import { toRelativeDate, intersects, wait } from './lib/utils';

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
        name: 'App',
        components: {},
        setup() {
            const loading = ref('Betöltés...');

            const index = {};
            const allTorrents = reactive([]);
            const pages = ref(0);
            const limit = ref(20);
            const sort = ref('byFirstRelease');
            const passKey = ref(null);

            // filters
            const filters = {
                langs: reactive(['HU']),
                resolutions: reactive(['1080']),
                kind: ref('movies')
            };

            function loaded(results) {
                indexByImdb(results, index);
                allTorrents.push(...Object.values(index));
                loading.value = false;
            }

            const storedTorrents = loadFromStorage();

            (async()=>{

                // load passKey from profile
                passKey.value = await fetchPassKey();

                if (storedTorrents.length > 10000) {
                    // cleanup
                    storedTorrents.splice(0, 100);
                    saveToStorage(storedTorrents);
                }

                if (!storedTorrents.length) { // first run, load the first 200 torrent

                    let temp = [];

                    for (let i = 1; i <= 4; i++) {
                        temp.push(...await fetchByTitle(null, [searchTypes.movies.hd_hu], null, i));
                        loading.value = `${i} / 4 oldal beolvasva`;
                        await wait(1);
                    }

                    loaded(temp);
                    saveToStorage(temp);

                } else {
                    loaded(storedTorrents);
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
                loading,
                sort,
                torrents,
                pages,
                passKey,
                toRelativeDate,
                types,
                filters,
                // methods
                toggleFilter,
                filterReleases
            }
        }
    }
</script>

<style src="./index.css"></style>
