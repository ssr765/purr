<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useCatStore } from '@/stores/cat'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CatPlaceholderAvatar from '@/components/CatPlaceholderAvatar.vue'
import gsap from 'gsap'

const notFound = ref(false)
const catStore = useCatStore()
const route = useRoute()

onMounted(async () => {
  await catStore.fetchCat(Number(route.params.id))
  if (!catStore.cat) {
    notFound.value = true
  }

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
  <LoadingSpinner v-if="catStore.loading" class="h-app flex items-center justify-center w-full" />
  <div v-else>
    <div v-if="notFound">Cat not found</div>
    <div v-else>
      <div class="flex px-20 bg-[url('/img/mockcat.webp')] bg-cover h-60">
        <CatPlaceholderAvatar class="h-60 translate-y-28" />
      </div>

      <div class="flex justify-center p-10 ml-80 mb-10">
        <div class="flex-1">
          <p class="text-5xl">{{ catStore.cat?.name }}</p>
          <p class="text-xl">@{{ catStore.cat?.catname }}</p>
        </div>

        <div>
          <p>{{ catStore.cat?.breed ?? 'Raza desconocida' }}</p>
          <p>{{ catStore.cat?.color ?? 'Color desconocido' }}</p>
          <p>{{ catStore.cat?.biography ?? 'Sin biografia' }}</p>
          <p>{{ catStore.cat?.birthday ?? 'Nacimiento desconocido' }}</p>
          <p>{{ catStore.cat?.deathdate }}</p>
          <p>{{ catStore.cat?.followers }} seguidores</p>
        </div>
      </div>
      <!-- <hr class="h-px my-4 border-ctp-lavender" /> -->
      <div class="sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 space-y-4">
        <div v-for="post in catStore.cat?.posts" :key="post.id">
          <img :src="post.url" class="profile-post" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
