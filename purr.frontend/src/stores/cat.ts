import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/lib/axios'
import type { Cat } from '@/models/Cat'

export const useCatStore = defineStore('cat', () => {
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

  const clear = () => {
    cat.value = null
  }

  return {
    loading,
    cat,

    fetchCat,
    fetchCatByCatname,
    clear,
  }
})
