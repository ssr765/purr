<script lang="ts" setup>
import NewButton from '@/components/app/interface/NewButton.vue'
import NavBar from '@/components/app/interface/NavBar.vue'
</script>

<template>
  <div class="grid grid-cols-12 min-h-dvh fixed w-full">
    <div class="col-span-2 p-8 text-white bg-gray-900">
      <NavBar></NavBar>
    </div>
    <div class="col-span-10 p-8 relative bg-transparent">
      <NewButton />
    </div>
  </div>

  <div class="grid grid-cols-12 min-h-dvh">
    <div class="col-span-2"></div>
    <div class="col-span-10 relative space-y-5">
      <router-view />
    </div>
  </div>
</template>
