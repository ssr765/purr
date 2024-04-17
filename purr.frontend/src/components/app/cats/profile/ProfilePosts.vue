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
  <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2">
    <div v-for="post in cat.posts" :key="post.id">
      <img :src="post.url" class="profile-post" alt="" />
    </div>
  </div>
</template>
