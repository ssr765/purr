<script setup lang="ts">
import type { Cat } from '@/models/Cat'
import { onMounted } from 'vue'
import PostsGrid from '@/components/utils/posts/PostsGrid.vue'
import { usePostStore } from '@/stores/postStore'
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'

const props = defineProps({
  cat: {
    type: Object as () => Cat,
    required: true,
  },
})

const postStore = usePostStore()

onMounted(() => {
  postStore.posts = []
  postStore.fetchCatPosts(props.cat.id)
})

const loadMore = (page: number) => {
  postStore.fetchCatPosts(props.cat.id, page)
}
</script>

<template>
  <PostsGrid :posts="postStore.posts" @loadMore="loadMore" />
  <div v-if="postStore.posts.length === 0 && !postStore.loading" class="text-center text-lg italic text-ctp-text mt-10">
    {{ $t('app.cats.profile.noPosts') }}
  </div>
  <div v-if="postStore.loading">
    <LoadingSpinner class="text-6xl" />
  </div>
</template>
