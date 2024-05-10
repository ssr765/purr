<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'
import { useAuthStore } from '@/stores/authStore'
import { Toaster } from '@/components/ui/sonner'
import { useDarkMode } from './composables/darkMode'

const authStore = useAuthStore()
const { darkModeListener } = useDarkMode()

darkModeListener()
</script>

<template>
  <main v-if="authStore.firstLoad" class="min-h-dvh flex items-center justify-center">
    <LoadingSpinner class="text-6xl" />
  </main>
  <RouterView v-else />
  <Toaster />
</template>
