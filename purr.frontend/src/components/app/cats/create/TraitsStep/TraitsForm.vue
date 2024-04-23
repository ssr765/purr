<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { toDate } from 'radix-vue/date'
import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCreateCatStore } from '@/stores/createCat'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const createCatStore = useCreateCatStore()

const df = new DateFormatter('es-ES', {
  dateStyle: 'long',
})

const formSchema = yup.object({
  sex: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .required('El sexo del gato es obligatorio')
    .oneOf(['M', 'F'], 'El sexo del gato debe ser macho o hembra'),

  breed: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .min(3, 'La raza debe tener como mínimo 3 caracteres')
    .max(50, 'La raza debe tener como máximo 50 caracteres'),

  color: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .min(3, 'La raza debe tener como mínimo 3 caracteres')
    .max(50, 'La raza debe tener como máximo 50 caracteres'),
})

const { validate, values } = useForm({
  validationSchema: formSchema,
})

const validar = async () => {
  console.log(values)
  try {
    const v = await validate()
    createCatStore.steps[2] = v.valid
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="space-y-6 max-w-screen-md mx-auto">
    <FormField v-slot="{ componentField }" name="sex">
      <FormItem>
        <FormLabel>Sexo del gato *</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger class="bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5">
              <SelectValue placeholder="Selecciona un sexo" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="M"> Macho </SelectItem>
              <SelectItem value="F"> Hembra </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="breed">
      <FormItem>
        <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">Raza del gato</FormLabel>
        <FormControl>
          <Input @input="validar" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="color">
      <FormItem>
        <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">Color del gato</FormLabel>
        <FormControl>
          <Input @input="validar" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Popover>
      <PopoverTrigger class="w-full">
        <div>
          <label class="text-left block mb-2 text-sm font-medium text-ctp-text">Nacimiento del gato</label>
          <div class="flex items-center gap-2 bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5">
            <span class="icon-[solar--calendar-mark-linear]" role="img" aria-hidden="true" />
            <span>{{ createCatStore.birthdateInput ? df.format(toDate(createCatStore.birthdateInput)) : 'Elige fecha' }}</span>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <Calendar initial-focus :min-value="new CalendarDate(1990, 1, 1)" :max-value="today(getLocalTimeZone())" @update:model-value="(v) => (createCatStore.birthdateInput = v)" v-model="createCatStore.birthdateInput" />
      </PopoverContent>
    </Popover>
  </div>
</template>
