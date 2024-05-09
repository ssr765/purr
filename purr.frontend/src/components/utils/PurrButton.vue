<script setup lang="ts">
defineProps({
  noMargin: {
    type: Boolean,
    default: false,
  },
  noPaddingX: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button type="button" :class="{ 'mb-2': !noMargin, 'px-7': !noPaddingX }" class="bg-ctp-mantle block overflow-hidden relative focus:outline-none border border-ctp-lavender hover:text-white hover:dark:text-black dark:text-white text-black hover:bg-gradient-to-br from-ctp-lavender via-ctp-lavender to-ctp-mauve hover:bg-ctp-lavender/75 font-medium rounded-lg text-sm py-2.5 shadow-lg shadow-ctp-lavender/35 active:translate-y-1 disabled:active:translate-y-0 disabled:hover:from-red-500/50 disabled:hover:to-red-500/50 transition-all">
    <slot />
  </button>
</template>
