<script lang="ts" setup>
import gsap from 'gsap'

onMounted(() => {
  // GSAP animations.
  const observer = new IntersectionObserver(callback)
  function callback(entries, observer) {
    if (entries[0].isIntersecting) {
      const features = document.querySelectorAll('.landing-home-features-feature')

      features.forEach((feature, index) => {
        gsap.from(feature, { opacity: 0, duration: 1, y: 50, delay: index * 0.15 })
      })

      observer.disconnect()
    }
  }
  observer.observe(document.querySelector('.landing-home-features'))
})
</script>

<template>
  <section class="landing-home-features">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
        <div class="col-span-2 sm:col-span-1 md:col-span-2 h-auto md:h-full flex flex-col">
          <a href="" class="landing-home-features-feature group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
            <img src="/public/img/mockcat.webp" alt="" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
            <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
            <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Feature 1</h3>
          </a>
        </div>
        <div class="col-span-2 sm:col-span-1 md:col-span-2">
          <a href="" class="landing-home-features-feature group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4">
            <img src="/public/img/mockcat.webp" alt="" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
            <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
            <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Feature 2</h3>
          </a>
          <div class="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
            <a href="" class="landing-home-features-feature group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
              <img src="/public/img/mockcat.webp" alt="" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
              <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
              <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Feature 3</h3>
            </a>
            <a href="" class="landing-home-features-feature group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
              <img src="/public/img/mockcat.webp" alt="" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
              <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
              <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Feature 4</h3>
            </a>
          </div>
        </div>
        <div class="col-span-2 sm:col-span-2 md:col-span-1 h-auto md:h-full flex flex-col">
          <a href="" class="landing-home-features-feature group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
            <img src="/public/img/mockcat.webp" alt="" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
            <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
            <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Feature 5</h3>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
