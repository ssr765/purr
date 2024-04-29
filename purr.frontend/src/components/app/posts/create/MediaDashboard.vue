<script setup lang="ts">
import { useCreatePostStore } from '@/stores/createPost'
import { useAuthStore } from '@/stores/authStore'
import { onUnmounted } from 'vue'
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'
import PurrButton from '@/components/utils/PurrButton.vue'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import CatPlaceholderAvatar from '@/components/utils/CatPlaceholderAvatar.vue'

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
  <section class="grid grid-rows-[min-content,1fr] xl:grid-rows-1 xl:grid-cols-2 gap-4 min-h-app">
    <div class="max-w-screen-sm mx-auto w-full flex items-center justify-center">
      <img class="w-full max-h-app" :src="createPostStore.postMediaPreview!" :alt="createPostStore.post!.file.name" />
    </div>
    <div class="flex-1 p-4">
      <form @submit.prevent="onSubmit" class="flex flex-col max-w-screen-sm mx-auto gap-4 h-full xl:justify-center">
        <div>
          <label for="cat" class="block mb-2 text-sm font-medium text-ctp-text">Qué gato realizará la publicación?</label>
          <Select v-model="createPostStore.post!.cat_id">
            <SelectTrigger class="bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-4 py-8">
              <SelectValue placeholder="Selecciona un gato" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="cat in authStore.user!.cats" :key="cat.id" :value="String(cat.id)" class="p-1.5">
                  <div class="flex items-center gap-2">
                    <img v-if="cat.avatar" :src="cat.avatar" alt="" class="size-8 rounded-full" />
                    <CatPlaceholderAvatar v-else class="size-8" />
                    <div>
                      <p class="text-lg leading-4">{{ cat.name }}</p>
                      <p class="text-ctp-text">@{{ cat.catname }}</p>
                    </div>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label for="caption" class="block mb-2 text-sm font-medium text-ctp-text">Descripcion</label>
          <textarea v-model="createPostStore.post!.caption" id="caption" rows="4" class="block p-2.5 w-full text-sm text-ctp-text bg-ctp-mantle rounded-lg border border-ctp-lavender focus:ring-ctp-lavender focus:border-ctp-lavender" placeholder="Write your thoughts here..."></textarea>
        </div>
        <PurrButton v-if="!createPostStore.loading" type="submit" class="mx-auto">Publicar</PurrButton>
        <LoadingSpinner v-else class="mx-auto text-6xl" />
      </form>
    </div>
  </section>
</template>
