<script lang="ts" setup>
import type { Post } from '@/models/Post'
import CatPlaceholderAvatar from '@/components/utils/CatPlaceholderAvatar.vue'
import PostComment from './PostComment.vue'
import LikeButton from './LikeButton.vue'
import { usePostStore } from '@/stores/postStore'
import { useNumberFormatter } from '@/composables/numberFormatter'
import useLikeAnimation from '@/composables/likeAnimation'

defineProps({
  post: {
    type: Object as () => Post,
    required: true,
  },
})

const postStore = usePostStore()
const { formatNumber } = useNumberFormatter()
const { likeAnimation } = useLikeAnimation()

const addLike = (id: number) => {
  if (postStore.liking) return
  postStore.toggleLike(id)

  // Animation
  likeAnimation(id)
}
</script>

<template>
  <article class="max-w-xl bg-ctp-mantle border border-ctp-lavender rounded-lg shadow m-auto text-ctp-text">
    <div class="relative">
      <img v-on:dblclick="addLike(post.id)" class="w-full rounded-lg" :src="post.url" alt="" />
      <span :id="`post-${post.id}`" class="icon-[solar--heart-bold] text-red-500 absolute-center scale-0 text-[100px]" role="img" aria-hidden="true" />
    </div>
    <div>
      <div class="flex flex-col gap-2 p-4 pt-4">
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

          <div class="text-3xl flex gap-4">
            <div class="flex flex-col items-center">
              <LikeButton :like="post.likesData.isLiked" @addLike="addLike(post.id)" />
              <span class="text-sm leading-5 font-semibold">{{ formatNumber(post.likesData.count) }}</span>
            </div>

            <div class="flex flex-col items-center">
              <RouterLink :to="{ name: 'app-posts-detail', params: { id: post.id } }">
                <span class="block icon-[iconamoon--comment-light]" role="img" aria-hidden="true" />
              </RouterLink>
              <span class="text-sm leading-5 font-semibold">{{ formatNumber(post.commentsCount) }}</span>
            </div>

            <div class="flex flex-col items-center">
              <span class="block icon-[iconamoon--bookmark-light]" role="img" aria-hidden="true" />
              <span class="text-sm leading-5 font-semibold">{{ formatNumber(0) }}</span>
            </div>
          </div>
        </div>
        <div v-if="post.caption" class="text-sm text-center py-4">{{ post.caption }}</div>
        <div v-if="post.comments" class="space-y-2">
          <PostComment :comment="comment" v-for="comment in post.comments" :key="comment.id" :postId="post.id" />
        </div>
        <RouterLink :to="{ name: 'app-posts-detail', params: { id: post.id } }" class="text-sm text-ctp-lavender pt-1" v-if="post.commentsCount > 3">Ver todos los comentarios</RouterLink>
      </div>
    </div>
  </article>
</template>
