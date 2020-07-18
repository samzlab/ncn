<template>
    <div class="relative variant-group my-1 p-2 rounded bg-gray-700 bg-opacity-0 hover:bg-opacity-25 hover:shadow transition-colors ease-in-out duration-200">
        <a target="_blank" :href="`/torrents.php?action=download&id=${release.id}&key=${passKey}`" :title="release.name" class="block truncate w-full release-title">{{ release.name }}</a>
        <span class="absolute right-0 top-0 inline-block uppercase tracking-wider text-xs py-1 px-2 mt-2 mr-10 opacity-50 pointer-events-none whitespace-no-wrap"><UploadIcon class="align-bottom" size="16" /> {{ release.seeds }}</span>
        <a class="absolute right-0 top-0 inline-block uppercase tracking-wider transition-opacity duration-200 text-xs py-3 px-4 release-button cursor-pointer text-orange-500" title="Hozzáadás a &quot;Filmek&quot; listához" @click.prevent="$emit('bookmark', release)"><RssIcon size="16" /></a>
    </div>
</template>
<script>
    import RssIcon from 'components/icons/rss.vue';
    import UploadIcon from 'components/icons/upload.vue';

    export default {
        components: {
            RssIcon,
            UploadIcon
        },
        props: {
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