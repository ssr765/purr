<script setup lang="ts">
import PurrButton from '@/components/utils/PurrButton.vue'
import RegularButton from '@/components/utils/RegularButton.vue'
import PostsFeed from '@/components/utils/posts/PostsFeed.vue'
import PostsGrid from '@/components/utils/posts/PostsGrid.vue'

import { usePostStore } from '@/stores/postStore'
import { onMounted, ref } from 'vue'

const postStore = usePostStore()

onMounted(() => {
  postStore.posts = []
  postStore.fetchPosts()
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
