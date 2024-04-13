<script setup lang="ts">
import { onMounted } from 'vue'

const iframeResize = () => {
  const iframe = document.querySelector('iframe')!
  iframe.height = String(window.innerHeight - 63 - 32 - 1)
  // 63 => header height
  // 32 => padding
  // 1 => XD?
}

onMounted(() => {
  addEventListener('resize', () => {
    iframeResize()
  })
  iframeResize()
})
</script>

<template>
  <NuxtLayout>
    <div style="width: 100%">
      <iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Les%20Rambles,%201%20Barcelona,%20Spain+(Mi%20nombre%20de%20egocios)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
    </div>
  </NuxtLayout>
</template>
