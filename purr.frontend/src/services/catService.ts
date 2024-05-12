import axios from '@/lib/axios'
import type { Cat } from '@/models/Cat'

interface FollowData {
  cat: {
    followers_count: number
    followed: boolean
  }
  user: {
    following_count: number
  }
}

export const useCatService = () => {
  const fetchCat = async (id: number) => {
    try {
      const response = await axios.get<Cat>(`/api/v1/cats/${id}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const fetchCatByCatname = async (catname: string) => {
    try {
      const response = await axios.get<Cat>(`/api/v1/cats/catname/${catname}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const fetchRandomCat = async () => {
    try {
      const response = await axios.get<Cat>('/api/v1/cats/random')
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const follow = async (id: number) => {
    try {
      const response = await axios.post<FollowData>(
        `/api/v1/cats/${id}/follow  `,
      )
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const unfollow = async (id: number) => {
    try {
      const response = await axios.delete<FollowData>(
        `/api/v1/cats/${id}/follow  `,
      )
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // --- Cat creation
  const checkCatname = async (catname: string) => {
    try {
      const response = await axios.post<{ exists: boolean }>(
        `/api/v1/cats/catname`,
        { catname },
      )
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const createCat = async (formData: FormData) => {
    try {
      const response = await axios.post<Cat>(`/api/v1/cats`, formData)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    fetchCat,
    fetchCatByCatname,
    fetchRandomCat,
    follow,
    unfollow,
    checkCatname,
    createCat,
  }
}
