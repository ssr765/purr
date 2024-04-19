import { defineStore } from 'pinia'
import axios from '@/lib/axios'
import { ref, computed } from 'vue'
import { format } from 'date-fns'
import { toDate } from 'radix-vue/date'

export const useCreateCatStore = defineStore('createCat', () => {
  const avatar = ref<File | null>(null)
  const name = ref<string>('')
  const catname = ref<string>('')
  const validCatname = ref(false)
  const biography = ref<string>('')
  const sex = ref<string>('')
  const breed = ref<string>('')
  const color = ref<string>('')
  const birthdateInput = ref<any>(undefined)
  const birthdate = computed(() =>
    birthdateInput.value
      ? format(toDate(birthdateInput.value), 'yyyy-MM-dd')
      : null,
  )
  const password = ref<string>('')
  const confirmPassword = ref<string>('')

  const checking = ref(false)
  const avatarUrl = computed(() =>
    avatar.value ? URL.createObjectURL(avatar.value) : null,
  )

  const checkCatname = async () => {
    try {
      const response = await axios.post<{ exists: boolean }>(
        `/api/v1/cats/catname`,
        { catname: catname.value },
      )
      validCatname.value = !response.data.exists
      console.log(validCatname.value)
    } catch (error) {
      console.log(error)
    } finally {
      checking.value = false
    }
  }

  const createCat = async () => {
    try {
      const formData = new FormData()
      formData.append('avatar', avatar.value as File)
      formData.append('name', name.value)
      formData.append('catname', catname.value)
      formData.append('biography', biography.value)
      formData.append('sex', sex.value)
      formData.append('breed', breed.value)
      formData.append('color', color.value)

      if (birthdate.value) {
        formData.append('birthdate', birthdate.value)
      }

      formData.append('password', password.value)
      formData.append('password_confirmation', confirmPassword.value)

      await axios.post(`/api/v1/cats`, formData)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    avatar,
    name,
    catname,
    validCatname,
    biography,
    sex,
    breed,
    color,
    birthdate,
    birthdateInput,
    password,
    confirmPassword,

    checking,
    avatarUrl,

    checkCatname,
    createCat,
  }
})
