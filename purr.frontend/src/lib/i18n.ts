import { createI18n } from 'vue-i18n'
import ES from '@/locales/es.json'
import EN from '@/locales/en.json'
import CA from '@/locales/ca.json'
import JA from '@/locales/ja.json'
import IT from '@/locales/it.json'
import DE from '@/locales/de.json'
import PT from '@/locales/pt.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    en: EN,
    es: ES,
    ca: CA,
    ja: JA,
    it: IT,
    de: DE,
    pt: PT,
  },
})
