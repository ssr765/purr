import axios from '@/lib/axios'
import type { Entity } from '@/models/Entity'

export const useMapService = () => {
  const getEntities = async () => {
    try {
      const response = await axios.get<Entity[]>('/api/v1/entities')
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    getEntities,
  }
}
