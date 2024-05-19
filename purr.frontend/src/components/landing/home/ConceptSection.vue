<script setup lang="ts">
import PurrButton from '@/components/utils/PurrButton.vue'
import Screenshot from '@/assets/img/landing/home/screenshot.webp'
</script>

<template>
  <section>
    <div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
      <div class="mt-4 md:mt-0">
        <h2 class="mb-4 text-4xl">{{ $t('landing.home.concept.title') }}</h2>
        <p class="mb-4 font-light md:text-lg">{{ $t('landing.home.concept.content.0') }}</p>
        <p class="mb-6 md:text-lg">{{ $t('landing.home.concept.content.1') }}</p>
        <RouterLink :to="{ name: 'auth-register' }">
          <PurrButton>{{ $t('landing.home.concept.button') }}</PurrButton>
        </RouterLink>
      </div>
      <img class="mt-6 md:m-0 w-full border border-ctp-lavender shadow-lg rounded-lg hover:scale-110 transition-all duration-500" :src="Screenshot" :alt="$t('landing.home.screenshot.concept.alt')" />
    </div>
  </section>
</template>
