<script setup lang="ts">
import { useCreatePostStore } from '@/stores/createPostStore'
import { useAuthStore } from '@/stores/authStore'
import MediaInput from '@/components/app/posts/create/MediaInput.vue'
import MediaDashboard from '@/components/app/posts/create/MediaDashboard.vue'
import NoKittens from '@/components/app/posts/create/NoKittens.vue'

import Logo from '@/assets/img/logo/black.webp'
import { useHead, useSeoMeta } from 'unhead'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  meta: [
    {
      name: 'robots',
      content: 'noindex',
    },
  ],
})

useSeoMeta({
  title: `${t('app.posts.create.metadata.title')} | purr.`,
  ogTitle: 'Create a New Post on purr',
  description: "Post your cat's latest adventures and share them with a global community of cat lovers. Easy uploading and instant sharing!",
  ogDescription: 'Upload new cat content to purr. and connect with cat enthusiasts everywhere. Share moments, stories, and the joy of your cat.',
  ogImage: Logo,
})

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
