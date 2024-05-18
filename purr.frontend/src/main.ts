import './assets/main.css'
import './assets/lib/leaflet.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { i18n } from '@/lib/i18n'
import { createHead } from 'unhead'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

createHead()
app.config.globalProperties.$scrollToTop = () => window.scrollTo(0, 0)

app.mount('#app')
