<script setup lang="ts">
import NotFoundMocha from '@/assets/img/notfound-mocha.webp'
import NotFoundLatte from '@/assets/img/notfound-latte.webp'

import { ref, watchEffect } from 'vue'

const logo = ref(NotFoundLatte)

const updateLogo = () => {
  const root = document.documentElement
  logo.value = root.classList.contains('dark') ? NotFoundMocha : NotFoundLatte
}

watchEffect(() => {
  const observer = new MutationObserver(updateLogo)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  updateLogo()
  return () => observer.disconnect()
})
</script>

<template>
  <section class="flex flex-col items-center justify-center h-app">
    <img class="w-[300px]" :src="logo" alt="" />
    <h2 class="select-none text-4xl text-center p-2">{{ $t('app.cats.profile.notFound.title') }}</h2>
    <p class="text-center">{{ $t('app.cats.profile.notFound.content') }}</p>
  </section>
</template>
