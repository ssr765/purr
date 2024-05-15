import axios from '@/lib/axios'

export const useAdminService = () => {
  const approve = async (postId: number) => {
    try {
      await axios.post(`/api/v1/admin/posts/${postId}/approve`)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const deletePostUser = async (postId: number) => {
    try {
      await axios.delete(`/api/v1/admin/posts/${postId}/user`)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const deleteCatUsers = async (catId: number) => {
    try {
      await axios.delete(`/api/v1/admin/cats/${catId}/users`)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    approve,
    deleteCatUsers,
    deletePostUser,
  }
}
