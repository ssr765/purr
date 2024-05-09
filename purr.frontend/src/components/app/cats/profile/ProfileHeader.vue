<script setup lang="ts">
import type { Cat } from '@/models/Cat'
import CatPlaceholderAvatar from '@/components/utils/CatPlaceholderAvatar.vue'
import { useFormattedDate } from '@/composables/formattedDate'
import { Badge } from '@/components/ui/badge'
import { computed } from 'vue'
import FollowButton from '@/components/app/cats/profile/FollowButton.vue'

const formattedDate = useFormattedDate()

const props = defineProps({
  cat: {
    type: Object as () => Cat,
    required: true,
  },
})

const hasBadges = computed(() => {
  return props.cat.adoption
})
</script>

<template>
  <section class="mb-4">
    <div class="bg-[url('/img/mockcat.webp')] h-48 col-span-2 bg-center bg-cover">
      <div class="h-full bg-gradient-to-b from-transparent via-transparent to-ctp-base"></div>
    </div>
    <div class="bg-cover p-4 -mt-28 lg:-mt-[88px]">
      <div class="w-full max-w-screen-lg mx-auto grid lg:grid-cols-[auto,1fr] items-center gap-2 lg:gap-8">
        <div class="w-44 mx-auto">
          <img v-if="cat.avatar" class="size-44 object-cover rounded-full" :src="cat.avatar" alt="" />
          <CatPlaceholderAvatar v-else class="w-full" />
        </div>
        <div class="flex flex-col gap-1.5">
          <div class="flex items-center gap-4">
            <div>
              <h5 class="text-center lg:text-left text-5xl leading-10">{{ cat.name }}</h5>
              <p class="text-center lg:text-left text-xl">@{{ cat.catname }}</p>
            </div>
            <div>
              <FollowButton :cat="cat" />
            </div>
          </div>
          <div v-if="hasBadges">
            <Badge v-if="cat.adoption" type="success">Adóptame!</Badge>
          </div>
          <p v-if="cat.biography" class="text-center lg:text-left break-words-plus">{{ cat.biography }}</p>
          <p v-else class="text-center lg:text-left text-ctp-text/75 italic">Sin biografía</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row items-center lg:flex-wrap justify-center lg:space-x-8 p-4 border-y">
      <div v-if="cat.breed" class="flex items-center gap-2">
        <span class="icon-[solar--cat-linear]" role="img" aria-hidden="true" />
        <p>Raza: {{ cat.breed }}</p>
      </div>
      <div v-if="cat.color" class="flex items-center gap-2">
        <span class="icon-[solar--cat-linear]" role="img" aria-hidden="true" />
        <p>Color: {{ cat.color }}</p>
      </div>
      <div v-if="cat.birthdate" class="flex items-center gap-2">
        <span class="icon-[solar--cat-linear]" role="img" aria-hidden="true" />
        <p>Nacimiento: {{ formattedDate.formatDate(cat.birthdate) }}</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="icon-[solar--cat-linear]" role="img" aria-hidden="true" />
        <p>{{ cat.followers_count }} seguidores</p>
      </div>
    </div>
  </section>
</template>
