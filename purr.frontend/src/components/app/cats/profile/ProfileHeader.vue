<script setup lang="ts">
import type { Cat } from '@/models/Cat'
import CatPlaceholderAvatar from '@/components/utils/CatPlaceholderAvatar.vue'

defineProps({
  cat: {
    type: Object as () => Cat,
    required: true,
  },
})
</script>

<template>
  <div class="flex px-20 bg-[url('/img/mockcat.webp')] bg-cover h-60">
    <CatPlaceholderAvatar class="h-60 translate-y-28" />
  </div>

  <div class="flex justify-center p-10 ml-80 mb-10">
    <div class="flex-1">
      <p class="text-5xl">{{ cat.name }}</p>
      <p class="text-xl">@{{ cat.catname }}</p>
    </div>

    <div>
      <p>{{ cat.breed ?? 'Raza desconocida' }}</p>
      <p>{{ cat.color ?? 'Color desconocido' }}</p>
      <p>{{ cat.biography ?? 'Sin biografia' }}</p>
      <p>{{ cat.birthday ?? 'Nacimiento desconocido' }}</p>
      <p>{{ cat.deathdate }}</p>
      <p>{{ cat.followers }} seguidores</p>
    </div>
  </div>
</template>
