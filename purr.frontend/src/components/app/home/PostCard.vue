<script lang="ts" setup>
import { ref } from 'vue'
import gsap from 'gsap'
import type { Post } from '@/models/Post'
import CatPlaceholderAvatar from '@/components/utils/CatPlaceholderAvatar.vue'
import PostCardComment from './PostCard/PostCardComment.vue'

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
      <div class="flex flex-col gap-2 p-4 pt-2">
        <div class="flex items-center justify-between">
          <RouterLink :to="{ name: 'app-cats-profile', params: { catname: post.cat!.catname } }">
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
        <div v-if="post.caption" class="text-sm text-center">{{ post.caption }}</div>
        <div v-if="post.comments" class="space-y-2 px-4">
          <PostCardComment :comment="comment" v-for="comment in post.comments" :key="comment.id" />
        </div>
      </div>
    </div>
  </article>
</template>
