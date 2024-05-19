<script setup lang="ts">
import PageNotFoundMocha from '@/assets/img/pagenotfound-mocha.webp'
import PageNotFoundLatte from '@/assets/img/pagenotfound-latte.webp'

import { ref, watchEffect } from 'vue'

const logo = ref(PageNotFoundLatte)

const updateLogo = () => {
  const root = document.documentElement
  logo.value = root.classList.contains('dark') ? PageNotFoundMocha : PageNotFoundLatte
}

watchEffect(() => {
  const observer = new MutationObserver(updateLogo)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  updateLogo()
  return () => observer.disconnect()
})
</script>

<template>
  <section class="flex flex-col items-center justify-center">
    <img class="w-[300px]" :src="logo" alt="" />
    <h2 class="select-none text-4xl text-center p-2">{{ $t('pageNotFound.title') }}</h2>
    <p class="text-center">{{ $t('pageNotFound.content') }}</p>
  </section>
</template>
