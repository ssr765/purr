<script setup lang="ts">
import { useCookieStore } from '@/stores/cookieStore'
import PurrButton from './PurrButton.vue'
import RegularButton from './RegularButton.vue'

const cookieStore = useCookieStore()
</script>

<template>
  <section class="fixed p-4 md:rounded-lg md:shadow-lg bg-ctp-crust outline-ctp-lavender outline outline-1 z-[500] space-y-4 bottom-0 md:bottom-4 md:left-4 md:max-w-lg">
    <div>{{ $t('cookieBanner.message') }}</div>
    <div class="flex gap-4 justify-end">
      <PurrButton @click="cookieStore.consent">
        <span>{{ $t('cookieBanner.accept') }}</span>
      </PurrButton>
      <RegularButton @click="cookieStore.reject">
        <span>{{ $t('cookieBanner.reject') }}</span>
      </RegularButton>
    </div>
  </section>
</template>
