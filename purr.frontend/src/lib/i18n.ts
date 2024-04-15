import { createI18n } from 'vue-i18n'
import ES from '@/locales/es.json'
import EN from '@/locales/en.json'

export const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    en: EN,
    es: ES
  }
})
