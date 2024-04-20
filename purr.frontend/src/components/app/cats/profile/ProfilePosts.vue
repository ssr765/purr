<script setup lang="ts">
import type { Cat } from '@/models/Cat'
import { onMounted } from 'vue'
import gsap from 'gsap'

defineProps({
  cat: {
    type: Object as () => Cat,
    required: true,
  },
})

onMounted(() => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      console.log(entry.target)
      if (entry.isIntersecting) {
        // Aplicar la animación GSAP cuando la imagen entra en el viewport
        gsap.from(entry.target, { opacity: 0, duration: 1, y: 50 })

        // Desconectar el observador de la imagen actual para no repetir la animación
        observer.unobserve(entry.target)
      }
    })
  })

  const imgs = document.querySelectorAll('.profile-post')
  imgs.forEach((img) => {
    observer.observe(img)
  })
})
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 px-4 pb-4">
    <div v-for="post in cat.posts" :key="post.id" class="mx-auto relative">
      <img :src="post.url" class="profile-post object-cover aspect-square w-full xl:max-w-[20dvw]" alt="" />
      <div class="overlay bg-ctp-crust bg-opacity-50 w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100 transition-all z-50">
        <div class="flex justify-center items-center gap-4 h-full">
          <span class="p-2 flex flex-col justify-center gap-0.5">
            <font-awesome-icon icon="fa-solid fa-heart" />
            <div class="font-semibold text-center">0</div>
          </span>

          <span class="p-2 flex flex-col justify-center gap-0.5">
            <font-awesome-icon icon="fa-solid fa-comment" />
            <div class="font-semibold text-center">0</div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
