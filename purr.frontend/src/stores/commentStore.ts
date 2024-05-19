import { defineStore } from 'pinia'
import { useCommentService } from '@/services/commentService'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { useI18n } from 'vue-i18n'

export const useCommentStore = defineStore('comment', () => {
  const { t } = useI18n()
  const loading = ref(false)
  const commentService = useCommentService()

  const fetchComments = async (postId: number) => {
    try {
      loading.value = true
      const comments = await commentService.fetchComments(postId)
      return comments
    } catch (error) {
      toast.error(t('app.comments.toast.fetchError'))
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    fetchComments,
  }
})
