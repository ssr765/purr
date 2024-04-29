<script setup lang="ts">
import LightLogo from '@/assets/img/logo/black.webp'
import DarkLogo from '@/assets/img/logo/white.webp'

const root = document.getElementsByTagName('html')[0]
const logo = root.classList.contains('dark') ? DarkLogo : LightLogo
</script>

<template>
  <img :src="logo" alt="purr. Logo" />
</template>
