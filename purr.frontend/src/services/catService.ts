import axios from '@/lib/axios'

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

  return {
    follow,
    unfollow,
  }
}
