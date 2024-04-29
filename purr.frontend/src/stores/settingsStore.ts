import { computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useAuthStore } from './authStore'

export const useSettingsStore = defineStore('settings', () => {
  const { user } = storeToRefs(useAuthStore())

  const settings = computed(() => user.value?.settings ?? null)
  const settingsLoaded = computed(() => settings.value !== null)

  return {
    settings,
    settingsLoaded,
  }
})
