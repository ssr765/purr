import axios from '@/lib/axios'
import type { User } from '@/models/User'

interface userPayload {
  name: string
  username: string
  email: string
  password: string
  new_password: string
  new_password_confirmation: string
}

export const useUserService = () => {
  const editProfile = async (userId: number, payload: userPayload) => {
    const response = await axios.put<User>(`/api/v1/users/${userId}`, payload)
    return response.data
  }

  const deleteAccount = async (userId: number, password: string) => {
    const response = await axios.delete<User>(`/api/v1/users/${userId}`, {
      data: { password },
    })
    return response.data
  }

  const uploadAvatar = async (userId: number, avatar: File) => {
    const formData = new FormData()
    formData.append('avatar', avatar)
    const response = await axios.post<{ avatar: string }>(
      `/api/v1/users/${userId}/avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return response.data
  }

  const deleteAvatar = async (userId: number) => {
    const response = await axios.delete<{ avatar: null }>(
      `/api/v1/users/${userId}/avatar`,
    )
    return response.data
  }

  return {
    editProfile,
    deleteAccount,
    uploadAvatar,
    deleteAvatar,
  }
}
