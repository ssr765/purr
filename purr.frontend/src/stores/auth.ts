import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/lib/axios'
import type { AxiosError } from 'axios'
import { User } from '@/models/User'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => user.value !== null)

  const firstLoad = ref(true)

  async function csrf() {
    await axios.get('/sanctum/csrf-cookie')
  }

  async function login(email: string, password: string) {
    await csrf()

    try {
      const response = await axios.post<User>('/login', { email, password })
      user.value = response.data
      router.push({ name: 'app-home' })
    } catch (error) {
      console.log(error)
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 422) {
        console.log('Invalid credentials')
        // TODO: Toast error message
      }
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
      const response = await axios.get<User>('/api/user')
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

    firstLoad,

    csrf,
    login,
    logout,
    fetchUser
  }
})
