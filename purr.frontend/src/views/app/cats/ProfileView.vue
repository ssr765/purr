<script setup lang="ts">
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'
import { useCatStore } from '@/stores/cat'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CatNotFound from '@/components/app/cats/profile/CatNotFound.vue'
import ProfileHeader from '@/components/app/cats/profile/ProfileHeader.vue'
import ProfilePosts from '@/components/app/cats/profile/ProfilePosts.vue'

const catStore = useCatStore()
const route = useRoute()

onMounted(async () => {
  await catStore.fetchCat(Number(route.params.id))
})
</script>

<template>
  <LoadingSpinner v-if="catStore.loading" class="h-app flex items-center justify-center w-full" />
  <CatNotFound v-else-if="!catStore.cat" />
  <section v-else>
    <ProfileHeader :cat="catStore.cat" />
    <ProfilePosts :cat="catStore.cat" />
  </section>
</template>
