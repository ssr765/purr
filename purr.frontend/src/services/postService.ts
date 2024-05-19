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
    const response = await axios.get<PostPagination>(
      `/api/v1/posts?page=${page}`,
    )
    return response.data
  }

  const fetchFeed = async (page: number) => {
    const response = await axios.get<PostPagination>(
      `/api/v1/user/feed?page=${page}`,
    )
    return response.data
  }

  const fetchPostDetail = async (id: number) => {
    const response = await axios.get<Post>(`/api/v1/posts/${id}`)
    return response.data
  }

  const analyze = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await axios.post<Analysis>(
      '/api/v1/posts/analyze',
      formData,
    )
    return response.data
  }

  const createPost = async (formData: FormData) => {
    const response = await axios.post<Post>('/api/v1/posts', formData)
    return response.data
  }

  const deletePost = async (id: number) => {
    const response = await axios.delete(`/api/v1/posts/${id}`)
    return response.data
  }

  const like = async (id: number) => {
    const response = await axios.post<{ count: number; isLiked: boolean }>(
      `/api/v1/posts/${id}/likes`,
    )
    return response.data
  }

  const unlike = async (id: number) => {
    const response = await axios.delete<{ count: number; isLiked: boolean }>(
      `/api/v1/posts/${id}/likes`,
    )
    return response.data
  }

  const save = async (id: number) => {
    const response = await axios.post<{ count: number; isSaved: boolean }>(
      `/api/v1/posts/${id}/saves`,
    )
    return response.data
  }

  const unsave = async (id: number) => {
    const response = await axios.delete<{ count: number; isSaved: boolean }>(
      `/api/v1/posts/${id}/saves`,
    )
    return response.data
  }

  const getLikedPosts = async (page: number) => {
    const response = await axios.get<PostPagination>(
      `/api/v1/posts/likes?page=${page}`,
    )
    return response.data
  }

  const getSavedPosts = async (page: number) => {
    const response = await axios.get<PostPagination>(
      `/api/v1/posts/saves?page=${page}`,
    )
    return response.data
  }

  const fetchCatPosts = async (id: number, page: number = 1) => {
    const response = await axios.get<PostPagination>(
      `/api/v1/cats/${id}/posts?page=${page}`,
    )
    return response.data
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
