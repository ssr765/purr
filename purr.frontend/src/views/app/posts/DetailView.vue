<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '@/stores/postStore'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import CatPlaceholderAvatar from '@/components/utils/CatPlaceholderAvatar.vue'
import PostComment from '@/components/utils/posts/PostComment.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'vue-sonner'
import LikeButton from '@/components/utils/posts/LikeButton.vue'
import { useNumberFormatter } from '@/composables/numberFormatter'
import { useLikeAnimation } from '@/composables/likeAnimation'

import Logo from '@/assets/img/logo/black.webp'
import { useHead, useSeoMeta } from 'unhead'
import { useI18n } from 'vue-i18n'
import NoCatWarning from '@/components/app/posts/detail/NoCatWarning.vue'
import SaveButton from '@/components/utils/posts/SaveButton.vue'

const route = useRoute()
const postStore = usePostStore()
const authStore = useAuthStore()
const { formatNumber } = useNumberFormatter()
const { likeAnimation } = useLikeAnimation()
const { t } = useI18n()

const postId = Number(route.params.id)
const { postDetail } = storeToRefs(postStore)
const { user } = storeToRefs(authStore)

useHead({
  meta: [
    {
      name: 'robots',
      content: 'noarchive, noimageindex',
    },
  ],
})

onMounted(async () => {
  if (!postDetail.value) {
    await postStore.fetchPostDetail(postId)
  }

  if (postDetail.value) {
    const title = `${t('app.posts.detail.metadata.postBy')} ${postDetail.value.cat!.name} (@${postDetail.value.cat!.catname})`
    const description = `${postDetail.value.caption} - ${postDetail.value.likesData.count} likes, ${postDetail.value.commentsCount} comments`
    useSeoMeta({
      title: `${title} | purr.`,
      ogTitle: title,
      description: description,
      ogDescription: description,
      ogImage: postDetail.value.cat!.avatar ?? Logo,
    })
  } else {
    useSeoMeta({
      title: `${t('app.posts.detail.metadata.notFound')} | purr.`,
      ogTitle: 'purr.',
      ogImage: Logo,
    })
  }
})

onUnmounted(() => {
  postStore.postDetail = null
})

const addLike = () => {
  if (!user.value) {
    toast.warning('Debes iniciar sesión para poder dar like')
    return
  }

  if (postStore.liking) return
  postStore.toggleLike(postId)
  likeAnimation(postId)
}

const addComment = () => {
  if (!comment.value) return
  if (comment.value.length > 255) {
    toast('El comentario no puede tener más de 255 caracteres')
    return
  }
  postStore.addComment(postId, comment.value)
  comment.value = ''
}

const save = () => {
  if (!user.value) {
    toast.warning('Debes iniciar sesión para guardar publicaciones')
    return
  }

  if (postStore.saving) return
  postStore.toggleSave(postId)
}

const comment = ref('')
</script>

<template>
  <section v-if="postDetail" class="grid xl:grid-cols-2 gap-4 xl:h-app">
    <div class="relative flex items-center justify-center">
      <img :src="postDetail.url" alt="" class="max-h-app" @dblclick="addLike()" />
      <span :id="`post-${postId}`" class="icon-[solar--heart-bold] text-red-500 absolute-center scale-0 text-[100px]" role="img" aria-hidden="true" />
    </div>
    <div class="grid grid-rows-[auto,1fr,auto] border border-ctp-lavender bg-ctp-mantle rounded-xl max-h-app">
      <div class="p-4 border-b border-ctp-lavender">
        <RouterLink :to="{ name: 'app-cats-profile', params: { catname: postDetail.cat!.catname } }">
          <div class="flex items-center gap-2">
            <CatPlaceholderAvatar class="w-12 h-12" />
            <div>
              <div class="text-lg font-bold leading-4">{{ postDetail.cat!.name }}</div>
              <div class="text-sm">@{{ postDetail.cat!.catname }}</div>
            </div>
          </div>
        </RouterLink>
      </div>
      <div v-if="postDetail.comments" class="space-y-2 p-4 overflow-auto">
        <PostComment :comment="comment" v-for="comment in postDetail.comments" :key="comment.id" :postId="postDetail.id" />
      </div>
      <div class="flex flex-col gap-2 p-4 border-t border-ctp-lavender">
        <div class="flex items-center gap-4 text-3xl">
          <LikeButton :like="postDetail.likesData.isLiked" @addLike="addLike" />
          <button>
            <span class="block icon-[iconamoon--comment-light]" role="img" aria-hidden="true" />
          </button>
          <SaveButton :save="postDetail.savesData.isSaved" @save="save" />
          <NoCatWarning v-if="!postDetail.detected" />
          <div class="flex-1"></div>
          <button>
            <span class="block icon-[mdi--dots-vertical]" role="img" aria-hidden="true" />
          </button>
        </div>
        <p class="flex items-center gap-1.5">
          <span v-if="postDetail.likesData.count > 0" class="icon-[solar--heart-bold]" role="img" aria-hidden="true" />
          <span v-else class="icon-[solar--heart-broken-linear]" role="img" aria-hidden="true" />
          <span class="font-semibold">{{ formatNumber(postDetail.likesData.count) }} likes</span>
          <span>·</span>
          <span class="block icon-[iconamoon--bookmark-light]" role="img" aria-hidden="true" />
          <span class="font-semibold">{{ formatNumber(postDetail.savesData.count) }} guardados</span>
        </p>
        <div v-if="postDetail.caption">{{ postDetail.caption }}</div>
        <div class="flex items-center gap-2 mt-2" v-if="user">
          <Avatar>
            <AvatarImage :src="user!.avatar ?? ''" :alt="$t('app.layout.header.user.avatarAlt')" />
            <AvatarFallback class="text-lg text-ctp-text">{{ user.username[0].toUpperCase() }}</AvatarFallback>
          </Avatar>
          <input v-model="comment" @keydown.enter="addComment()" type="text" class="border-none outline-none w-full p-2 rounded-md bg-transparent placeholder:text-ctp-text" placeholder="Añade un comentario..." />
          <button @click="addComment()">
            <span class="block icon-[iconamoon--send] text-3xl" role="img" aria-hidden="true" />
          </button>
        </div>
        <div v-else class="p-2 mt-2">
          <span class="text-ctp-text/60">Debes iniciar sesión para poder comentar</span>
        </div>
      </div>
    </div>
  </section>
</template>
