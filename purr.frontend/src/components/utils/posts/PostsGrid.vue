<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { Post } from '@/models/Post'
import CatPlaceholderAvatar from '../CatPlaceholderAvatar.vue'
import LikeButton from './LikeButton.vue'
import SaveButton from './SaveButton.vue'
import { useNumberFormatter } from '@/composables/numberFormatter'
import { toast } from 'vue-sonner'
import { usePostStore } from '@/stores/postStore'
import { useAuthStore } from '@/stores/authStore'
import { useLikeAnimation } from '@/composables/likeAnimation'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { user } = storeToRefs(useAuthStore())
const postStore = usePostStore()
const { formatNumber } = useNumberFormatter()
const { likeAnimation } = useLikeAnimation()

defineProps({
  posts: {
    type: Array as () => Post[],
    required: true,
  },
})

const addLike = (id: number) => {
  if (!user.value) {
    toast.warning(t('app.posts.toast.noLoggedIn.like'))
    return
  }

  if (postStore.liking) return
  postStore.toggleLike(id)

  // Animation
  likeAnimation(id)
}

const save = (id: number) => {
  if (!user.value) {
    toast.warning(t('app.posts.toast.noLoggedIn.save'))
    return
  }

  if (postStore.saving) return
  postStore.toggleSave(id)
}
</script>

<template>
  <div class="flex flex-wrap gap-2 justify-center">
    <div v-for="post in posts" :key="post.id">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <RouterLink :to="{ name: 'app-posts-detail', params: { id: post.id } }">
              <img class="size-48 object-cover hover:scale-105 transition-all" :src="post.url" alt="" />
            </RouterLink>
          </TooltipTrigger>
          <TooltipContent>
            <div class="p-4 grid grid-cols-2 gap-4">
              <div class="relative">
                <img v-on:dblclick="addLike(post.id)" class="size-48 lg:size-96 object-cover" :src="post.url" alt="" />
                <span :id="`post-${post.id}`" class="icon-[solar--heart-bold] text-red-500 absolute-center scale-0 text-[100px]" role="img" aria-hidden="true" />
              </div>
              <div class="size-48 lg:size-96 grid grid-rows-[auto,1fr,auto]">
                <div>
                  <div class="flex flex-col items-center justify-center">
                    <CatPlaceholderAvatar class="size-20" />
                    <span class="text-lg lg:text-xl leading-5">{{ post.cat!.name }}</span>
                    <span class="text-sm lg:text-base">@{{ post.cat!.catname }}</span>
                  </div>
                  <hr class="hidden lg:block h-px bg-ctp-lavender my-3" />
                </div>
                <div class="hidden lg:block">
                  <p v-if="post.caption">{{ post.caption }}</p>
                  <p v-else>
                    <span class="italic">{{ $t('app.posts.components.gridCard.noCaption') }}</span>
                  </p>
                </div>
                <div class="mt-4">
                  <p class="hidden lg:block text-center">{{ formatNumber(post.likesData.count) }} {{ $t('app.posts.components.gridCard.likes') }} · {{ formatNumber(post.commentsCount) }} {{ $t('app.posts.components.gridCard.comments') }} · {{ formatNumber(post.savesData.count) }} {{ $t('app.posts.components.gridCard.saves') }}</p>
                  <hr class="h-px bg-ctp-lavender my-3 hidden lg:block" />
                  <div class="flex gap-2 text-3xl justify-center lg:justify-normal">
                    <LikeButton @addLike="addLike(post.id)" :like="post.likesData.isLiked" />
                    <span class="icon-[iconamoon--comment-light]" role="img" aria-hidden="true" />
                    <SaveButton @save="save(post.id)" :save="post.savesData.isSaved" />
                  </div>
                </div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>
