<template>
    <!-- FILTERS -->
    <div class="flex align-items-center cursor-default my-8 text-sm leading-8">
        <span class="text-gray-500">Nyelv:</span>
        <FilterButton v-for="lang in ['hun', 'eng']" :key="lang" :is-active="langs.includes(lang)" @click="toggleFilter(langs, lang)">
            {{ lang }}
        </FilterButton>

        <span class="ml-8 text-gray-500">Típusok:</span>
        <FilterButton v-for="(typeName, type) in typeFilters" :key="type" :is-active="resolutions.includes(type)" @click="toggleFilter(resolutions, type)">
            {{ typeName }}
        </FilterButton>

        <span class="ml-8 text-gray-500">Rendezés:</span>
        <FilterButton :is-active="sort === 'byFirstRelease'" @click="sort = 'byFirstRelease'">
            Újdonságok
        </FilterButton>
        <FilterButton :is-active="sort === 'byYear'" @click="sort = 'byYear'">
            Év szerint
        </FilterButton>
        <FilterButton :is-active="sort === 'byRating'" @click="sort = 'byRating'">
            IMDB szerint
        </FilterButton>

        <div class="ml-auto">
            {{ progress }}
        </div>
    </div>

    <!-- RESULT GRID -->
    <div class="grid hd:grid-cols-2 uhd:grid-cols-3 gap-8">
        <Torrent v-for="movie in results" :key="movie.imdb" :torrent="movie">
            <template #default="{ releases }">
                <Release v-for="release in getReleaseTorrents(releases)" :key="release.id"
                         :release="release"
                         :pass-key="passKey"
                         :resolution="resolutions.length !== 1"
                         :lang="langs.length !== 1"
                         @bookmark="bookmark"
                />
            </template>
        </Torrent>
    </div>
</template>

<script>
    import { onMounted, reactive, ref, computed, inject, watchEffect, provide } from 'vue';

    import { intersects, wait, isUserScript } from 'lib/utils';

    import useDB from 'hooks/db';

    import Torrent from 'components/Torrent.vue';
    import Release from 'components/Release.vue';
    import FilterButton from 'components/FilterButton.vue';

    const typeFilters = {
        'sd': 'SD',
        '720': 'Kis HD',
        '1080': 'Full HD',
        '2160': 'Ultra HD'
    };

    export default {
        components: {
            Torrent,
            Release,
            FilterButton
        },
        async setup() {
            const loading = inject('loading');
            const passKey = inject('passKey');

            const { langs, resolutions, category, results, sort, progress, findByIds, refreshIndex } = useDB('movies', ['hun'], ['1080'], []);

            provide('refreshIndex', refreshIndex);

            function bookmark(release) {
                console.log(release);
            }

            function getReleaseTorrents(idList) {
                const result = findByIds(idList);
                return result.filter(filterReleases).sort((a, b) => b.seeds - a.seeds);
            }

            function filterReleases(release) {
                if (langs.length && !langs.includes(release.lang)) {
                    return false;
                }

                if (resolutions.length && !resolutions.includes(release.resolution)) {
                    return false;
                }

                return true;
            }

            function toggleFilter(filter, val) {
                const idx = filter.indexOf(val);

                if (~idx) {
                    filter.splice(idx, 1);
                } else {
                    filter.push(val);
                }

                // console.log(filters[filterType]);
            }

            return {
                sort,
                results,
                passKey,
                progress,
                // filters,
                langs,
                resolutions,
                // static
                typeFilters,
                // methods
                bookmark,
                toggleFilter,
                getReleaseTorrents
            };
        }
    }
</script>