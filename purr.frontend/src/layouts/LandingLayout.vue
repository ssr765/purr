<script setup lang="ts">
import LandingHeader from '@/components/landing/layout/LandingHeader.vue'
import LandingFooter from '@/components/landing/layout/LandingFooter.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <LandingHeader class="sticky top-0 z-50" />
  <main class="relative -mt-[60px] pt-[60px] bg-ctp-base">
    <RouterView />
  </main>
  <LandingFooter />
</template>
