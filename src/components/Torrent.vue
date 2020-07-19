<template>
    <div class="relative torrent-wrapper">
        <div class="bg-gray-900 bg-opacity-50 z-10 p-4 shadow-lg flex torrent">
            <div class="flex-shrink-0 torrent-image self-center">
                <img class="w-100" :src="getCover(torrent)">
            </div>
            <div class="flex-auto px-4">
                <div class="flex">
                    <a v-if="torrent.rating" :href="`https://imdb.com/title/${ torrent.imdb }`" target="_blank" noreferrer class="inline-block uppercase tracking-wider mr-4 bg-blue-600 bg-opacity-50 text-xs rounded py-1 px-2">IMDB: <span class="font-bold">{{ torrent.rating }}</span></a>
                    <template v-if="torrent.firstRelease">
                        Első release: {{ toRelativeDate(torrent.firstRelease) }}
                    </template>
                    <a href="#" class="inline-block uppercase tracking-wider ml-auto bg-gray-600 bg-opacity-50 text-xs rounded py-1 px-2">{{ torrent.isSeries ? 'Sorozat' : 'Film' }} követése</a>
                    <span class="w-20 text-center inline-block uppercase tracking-wider ml-4 bg-gray-600 bg-opacity-50 text-xs rounded py-1 px-2 cursor-pointer" @click="refresh(torrent)"><Spinner v-if="torrent.refreshing" class="text-xs text-orange-500" /> {{ torrent.refreshing ? '' : 'Frissítés' }}</span>
                </div>
                <h2 class="text-2xl mb-2 font-bold">
                    {{ torrent.title }} <span v-if="torrent.year" class="font-hairline">({{ torrent.year }})</span>
                </h2>
                <p class="uppercase text-gray-500 mb-2 mt-4">
                    Változatok
                </p>
                <slot :releases="torrent.releases" />
            </div>
        </div>
        <div :style="`background-image: url(${getCover(torrent)})`" class="transition-opacity duration-200 absolute bg-cover opacity-25 left-0 top-0 w-full h-full bg-center" />
    </div>
</template>

<script>
    import { inject, ref } from 'vue';
    import { toRelativeDate } from '../lib/utils';
    import Spinner from 'components/Spinner.vue';

    export default {
        components: {
            Spinner
        },
        props: {
            torrent: {
                type: Object,
                default: () => ({})
            }
        },
        setup() {
            const refreshIndex = inject('refreshIndex');

            // const refreshInProgress = ref(false);

            async function refresh(index) {
                if (index.refreshing) return;

                // refreshInProgress.value = true;

                await refreshIndex(index, true);

                // refreshInProgress.value = false;
            }

            function getCover(torrent) {
                return torrent.cover || 'https://via.placeholder.com/182x268.png?text=Nincs+kep';
            }

            return {
                // refreshInProgress,
                refresh,
                getCover,
                toRelativeDate
            };
        }
    }
</script>