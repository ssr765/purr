<script setup lang="ts">
import gsap from 'gsap'
import { ref } from 'vue'
import imgNoKittens from '@/assets/img/easter-egg-no-kittens.png'
import PurrButton from '@/components/utils/PurrButton.vue'

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
  <div id="no-kittens-wrapper" class="select-none hidden *:pointer-events-none absolute top-0 left-0 min-h-dvh w-full overflow-hidden z-[20000]">
    <div id="no-kittens" class="opacity-0 absolute-center">
      <img class="w-full" :src="imgNoKittens" alt="" />
    </div>
  </div>
  <section class="flex flex-col items-center justify-center h-app mx-auto max-w-screen-md w-full">
    <h2 @click="triggerEasterEgg" class="easter-egg-no-kittens select-none text-4xl text-center p-2 lg:p-4">{{ $t('app.posts.create.noKittens.title') }}</h2>
    <p class="text-center">{{ $t('app.posts.create.noKittens.content.0') }}</p>
    <p class="text-center">{{ $t('app.posts.create.noKittens.content.1') }}</p>
    <RouterLink :to="{ name: 'app-cats-create' }">
      <PurrButton class="mt-4">{{ $t('app.posts.create.noKittens.button') }}</PurrButton>
    </RouterLink>
  </section>
</template>
