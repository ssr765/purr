<script setup lang="ts">
import PurrButton from '@/components/utils/PurrButton.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = yup.object({
  catname: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .required('El catname es obligatorio')
    .matches(/^[\w\d\.]{3,30}$/, 'El catname no es válido'),

  password: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .required('La contraseña es obligatoria'),
})

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const submit = handleSubmit(async () => {
  console.log('Add a cat')
})
</script>

<template>
  <div class="space-y-6 max-w-screen-md mx-auto">
    <FormField v-slot="{ componentField }" name="catname">
      <FormItem>
        <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">Catname del gato</FormLabel>
        <FormControl>
          <Input class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">Contraseña</FormLabel>
        <FormControl>
          <Input class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <PurrButton class="w-full lg:w-auto mx-auto" @click="submit">Añadir gato</PurrButton>
  </div>
</template>
