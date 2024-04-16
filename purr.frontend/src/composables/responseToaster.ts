import { toast } from '@/components/ui/toast'
import type { errorData } from '@/lib/axios'
import type { AxiosError } from 'axios'
import { useI18n } from 'vue-i18n'

export function useResponseToaster() {
  const removeDots = (text: string) => text.replace(/\./g, '')
  const { t } = useI18n()

  const toastResponse = (error: AxiosError) => {
    if (error.response) {
      const data = error.response?.data as errorData
      toast({
        title: t(`response.${removeDots(data.message)}`),
      })
    }
  }

  return { toastResponse }
}
