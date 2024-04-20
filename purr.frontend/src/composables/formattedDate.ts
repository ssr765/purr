import { parseISO, format } from 'date-fns'
import { es } from 'date-fns/locale'

export function useFormattedDate() {
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString)
    return format(date, "d 'de' MMMM 'de' yyyy", { locale: es })
  }

  return { formatDate }
}
