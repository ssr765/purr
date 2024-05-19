import { toast } from 'vue-sonner'
import type { errorData } from '@/lib/axios'
import type { AxiosError } from 'axios'

export function useResponseToaster() {
  const removeDots = (text: string) => text.replace(/\./g, '')

  const toastResponse = (error: AxiosError) => {
    if (error.response) {
      const data = error.response?.data as errorData
      toast(removeDots(data.message))
    }
  }

  return { toastResponse }
}
