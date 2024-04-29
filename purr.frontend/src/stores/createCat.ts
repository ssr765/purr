import { defineStore } from 'pinia'
import axios from '@/lib/axios'
import { ref, computed } from 'vue'
import { format } from 'date-fns'
import { toDate } from 'radix-vue/date'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

export const useCreateCatStore = defineStore('createCat', () => {
  const router = useRouter()
  const authStore = useAuthStore()

  const avatar = ref<File | null>(null)
  const name = ref<string>('')
  const catname = ref<string>('')
  const validCatname = ref(false)
  const biography = ref<string>('')
  const sex = ref<string>('')
  const breed = ref<string>('')
  const color = ref<string>('')
  const adoption = ref<boolean>(false)
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

      if (avatar.value) {
        formData.append('avatar', avatar.value)
      }

      formData.append('name', name.value)
      formData.append('catname', catname.value)
      formData.append('biography', biography.value)
      formData.append('sex', sex.value)
      formData.append('breed', breed.value)
      formData.append('color', color.value)
      formData.append('adoption', adoption.value.toString())

      if (birthdate.value) {
        formData.append('birthdate', birthdate.value)
      }

      formData.append('password', password.value)
      formData.append('password_confirmation', confirmPassword.value)

      const response = await axios.post(`/api/v1/cats`, formData)

      // Update the user's cats
      if (!authStore.user!.cats) {
        authStore.user!.cats = [response.data]
      } else {
        authStore.user!.cats.push(response.data)
      }

      router.push({
        name: 'app-cats-profile',
        params: { catname: response.data.catname },
      })
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
    adoption,
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
