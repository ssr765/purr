<script setup lang="ts">
import { ref } from 'vue'
import StartingStep from '@/components/app/cats/create/StartingStep.vue'
import TraitsStep from '@/components/app/cats/create/TraitsStep.vue'
import PasswordStep from '@/components/app/cats/create/PasswordStep.vue'
import FinalStep from '@/components/app/cats/create/FinalStep.vue'
import PurrButton from '@/components/utils/PurrButton.vue'
import { useCreateCatStore } from '@/stores/createCat'
import { toast } from 'vue-sonner'

const createCatStore = useCreateCatStore()

const step = ref(0)

const gotoStep = (newStep: number) => {
  if (step.value == 0) {
    if (createCatStore.name == '' || createCatStore.catname == '') {
      toast('El nombre del gato y el catname son obligatorios')
      return
    } else if (createCatStore.validCatname == false) {
      if (createCatStore.checking) {
        toast('Estamos comprobando el catname, por favor espera unos segundos')
      } else {
        toast('El catname ya está en uso, por favor elige otro')
      }
      return
    }
  }

  if (step.value == 1 && newStep == 2) {
    if (createCatStore.sex == '') {
      toast('El sexo del gato es obligatorio')
      return
    }
  }

  step.value = newStep
}

const createCat = () => {
  if (createCatStore.password == '' || createCatStore.confirmPassword == '') {
    toast('La contraseña y su confirmación son obligatorias')
    return
  } else if (createCatStore.password != createCatStore.confirmPassword) {
    toast('Las contraseñas no coinciden')
    return
  }

  createCatStore.createCat()
}
</script>

<template>
  <div class="min-h-app grid grid-rows-[1fr,auto] gap-4">
    <StartingStep v-if="step == 0" />
    <TraitsStep v-if="step == 1" />
    <PasswordStep v-if="step == 2" />
    <FinalStep v-if="step == 3" />
    <div class="flex justify-between items-center">
      <div class="w-1/3">
        <PurrButton v-if="step != 0" @click="gotoStep(step - 1)">Volver</PurrButton>
      </div>
      <div class="flex gap-8 *:cursor-pointer">
        <div @click="gotoStep(0)" class="p-1 hover:scale-125 transition-all" :class="step == 0 ? 'selected-step' : ''">
          <span class="block icon-[solar--cat-linear] text-3xl" role="img" aria-hidden="true" />
        </div>
        <div @click="gotoStep(1)" class="p-1 hover:scale-125 transition-all" :class="step == 1 ? 'selected-step' : ''">
          <span class="block icon-[solar--document-text-linear] text-3xl" role="img" aria-hidden="true" />
        </div>
        <div @click="gotoStep(2)" class="p-1 hover:scale-125 transition-all" :class="step == 2 ? 'selected-step' : ''">
          <span class="block icon-[solar--lock-keyhole-linear] text-3xl" role="img" aria-hidden="true" />
        </div>
      </div>
      <div class="w-1/3 flex justify-end">
        <PurrButton @click="step != 2 ? gotoStep(step + 1) : createCat()">{{ step != 2 ? 'Siguiente' : 'Finalizar' }}</PurrButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selected-step {
  @apply scale-125 text-black;
}

html.light .selected-step::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #7287fd;
  border-radius: 0.5rem;
}

html.dark .selected-step::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #b4befe;
  border-radius: 0.5rem;
}
</style>
