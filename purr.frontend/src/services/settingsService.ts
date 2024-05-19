import axios from '@/lib/axios'

export const useSettingsService = () => {
  const changeLanguage = async (language: string) => {
    await axios.post('/api/v1/user/settings', { language })
  }

  return {
    changeLanguage,
  }
}
