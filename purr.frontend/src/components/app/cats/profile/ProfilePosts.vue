<script setup lang="ts">
import type { Cat } from '@/models/Cat'
import { onMounted } from 'vue'
import gsap from 'gsap'
import { useNumberFormatter } from '@/composables/numberFormatter'
import PostsGrid from '@/components/utils/posts/PostsGrid.vue'
import { usePostStore } from '@/stores/postStore'
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'

const props = defineProps({
  cat: {
    type: Object as () => Cat,
    required: true,
  },
})

// --- Old grid ---
// onMounted(() => {
//   const animationObserver = new IntersectionObserver((entries, animationObserver) => {
//     entries.forEach((entry) => {
//       console.log(entry.target)
//       if (entry.isIntersecting) {
//         // Aplicar la animación GSAP cuando la imagen entra en el viewport
//         gsap.from(entry.target, { opacity: 0, duration: 1, y: 50 })

//         // Desconectar el observador de la imagen actual para no repetir la animación
//         animationObserver.unobserve(entry.target)
//       }
//     })
//   })

//   const imgs = document.querySelectorAll('.profile-post')
//   imgs.forEach((img) => {
//     animationObserver.observe(img)
//   })
// })
const { formatNumber } = useNumberFormatter()

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
  <!-- Old grid -->
  <!-- 
  <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 px-4 pb-4">
    <div v-if="false">
      <div v-for="post in cat.posts" :key="post.id" class="mx-auto relative">
        <RouterLink :to="{ name: 'app-posts-detail', params: { id: post.id } }">
          <img :src="post.url" class="profile-post object-cover aspect-square w-full xl:max-w-[20dvw]" alt="" />
          <div class="overlay bg-ctp-crust bg-opacity-65 w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100 transition-all z-50">
            <div class="flex justify-center items-center gap-4 h-full">
              <span class="p-2 flex flex-col justify-center gap-0.5">
                <span class="block icon-[solar--heart-bold]" role="img" aria-hidden="true" />
                <div class="font-semibold text-center">{{ formatNumber(post.likesData.count) }}</div>
              </span>

              <span class="p-2 flex flex-col justify-center gap-0.5">
                <span class="block icon-[iconamoon--comment-fill]" role="img" aria-hidden="true" />
                <div class="font-semibold text-center">{{ formatNumber(post.commentsCount) }}</div>
              </span>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div> -->
</template>
