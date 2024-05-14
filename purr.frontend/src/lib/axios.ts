import Axios from 'axios'
import { toast } from 'vue-sonner'
import { useI18n } from 'vue-i18n'
export interface errorData {
  message: string
  errors?: Record<string, string[]>
}

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true,
})

// Too Many Requests interceptor
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { t } = useI18n()
    console.log(error)
    if (error.response && error.response.status === 429) {
      console.log('Too Many Requests')
      toast.error(t('errors.tooManyRequests'))
    }

    return Promise.reject(error)
  },
)

export default axios
