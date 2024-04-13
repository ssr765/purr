import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/lib/axios'
import type { AxiosError } from 'axios'
import { User } from '@/models/User'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  async function csrf() {
    await axios.get('/sanctum/csrf-cookie')
  }

  async function login(email: string, password: string) {
    await csrf()

    try {
      const response = await axios.post<User>('/login', { email, password })
      user.value = response.data
      console.log(user.value)
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
  }

  return {
    user,
    isAuthenticated,

    csrf,
    login,
    logout
  }
})
