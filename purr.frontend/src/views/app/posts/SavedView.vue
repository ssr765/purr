<script setup lang="ts">
import PostsFeed from '@/components/utils/posts/PostsFeed.vue'

import { usePostStore } from '@/stores/postStore'
import { onMounted } from 'vue'

const postStore = usePostStore()

onMounted(() => {
  postStore.posts = postStore.posts.filter((post) => post.savesData.isSaved)
  postStore.fetchSavedPosts()
})
</script>

<template>
  <PostsFeed :posts="postStore.posts" />
</template>
