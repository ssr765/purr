<script setup lang="ts">
import Logo from '@/assets/img/logo/black.webp'
import PostsFeed from '@/components/utils/posts/PostsFeed.vue'

import { usePostStore } from '@/stores/postStore'
import { useHead, useSeoMeta } from 'unhead'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const postStore = usePostStore()
const { t } = useI18n()

onMounted(() => {
  postStore.posts = []
  postStore.fetchLikedPosts()
})

const loadMore = (page: number) => {
  postStore.fetchLikedPosts(page)
}

useHead({
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
})

useSeoMeta({
  title: t('app.posts.likes.metadata.title') + ' | purr.',
  ogImage: Logo,
})
</script>

<template>
  <div v-if="postStore.posts.length === 0 && !postStore.loading" class="text-center text-lg italic text-ctp-text mt-10">
    {{ $t('app.posts.likes.noPosts') }}
  </div>
  <PostsFeed :posts="postStore.posts" @loadMore="loadMore" v-else />
</template>
