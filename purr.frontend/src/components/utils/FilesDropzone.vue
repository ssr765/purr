<script setup lang="ts">
import { ref } from 'vue'

const handleFiles = (event: Event) => {
  const inputFiles = (event.target as HTMLInputElement).files ?? (event as DragEvent).dataTransfer?.files

  Array.from(inputFiles!).forEach((element) => {
    files.value.push(element)
  })

  dragging.value = false
}

const dragOver = (event: DragEvent) => {
  event.preventDefault()
  dragging.value = true
}

const dragLeave = (event: DragEvent) => {
  event.preventDefault()
  dragging.value = false
}

const removeFile = (filename: string) => {
  files.value = files.value.filter((file) => file.name !== filename)
}

const dragging = ref(false)
const files = ref<File[]>([])
</script>

<template>
  <input @change="handleFiles" id="file-input" type="file" multiple class="hidden" />
  <label @dragover="dragOver" @dragleave="dragLeave" @drop.prevent="handleFiles" for="file-input" class="bg-ctp-mantle hover:bg-ctp-lavender/20 cursor-pointer flex-col gap-1 w-full h-48 border-dashed border-ctp-lavender border-4 rounded-xl flex justify-center items-center text-lg">
    <span class="icon-[solar--upload-linear] text-4xl" role="img" aria-hidden="true" />
    <span>Adjunta algún documento para poder verificar la entidad</span>
  </label>

  <div v-if="files.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 py-4">
    <div v-for="file in files" :key="file.name" class="min-h-[170px] relative p-8 flex flex-col items-center gap-2 bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full">
      <span class="icon-[solar--file-linear] text-4xl" role="img" aria-hidden="true" />
      <span class="line-clamp-3 break-words-plus">{{ file.name }}</span>
      <button @click="removeFile(file.name)" class="absolute top-2 right-2 text-red-500 hover:text-red-700">
        <span class="icon-[solar--trash-bin-trash-linear] text-xl" role="img" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
