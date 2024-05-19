<script lang="ts" setup>
import Adoption from '@/assets/img/landing/home/features/adoption.webp'
import Analysis from '@/assets/img/landing/home/features/analysis.webp'
import Maps from '@/assets/img/landing/home/features/maps.webp'
import MeetLovers from '@/assets/img/landing/home/features/meet-lovers.webp'
import CatContent from '@/assets/img/landing/home/features/cat-content.webp'

import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  // GSAP animations.
  const observer = new IntersectionObserver(callback)
  function callback(entries: any, observer: any) {
    if (entries[0].isIntersecting) {
      const features = document.querySelectorAll('.landing-home-features-feature')

      features.forEach((feature, index) => {
        gsap.from(feature, { opacity: 0, duration: 1, y: 50, delay: index * 0.15 })
      })

      observer.disconnect()
    }
  }
  observer.observe(document.querySelector('.landing-home-features')!)
})
</script>

<template>
  <section class="landing-home-features">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
        <div class="col-span-2 sm:col-span-1 md:col-span-2 h-auto md:h-full flex flex-col">
          <div class="landing-home-features-feature group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
            <img :src="Analysis" alt="" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
            <div class="absolute inset-0 bg-gradient-to-b to-ctp-lavender/75 via-black/20 from-black/40"></div>
            <h3 class="z-10 text-2xl font-medium text-white !leading-none drop-shadow-xl absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">{{ $t('landing.home.features.analysis') }}</h3>
          </div>
        </div>
        <div class="col-span-2 sm:col-span-1 md:col-span-2">
          <RouterLink :to="{ name: 'app-maps' }" class="landing-home-features-feature group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4">
            <img :src="Maps" alt="" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
            <div class="absolute inset-0 bg-gradient-to-b to-ctp-lavender/75 via-black/20 from-black/40"></div>
            <h3 class="z-10 text-2xl font-medium text-white !leading-none drop-shadow-xl absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">{{ $t('landing.home.features.maps') }}</h3>
          </RouterLink>
          <div class="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
            <div class="landing-home-features-feature group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
              <img :src="Adoption" alt="" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
              <div class="absolute inset-0 bg-gradient-to-b to-ctp-lavender/75 via-black/20 from-black/40"></div>
              <h3 class="z-10 text-2xl font-medium text-white !leading-none drop-shadow-xl absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">{{ $t('landing.home.features.adoption') }}</h3>
            </div>
            <div class="landing-home-features-feature group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
              <img :src="CatContent" alt="" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
              <div class="absolute inset-0 bg-gradient-to-b to-ctp-lavender/75 via-black/20 from-black/40"></div>
              <h3 class="z-10 text-2xl font-medium text-white !leading-none drop-shadow-xl absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">{{ $t('landing.home.features.catContent') }}</h3>
            </div>
          </div>
        </div>
        <div class="col-span-2 sm:col-span-2 md:col-span-1 h-auto md:h-full flex flex-col">
          <div class="landing-home-features-feature group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
            <img :src="MeetLovers" alt="" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
            <div class="absolute inset-0 bg-gradient-to-b to-ctp-lavender/75 via-black/20 from-black/40"></div>
            <h3 class="z-10 text-2xl font-medium text-white !leading-none drop-shadow-xl absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">{{ $t('landing.home.features.meetLovers') }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
