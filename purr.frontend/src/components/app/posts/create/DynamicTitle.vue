<script setup lang="ts">
import { computed, onMounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  detections: {
    type: Number,
    required: true,
  },
})

onMounted(() => {
  // GSAP animations.
  gsap.from('#cat-creation-quote', { opacity: 0, duration: 0.75, y: 50 })
})

const QUOTES_NUMBER = 4

const quoteType = computed(() => (props.detections ? (props.detections > 1 ? 'multiple' : 'single') : 'none'))
const quoteNumber = Math.floor(Math.random() * QUOTES_NUMBER)
//
</script>

<template>
  <div id="cat-creation-quote" class="text-5xl xl:text-6xl text-center xl:text-left">
    {{ $t(`app.posts.create.mediaDashboard.quotes.${quoteType}.${quoteNumber}`) }}
  </div>
</template>
