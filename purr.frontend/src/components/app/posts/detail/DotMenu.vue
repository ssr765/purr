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

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
})

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
    postStore.deletePost(props.post.id)
    router.push({ name: 'app-home' })
  } catch (error) {
    toast.error('No se pudo eliminar el usuario asociado con la publicación')
  }
}

const approvePost = async () => {
  try {
    await adminService.approve(props.post.id)
    postStore.postDetail! = { ...postStore.postDetail!, detected: true }
  } catch (error) {
    toast.error('No se pudo aprobar la publicación')
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
            Aprobar publicación
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </div>
        <DropdownMenuGroup v-if="user">
          <DialogTrigger v-if="userCatsIds.includes(post.cat!.id) || user.admin" class="w-full">
            <DropdownMenuItem class="text-red-500">
              <span class="mr-2 h-4 w-4 icon-[solar--trash-bin-trash-linear]" role="img" aria-hidden="true" />
              Eliminar publicación
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem class="text-red-500" v-if="user.admin" @click="deletePostUser">
            <span class="mr-2 h-4 w-4 icon-[solar--trash-bin-trash-linear]" role="img" aria-hidden="true" />
            Eliminar usuario asociado con la publicación
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Borrar la publicación</DialogTitle>
      </DialogHeader>

      ¿Estás seguro de que quieres borrar esta publicación? Esta acción no se puede deshacer.

      <DialogFooter>
        <div class="flex justify-center gap-4">
          <button @click="deletePost" class="text-red-500 bg-red-500/20 py-2.5 px-7 rounded-lg hover:bg-red-500 hover:text-white transition-all">Eliminar</button>
          <DialogClose as-child>
            <button class="bg-ctp-lavender/75 hover:bg-ctp-lavender text-ctp-base py-2.5 px-7 rounded-lg transition-all">No</button>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
