<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { Post } from '@/models/Post'
import type { Comment } from '@/models/Comment'
import { computed, type PropType } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { useCommentService } from '@/services/commentService'
import { usePostStore } from '@/stores/postStore'
import { toast } from 'vue-sonner'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const userCatsIds = computed(() => (user.value ? user.value.cats!.map((cat) => cat.id) : []))

const postStore = usePostStore()
const commentService = useCommentService()

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
  comment: {
    type: Object as PropType<Comment>,
    required: true,
  },
})

const deleteComment = async () => {
  try {
    await commentService.delete(props.comment.id)
    postStore.removeComment(props.post.id, props.comment.id)
    toast.success(t('app.comments.toast.deleteSuccess'))
  } catch (error) {
    toast.error(t('app.comments.toast.deleteError'))
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem class="text-red-500" v-if="userCatsIds.includes(post.cat!.id) || comment.user.id === user!.id || user!.admin" @click="deleteComment">
        <span class="mr-2 h-4 w-4 icon-[solar--trash-bin-trash-linear]" role="img" aria-hidden="true" />
        {{ $t('app.comments.dotMenu.delete') }}
      </DropdownMenuItem>
      <DropdownMenuLabel v-else class="text-ctp-text"> {{ $t('app.comments.dotMenu.noActions') }} </DropdownMenuLabel>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
