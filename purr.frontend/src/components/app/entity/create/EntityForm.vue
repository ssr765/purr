<script setup lang="ts">
import { computed, ref } from 'vue'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import RegularButton from '@/components/utils/RegularButton.vue'
import PurrButton from '@/components/utils/PurrButton.vue'
import FilesDropzone from '@/components/utils/FilesDropzone.vue'

//
const name = ref('')
// ^(?<DNI>\d{8}[A-Za-z])|(?<NIE>[XYZxyz]\d{7}[A-Za-z])|(?<CIFNIF>[A-HJ-NP-SU-W]\d{8})$

const tipo = ref('')
const warningTipo = computed(() => tipo.value === 'otro')
</script>

<template>
  <div class="grid lg:grid-cols-2 gap-6">
    <div class="lg:col-span-2">
      <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">Nombre de la entidad</label>
      <input v-model="name" type="text" id="first_name" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" required />
    </div>
    <div>
      <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">CIF / NIF / DNI</label>
      <input v-model="name" type="text" id="first_name" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" required />
    </div>
    <div>
      <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">Dirección</label>
      <input v-model="name" type="text" id="first_name" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" required />
    </div>
    <div class="lg:col-span-2">
      <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">Sítio web</label>
      <input v-model="name" type="text" id="first_name" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" required />
    </div>
    <div class="lg:col-span-2">
      <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">Tipo de entidad</label>
      <select v-model="tipo" id="cat" class="bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender block w-full p-2.5">
        <option value="F">Tienda de mascotas</option>
        <option value="F">Veterinario</option>
        <option value="F">Protectora de animales</option>
        <option value="F">Cat Cafe</option>
        <option value="otro">Otro</option>
      </select>
      <p v-if="warningTipo">Al seleccionar "Otro" como tipo de entidad, no aparecerás en los mapas!</p>
    </div>
    <div class="lg:col-span-2">
      <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">Teléfono</label>
      <input v-model="name" type="text" id="first_name" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" required />
    </div>
    <div class="lg:col-span-2">
      <FilesDropzone />
    </div>
    <div class="flex items-center gap-4">
      <PurrButton>Registrar entidad</PurrButton>

      <Dialog>
        <DialogTrigger>
          <RegularButton> ¿Porque pedimos estos datos? </RegularButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Datos de la entidad</DialogTitle>
          </DialogHeader>
          <p>Nuestro objetivo principal es garantizar el bienestar de los gatos. Al registrar una entidad, la conexión con los gatos se extiende más allá de purr.y no podemos tener control de lo que sucede. Es crucial confirmar que cualquier entidad legal registrada cumpla con los estándares adecuados para mantener a los gatos en óptimas condiciones.</p>
          <DialogFooter>
            <DialogClose>
              <RegularButton> Vale </RegularButton>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>
