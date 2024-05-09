<script setup lang="ts">
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'
import { useCatStore } from '@/stores/catStore'
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import CatNotFound from '@/components/app/cats/profile/CatNotFound.vue'
import ProfileHeader from '@/components/app/cats/profile/ProfileHeader.vue'
import ProfilePosts from '@/components/app/cats/profile/ProfilePosts.vue'

import Logo from '@/assets/img/logo/black.webp'
import { useHead, useSeoMeta } from 'unhead'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

const { t } = useI18n()

useHead({
  meta: [
    {
      name: 'robots',
      content: 'noarchive',
    },
  ],
})

const catStore = useCatStore()
const { cat } = storeToRefs(catStore)
const route = useRoute()

onMounted(async () => {
  if (!cat.value) {
    await catStore.fetchCatByCatname(route.params.catname as string)
  }

  if (cat.value) {
    const title = `${cat.value.name} (@${cat.value.catname})`
    const description = cat.value.biography ? `${cat.value.biography} - ${cat.value.followers_count} followers` : `${cat.value.followers_count} followers`
    useSeoMeta({
      title: `${title} | purr.`,
      ogTitle: title,
      description: description,
      ogDescription: description,
      ogImage: cat.value.avatar ?? Logo,
    })
  } else {
    useSeoMeta({
      title: `${t('app.cats.profile.metadata.notFound')} | purr.`,
      ogTitle: 'purr.',
      ogImage: Logo,
    })
  }
})

onUnmounted(() => {
  catStore.clear()
})
</script>

<template>
  <LoadingSpinner v-if="catStore.loading" class="text-6xl h-app flex items-center justify-center w-full" />
  <CatNotFound v-else-if="!cat" />
  <section v-else>
    <ProfileHeader :cat="cat" />
    <ProfilePosts :cat="cat" />
  </section>
</template>
