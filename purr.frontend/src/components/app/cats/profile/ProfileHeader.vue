<script setup lang="ts">
import type { Cat } from '@/models/Cat'
import CatPlaceholderAvatar from '@/components/utils/CatPlaceholderAvatar.vue'
import { useFormattedDate } from '@/composables/formattedDate'

const formattedDate = useFormattedDate()

defineProps({
  cat: {
    type: Object as () => Cat,
    required: true,
  },
})
</script>

<template>
  <section class="mb-4">
    <div class="bg-[url('/img/mockcat.webp')] h-48 col-span-2 bg-center bg-cover">
      <div class="h-full bg-gradient-to-b from-transparent via-transparent to-ctp-base"></div>
    </div>
    <div class="bg-cover p-4 -mt-28 lg:-mt-[88px]">
      <div class="w-full max-w-screen-lg mx-auto grid lg:grid-cols-[auto,1fr] items-center gap-2 lg:gap-8">
        <div class="w-48 mx-auto">
          <img v-if="cat.avatar" class="w-full rounded-full" :src="cat.avatar" alt="" />
          <CatPlaceholderAvatar v-else class="w-full" />
        </div>
        <div class="flex flex-col gap-2">
          <div>
            <p class="text-center lg:text-left text-5xl font-medium tracking-tight font-['Rubik'] leading-10">{{ cat.name }}</p>
            <p class="text-center lg:text-left text-xl">@{{ cat.catname }}</p>
          </div>
          <p v-if="cat.biography" class="text-center lg:text-left break-words-plus">{{ cat.biography }}</p>
          <p v-else class="text-center lg:text-left text-ctp-text/75 italic">Sin biografía</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row items-center lg:flex-wrap justify-center lg:space-x-8 p-4 border-y">
      <div class="flex items-center gap-2">
        <span class="icon-[solar--cat-linear]" role="img" aria-hidden="true" />
        <p>{{ cat.breed ?? 'Raza desconocida' }}</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="icon-[solar--cat-linear]" role="img" aria-hidden="true" />
        <p>{{ cat.color ?? 'Color desconocido' }}</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="icon-[solar--cat-linear]" role="img" aria-hidden="true" />
        <p>{{ cat.birthdate ? formattedDate.formatDate(cat.birthdate) : 'Nacimiento desconocido' }}</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="icon-[solar--cat-linear]" role="img" aria-hidden="true" />
        <p>{{ cat.followers }} seguidores</p>
      </div>
    </div>
  </section>
</template>
