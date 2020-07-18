<template>
    <span :class="isActive ? 'bg-orange-600 text-gray-100' : 'text-gray-500 hover:text-gray-100 bg-opacity-50 bg-gray-900 hover:bg-orange-600 hover:bg-opacity-25'" class="inline-block rounded transition-colors ease-in-out duration-200 font-bold uppercase tracking-wider ml-2 px-2">
        <slot />
    </span>
</template>
<script>
    export default {
        props: {
            isActive: Boolean
        }
    }
</script>