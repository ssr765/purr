<script setup lang="ts">
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
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
          <Input type="password" id="delete_account_password" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" required />
        </div>
      </div>

      <DialogFooter>
        <div class="flex justify-center gap-4">
          <button class="text-red-500 bg-red-500/20 py-2.5 px-7 rounded-lg hover:bg-red-500 hover:text-white transition-all">{{ $t('app.settings.settings.deleteAccount.dialog.delete') }}</button>
          <DialogClose as-child>
            <button class="bg-ctp-lavender/75 hover:bg-ctp-lavender text-ctp-base py-2.5 px-7 rounded-lg transition-all">{{ $t('app.settings.settings.deleteAccount.dialog.cancel') }}</button>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
