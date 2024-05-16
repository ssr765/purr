<script setup lang="ts">
import { useImageChecker } from '@/composables/imageChecker'
import { useCreatePostStore } from '@/stores/createPostStore'

const createPostStore = useCreatePostStore()

const imageChecker = useImageChecker()

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (imageChecker.checkFile(file)) {
    // Start creating the post.
    createPostStore.onImageUpload(file)
  }
}
</script>

<template>
  <section class="h-app p-8 lg:p-16">
    <label for="cat-content-input" class="h-full border-8 border-ctp-lavender border-dashed rounded-3xl flex flex-col items-center justify-center gap-2 p-4 hover:bg-ctp-lavender/20 cursor-pointer">
      <span class="icon-[tabler--photo] text-[100px] lg:text-[200px]" role="img" aria-hidden="true" />
      <div class="xl:ml-5 text-center text-4xl lg:text-6xl tracking-tight font-semibold leading-none font-heading">{{ $t('app.posts.create.mediaInput.title') }}</div>
      <div class="text-xl lg:text-3xl text-center font-heading">{{ $t('app.posts.create.mediaInput.content') }}</div>
      <div class="text-center font-heading">{{ $t('app.posts.create.mediaInput.format', { mb: 8, formats: '.webp, .jpg, .png' }) }}</div>
      <input @change="onChange" id="cat-content-input" type="file" class="hidden" />
    </label>
  </section>
</template>
