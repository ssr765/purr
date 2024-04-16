<script setup lang="ts">
import { useCreatePostStore } from '@/stores/createPost'
import { useAuthStore } from '@/stores/auth'
import MediaInput from '@/components/app/create/MediaInput.vue'
import MediaDashboard from '@/components/app/create/MediaDashboard.vue'
import NoKittens from '@/components/app/create/NoKittens.vue'

const createPostStore = useCreatePostStore()
const authStore = useAuthStore()
</script>

<template>
  <div v-if="!!authStore.user!.cats">
    <NoKittens />
  </div>
  <div v-else>
    <MediaInput v-if="!createPostStore.post" />
    <MediaDashboard v-else />
  </div>
</template>
