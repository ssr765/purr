import axios from '@/lib/axios'
import type { Comment } from '@/models/Comment'

export const useCommentService = () => {
  const fetchComments = async (postId: number) => {
    try {
      const response = await axios.get<Comment[]>(
        `/api/v1/posts/${postId}/comments`,
      )
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const create = async (id: number, content: string) => {
    const data = {
      post_id: id,
      content,
    }

    try {
      const response = await axios.post<Comment>(`/api/v1/comments`, data)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const like = async (id: number) => {
    try {
      console.log('like', id)
      const response = await axios.post<Comment>(`/api/v1/comments/${id}/likes`)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const unlike = async (id: number) => {
    try {
      console.log('unlike', id)
      const response = await axios.delete<Comment>(
        `/api/v1/comments/${id}/likes`,
      )
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const reply = async (id: number, content: string) => {}
  const deleteComment = async (id: number) => {}

  return {
    fetchComments,
    create,
    like,
    unlike,
    reply,
    delete: deleteComment,
  }
}
