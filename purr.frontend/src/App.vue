<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'
import { useAuthStore } from '@/stores/authStore'
import { Toaster } from '@/components/ui/sonner'
import { useDarkMode } from './composables/darkMode'
import { useSettingsStore } from './stores/settingsStore'
import { useCookieStore } from './stores/cookieStore'
import GdprConsent from './components/utils/GdprConsent.vue'

const authStore = useAuthStore()
const { darkModeListener } = useDarkMode()
// Load user settings. DO NOT REMOVE!!
useSettingsStore()
const cookieStore = useCookieStore()

darkModeListener()
</script>

<template>
  <main v-if="authStore.firstLoad" class="min-h-dvh flex items-center justify-center">
    <LoadingSpinner class="text-6xl" />
  </main>
  <RouterView v-else />
  <Toaster />
  <GdprConsent v-if="cookieStore.bannerShouldShow" />
</template>
