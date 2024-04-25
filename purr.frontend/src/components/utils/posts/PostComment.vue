<script setup lang="ts">
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import type { Comment } from '@/models/Comment'
import { ref } from 'vue'
import { useCommentService } from '@/services/commentService'
import { usePostStore } from '@/stores/post'

const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
  comment: {
    type: Object as () => Comment,
    required: true,
  },
})

const postStore = usePostStore()
const commentService = useCommentService()

const liking = ref(false)
const addLike = async (id: number) => {
  if (liking.value) {
    like.value = !like.value
    return
  }
  liking.value = true

  if (!props.comment.liked) {
    await commentService.like(id)
    postStore.refreshCommentLike(props.postId, id, true)
    like.value = true
  } else {
    await commentService.unlike(id)
    postStore.refreshCommentLike(props.postId, id, false)
    like.value = false
  }

  liking.value = false
}

const like = ref(props.comment.liked)
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
        <span v-if="like" class="block icon-[solar--heart-bold] text-red-500" role="img" aria-hidden="true" />
        <span v-else class="block icon-[solar--heart-linear]" role="img" aria-hidden="true" />
      </button>
      <span class="text-xs"> {{ comment.likesCount }} </span>
    </div>
    <button>
      <span class="block icon-[mdi--dots-vertical]" role="img" aria-hidden="true" />
    </button>
  </div>
</template>
