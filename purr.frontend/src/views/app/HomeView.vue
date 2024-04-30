<script setup lang="ts">
import PostsFeed from '@/components/app/home/PostsFeed.vue'

import Logo from '@/assets/img/logo/black.webp'
import { useSeoMeta } from 'unhead'

useSeoMeta({
  title: 'purr.',
  ogTitle: 'purr. - The Social Network for Your Cats',
  description: "Dive into purr. and explore a world of cat posts, connect with cat lovers, and share your cat's daily adventures on our unique platform.",
  ogDescription: 'Enter the vibrant community of purr., where you can view, post, and interact with cat lovers globally. Experience the joy of cat-centric social media.',
  ogImage: Logo,
})
</script>

<template>
  <PostsFeed />
</template>
