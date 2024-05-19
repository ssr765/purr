import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { format } from 'date-fns'
import { toDate } from 'radix-vue/date'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useCatService } from '@/services/catService'
import { toast } from 'vue-sonner'
import { useI18n } from 'vue-i18n'
import type { AxiosError } from 'axios'
import { usePostService } from '@/services/postService'

export const useCreateCatStore = defineStore('createCat', () => {
  const postService = usePostService()
  const { t } = useI18n()
  const catService = useCatService()
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

  const checkCatname = async (): Promise<boolean> => {
    try {
      const value = catname.value
      const { exists } = await catService.checkCatname(catname.value)

      // Recursively check if the value has changed
      if (value !== catname.value) {
        return await checkCatname()
      }

      return exists
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status !== 422) {
        toast.error(t('app.cats.create.createCat.toast.catnameCheckError'))
      }
      return false
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

      const createdCat = await catService.createCat(formData)

      toast.success(t('app.cats.create.createCat.toast.success'))

      // Update the user's cats
      if (!authStore.user!.cats) {
        authStore.user!.cats = [createdCat]
      } else {
        authStore.user!.cats.push(createdCat)
      }

      router.push({
        name: 'app-cats-profile',
        params: { catname: createdCat.catname },
      })
    } catch (error) {
      toast.error(t('app.cats.create.createCat.toast.error'))
    }
  }

  const analyzing = ref(false)
  const analyzeAvatar = async () => {
    if (!avatar.value) return

    try {
      analyzing.value = true
      const { detected } = await postService.analyze(avatar.value)
      if (!detected) {
        toast.error(t('app.cats.create.createCat.toast.avatarAnalysisError'))
        avatar.value = null
      } else {
        toast.success(
          t('app.cats.create.createCat.toast.avatarAnalysisSuccess'),
        )
      }
    } catch (error) {
      toast.error(t('app.posts.create.errors.analyzeError'))
    } finally {
      analyzing.value = false
    }
  }

  const reset = () => {
    avatar.value = null
    name.value = ''
    catname.value = ''
    validCatname.value = false
    biography.value = ''
    sex.value = ''
    breed.value = ''
    color.value = ''
    adoption.value = false
    birthdateInput.value = undefined
    password.value = ''
    confirmPassword.value = ''
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
    analyzing,

    checkCatname,
    createCat,
    analyzeAvatar,
    reset,
  }
})
