<script setup lang="ts">
import PurrButton from '@/components/utils/PurrButton.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCatService } from '@/services/catService'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'
import type { AxiosError } from 'axios'
import { toast } from 'vue-sonner'

const catService = useCatService()
const router = useRouter()

const loading = ref(false)

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

const { handleSubmit, values } = useForm({
  validationSchema: formSchema,
})

const submit = handleSubmit(async () => {
  try {
    loading.value = true
    await catService.addCat(values.catname, values.password)
    router.push({ name: 'app-cats-profile', params: { catname: values.catname } })
  } catch (error) {
    const axiosError = error as AxiosError
    if (axiosError.response?.status === 409) {
      toast.error('Ya tienes el gato con ese catname')
    }
    if (axiosError.response?.status === 403) {
      toast.error('Contraseña incorrecta')
    }
  } finally {
    loading.value = false
  }
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
    <PurrButton v-if="!loading" class="w-full lg:w-auto mx-auto" @click="submit">Añadir gato</PurrButton>
    <LoadingSpinner v-else class="text-4xl mx-auto" />
  </div>
</template>
