import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { AxiosError } from 'axios'
import type { User } from '@/models/User'
import { useRouter } from 'vue-router'
import { useResponseToaster } from '@/composables/responseToaster'
import { useI18n } from 'vue-i18n'
import { useAuthService } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const { t } = useI18n()
  const authService = useAuthService()
  const { toastResponse } = useResponseToaster()
  const router = useRouter()
  const loading = ref(false)

  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => user.value !== null)

  const firstLoad = ref(true)

  async function login(email: string, password: string) {
    try {
      loading.value = true
      const response = await authService.login(email, password)
      user.value = response
      router.push({ name: 'app-home' })
    } catch (error) {
      toastResponse(error as AxiosError)
    } finally {
      loading.value = false
    }
  }

  async function register(data: Object) {
    try {
      loading.value = true
      const response = await authService.register(data)
      user.value = response
      router.push({ name: 'app-home' })
    } catch (error) {
      toastResponse(error as AxiosError)
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    await authService.logout()
    user.value = null
    router.push({ name: 'app-home' })
  }

  async function fetchUser() {
    try {
      const response = await authService.fetchUser()
      user.value = response
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

    login,
    register,
    logout,
    fetchUser,
  }
})
