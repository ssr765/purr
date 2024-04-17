<script setup lang="ts">
import PostCard from '@/components/app/home/PostCard.vue'
import { usePostStore } from '@/stores/post'
import { onMounted } from 'vue'

const postStore = usePostStore()

onMounted(() => {
  postStore.fetchPosts()
})
</script>

<template>
  <div class="space-y-4">
    <PostCard v-for="post in postStore.posts" :key="post.id" :post="post" />
  </div>
</template>
