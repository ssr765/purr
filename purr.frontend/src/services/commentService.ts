import axios from '@/lib/axios'
import type { Comment } from '@/models/Comment'

export const useCommentService = () => {
  const fetchComments = async (postId: number) => {
    const response = await axios.get<Comment[]>(
      `/api/v1/posts/${postId}/comments`,
    )
    return response.data
  }

  const create = async (id: number, content: string) => {
    const data = {
      post_id: id,
      content,
    }

    const response = await axios.post<Comment>(`/api/v1/comments`, data)
    return response.data
  }

  const like = async (id: number) => {
    const response = await axios.post<{ count: number; isLiked: boolean }>(
      `/api/v1/comments/${id}/likes`,
    )
    return response.data
  }

  const unlike = async (id: number) => {
    const response = await axios.delete<{ count: number; isLiked: boolean }>(
      `/api/v1/comments/${id}/likes`,
    )
    return response.data
  }

  const deleteComment = async (id: number) => {
    const response = await axios.delete<Comment>(`/api/v1/comments/${id}`)
    return response.data
  }

  return {
    fetchComments,
    create,
    like,
    unlike,
    delete: deleteComment,
  }
}
