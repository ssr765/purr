<script setup lang="ts">
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import type { Comment } from '@/models/Comment'
import { ref, type PropType } from 'vue'
import { useCommentService } from '@/services/commentService'
import { usePostStore } from '@/stores/postStore'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import DotMenu from './Comment/DotMenu.vue'
import type { Post } from '@/models/Post'
import { toast } from 'vue-sonner'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
  comment: {
    type: Object as () => Comment,
    required: true,
  },
})

const authStore = useAuthStore()
const postStore = usePostStore()

const { t } = useI18n()
const { user } = storeToRefs(authStore)

const addLike = (id: number) => {
  if (!user.value) {
    toast.warning(t('app.comment.toast.noLoggedIn'))
    return
  }

  if (postStore.commentLiking) return
  postStore.toggleCommentLike(id)
}
</script>

<template>
  <div class="flex items-center gap-4 odd:bg-ctp-lavender/10 hover:bg-ctp-lavender/20 py-2 px-4 rounded-md">
    <Avatar>
      <AvatarImage :src="comment.user.avatar ?? ''" :alt="$t('app.layout.header.user.avatarAlt')" />
      <AvatarFallback class="text-lg text-ctp-text">{{ comment.user.username[0].toUpperCase() }}</AvatarFallback>
    </Avatar>
    <div class="flex-1 flex flex-col justify-center">
      <div class="font-bold leading-5">{{ comment.user.name }}</div>
      <span class="leading-5">{{ comment.content }}</span>
    </div>
    <div class="flex flex-col items-center">
      <button @click="addLike(comment.id)">
        <span v-if="comment.liked" class="block icon-[solar--heart-bold] text-red-500" role="img" aria-hidden="true" />
        <span v-else class="block icon-[solar--heart-linear]" role="img" aria-hidden="true" />
      </button>
      <span class="text-xs"> {{ comment.likesCount }} </span>
    </div>
    <button v-if="user">
      <DotMenu :post="post" :comment="comment">
        <span class="block icon-[mdi--dots-vertical]" role="img" aria-hidden="true" />
      </DotMenu>
    </button>
  </div>
</template>
