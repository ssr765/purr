<script setup lang="ts">
import gsap from 'gsap'
import { onMounted } from 'vue'

onMounted(() => {
  var tl = gsap.timeline({ repeat: -1 })
  tl.to('#landing-hero', 300, {
    backgroundPosition: '-8000px 0px',
    ease: 'linear'
  })
})
</script>

<template>
  <section id="landing-hero" class="bg-[url('/img/grid.webp')] h-[50dvh] min-h-[300px] lg:h-[calc(100dvh-60px)] lg:min-h-[750px]">
    <div class="w-full h-full bg-gradient-to-b from-ctp-base/50 via-ctp-base via-95% to-ctp-base flex items-center justify-center">
      <div class="max-w-screen-xl m-auto">
        <h1 class="text-black/80 dark:text-ctp-text text-6xl font-hero uppercase tracking-tighter font-extrabold text-center">{{ $t('landing.home.hero') }}</h1>
      </div>
    </div>
  </section>
</template>

<style scoped>
h1 {
  font-size: 200px;
  line-height: 0.85;
}

@media screen and (max-width: 1360px) {
  h1 {
    font-size: 150px;
  }
}

@media screen and (max-width: 1024px) {
  h1 {
    font-size: 100px;
  }
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 50px;
  }
}
</style>
