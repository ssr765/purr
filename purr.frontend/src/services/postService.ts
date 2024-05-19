import axios from '@/lib/axios'
import type { Post } from '@/models/Post'
import type { Analysis } from '@/models/Analysis'

interface Links {
  self: string
  next: string | null
  prev: string | null
}

interface Meta {
  current_page: number
  from: number
  last_page: number
  path: string
  per_page: number
  to: number
  total: number
}

interface PostPagination {
  data: Post[]
  links: Links
  meta: Meta
}

export const usePostService = () => {
  const fetchExplore = async (page: number) => {
    try {
      const response = await axios.get<PostPagination>(
        `/api/v1/posts?page=${page}`,
      )
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const fetchFeed = async (page: number) => {
    try {
      const response = await axios.get<PostPagination>(
        `/api/v1/user/feed?page=${page}`,
      )
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const fetchPostDetail = async (id: number) => {
    try {
      const response = await axios.get<Post>(`/api/v1/posts/${id}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

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

  const createPost = async (formData: FormData) => {
    try {
      const response = await axios.post<Post>('/api/v1/posts', formData)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const deletePost = async (id: number) => {
    try {
      const response = await axios.delete(`/api/v1/posts/${id}`)
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

  const getLikedPosts = async (page: number) => {
    try {
      const response = await axios.get<PostPagination>(
        `/api/v1/posts/likes?page=${page}`,
      )
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const getSavedPosts = async (page: number) => {
    try {
      const response = await axios.get<PostPagination>(
        `/api/v1/posts/saves?page=${page}`,
      )
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const fetchCatPosts = async (id: number, page: number = 1) => {
    try {
      const response = await axios.get<PostPagination>(
        `/api/v1/cats/${id}/posts?page=${page}`,
      )
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    fetchExplore,
    fetchFeed,
    fetchPostDetail,
    analyze,
    createPost,
    deletePost,
    like,
    unlike,
    save,
    unsave,
    getLikedPosts,
    getSavedPosts,
    fetchCatPosts,
  }
}
