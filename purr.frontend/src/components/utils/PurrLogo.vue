<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import LightLogo from '@/assets/img/logo/black.webp'
import DarkLogo from '@/assets/img/logo/white.webp'

const logo = ref(LightLogo)

const updateLogo = () => {
  const root = document.documentElement
  logo.value = root.classList.contains('dark') ? DarkLogo : LightLogo
}

watchEffect(() => {
  const observer = new MutationObserver(updateLogo)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  updateLogo()
  return () => observer.disconnect()
})
</script>

<template>
  <img :src="logo" alt="purr. Logo" />
</template>
