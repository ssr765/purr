<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '@/stores/postStore'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import CatPlaceholderAvatar from '@/components/utils/CatPlaceholderAvatar.vue'
import PostComment from '@/components/utils/posts/PostComment.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'vue-sonner'

const route = useRoute()
const postStore = usePostStore()
const authStore = useAuthStore()

const postId = Number(route.params.id)
const { postDetail } = storeToRefs(postStore)
const { user } = storeToRefs(authStore)

onBeforeMount(async () => {
  await postStore.fetchPostDetail(postId)
})

const addLike = () => {
  like.value = !like.value
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

const like = ref(false)
const comment = ref('')
</script>

<template>
  <section v-if="postDetail" class="grid xl:grid-cols-2 gap-4 xl:h-app">
    <div class="flex items-center justify-center">
      <img :src="postDetail.url" alt="" class="max-h-app" @dblclick="addLike()" />
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
      <div class="flex flex-col gap-4 p-4 border-t border-ctp-lavender">
        <div class="flex items-center gap-4 text-3xl">
          <button @click="addLike()">
            <span v-if="like" class="block icon-[solar--heart-bold] text-red-500" role="img" aria-hidden="true" />
            <span v-else class="block icon-[solar--heart-linear]" role="img" aria-hidden="true" />
          </button>
          <button>
            <span class="block icon-[iconamoon--comment-light]" role="img" aria-hidden="true" />
          </button>
          <button>
            <span class="block icon-[iconamoon--bookmark-light]" role="img" aria-hidden="true" />
          </button>
          <div class="flex-1"></div>
          <button>
            <span class="block icon-[mdi--dots-vertical]" role="img" aria-hidden="true" />
          </button>
        </div>
        <div v-if="postDetail.caption">{{ postDetail.caption }}</div>
        <div class="flex items-center gap-2">
          <Avatar>
            <AvatarImage :src="user!.avatar ?? ''" :alt="$t('app.layout.header.user.avatarAlt')" />
            <AvatarFallback class="text-lg text-ctp-text">{{ user!.username[0].toUpperCase() }}</AvatarFallback>
          </Avatar>
          <input v-model="comment" @keydown.enter="addComment()" type="text" class="border-none outline-none w-full p-2 rounded-md bg-transparent placeholder:text-ctp-text" placeholder="Añade un comentario..." />
          <button @click="addComment()">
            <span class="block icon-[iconamoon--send] text-3xl" role="img" aria-hidden="true" />
          </button>
        </div>
        <div v-else class="p-2">
          <span class="text-ctp-text/60">Debes iniciar sesión para poder comentar</span>
        </div>
      </div>
    </div>
  </section>
</template>
