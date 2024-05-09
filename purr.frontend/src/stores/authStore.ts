import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/lib/axios'
import type { AxiosError } from 'axios'
import type { User } from '@/models/User'
import { useRouter } from 'vue-router'
import { useResponseToaster } from '@/composables/responseToaster'
import { toast } from 'vue-sonner'
import { useI18n } from 'vue-i18n'

export const useAuthStore = defineStore('auth', () => {
  const { t } = useI18n()
  const { toastResponse } = useResponseToaster()
  const router = useRouter()
  const loading = ref(false)

  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => user.value !== null)

  const firstLoad = ref(true)

  async function csrf() {
    try {
      loading.value = true
      await axios.get('/sanctum/csrf-cookie')
    } catch (error) {
      toast.error(t('errors.serverError'))
    } finally {
      loading.value = false
    }
  }

  async function login(email: string, password: string) {
    await csrf()

    try {
      loading.value = true
      const response = await axios.post<User>('/login', { email, password })
      user.value = response.data
      router.push({ name: 'app-home' })
    } catch (error) {
      toastResponse(error as AxiosError)
    } finally {
      loading.value = false
    }
  }

  async function register(data: Object) {
    await csrf()

    try {
      loading.value = true
      const response = await axios.post<User>('/register', data)
      user.value = response.data
      router.push({ name: 'app-home' })
    } catch (error) {
      toastResponse(error as AxiosError)
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    await csrf()
    await axios.post('/logout')
    user.value = null
    router.push({ name: 'app-home' })
  }

  async function fetchUser() {
    try {
      const response = await axios.get<User>('/api/v1/user')
      user.value = response.data
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 401) {
        user.value = null
      }
    }
  }

  return {
    user,
    isAuthenticated,
    loading,

    firstLoad,

    csrf,
    login,
    register,
    logout,
    fetchUser,
  }
})
