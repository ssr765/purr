import { defineStore } from 'pinia'
import { useCommentService } from '@/services/commentService'
import { ref } from 'vue'

export const useCommentStore = defineStore('comment', () => {
  const loading = ref(false)
  const commentService = useCommentService()

  const fetchComments = async (postId: number) => {
    try {
      loading.value = true
      const comments = await commentService.fetchComments(postId)
      return comments
    } catch (error) {
      console.log(error)
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
