<script setup lang="ts">
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import RegularButton from '@/components/utils/RegularButton.vue'
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <RegularButton> Crear una entidad </RegularButton>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-2xl">Crear una entidad</DialogTitle>
      </DialogHeader>

      <div>
        <p class="mb-2">Estas a punto de crear una entidad, una vez lo hagas, tu cuenta se asociarà de manera permanente con la entidad y serà irreversible.</p>
        <p class="mb-2 font-semibold">¿Estás seguro/a de que deseas continuar?</p>
      </div>

      <DialogFooter>
        <div class="flex justify-center gap-4">
          <RouterLink :to="{ name: 'app-entity-create' }">
            <RegularButton> Sí </RegularButton>
          </RouterLink>
          <DialogClose as-child>
            <RegularButton> No </RegularButton>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
