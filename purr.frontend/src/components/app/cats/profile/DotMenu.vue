<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import type { PropType } from 'vue'
import type { Cat } from '@/models/Cat'
import { useRoute, useRouter } from 'vue-router'
import { useShareManager } from '@/composables/shareManager'
import { useCatService } from '@/services/catService'

const props = defineProps({
  cat: {
    type: Object as PropType<Cat>,
    required: true,
  },
})

const authStore = useAuthStore()

const { user } = storeToRefs(authStore)
const userCatsIds = user.value ? user.value.cats!.map((cat) => cat.id) : []

const catService = useCatService()

const deleteCat = () => {
  catService.deleteCat(props.cat.id)
  user.value!.cats = user.value!.cats!.filter((cat) => cat.id !== props.cat.id)
  router.push({ name: 'app-home' })
}

const router = useRouter()
const route = useRoute()

const postUrl = window.location.origin + router.resolve({ name: route.name!, params: { catname: props.cat.catname } }).href

const shareManager = useShareManager(postUrl)
</script>

<template>
  <Dialog>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <slot />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span class="mr-2 h-4 w-4 icon-[solar--share-linear]" role="img" aria-hidden="true" />
              <span>Compartir</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem @click="shareManager.whatsappShare()">
                  <span class="mr-2 h-4 w-4 icon-[bi--whatsapp]" role="img" aria-hidden="true" />
                  WhatsApp
                </DropdownMenuItem>

                <DropdownMenuItem @click="shareManager.twitterShare()">
                  <span class="mr-2 h-4 w-4 icon-[bi--twitter-x]" role="img" aria-hidden="true" />
                  X
                </DropdownMenuItem>

                <DropdownMenuItem @click="shareManager.telegramShare()">
                  <span class="mr-2 h-4 w-4 icon-[iconoir--telegram]" role="img" aria-hidden="true" />
                  Telegram
                </DropdownMenuItem>

                <DropdownMenuItem @click="shareManager.copyLink()">
                  <span class="mr-2 h-4 w-4 icon-[solar--link-linear]" role="img" aria-hidden="true" />
                  Copiar enlace
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <div v-if="user && userCatsIds.includes(user.id)">
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DialogTrigger>
              <DropdownMenuItem class="text-red-500">
                <span class="mr-2 h-4 w-4 icon-[solar--trash-bin-trash-linear]" role="img" aria-hidden="true" />
                Eliminar gato
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Eliminar a {{ cat.name }}</DialogTitle>
      </DialogHeader>

      ¿Estás seguro de que quieres borrar a {{ cat.name }}? Esta acción no se puede deshacer.

      <DialogFooter>
        <div class="flex justify-center gap-4">
          <button @click="deleteCat" class="text-red-500 bg-red-500/20 py-2.5 px-7 rounded-lg hover:bg-red-500 hover:text-white transition-all">Eliminar</button>
          <DialogClose as-child>
            <button class="bg-ctp-lavender/75 hover:bg-ctp-lavender text-ctp-base py-2.5 px-7 rounded-lg transition-all">No</button>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
