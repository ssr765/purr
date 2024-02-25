<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- <transition name="fade" mode="out-in"> -->
  <RouterView />
  <!-- </transition> -->
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
