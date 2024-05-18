<script setup lang="ts">
import PurrButton from '@/components/utils/PurrButton.vue'
import RegularButton from '@/components/utils/RegularButton.vue'
import PostsFeed from '@/components/utils/posts/PostsFeed.vue'
import PostsGrid from '@/components/utils/posts/PostsGrid.vue'

import { usePostStore } from '@/stores/postStore'
import { useSeoMeta } from 'unhead'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Logo from '@/assets/img/logo/black.webp'

const { t } = useI18n()
const postStore = usePostStore()

useSeoMeta({
  title: t('app.posts.explore.metadata.title') + ' | purr.',
  ogTitle: 'Explore Cat Posts on purr. - Discover Feline Fun',
  description: 'Explore the latest cat posts on purr. Discover cute photos, funny videos, and heartwarming stories from cats around the world. Dive into the feline fun now!',
  ogDescription: 'Discover the latest cat posts on purr. From adorable photos to hilarious videos, explore the best cat content from around the globe. Join the feline fun today!',
  ogImage: Logo,
})

onMounted(() => {
  postStore.posts = []
  postStore.fetchExplore()
})

const view = ref('feed')
</script>

<template>
  <PostsFeed v-if="view === 'feed'" :posts="postStore.posts" />
  <PostsGrid v-if="view === 'grid'" :posts="postStore.posts" />

  <div class="flex flex-col fixed right-8 bottom-4 *:text-3xl">
    <PurrButton noPaddingX @click="view = 'feed'" class="p-2.5" :active="view === 'feed'">
      <span class="block icon-[iconoir--post]" role="img" aria-hidden="true" />
    </PurrButton>
    <PurrButton noPaddingX @click="view = 'grid'" class="p-2.5" :active="view === 'grid'">
      <span class="block icon-[material-symbols--grid-view-outline-rounded]" role="img" aria-hidden="true" />
    </PurrButton>
  </div>
</template>
