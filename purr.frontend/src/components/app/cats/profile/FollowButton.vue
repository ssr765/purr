<script setup lang="ts">
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'
import RegularButton from '@/components/utils/RegularButton.vue'
import type { Cat } from '@/models/Cat'
import { useCatStore } from '@/stores/catStore'
import type { PropType } from 'vue'

const catStore = useCatStore()

defineProps({
  cat: {
    type: Object as PropType<Cat>,
    required: true,
  },
})

const follow = () => {
  console.log('follow')
  catStore.follow()
}

const unfollow = () => {
  console.log('unfollow')
  catStore.unfollow()
}
</script>

<template>
  <RegularButton @click="cat.followed ? unfollow() : follow()" noPaddingX noPaddingY class="py-2 px-4">
    <span v-if="!cat.followed">Seguir</span>
    <span v-else>Dejar de seguir</span>
  </RegularButton>
</template>
