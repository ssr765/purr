import axios from '@/lib/axios'

export const useAdminService = () => {
  const approve = async (postId: number) => {
    await axios.post(`/api/v1/admin/posts/${postId}/approve`)
  }

  const deletePostUser = async (postId: number) => {
    await axios.delete(`/api/v1/admin/posts/${postId}/user`)
  }

  const deleteCatUsers = async (catId: number) => {
    await axios.delete(`/api/v1/admin/cats/${catId}/users`)
  }

  return {
    approve,
    deleteCatUsers,
    deletePostUser,
  }
}
