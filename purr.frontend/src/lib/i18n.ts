import { createI18n } from 'vue-i18n'
import ES from '@/locales/es.json'
import EN from '@/locales/en.json'
import CA from '@/locales/ca.json'
import JA from '@/locales/ja.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    en: EN,
    es: ES,
    ca: CA,
    ja: JA,
  },
})
