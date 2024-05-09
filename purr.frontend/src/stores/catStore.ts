import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/lib/axios'
import type { Cat } from '@/models/Cat'
import { useRouter } from 'vue-router'
import { useCatService } from '@/services/catService'
import { useAuthStore } from './authStore'

export const useCatStore = defineStore('cat', () => {
  const router = useRouter()
  const catService = useCatService()
  const { user } = useAuthStore()

  const loading = ref(false)
  const cat = ref<Cat | null>(null)

  const fetchCat = async (id: number) => {
    try {
      loading.value = true
      const response = await axios.get<Cat>(`/api/v1/cats/${id}`)
      console.log(response.data)
      cat.value = response.data
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const fetchCatByCatname = async (catname: string) => {
    try {
      loading.value = true
      const response = await axios.get<Cat>(`/api/v1/cats/catname/${catname}`)
      console.log(response.data)
      cat.value = response.data
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const fetchRandomCat = async () => {
    try {
      loading.value = true
      const response = await axios.get<Cat>('/api/v1/cats/random')
      cat.value = response.data
      router.push({
        name: 'app-cats-profile',
        params: { catname: cat.value.catname },
      })
    } catch (error) {
      console.log(error)
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
