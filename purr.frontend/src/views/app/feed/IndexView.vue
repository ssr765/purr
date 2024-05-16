<script setup lang="ts">
import PostsFeed from '@/components/utils/posts/PostsFeed.vue'

import { usePostStore } from '@/stores/postStore'
import { onMounted } from 'vue'

import Logo from '@/assets/img/logo/black.webp'
import { useSeoMeta } from 'unhead'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

useSeoMeta({
  title: 'purr.',
  ogTitle: 'purr. - The Social Network for Your Cats',
  description: "Dive into purr. and explore a world of cat posts, connect with cat lovers, and share your cat's daily adventures on our unique platform.",
  ogDescription: 'Enter the vibrant community of purr., where you can view, post, and interact with cat lovers globally. Experience the joy of cat-centric social media.',
  ogImage: Logo,
})

const { user } = storeToRefs(useAuthStore())
const postStore = usePostStore()

onMounted(() => {
  postStore.posts = []
  if (user.value!.following_count > 0) {
    console.log('fetchFeed')
    postStore.fetchFeed()
  } else {
    console.log('fetchExplore')
    postStore.fetchExplore()
  }
})

const loadMore = (page: number) => {
  postStore.fetchFeed(page)
}
</script>

<template>
  <div v-if="user!.following_count == 0" class="flex items-center justify-center h-full">
    <div class="text-center">
      <h1 class="text-6xl p-4">{{ $t('app.posts.feed.noFollows.title') }}</h1>
      <p>{{ $t('app.posts.feed.noFollows.content') }}</p>
      <hr class="h-px bg-ctp-lavender my-10" />
    </div>
  </div>
  <PostsFeed :posts="postStore.posts" @loadMore="loadMore" />
</template>
