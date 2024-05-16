<script setup lang="ts">
import RegularButton from '@/components/utils/RegularButton.vue'
import type { Cat } from '@/models/Cat'
import { useAuthStore } from '@/stores/authStore'
import { useCatStore } from '@/stores/catStore'
import { storeToRefs } from 'pinia'
import type { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'

const { t } = useI18n()
const catStore = useCatStore()
const { user } = storeToRefs(useAuthStore())

defineProps({
  cat: {
    type: Object as PropType<Cat>,
    required: true,
  },
})

const follow = async () => {
  await catStore.follow()
}

const unfollow = async () => {
  await catStore.unfollow()
}

const error = () => {
  toast.warning(t('app.cats.profile.profilePage.followState.toast.noLoggedIn'))
}
</script>

<template>
  <RegularButton @click="user ? (cat.followed ? unfollow() : follow()) : error()" noPaddingX noPaddingY class="py-2 px-4">
    <span v-if="!cat.followed">{{ $t('app.cats.profile.profilePage.followState.button.follow') }}</span>
    <span v-else>{{ $t('app.cats.profile.profilePage.followState.button.unfollow') }}</span>
  </RegularButton>
</template>
