import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { useI18n } from 'vue-i18n'

export const useCookieStore = defineStore('cookie', () => {
  const { t } = useI18n()

  const bannerShouldShow = ref(Cookies.get('gdpr_cookie_consent') === undefined)
  const GDPRstatus = ref(Cookies.get('gdpr_cookie_consent') === 'true')
  const pendingCookies = ref<{ name: string; value: string }[]>([])

  const setCookie = (name: string, value: string) => {
    if (GDPRstatus.value) {
      Cookies.set(name, value)
    } else {
      pendingCookies.value.push({ name, value })
    }
  }

  const reject = () => {
    GDPRstatus.value = false
    Cookies.set('gdpr_cookie_consent', 'false')
    bannerShouldShow.value = false
    toast(t('cookieBanner.toast.saved'))
  }

  const consent = () => {
    GDPRstatus.value = true
    Cookies.set('gdpr_cookie_consent', 'true')
    bannerShouldShow.value = false
    toast(t('cookieBanner.toast.saved'))

    pendingCookies.value.forEach((cookie) => {
      Cookies.set(cookie.name, cookie.value)
    })
  }

  return {
    bannerShouldShow,
    GDPRstatus,
    pendingCookies,
    setCookie,
    reject,
    consent,
  }
})
