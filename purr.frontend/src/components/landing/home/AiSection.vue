<script setup lang="ts">
import PurrButton from '@/components/utils/PurrButton.vue'
</script>

<template>
  <section class="min-h-[500px] bg-[url('/img/ai_wpp.webp')] bg-cover bg-center">
    <div class="bg-gradient-to-b from-ctp-base via-ctp-base/75 to-transparent h-[500px] *:text-center">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="max-w-screen-lg m-auto sm:text-lg text-ctp-text">
          <h2 class="mb-4 text-4xl">
            {{ $t('landing.home.ai.title') }}
          </h2>
          <p class="mb-4 font-light">{{ $t('landing.home.ai.content.0') }}</p>
          <p class="mb-4 font-medium">{{ $t('landing.home.ai.content.1') }}</p>

          <div class="flex justify-center">
            <PurrButton>{{ $t('landing.home.ai.button') }}</PurrButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
