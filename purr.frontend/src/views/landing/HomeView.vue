<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center justify-center dark:bg-gray-900 dark:text-white">
    <div class="text-5xl font-raleway font-extralight animate-fade-up animate-delay-1000 leading-3">La red social hecha por gatos</div>
    <div class="text-9xl font-raleway font-extralight bg-gradient-to-br from-purple-500 to-pink-500 inline-block text-transparent bg-clip-text animate-fade-up">purr.</div>
    <div class="mt-6 animate-fade-up animate-delay-1000">
      <RouterLink to="/app">
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 space-x-2">
            <span>Empezar</span>
            <font-awesome-icon icon="fa-solid fa-paw" />
          </span>
        </button>
      </RouterLink>

      <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Saber más</button>
    </div>

    <div class="absolute bottom-10 -translate-x-1/2 flex flex-col gap-1 animate-fade-down text-xl animate-delay-1000 dark:text-white">
      <font-awesome-icon icon="fa-solid fa-arrow-down-long" />
    </div>
  </main>
</template>

<style></style>
