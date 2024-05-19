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
    }
  }

  const login = async (email: string, password: string) => {
    await csrf()

    const response = await axios.post<User>('/login', { email, password })
    return response.data
  }

  const register = async (data: Object) => {
    await csrf()

    const response = await axios.post<User>('/register', data)
    return response.data
  }

  const logout = async () => {
    await csrf()
    await axios.post('/logout')
  }

  const fetchUser = async () => {
    const response = await axios.get<User>('/api/v1/user')
    return response.data
  }

  return {
    login,
    register,
    logout,
    fetchUser,
  }
}
