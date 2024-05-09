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
  noPaddingY: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button :class="{ 'mb-2': !noMargin, 'px-7': !noPaddingX, 'py-2.5': !noPaddingY }" class="border border-ctp-lavender text-white text-sm bg-ctp-lavender/20 hover:bg-ctp-lavender hover:text-black rounded-lg transition-all">
    <slot />
  </button>
</template>
