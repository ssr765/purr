import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'

export function useShareManager(url: string) {
  const { t } = useI18n()
  const encodedUrl = encodeURIComponent(url)

  const whatsappShare = () => {
    const a = document.createElement('a')
    a.target = '_blank'
    a.href = 'https://wa.me/?text=' + encodedUrl
    a.click()
    a.remove()
  }

  const twitterShare = () => {
    const a = document.createElement('a')
    a.target = '_blank'
    a.href = 'https://twitter.com/intent/tweet?url=' + encodedUrl
    a.click()
    a.remove()
  }

  const telegramShare = () => {
    const a = document.createElement('a')
    a.target = '_blank'
    a.href = 'https://t.me/share/url?url=' + encodedUrl
    a.click()
    a.remove()
  }

  const copyLink = () => {
    navigator.clipboard.writeText(url)
    toast.success(t('app.utils.share.copiedLink'))
  }

  return {
    whatsappShare,
    twitterShare,
    telegramShare,
    copyLink,
  }
}
