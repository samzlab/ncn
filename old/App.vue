<template>
    <div v-if="loading" class="absolute left-0 top-0 flex w-full h-full">
        <span class="mx-auto px-4 py-2 bg-gray-900 text-lg text-gray-300 rounded self-center shadow z-50">{{ loading }}</span>
    </div>
    <div class="container mx-auto layout h-full transition-colors duration-200 ease-linear text-gray-200">
        <Header v-model:tab="tab" />

        <main class="col-span-7">
            <component :is="pages[tab]" />
        </main>
    </div>
</template>
<script>
    import { ref, computed, provide } from 'vue';

    import { fetchPassKey } from 'lib/ncore';

    // comps
    import Header from 'components/Header.vue';

    // pages
    import * as pages from 'components/pages';
    // import Movies from 'components/pages/Movies.vue';

    export default {
        name: 'App',
        components: {
            Header
        },
        setup() {
            const loading 	= ref('loading');
            const tab 		= ref('movies');
            const passKey 	= ref(null);

            provide('loading', loading);
            provide('passKey', passKey);

            // load passKey from profile
            fetchPassKey().then(value => {
                loading.value = null;
                passKey.value = value;
            });

            return {
                // template vars
                loading,
                tab,
                // static
                pages
            }
        }
    }
</script>

<style src="./index.css"></style>
