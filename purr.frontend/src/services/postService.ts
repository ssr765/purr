import axios from '@/lib/axios'
import type { Post } from '@/models/Post'

export const usePostService = () => {
  const like = async (id: number) => {
    try {
      console.log('like', id)
      const response = await axios.post<{ count: number; isLiked: boolean }>(
        `/api/v1/posts/${id}/likes`,
      )
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
      const response = await axios.delete<{ count: number; isLiked: boolean }>(
        `/api/v1/posts/${id}/likes`,
      )
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    like,
    unlike,
  }
}
