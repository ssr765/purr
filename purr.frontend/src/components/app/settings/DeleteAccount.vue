<script setup lang="ts">
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useUserService } from '@/services/userService'
import { useAuthStore } from '@/stores/authStore'
import type { AxiosError } from 'axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const { t } = useI18n()
const { user } = storeToRefs(useAuthStore())
const userService = useUserService()
const router = useRouter()

const password = ref('')

const deleteAccount = async () => {
  if (!password.value) {
    toast.warning(t('app.settings.settings.deleteAccount.toast.emptyPassword'))
    return
  }
  try {
    await userService.deleteAccount(user.value!.id, password.value)
    user.value = null
    router.push({ name: 'app-explore' })
    toast.success(t('app.settings.settings.deleteAccount.toast.success'))
  } catch (error) {
    const axiosError = error as AxiosError
    if (axiosError.response?.status === 401) {
      toast.error(t('app.settings.settings.deleteAccount.toast.wrongPassword'))
    } else {
      toast.error(t('app.settings.settings.deleteAccount.toast.error'))
    }
  }
}
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-2xl">{{ $t('app.settings.settings.deleteAccount.dialog.title') }}</DialogTitle>
      </DialogHeader>

      <div>
        <p class="mb-2">{{ $t('app.settings.settings.deleteAccount.dialog.content.0') }}</p>
        <p class="mb-2">
          {{ $t('app.settings.settings.deleteAccount.dialog.content.1') }}
          <strong class="text-red-500">{{ $t('app.settings.settings.deleteAccount.dialog.content.2') }}</strong>
        </p>
        <p class="mb-2">{{ $t('app.settings.settings.deleteAccount.dialog.content.3') }}</p>
        <div class="my-4">
          <label for="delete_account_password" class="block mb-2 text-sm font-medium text-ctp-text">{{ $t('app.settings.settings.deleteAccount.dialog.passwordInput') }}</label>
          <Input v-model="password" type="password" id="delete_account_password" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" required />
        </div>
      </div>

      <DialogFooter>
        <div class="flex justify-center gap-4">
          <button @click="deleteAccount" class="text-red-500 bg-red-500/20 py-2.5 px-7 rounded-lg hover:bg-red-500 hover:text-white transition-all">{{ $t('app.settings.settings.deleteAccount.dialog.delete') }}</button>
          <DialogClose as-child>
            <button class="bg-ctp-lavender/75 hover:bg-ctp-lavender text-ctp-base py-2.5 px-7 rounded-lg transition-all">{{ $t('app.settings.settings.deleteAccount.dialog.cancel') }}</button>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
