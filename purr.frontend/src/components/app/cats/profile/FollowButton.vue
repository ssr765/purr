<script setup lang="ts">
import RegularButton from '@/components/utils/RegularButton.vue'
import type { Cat } from '@/models/Cat'
import { useAuthStore } from '@/stores/authStore'
import { useCatStore } from '@/stores/catStore'
import { storeToRefs } from 'pinia'
import type { PropType } from 'vue'
import { toast } from 'vue-sonner'

const catStore = useCatStore()
const { user } = storeToRefs(useAuthStore())

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

const error = () => {
  toast.warning('Debes iniciar sesión para seguir a un gato')
}
</script>

<template>
  <RegularButton @click="user ? (cat.followed ? unfollow() : follow()) : error()" noPaddingX noPaddingY class="py-2 px-4">
    <span v-if="!cat.followed">Seguir</span>
    <span v-else>Dejar de seguir</span>
  </RegularButton>
</template>
