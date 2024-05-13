<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { usePostStore } from '@/stores/postStore'

const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
})

const postStore = usePostStore()

const deletePost = () => {
  postStore.deletePost(props.postId)
}
</script>

<template>
  <Dialog>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <slot />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DialogTrigger>
            <DropdownMenuItem class="text-red-500">
              <span class="mr-2 h-4 w-4 icon-[solar--trash-bin-trash-linear]" role="img" aria-hidden="true" />
              Eliminar publicación
            </DropdownMenuItem>
          </DialogTrigger>
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
