<script setup lang="ts">
import { useCreatePostStore } from '@/stores/createPost'
import MediaInput from '@/components/app/create/MediaInput.vue'
import MediaDashboard from '@/components/app/create/MediaDashboard.vue'

const createPostStore = useCreatePostStore()
</script>

<template>
  <MediaInput v-if="!createPostStore.post" />
  <MediaDashboard v-else />
</template>
