<script setup lang="ts">
import { useCreatePostStore } from '@/stores/createPost'
import { useAuthStore } from '@/stores/auth'
import { onUnmounted } from 'vue'
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'

const createPostStore = useCreatePostStore()
const authStore = useAuthStore()

const onSubmit = () => {
  createPostStore.createPost()
}

onUnmounted(() => {
  createPostStore.reset()
})
</script>

<template>
  <section class="grid grid-rows-[min-content,1fr] xl:grid-rows-1 xl:grid-cols-2 gap-4 h-app">
    <div class="max-w-screen-sm mx-auto w-full flex items-center justify-center">
      <img class="w-full max-h-app" :src="createPostStore.postMediaPreview!" :alt="createPostStore.post!.file.name" />
    </div>
    <div class="flex-1 p-4">
      <form @submit.prevent="onSubmit" class="flex flex-col max-w-screen-sm mx-auto gap-4 h-full xl:justify-center">
        <div>
          <label for="cat" class="block mb-2 text-sm font-medium text-ctp-text">Qué gato realizará la publicación?</label>
          <select v-model="createPostStore.post!.cat_id" id="cat" class="bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender block w-full p-2.5">
            <option selected>Elige un gato</option>
            <option v-for="cat in authStore.user!.cats" :key="cat.id" :value="cat.id">{{ cat.name }} (@{{ cat.catname }})</option>
          </select>
        </div>
        <div>
          <label for="caption" class="block mb-2 text-sm font-medium text-ctp-text">Descripcion</label>
          <textarea v-model="createPostStore.post!.caption" id="caption" rows="4" class="block p-2.5 w-full text-sm text-ctp-text bg-ctp-mantle rounded-lg border border-ctp-lavender focus:ring-ctp-lavender focus:border-ctp-lavender" placeholder="Write your thoughts here..."></textarea>
        </div>
        <button v-if="!createPostStore.loading" type="submit" class="text-ctp-base bg-ctp-lavender hover:bg-ctp-lavender/60 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Publicar</button>
        <LoadingSpinner v-else class="mx-auto" />
      </form>
    </div>
  </section>
</template>
