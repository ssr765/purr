<script setup lang="ts">
import Adoption2 from '@/assets/img/landing/home/concept/adoption2.webp'
import Vet from '@/assets/img/landing/home/concept/vet.webp'
</script>

<template>
  <section class="">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-lg text-ctp-text sm:text-lg">
        <h2 class="mb-4 text-4xl text-ctp-text text-center">{{ $t('landing.home.unique.title') }}</h2>
        <div class="flex flex-col lg:flex-row items-center gap-2 lg:gap-8">
          <p class="mb-4 font-light">{{ $t('landing.home.unique.content.0') }}</p>
          <img class="w-60 h-60 object-cover rounded-xl" :src="Adoption2" />
        </div>
        <hr class="h-px border border-ctp-text dark:border-ctp-lavender my-10" />
        <div class="flex flex-col-reverse lg:flex-row items-center gap-2 lg:gap-8">
          <img class="w-60 h-60 object-cover rounded-xl" :src="Vet" />
          <p class="mb-4 font-light text-end">{{ $t('landing.home.unique.content.1') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
