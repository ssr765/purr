<script setup lang="ts">
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import PurrButton from '@/components/utils/PurrButton.vue'
import RegularButton from '@/components/utils/RegularButton.vue'

defineEmits(['publicar'])
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>{{ $t('app.posts.create.mediaDashboard.noCatDialog.title') }}</DialogTitle>
      <p>{{ $t('app.posts.create.mediaDashboard.noCatDialog.content.0') }}</p>
      <p>{{ $t('app.posts.create.mediaDashboard.noCatDialog.content.1') }}</p>
      <p>{{ $t('app.posts.create.mediaDashboard.noCatDialog.content.2') }}</p>
      <DialogFooter>
        <PurrButton @click="$emit('publicar')">{{ $t('app.posts.create.mediaDashboard.noCatDialog.publish') }}</PurrButton>
        <DialogClose>
          <RegularButton>{{ $t('app.posts.create.mediaDashboard.noCatDialog.noPublish') }}</RegularButton>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
