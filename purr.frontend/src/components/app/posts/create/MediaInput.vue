<script setup lang="ts">
import { PostInput } from '@/models/Post'
import { useCreatePostStore } from '@/stores/createPost'

const createPostStore = useCreatePostStore()

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  // Start creating the post.
  createPostStore.post = new PostInput(file, undefined, '')
}
</script>

<template>
  <section class="h-app p-16">
    <label for="cat-content-input" class="h-full border-8 border-ctp-lavender border-dashed rounded-3xl flex flex-col items-center justify-center gap-4 lg:gap-8 p-4 hover:bg-ctp-lavender/20 cursor-pointer">
      <span class="icon-[tabler--photo] text-[100px] lg:text-[200px]" role="img" aria-hidden="true" />
      <div class="xl:ml-5 text-center text-5xl lg:text-[80px] lg:leading-[80px] tracking-tight font-bold">Comparte un momento felino</div>
      <div class="text-xl lg:text-4xl text-center">{{ $t('app.create.mediaInput.content') }}</div>
      <input @change="onChange" id="cat-content-input" type="file" class="hidden" />
    </label>
  </section>
</template>
