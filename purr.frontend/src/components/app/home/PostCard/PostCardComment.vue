<script setup lang="ts">
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import type { Comment } from '@/models/Comment'

defineProps({
  comment: {
    type: Object as () => Comment,
    required: true,
  },
})
</script>

<template>
  <div class="flex items-center gap-2">
    <Avatar>
      <AvatarImage :src="comment.user.avatar ?? ''" :alt="$t('app.layout.header.user.avatarAlt')" />
      <AvatarFallback class="text-lg text-ctp-text">{{ comment.user.username[0].toUpperCase() }}</AvatarFallback>
    </Avatar>
    <div>
      <div class="font-bold leading-3">{{ comment.user.name }}</div>
      <span>{{ comment.content }}</span>
    </div>
  </div>
</template>
