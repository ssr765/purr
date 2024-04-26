<script setup lang="ts">
import PurrButton from '@/components/utils/PurrButton.vue'

//
</script>

<template>
  <section class="bg-ctp-lavender">
    <div class="py-8 px-4 mx-auto max-w-screen-xl w-full sm:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-md w-full text-center">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-ctp-base">{{ $t('landing.home.cta.title') }}</h2>
        <p class="mb-6 font-light text-ctp-base md:text-lg">{{ $t('landing.home.cta.content') }}</p>
        <RouterLink class="flex justify-center" :to="{ name: 'app' }">
          <PurrButton class="border-2 border-ctp-base">
            {{ $t('landing.home.cta.cta') }}
          </PurrButton>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
