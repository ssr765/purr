<script setup lang="ts">
import ConstructionMocha from '@/assets/img/construction-mocha.webp'
import ConstructionLatte from '@/assets/img/construction-latte.webp'

import { ref, watchEffect } from 'vue'

const logo = ref(ConstructionLatte)

const updateLogo = () => {
  const root = document.documentElement
  logo.value = root.classList.contains('dark') ? ConstructionMocha : ConstructionLatte
}

watchEffect(() => {
  const observer = new MutationObserver(updateLogo)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  updateLogo()
  return () => observer.disconnect()
})
</script>

<template>
  <section class="flex flex-col items-center justify-center py-32">
    <img class="w-[300px]" :src="logo" alt="" />
    <h2 class="text-4xl text-center p-2">{{ $t('landing.underConstruction.title') }}</h2>
    <p class="text-center">{{ $t('landing.underConstruction.content') }}</p>
  </section>
</template>
