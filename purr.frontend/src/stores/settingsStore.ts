import { computed, ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useAuthStore } from './authStore'
import Cookies from 'js-cookie'
import { useCookieStore } from './cookieStore'
import { useI18n } from 'vue-i18n'
import { useSettingsService } from '@/services/settingsService'

export const useSettingsStore = defineStore('settings', () => {
  const { user } = storeToRefs(useAuthStore())
  const cookieStore = useCookieStore()
  const { setCookie } = cookieStore
  const { locale } = useI18n()
  const settingsService = useSettingsService()

  const settings = ref({
    language: Cookies.get('locale') ?? 'es',
  })

  const changeLanguage = (language: string) => {
    settings.value.language = language
    setCookie('locale', language)

    locale.value = settings.value.language

    if (user.value) {
      settingsService.changeLanguage(language)
    }
  }

  // Load user settings
  watch(
    () => user.value,
    () => {
      if (user.value) {
        settings.value = user.value.settings!
        changeLanguage(settings.value.language)
      }
    },
  )

  changeLanguage(settings.value.language)

  return {
    settings,
    changeLanguage,
  }
})
