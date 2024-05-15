import { toast } from 'vue-sonner'

export function useImageChecker() {
  const checkFile = (file: File) => {
    // Check the file size.
    if (file.size > 1024 * 1024 * 8) {
      toast.error('La imagen no puede ser mayor a 8MB')
      return false
    }

    // Check the file type.
    if (!['image/webp', 'image/jpeg', 'image/png'].includes(file.type)) {
      toast.error('Formato de imagen no soportado')
      return false
    }

    return true
  }

  return {
    checkFile,
  }
}
