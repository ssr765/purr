<script setup lang="ts">
import PurrButton from '@/components/utils/PurrButton.vue'

//
</script>

<template>
  <section class="bg-ctp-lavender">
    <div class="py-8 px-4 mx-auto max-w-screen-xl w-full sm:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-md w-full text-center">
        <h2 class="mb-4 text-4xl dark:font-bold leading-tight text-ctp-base">{{ $t('landing.home.cta.title') }}</h2>
        <p class="mb-6 font-light text-ctp-base md:text-lg">{{ $t('landing.home.cta.content') }}</p>
        <div class="flex items-center justify-center">
          <RouterLink :to="{ name: 'app' }">
            <PurrButton class="border-2 border-white dark:border-ctp-crust">
              {{ $t('landing.home.cta.cta') }}
            </PurrButton>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
