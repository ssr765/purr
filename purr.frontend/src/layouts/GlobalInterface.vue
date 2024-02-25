<script lang="ts" setup>
import NewButton from '@/components/app/interface/NewButton.vue'
import NavBar from '@/components/app/interface/NavBar.vue'
import AsideTabs from '@/components/app/interface/AsideTabs.vue'
</script>

<template>
  <div class="grid grid-cols-12 min-h-dvh fixed w-full">
    <div class="col-span-2 p-8 text-white bg-gray-900">
      <NavBar></NavBar>
    </div>
    <div class="col-span-6 p-8 relative bg-transparent">
      <NewButton />
    </div>
    <div class="col-span-4 p-8 self-start h-dvh">
      <div class="border min-h-full shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-lg">
        <AsideTabs />
      </div>
    </div>
  </div>

  <div class="grid grid-cols-12 min-h-dvh">
    <div class="col-span-2"></div>
    <div class="col-span-6 relative space-y-5">
      <router-view />
    </div>
  </div>
</template>
