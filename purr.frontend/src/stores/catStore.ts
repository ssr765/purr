import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Cat } from '@/models/Cat'
import { useRouter } from 'vue-router'
import { useCatService } from '@/services/catService'
import { useAuthStore } from './authStore'
import type { AxiosError } from 'axios'
import { toast } from 'vue-sonner'

export const useCatStore = defineStore('cat', () => {
  const router = useRouter()
  const catService = useCatService()
  const { user } = useAuthStore()

  const loading = ref(false)
  const cat = ref<Cat | null>(null)

  const fetchCat = async (id: number) => {
    try {
      loading.value = true
      const response = await catService.fetchCat(id)
      cat.value = response
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const fetchCatByCatname = async (catname: string) => {
    try {
      loading.value = true
      const response = await catService.fetchCatByCatname(catname)
      cat.value = response
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const fetchRandomCat = async () => {
    try {
      loading.value = true
      const response = await catService.fetchRandomCat()
      cat.value = response
      router.push({
        name: 'app-cats-profile',
        params: { catname: cat.value.catname },
      })
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 404) {
        if (user) {
          toast.error('No hemos encontrado ningún gato :(', {
            description: '¿Quieres que el tuyo sea el primero?',
            action: {
              label: '¡Sí!',
              onClick: () => router.push({ name: 'app-cats-create' }),
            },
          })
        } else {
          toast.error('No hemos encontrado ningún gato :(')
        }
      } else {
        toast.error('Ha ocurrido un error al cargar el gato aleatorio.')
      }
    } finally {
      loading.value = false
    }
  }

  const followLoading = ref(false)
  const follow = async () => {
    if (!cat.value) return
    cat.value.followed = true
    cat.value.followers_count += 1
    user!.following_count += 1
    if (followLoading.value) return
    try {
      followLoading.value = true
      const response = await catService.follow(cat.value.id)
      cat.value.followers_count = response.cat.followers_count
      cat.value.followed = response.cat.followed
      user!.following_count = response.user.following_count
    } catch (error) {
      console.log(error)
    } finally {
      followLoading.value = false
    }
  }

  const unfollow = async () => {
    if (!cat.value) return
    cat.value.followed = false
    cat.value.followers_count -= 1
    user!.following_count -= 1
    if (followLoading.value) return
    try {
      followLoading.value = true
      const response = await catService.unfollow(cat.value.id)
      cat.value.followers_count = response.cat.followers_count
      cat.value.followed = response.cat.followed
      user!.following_count = response.user.following_count
    } catch (error) {
      console.log(error)
    } finally {
      followLoading.value = false
    }
  }

  const clear = () => {
    cat.value = null
  }

  return {
    loading,
    cat,
    followLoading,

    fetchCat,
    fetchCatByCatname,
    fetchRandomCat,
    follow,
    unfollow,
    clear,
  }
})
