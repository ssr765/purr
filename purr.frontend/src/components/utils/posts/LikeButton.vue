<script setup lang="ts">
defineProps({
  like: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <button @click="$emit('addLike')">
    <span v-if="like" class="block icon-[solar--heart-bold] text-red-500" role="img" aria-hidden="true" />
    <span v-else class="block icon-[solar--heart-linear]" role="img" aria-hidden="true" />
  </button>
</template>
