<script setup lang="ts">
import PostCard from '@/components/utils/posts/PostCard.vue'
import type { Post } from '@/models/Post'

defineProps({
  posts: {
    type: Array as () => Post[],
    required: true,
  },
})
</script>

<template>
  <div class="space-y-4">
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>
