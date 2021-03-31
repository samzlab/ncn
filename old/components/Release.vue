<template>
    <div class="relative variant-group my-1 p-2 rounded bg-gray-700 bg-opacity-0 hover:bg-opacity-25 hover:shadow transition-colors ease-in-out duration-200">
        <a target="_blank" :href="`/torrents.php?action=download&id=${release.id}&key=${passKey}`" :title="release.name" class="block truncate w-full release-title">{{ release.name }}</a>
        <div class="absolute right-0 top-0 flex align-items-center uppercase tracking-wider text-xs py-1 px-2 mt-2">
            <span v-if="resolution" class="mr-4 inline-block opacity-50 pointer-events-none whitespace-no-wrap">{{ release.fullResolution }}</span>
            <span v-if="lang" class="mr-4 inline-block opacity-50 pointer-events-none whitespace-no-wrap">{{ release.lang }}</span>
            <span class="mr-4 inline-block opacity-50 pointer-events-none whitespace-no-wrap w-12"><UploadIcon class="align-bottom" size="16" /> {{ release.seeds }}</span>
            <span class="mr-4 inline-block transition-opacity duration-200 release-button cursor-pointer text-orange-500" title="Hozzáadás a &quot;Filmek&quot; listához" @click.prevent="$emit('bookmark', release)"><RssIcon size="16" /></span>
            <a :href="`/torrents.php?action=details&id=${release.id}`" target="_blank" class="inline-block transition-opacity duration-200 release-button cursor-pointer text-gray-100" title="Torrent adatlapja"><DetailsIcon size="16" /></a>
        </div>
    </div>
</template>
<script>
    import RssIcon from 'components/icons/rss.vue';
    import UploadIcon from 'components/icons/upload.vue';
    import DetailsIcon from 'components/icons/details.vue';

    export default {
        components: {
            RssIcon,
            UploadIcon,
            DetailsIcon
        },
        props: {
            resolution: Boolean, // mutassuk a felbontast?
            lang: Boolean, // mutassuk a nyelvet?
            release: {
                type: Object,
                default: () => ({})
            },
            passKey: {
                type: String,
                default: ''
            }
        },
        emits: ['bookmark']
    }
</script>