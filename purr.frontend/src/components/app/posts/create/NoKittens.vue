<script setup lang="ts">
import gsap from 'gsap'
import { ref } from 'vue'
import imgNoKittens from '@/assets/img/easter-egg-no-kittens.png'

const easterEggClicks = ref(0)

const triggerEasterEgg = () => {
  const title = document.querySelector('.easter-egg-no-kittens')
  if (!title) return

  easterEggClicks.value += 1
  const tl = gsap.timeline()

  tl.to(title, { duration: 0.1, rotation: 5 })
  tl.to(title, { duration: 0.1, rotation: -5 })
  tl.to(title, { duration: 0.1, rotation: 5 })
  tl.to(title, { duration: 0.1, rotation: -5 })
  tl.to(title, { duration: 0.1, rotation: 0 })

  if (easterEggClicks.value % 3 == 0) {
    const noKittensWrapper = document.querySelector('#no-kittens-wrapper')
    const noKittens = document.querySelector('#no-kittens')
    if (!noKittens) return

    const tl2 = gsap.timeline()

    tl2.to(noKittensWrapper, { duration: 0, display: 'block' })
    tl2.to(noKittens, { duration: 0.75, opacity: 1, scale: 2, ease: 'linear' })
    tl2.to(noKittens, { duration: 0.75, opacity: 0, scale: 3, ease: 'linear' })
    tl2.to(noKittensWrapper, { duration: 0, display: 'none' })
    tl2.to(noKittens, { duration: 0, scale: 1, ease: 'linear' })
  }
}
</script>

<template>
  <div id="no-kittens-wrapper" class="select-none hidden *:pointer-events-none absolute top-0 left-0 min-h-dvh w-full overflow-hidden z-50">
    <div id="no-kittens" class="opacity-0 absolute-center">
      <img class="w-full" :src="imgNoKittens" alt="" />
    </div>
  </div>
  <section class="flex flex-col items-center justify-center h-app">
    <div @click="triggerEasterEgg" class="easter-egg-no-kittens select-none text-center text-5xl mb-4 tracking-tight font-bold">{{ $t('app.create.noKittens.title') }}</div>
    <div class="text-center mb-2">{{ $t('app.create.noKittens.content.0') }}</div>
    <div class="text-center mb-2">{{ $t('app.create.noKittens.content.1') }}</div>
    <button type="button" class="mt-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">{{ $t('app.create.noKittens.button') }}</button>
  </section>
</template>
