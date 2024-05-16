<script setup lang="ts">
import pfpLatte from '@/assets/img/pfp/latte.webp'
import pfpMocha from '@/assets/img/pfp/mocha.webp'
</script>
<template>
  <div>
    <img :src="pfpLatte" class="dark:hidden rounded-full w-full h-full" :alt="$t('app.utils.catAvatar.alt')" />
    <img :src="pfpMocha" class="hidden dark:block rounded-full w-full h-full" :alt="$t('app.utils.catAvatar.alt')" />
  </div>
</template>
