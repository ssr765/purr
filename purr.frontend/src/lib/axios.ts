import Axios from 'axios'
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
    if (error.response && error.response.status === 429) {
      console.log('Too Many Requests')
    }

    return Promise.reject(error)
  },
)

export default axios
