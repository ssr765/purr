<script lang="ts" setup>
import PostsFeed from '@/components/app/home/PostsFeed.vue'

import { useAsideStore } from '@/stores/aside'

const asideStore = useAsideStore()
asideStore.content = {}
</script>

<template>
  <PostsFeed />
</template>
