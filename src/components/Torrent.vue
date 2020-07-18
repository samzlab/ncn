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
    import { toRelativeDate } from '../lib/utils';

    export default {
        props: {
            torrent: {
                type: Object,
                default: () => ({})
            }
        },
        setup() {
            function getCover(torrent) {
                return torrent.cover || 'https://via.placeholder.com/182x268.png?text=Nincs+kep';
            }

            return {
                getCover,
                toRelativeDate
            };
        }
    }
</script>