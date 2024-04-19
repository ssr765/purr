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
  <section class="mb-4">
    <div class="flex bg-[url('/img/mockcat.webp')] bg-cover h-60 mb-4">
      <div class="h-48 lg:h-60 w-60 lg:pl-20 translate-y-36 lg:translate-y-28 mx-auto lg:m-0">
        <img v-if="cat.avatar" class="w-full" :src="cat.avatar" alt="" />
        <CatPlaceholderAvatar v-else class="w-full" />
      </div>
    </div>
    <div class="mb-4 lg:mb-2 pt-24 lg:p-0 lg:ml-96 min-h-40 flex flex-col justify-center gap-2 lg:mr-10">
      <div>
        <p class="text-center lg:text-left text-5xl">{{ cat.name }}</p>
        <p class="text-center lg:text-left text-xl">@{{ cat.catname }}</p>
      </div>
      <p class="text-center lg:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i</p>
    </div>
    <hr class="h-px border-ctp-lavender" />
    <div class="flex flex-col lg:flex-row items-center lg:flex-wrap justify-center lg:space-x-8 p-4">
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
        <p>{{ cat.birthday ?? 'Nacimiento desconocido' }}</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="icon-[solar--cat-linear]" role="img" aria-hidden="true" />
        <p>{{ cat.deathdate ?? 'El gato todavía no ha muerto' }}</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="icon-[solar--cat-linear]" role="img" aria-hidden="true" />
        <p>{{ cat.followers }} seguidores</p>
      </div>
    </div>
    <hr class="h-px border-ctp-lavender" />
  </section>
  <!-- <div class="flex px-20 bg-[url('/img/mockcat.webp')] bg-cover h-60">
    <CatPlaceholderAvatar class="h-60 translate-y-28" />
  </div>

  <div class="flex justify-center p-10 ml-80 mb-10">
    <div class="flex-1">
      <p class="text-5xl">{{ cat.name }}</p>
      <p class="text-xl">@{{ cat.catname }}</p>
    </div>

    <div>

    </div>
  </div> -->
</template>
