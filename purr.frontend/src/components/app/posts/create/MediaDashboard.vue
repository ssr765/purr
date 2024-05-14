<script setup lang="ts">
import { useCreatePostStore } from '@/stores/createPostStore'
import { useAuthStore } from '@/stores/authStore'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'
import PurrButton from '@/components/utils/PurrButton.vue'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import CatPlaceholderAvatar from '@/components/utils/CatPlaceholderAvatar.vue'
import type { Analysis } from '@/models/Analysis'
import NoCatDialog from './NoCatDialog.vue'
import DynamicTitle from './DynamicTitle.vue'

const createPostStore = useCreatePostStore()
const authStore = useAuthStore()

const onSubmit = () => {
  createPostStore.createPost()
}

const box = ref(null)
const width = ref(0)
const height = ref(0)

onMounted(() => {
  createPostStore.analysisData = null

  const observer = new ResizeObserver(async (entries) => {
    for (const entry of entries) {
      width.value = entry.contentRect.width
      height.value = entry.contentRect.height
    }

    if (createPostStore.analysisData) {
      await drawBoxes(createPostStore.analysisData)
    }
  })

  if (box.value) {
    observer.observe(box.value)
  }

  onUnmounted(() => {
    observer.disconnect()
  })
})

interface DetectionBox {
  top: number
  left: number
  width: number
  height: number
}

const detectionBoxes = ref<DetectionBox[]>([])

function loadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve(img)
    }
    img.onerror = reject
    img.src = src
  })
}

watch(
  () => createPostStore.analysisData,
  async (data) => {
    console.warn(data)
    if (data) {
      await drawBoxes(data)
    }
  },
)

const drawBoxes = async (data: Analysis) => {
  detectionBoxes.value = []
  for (const detection of data.data) {
    let originalWidth = 0
    let originalHeight = 0

    const img = (await loadImage(createPostStore.postMediaPreview!)) as HTMLImageElement
    originalWidth = img.width
    originalHeight = img.height

    const { x1, y1, x2, y2 } = detection.coordinates

    const box = {
      top: (y1 * height.value) / originalHeight,
      left: (x1 * width.value) / originalWidth,
      width: ((x2 - x1) * width.value) / originalWidth,
      height: ((y2 - y1) * height.value) / originalHeight,
    }

    console.log((y1 * height.value) / originalHeight)
    console.log('width.value', 'height.value')
    console.log(width.value, height.value)
    console.log('originalWidth, originalHeight')
    console.log(originalWidth, originalHeight)
    console.log('x1, y1, x2, y2')
    console.log(x1, y1, x2, y2)
    console.log(box)

    detectionBoxes.value.push(box)
  }
}

onUnmounted(() => {
  createPostStore.reset()
})
</script>

<template>
  <section class="grid grid-rows-[min-content,1fr] xl:grid-rows-1 xl:grid-cols-2 gap-4 min-h-app">
    <div class="fixed z-40">
      <PurrButton @click="createPostStore.reset()"> {{ $t('app.posts.create.mediaDashboard.back') }} </PurrButton>
    </div>
    <div class="relative flex items-center justify-center">
      <div v-if="!createPostStore.analyzing" class="absolute" :style="{ width: width + 'px', height: height + 'px' }">
        <div v-for="detection in detectionBoxes" :key="detection.top" class="absolute border-4 border-ctp-lavender rounded-lg" :style="{ top: detection.top + 'px', left: detection.left + 'px', width: detection.width + 'px', height: detection.height + 'px' }">
          <div class="bg-ctp-lavender flex items-center justify-center size-12 rounded-br-lg">
            <p class="icon-[solar--cat-linear] text-4xl text-black" role="img" aria-hidden="true" />
          </div>
        </div>
        <div v-if="createPostStore.analysisData && !createPostStore.analysisData.detected" class="flex flex-col justify-center items-center absolute w-full h-full bg-black bg-opacity-60">
          <span class="icon-[ph--warning-bold] text-6xl text-red-500" role="img" aria-hidden="true" />
          <p class="text-lg md:text-xl text-ctp-text text-center">{{ $t('app.posts.create.mediaDashboard.noCatsDetected') }}</p>
        </div>
      </div>
      <div v-else class="absolute flex items-center justify-center bg-black bg-opacity-30" :style="{ width: width + 'px', height: height + 'px' }">
        <LoadingSpinner class="text-6xl" />
      </div>
      <img ref="box" class="max-h-app" :src="createPostStore.postMediaPreview!" :alt="createPostStore.post!.file.name" />
    </div>
    <div class="flex-1 p-4">
      <div class="flex flex-col max-w-screen-sm mx-auto gap-12 h-full xl:justify-center">
        <DynamicTitle v-if="createPostStore.analysisData" :detections="createPostStore.analysisData.data.length" />
        <div class="flex flex-col gap-4">
          <div>
            <label for="cat" class="block mb-2 text-sm font-medium text-ctp-text">{{ $t('app.posts.create.mediaDashboard.catSelectionLabel') }}</label>
            <Select v-model="createPostStore.post!.cat_id!">
              <SelectTrigger class="bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-4 py-8">
                <SelectValue />
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
            <label for="caption" class="block mb-2 text-sm font-medium text-ctp-text">{{ $t('app.posts.create.mediaDashboard.captionLabel') }}</label>
            <textarea v-model="createPostStore.post!.caption" id="caption" rows="4" class="block p-2.5 w-full text-sm text-ctp-text bg-ctp-mantle rounded-lg border border-ctp-lavender focus:ring-ctp-lavender focus:border-ctp-lavender" :placeholder="$t('app.posts.create.mediaDashboard.captionPlaceholder')"></textarea>
          </div>
          <div v-if="createPostStore.analysisData">
            <div v-if="!createPostStore.loading">
              <div v-if="!createPostStore.analysisData.detected" class="flex justify-center">
                <NoCatDialog :publicar="onSubmit" @publicar="onSubmit">
                  <PurrButton type="submit" class="mx-auto flex items-center gap-2">
                    <span class="icon-[ph--warning-bold] text-xl text-red-500" role="img" aria-hidden="true" />
                    {{ $t('app.posts.create.mediaDashboard.catlessButton') }}
                  </PurrButton>
                </NoCatDialog>
              </div>
              <PurrButton v-else @click="onSubmit" class="mx-auto">{{ $t('app.posts.create.mediaDashboard.button') }}</PurrButton>
            </div>
            <LoadingSpinner v-else class="mx-auto text-6xl" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
