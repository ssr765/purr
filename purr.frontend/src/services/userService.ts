import axios from '@/lib/axios'
import type { User } from '@/models/User'

interface userPayload {
  name: string
  username: string
  email: string
  password: string
  new_password: string
}

export const useUserService = () => {
  const editProfile = async (userId: number, payload: userPayload) => {
    try {
      const response = await axios.put<User>(`/api/v1/users/${userId}`, payload)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const uploadAvatar = async (userId: number, avatar: File) => {
    try {
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
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const deleteAvatar = async (userId: number) => {
    try {
      const response = await axios.delete<{ avatar: null }>(
        `/api/v1/users/${userId}/avatar`,
      )
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    editProfile,
    uploadAvatar,
    deleteAvatar,
  }
}
