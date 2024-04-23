<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateCatStore } from '@/stores/createCat'

const createCatStore = useCreateCatStore()

const formSchema = yup.object({
  password: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .required('La confirmación de la contraseña es obligatoria')
    .oneOf([yup.ref('passwordConfirmation'), null], 'Las contraseñas no coinciden'),

  passwordConfirmation: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .min(8, 'La contraseña debe tener como mínimo 8 caracteres')
    .max(50, 'La contraseña debe tener como máximo 50 caracteres')
    .required('La contraseña es obligatoria'),
})

const { validate } = useForm({
  validationSchema: formSchema,
})

const validar = async () => {
  try {
    const v = await validate()
    createCatStore.steps[2] = v.valid
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="max-w-screen-md mx-auto">
    <div class="space-y-3">
      <button @click="$emit('valid', true)">nahh</button>
      <FormField v-slot="{ componentField }" name="passwordConfirmation">
        <FormItem>
          <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">Contraseña *</FormLabel>
          <FormControl>
            <Input @input="validar" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">Repite la contraseña *</FormLabel>
          <FormControl>
            <Input @input="validar" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
  </div>
</template>
