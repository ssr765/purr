<script setup lang="ts">
defineProps({
  save: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <button @click="$emit('save')">
    <span v-if="save" class="block icon-[iconamoon--bookmark-fill] text-ctp-text" role="img" aria-hidden="true" />
    <span v-else class="block icon-[iconamoon--bookmark-light]" role="img" aria-hidden="true" />
  </button>
</template>
