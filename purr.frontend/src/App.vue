<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useAuthStore } from '@/stores/auth'
import Toaster from '@/components/ui/toast/Toaster.vue'

const authStore = useAuthStore()
</script>

<template>
  <main v-if="authStore.firstLoad" class="min-h-dvh flex items-center justify-center">
    <LoadingSpinner />
  </main>
  <RouterView v-else />
  <Toaster />
</template>
