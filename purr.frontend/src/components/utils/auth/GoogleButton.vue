<script setup lang="ts">
import PurrButton from '@/components/utils/PurrButton.vue'
import GoogleIcon from '@/components/icons/GoogleIcon.vue'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
</script>
<template>
  <a class="block" :href="BACKEND_URL + '/google'">
    <PurrButton class="flex items-center justify-center w-full">
      <GoogleIcon />
      <span>{{ $t('auth.google') }}</span>
    </PurrButton>
  </a>
</template>
