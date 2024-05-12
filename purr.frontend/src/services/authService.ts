import axios from '@/lib/axios'
import type { User } from '@/models/User'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'

export const useAuthService = () => {
  const { t } = useI18n()
  const csrf = async () => {
    try {
      await axios.get('/sanctum/csrf-cookie')
    } catch (error) {
      toast.error(t('errors.serverError'))
      console.log(error)
    }
  }

  const login = async (email: string, password: string) => {
    await csrf()

    try {
      const response = await axios.post<User>('/login', { email, password })
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const register = async (data: Object) => {
    await csrf()

    try {
      const response = await axios.post<User>('/register', data)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const logout = async () => {
    await csrf()
    await axios.post('/logout')
  }

  const fetchUser = async () => {
    try {
      const response = await axios.get<User>('/api/v1/user')
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    login,
    register,
    logout,
    fetchUser,
  }
}
