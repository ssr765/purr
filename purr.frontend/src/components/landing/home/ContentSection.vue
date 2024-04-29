<script setup lang="ts">
//
</script>

<template>
  <section class="">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-lg text-ctp-text sm:text-lg">
        <h2 class="mb-4 text-4xl text-ctp-text text-center">{{ $t('landing.home.unique.title') }}</h2>
        <div class="flex items-center gap-8">
          <p class="py-16 mb-4 font-light">{{ $t('landing.home.unique.content.0') }}</p>
          <img class="w-60 h-60 object-cover" src="/img/mockcat.webp" alt="" />
        </div>
        <div class="flex items-center gap-8">
          <img class="w-60 h-60 object-cover" src="/img/mockcat.webp" alt="" />
          <p class="py-16 mb-4 font-light text-end">{{ $t('landing.home.unique.content.1') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
