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

  return {
    approve,
  }
}
