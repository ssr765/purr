<script lang="ts" setup>
import { useAsideStore } from '@/stores/aside'

const asideStore = useAsideStore()
asideStore.postDetails(22)
</script>

<template>
  <div class="min-h-dvh flex justify-center items-center">
    <img class="max-h-dvh max-w-screen-md" src="@/assets/cat.webp" alt="" />
  </div>
</template>
