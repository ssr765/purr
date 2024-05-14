<script setup lang="ts">
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from '@/components/ui/context-menu'
import type { Post } from '@/models/Post'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useShareManager } from '@/composables/shareManager'

const router = useRouter()

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
})

const descargar = () => {
  const url = props.post.url + '/download'
  const a = document.createElement('a')
  a.href = url
  a.click()
  a.remove()
}

const postUrl = window.location.origin + router.resolve({ name: 'app-posts-detail', params: { id: props.post.id } }).href

const shareManager = useShareManager(postUrl)
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <slot />
    </ContextMenuTrigger>
    <ContextMenuContent class="w-48">
      <RouterLink :to="{ name: 'app-posts-detail', params: { id: post.id } }">
        <ContextMenuItem>
          <span class="mr-2 h-4 w-4 icon-[solar--eye-linear]" role="img" aria-hidden="true" />
          Ver detalle
        </ContextMenuItem>
      </RouterLink>
      <ContextMenuItem @click="descargar">
        <span class="mr-2 h-4 w-4 icon-[solar--download-minimalistic-linear]" role="img" aria-hidden="true" />
        Descargar
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuSub>
        <ContextMenuSubTrigger>
          <span class="mr-2 h-4 w-4 icon-[solar--share-linear]" role="img" aria-hidden="true" />
          Compartir
        </ContextMenuSubTrigger>
        <ContextMenuSubContent class="w-48">
          <ContextMenuItem @click="shareManager.whatsappShare()">
            <span class="mr-2 h-4 w-4 icon-[bi--whatsapp]" role="img" aria-hidden="true" />
            WhatsApp
          </ContextMenuItem>
          <ContextMenuItem @click="shareManager.twitterShare()">
            <span class="mr-2 h-4 w-4 icon-[bi--twitter-x]" role="img" aria-hidden="true" />
            X
          </ContextMenuItem>
          <ContextMenuItem @click="shareManager.telegramShare()">
            <span class="mr-2 h-4 w-4 icon-[iconoir--telegram]" role="img" aria-hidden="true" />
            Telegram
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem @click="shareManager.copyLink()">
            <span class="mr-2 h-4 w-4 icon-[solar--link-linear]" role="img" aria-hidden="true" />
            Copiar enlace
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
    </ContextMenuContent>
  </ContextMenu>
</template>
