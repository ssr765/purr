import axios from '@/lib/axios'

export const useSettingsService = () => {
  const changeLanguage = async (language: string) => {
    try {
      await axios.post('/api/v1/user/settings', { language })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    changeLanguage,
  }
}
