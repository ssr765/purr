<script setup lang="ts">
import LoginSide from '@/components/auth/LoginSide.vue'
import RegisterSide from '@/components/auth/RegisterSide.vue'

defineProps({
  mode: String,
})
</script>

<template>
  <div class="overflow-hidden h-dvh">
    <section class="grid grid-cols-2 w-[200%] lg:grid-cols-4 2xl:grid-cols-5 lg:w-[133.33%] 2xl:w-[125%] transition-transform duration-1000" :class="{ '-translate-x-1/2 lg:-translate-x-1/4 2xl:-translate-x-[20%]': mode === 'register' }">
      <LoginSide />
      <div class="hidden lg:block lg:col-span-2 2xl:col-span-3 rounded-xl overflow-hidden max-h-dvh">
        <img class="w-full h-full object-cover" src="/img/mockcat.webp" alt="" />
      </div>
      <RegisterSide />
    </section>
  </div>
</template>
