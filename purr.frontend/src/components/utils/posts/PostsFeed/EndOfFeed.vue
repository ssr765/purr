<script setup lang="ts">
import PurrButton from '@/components/utils/PurrButton.vue'
import gsap from 'gsap'
import { onMounted } from 'vue'

onMounted(() => {
  // GSAP animations.
  const observer = new IntersectionObserver(callback)
  function callback(entries: any, observer: any) {
    if (entries[0].isIntersecting) {
      gsap.from('.end-of-feed > p', { opacity: 0, duration: 1, y: 50 })
      gsap.from('.end-of-feed > .explore', { opacity: 0, duration: 1, y: 50, delay: 0.5 })
      observer.disconnect()
    }
  }

  observer.observe(document.querySelector('.end-of-feed')!)
})
</script>

<template>
  <div class="end-of-feed max-w-xl mx-auto mb-20">
    <hr class="h-px bg-ctp-lavender my-10" />
    <p class="text-center text-ctp-text text-lg">{{ $t('app.posts.components.endOfFeed.title') }}</p>
    <div class="explore">
      <RouterLink :to="{ name: 'app-explore' }">
        <PurrButton class="mt-4 mx-auto">{{ $t('app.posts.components.endOfFeed.button') }}</PurrButton>
      </RouterLink>
    </div>
  </div>
</template>
