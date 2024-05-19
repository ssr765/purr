<script setup lang="ts">
import PostCard from '@/components/utils/posts/PostCard.vue'
import type { Post } from '@/models/Post'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import LoadingSpinner from '../LoadingSpinner.vue'
import { usePostStore } from '@/stores/postStore'
import { storeToRefs } from 'pinia'
import EndOfFeed from '@/components/utils/posts/PostsFeed/EndOfFeed.vue'

const { loadingMore, nextPageExists, loading } = storeToRefs(usePostStore())
const emit = defineEmits(['loadMore'])

const props = defineProps({
  posts: {
    type: Array as () => Post[],
    required: true,
  },
})

const page = ref(1)
let observer: IntersectionObserver

const createObserver = () => {
  if (observer) observer.disconnect()
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      console.log('loading more!!!!!')
      page.value++
      emit('loadMore', page.value)
    }
  })

  setTimeout(() => {
    const lastPost = document.querySelector('.intersect-trigger')
    if (!lastPost) {
      if (observer) observer.disconnect()
    } else {
      observer.observe(lastPost)
    }
  }, 1000)
}

onMounted(() => {
  createObserver()
})

watch(
  () => props.posts,
  () => {
    createObserver()
  },
)

onUnmounted(() => {
  observer.disconnect()
})
</script>

<template>
  <div v-if="loading">
    <LoadingSpinner class="text-6xl" />
  </div>
  <section v-else>
    <div class="space-y-4">
      <PostCard v-for="(post, i) in posts" :class="{ 'intersect-trigger': i == posts.length - 1 && nextPageExists }" :key="post.id" :post="post" />
    </div>
    <div v-if="loadingMore" class="flex items-center justify-center h-32">
      <LoadingSpinner class="text-6xl" />
    </div>
    <EndOfFeed v-if="!nextPageExists" />
  </section>
</template>
