<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { usePostStore } from '@/stores/postStore'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import type { Post } from '@/models/Post'
import type { PropType } from 'vue'
import { useAdminService } from '@/services/adminService'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
})

const { t } = useI18n()
const router = useRouter()
const postStore = usePostStore()
const adminService = useAdminService()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const userCatsIds = user.value ? user.value.cats!.map((cat) => cat.id) : []

const deletePost = () => {
  postStore.deletePost(props.post.id)
}

const deletePostUser = async () => {
  try {
    await adminService.deletePostUser(props.post.id)
    router.push({ name: 'app-home' })
    toast.success(t('app.posts.detail.toast.postAssociatedUserDeleted'))
  } catch (error) {
    toast.error(t('app.posts.detail.toast.deleteAssociatedUserError'))
  }
}

const approvePost = async () => {
  try {
    await adminService.approve(props.post.id)
    postStore.postDetail! = { ...postStore.postDetail!, detected: true }
    toast.success(t('app.posts.detail.toast.postApproved'))
  } catch (error) {
    toast.error(t('app.posts.detail.toast.approveError'))
  }
}
</script>

<template>
  <Dialog>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <slot />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div v-if="user && user.admin && !post.detected">
          <DropdownMenuItem class="text-green-500" @click="approvePost">
            <span class="mr-2 h-4 w-4 icon-[solar--check-circle-linear]" role="img" aria-hidden="true" />
            {{ $t('app.posts.detail.dotMenu.approve') }}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </div>
        <DropdownMenuGroup v-if="user">
          <DialogTrigger v-if="userCatsIds.includes(post.cat!.id) || user.admin" class="w-full">
            <DropdownMenuItem class="text-red-500">
              <span class="mr-2 h-4 w-4 icon-[solar--trash-bin-trash-linear]" role="img" aria-hidden="true" />
              {{ $t('app.posts.detail.dotMenu.deletePost.menuItem') }}
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem class="text-red-500" v-if="user.admin" @click="deletePostUser">
            <span class="mr-2 h-4 w-4 icon-[solar--trash-bin-trash-linear]" role="img" aria-hidden="true" />
            {{ $t('app.posts.detail.dotMenu.deleteAssociatedUser') }}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ $t('app.posts.detail.dotMenu.deletePost.dialog.title') }}</DialogTitle>
      </DialogHeader>

      {{ $t('app.posts.detail.dotMenu.deletePost.dialog.content') }}

      <DialogFooter>
        <div class="flex justify-center gap-4">
          <button @click="deletePost" class="text-red-500 bg-red-500/20 py-2.5 px-7 rounded-lg hover:bg-red-500 hover:text-white transition-all">{{ $t('app.posts.detail.dotMenu.deletePost.dialog.buttons.delete') }}</button>
          <DialogClose as-child>
            <button class="bg-ctp-lavender/75 hover:bg-ctp-lavender text-ctp-base py-2.5 px-7 rounded-lg transition-all">{{ $t('app.posts.detail.dotMenu.deletePost.dialog.buttons.cancel') }}</button>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
