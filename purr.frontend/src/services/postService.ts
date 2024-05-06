import axios from '@/lib/axios'
import type { Post } from '@/models/Post'
import type { Analysis } from '@/models/Analysis'

export const usePostService = () => {
  const analyze = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await axios.post<Analysis>(
        '/api/v1/posts/analyze',
        formData,
      )
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

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

  const save = async (id: number) => {
    try {
      console.log('save', id)
      const response = await axios.post<{ count: number; isSaved: boolean }>(
        `/api/v1/posts/${id}/saves`,
      )
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const unsave = async (id: number) => {
    try {
      console.log('unsave', id)
      const response = await axios.delete<{ count: number; isSaved: boolean }>(
        `/api/v1/posts/${id}/saves`,
      )
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const getLikedPosts = async () => {
    try {
      const response = await axios.get<Post[]>('/api/v1/posts/likes')
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const getSavedPosts = async () => {
    try {
      const response = await axios.get<Post[]>('/api/v1/posts/saves')
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    like,
    unlike,
    save,
    unsave,
    getLikedPosts,
    getSavedPosts,
    analyze,
  }
}
