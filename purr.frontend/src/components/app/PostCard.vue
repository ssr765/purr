<script lang="ts" setup>
import { ref } from 'vue'
import gsap from 'gsap'
import { Post } from '@/models/Post'
import CatPlaceholderAvatar from '../CatPlaceholderAvatar.vue'

defineProps({
  post: {
    type: Object as () => Post,
    required: true,
  },
})

const like = ref(false)

const addLike = (id: number) => {
  const elementId = `#post-${id}`
  like.value = !like.value

  // Animation
  let tl = gsap.timeline()
  tl.to(elementId, { scale: 1.5, duration: 0.15 })
  tl.to(elementId, { scale: 0.9, duration: 0.15 })
  tl.to(elementId, { scale: 1.2, duration: 0.35 })
  tl.to(elementId, { scale: 0, duration: 0.35 })
}
</script>

<template>
  <article class="max-w-xl bg-ctp-mantle border border-ctp-lavender rounded-lg shadow m-auto text-ctp-text">
    <div class="relative">
      <img v-on:dblclick="addLike(post.id)" class="w-full rounded-lg" :src="post.url" alt="" />
      <span :id="`post-${post.id}`" class="icon-[solar--heart-bold] text-red-500 absolute-center scale-0 text-[100px]" role="img" aria-hidden="true" />
    </div>
    <div>
      <div class="p-4 pt-2">
        <div class="flex items-center justify-between">
          <RouterLink :to="{ name: 'app-cat', params: { id: post.cat!.id } }">
            <div class="flex items-center gap-2">
              <CatPlaceholderAvatar class="w-12 h-12" />
              <div>
                <div class="text-lg font-bold leading-4">{{ post.cat!.name }}</div>
                <div class="text-sm">@{{ post.cat!.catname }}</div>
              </div>
            </div>
          </RouterLink>

          <div class="p-4 pb-2 text-3xl flex gap-4">
            <button @click="addLike(post.id)">
              <span v-if="like" class="icon-[solar--heart-bold] text-red-500" role="img" aria-hidden="true" />
              <span v-else class="icon-[solar--heart-linear]" role="img" aria-hidden="true" />
            </button>
            <span class="icon-[iconamoon--comment-light]" role="img" aria-hidden="true" />
            <span class="icon-[iconamoon--bookmark-light]" role="img" aria-hidden="true" />
          </div>
        </div>
        <div class="text-sm p-4 pt-2 text-center">{{ post.caption }}</div>
      </div>
    </div>
  </article>
</template>
