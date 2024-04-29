<script lang="ts" setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  // GSAP animations.
  const observer = new IntersectionObserver(callback)
  function callback(entries: any, observer: any) {
    if (entries[0].isIntersecting) {
      gsap.from('.testimonials > div', { opacity: 0, duration: 1, y: 50 })
      observer.disconnect()
    }
  }
  observer.observe(document.querySelector('.testimonials')!)
})
</script>

<template>
  <section class="testimonials bg-ctp-mantle">
    <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
      <div class="text-center mx-auto max-w-screen-sm">
        <h2 class="mb-4 text-4xl">{{ $t('landing.home.testimonials.title') }}</h2>
        <p class="mb-8 font-light text-ctp-subtext1 sm:text-xl">{{ $t('landing.home.testimonials.content') }}</p>
      </div>
      <figure class="max-w-screen-md mx-auto">
        <blockquote>
          <p class="text-2xl font-medium italic">{{ $t('landing.home.testimonials.quote') }}</p>
        </blockquote>
        <figcaption class="flex items-center justify-center mt-6 space-x-3">
          <img class="w-6 h-6 rounded-full" src="/public/img/mockcat.webp" alt="profile picture" />
          <div class="flex items-center divide-x-2 divide-ctp-subtext1">
            <div class="pr-3 font-medium">{{ $t('landing.home.testimonials.author.name') }}</div>
            <div class="pl-3 text-sm font-light text-ctp-subtext1">{{ $t('landing.home.testimonials.author.especie') }}</div>
          </div>
        </figcaption>
      </figure>
    </div>
  </section>
</template>
