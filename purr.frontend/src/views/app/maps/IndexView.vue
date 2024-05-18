<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import { useMapUtils } from '@/composables/mapUtils'
import { useMapService } from '@/services/mapService'
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'
import Logo from '@/assets/img/logo/black.webp'

import cafePin from '@/assets/img/pins/cafe.webp'
import healPin from '@/assets/img/pins/heal.webp'
import shopPin from '@/assets/img/pins/shop.webp'
import protecPin from '@/assets/img/pins/protec.webp'
import { useSeoMeta } from 'unhead'
import { toast } from 'vue-sonner'
import { useI18n } from 'vue-i18n'

const pins = {
  cafe: cafePin,
  heal: healPin,
  shop: shopPin,
  protec: protecPin,
}

const { t } = useI18n()
const { popupBuilder } = useMapUtils()
const { getEntities } = useMapService()

const loading = ref(true)

useSeoMeta({
  title: t('app.maps.metadata.title') + ' | purr.',
  ogTitle: 'Find Cat Cafes, Vets & More with purr. Maps',
  description: 'Locate cat cafes, vets, shelters, and pet stores with purr. Maps. Your guide to the best cat-friendly spots in town. Explore and connect with the feline community!',
  ogDescription: 'Use purr. Maps to find cat cafes, vets, shelters, and pet stores near you. Discover the best cat-friendly spots and services in your area with ease.',
  ogImage: Logo,
})

onMounted(async () => {
  // Build the map
  let map = L.map('map', {
    minZoom: 13,
    zoomSnap: 0.25,
  }).setView([41.73245198194086, 1.8296735239847526], 13)

  map.setZoom(16)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)

  // Add markers
  try {
    const entities = await getEntities()

    entities.forEach((data) => {
      const icon = L.icon({
        iconUrl: pins[data.type],
        iconSize: [32, 50],
        iconAnchor: [20, 58],
        popupAnchor: [0, -60],
      })

      L.marker([data.coords.lat, data.coords.lng], { icon }).addTo(map).bindPopup(popupBuilder(data))
    })
  } catch (error) {
    console.error(error)
    toast.error(t('app.maps.error'))
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="wrapper h-app relative">
    <LoadingSpinner v-if="loading" class="absolute-center text-6xl z-[99999] p-4 bg-ctp-crust rounded-xl bg-opacity-80" />
    <div class="h-full" id="map" />
  </div>
</template>

<style>
.leaflet-popup-content-wrapper {
  @apply bg-ctp-base text-ctp-text border-ctp-lavender border-2;
}

.leaflet-popup-content-wrapper a {
  @apply text-ctp-lavender;
}

.leaflet-popup-tip {
  @apply bg-ctp-base;
}

.leaflet-popup-close-button {
  @apply !text-ctp-lavender !top-2 !right-2 !origin-top-right !scale-125;
}

.leaflet-popup-content p {
  @apply m-0 font-sans;
}
</style>
