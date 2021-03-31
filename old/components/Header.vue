<template>
    <header class="flex items-center justify-between h-12">
        <h1 class="text-3xl center">
            <span class="relative">nCore<span class="text-sm text-orange-500 absolute top right-0 font-bold">next</span></span><span class="ml-2 text-sm text-gray-600"><a :href="scriptLink">0.1.alpha</a></span>
        </h1>
        <nav>
            <a href="#movies" class="mx-2 p-2 border-b-2 border-orange-500 font-semibold" :class="tab === 'movies' ? 'text-gray-100' : 'border-opacity-0 hover:border-opacity-50'" @click="$emit('update:tab', 'movies')">Filmek</a>
            <a href="#series" class="mx-2 p-2 border-b-2 border-orange-500 font-semibold" :class="tab === 'series' ? 'text-gray-100' : 'border-opacity-0 hover:border-opacity-50'" @click="$emit('update:tab', 'series')">Sorozatok</a>
            <a href="#recommendations" class="mx-2 p-2 border-b-2 border-orange-500 font-semibold" :class="tab === 'recommendations' ? 'text-gray-100' : 'border-opacity-0 hover:border-opacity-50'" @click="$emit('update:tab', 'recommendations')">Ajánló</a>
        </nav>
        <nav>
            <a href="#" class="p-2">Beállítások</a>
            <a href="/" class="p-2">Bezárás</a>
        </nav>
    </header>
</template>

<script>
    import { SCRIPT_LINK as scriptLink } from 'lib/config';

    export default {
        props: {
            tab: {
                type: String,
                default: ''
            }
        },
        setup() {
            return { scriptLink };
        }
    }
</script>