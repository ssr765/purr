import Axios from 'axios'

export interface errorData {
  message: string
  errors?: Record<string, string[]>
}

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true,
  withXSRFToken: true
})

export default axios
