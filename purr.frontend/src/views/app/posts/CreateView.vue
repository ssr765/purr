<script setup lang="ts">
import { useCreatePostStore } from '@/stores/createPostStore'
import { useAuthStore } from '@/stores/authStore'
import MediaInput from '@/components/app/posts/create/MediaInput.vue'
import MediaDashboard from '@/components/app/posts/create/MediaDashboard.vue'
import NoKittens from '@/components/app/posts/create/NoKittens.vue'

const createPostStore = useCreatePostStore()
const authStore = useAuthStore()
</script>

<template>
  <div v-if="authStore.user!.cats === undefined || authStore.user!.cats.length == 0">
    <NoKittens />
  </div>
  <div v-else>
    <MediaInput v-if="!createPostStore.post" />
    <MediaDashboard v-else />
  </div>
</template>
