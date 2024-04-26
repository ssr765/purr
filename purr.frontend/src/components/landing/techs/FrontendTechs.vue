<script setup lang="ts">
import { ref } from 'vue'
import { watchOnce } from '@vueuse/core'
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

const emblaMainApi = ref<CarouselApi>()
const emblaThumbnailApi = ref<CarouselApi>()
const selectedIndex = ref(0)

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap()
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap())
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return
  emblaMainApi.value.scrollTo(index)
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return

  onSelect()
  emblaMainApi.on('select', onSelect)
  emblaMainApi.on('reInit', onSelect)
})
</script>

<template>
  <div>
    <div class="container mx-auto px-4 py-12">
      <div class="text-center">
        <h2 class="text-3xl font-bold *:text-ctp-text">Frontend Techs</h2>
        <p class="">The frontend tech stack of Purr</p>
      </div>
      <div class="w-full sm:w-auto">
        <Carousel class="relative w-full" @init-api="(val) => (emblaMainApi = val)">
          <CarouselContent>
            <CarouselItem v-for="(_, index) in 10" :key="index">
              <div class="p-1">
                <Card>
                  <CardContent class="flex items-center justify-center p-6 h-80">
                    <span class="text-4xl font-semibold">{{ index + 1 }}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Carousel class="relative w-full max-w-lg mx-auto" @init-api="(val) => (emblaThumbnailApi = val)">
          <CarouselContent class="flex gap-1 ml-0">
            <CarouselItem v-for="(_, index) in 10" :key="index" class="pl-0 basis-1/6 cursor-pointer" @click="onThumbClick(index)">
              <div class="p-1" :class="index === selectedIndex ? '' : 'opacity-50'">
                <Card>
                  <CardContent class="flex items-center justify-center p-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png" alt="Vue.js" class="w-24 mx-auto" />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <div class="bg-ctp-lavender/10 hover:bg-ctp-lavender/20 transition-all hover:scale-110 shadow-lg rounded-lg p-8">
          <div class="flex flex-col items-center gap-4 text-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png" alt="Vue.js" class="w-24 mx-auto" />
            <div>
              <h3 class="text-xl font-bold text-ctp-text">Vue.js</h3>
              <p class="">The Progressive JavaScript Framework</p>
            </div>
          </div>
        </div>
        <div class="bg-ctp-lavender/10 hover:bg-ctp-lavender/20 transition-all hover:scale-110 shadow-lg rounded-lg p-8">
          <div class="flex flex-col items-center gap-4 text-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png" alt="Tailwind CSS" class="w-24 mx-auto" />
            <div>
              <h3 class="text-xl font-bold text-ctp-text">Tailwind CSS</h3>
              <p class="">A utility-first CSS framework</p>
            </div>
          </div>
        </div>
        <div class="bg-ctp-lavender/10 hover:bg-ctp-lavender/20 transition-all hover:scale-110 shadow-lg rounded-lg p-8">
          <div class="flex flex-col items-center gap-4 text-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png" alt="Vite" class="w-24 mx-auto" />
            <div>
              <h3 class="text-xl font-bold text-ctp-text">Vite</h3>
              <p class="">Next Generation Frontend Tooling</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
