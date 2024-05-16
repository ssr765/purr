import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'

export function useImageChecker() {
  const { t } = useI18n()
  const checkFile = (file: File) => {
    // Check the file size.
    if (file.size > 1024 * 1024 * 8) {
      toast.error(t('app.utils.imageChecker.fileSizeError', { mb: 8 }))
      return false
    }

    // Check the file type.
    if (!['image/webp', 'image/jpeg', 'image/png'].includes(file.type)) {
      toast.error(
        t('app.utils.imageChecker.fileTypeError', {
          formats: 'webp, jpeg, png',
        }),
      )
      return false
    }

    return true
  }

  return {
    checkFile,
  }
}
