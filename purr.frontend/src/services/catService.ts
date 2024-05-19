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
    const response = await axios.get<Cat>(`/api/v1/cats/${id}`)
    return response.data
  }

  const fetchCatByCatname = async (catname: string) => {
    const response = await axios.get<Cat>(`/api/v1/cats/catname/${catname}`)
    return response.data
  }

  const fetchRandomCat = async () => {
    const response = await axios.get<Cat>('/api/v1/cats/random')
    return response.data
  }

  const follow = async (id: number) => {
    const response = await axios.post<FollowData>(`/api/v1/cats/${id}/follow  `)
    return response.data
  }

  const unfollow = async (id: number) => {
    const response = await axios.delete<FollowData>(
      `/api/v1/cats/${id}/follow  `,
    )
    return response.data
  }

  // --- Cat creation
  const checkCatname = async (catname: string) => {
    const response = await axios.post<{ exists: boolean }>(
      `/api/v1/cats/catname`,
      { catname },
    )
    return response.data
  }

  const createCat = async (formData: FormData) => {
    const response = await axios.post<Cat>(`/api/v1/cats`, formData)
    return response.data
  }

  const editCat = async (id: number, payload: Object) => {
    const response = await axios.put<Cat>(`/api/v1/cats/${id}`, payload)
    return response.data
  }

  const deleteCat = async (id: number) => {
    await axios.delete(`/api/v1/cats/${id}`)
  }

  const addCat = async (catname: string, password: string) => {
    const response = await axios.post(`/api/v1/cats/catname/${catname}/share`, {
      password,
    })
    return response.data
  }

  const search = async (query: string) => {
    const response = await axios.get<Cat[]>(`/api/v1/cats/search?q=${query}`)
    return response.data
  }

  const deleteAvatar = async (id: number) => {
    const response = await axios.delete<{ avatar: null }>(
      `/api/v1/cats/${id}/avatar`,
    )
    return response.data
  }

  const uploadAvatar = async (id: number, avatar: File) => {
    const formData = new FormData()
    formData.append('avatar', avatar)
    const response = await axios.post<{ avatar: string }>(
      `/api/v1/cats/${id}/avatar`,
      formData,
    )
    return response.data
  }

  const editProfile = async (id: number, payload: Object) => {
    const response = await axios.put<Cat>(`/api/v1/cats/${id}`, payload)
    return response.data
  }

  return {
    fetchCat,
    fetchCatByCatname,
    fetchRandomCat,
    follow,
    unfollow,
    checkCatname,
    createCat,
    editCat,
    deleteCat,
    addCat,
    search,
    deleteAvatar,
    uploadAvatar,
    editProfile,
  }
}
