<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateCatStore } from '@/stores/createCatStore'
import { useI18n } from 'vue-i18n'

const createCatStore = useCreateCatStore()
const { t } = useI18n()

const formSchema = yup.object({
  password: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .min(8, t('app.cats.edit.validators.newPassword.min'))
    .max(50, t('app.cats.edit.validators.newPassword.max'))
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, t('app.cats.edit.validators.newPassword.regex', { chars: '@$!%*?&' })),
})

useForm({
  validationSchema: formSchema,
})
</script>

<template>
  <div class="max-w-screen-md mx-auto">
    <div class="space-y-3">
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">Contraseña *</FormLabel>
          <FormControl>
            <Input v-model="createCatStore.password" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="passwordConfirmation">
        <FormItem>
          <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">Repite la contraseña *</FormLabel>
          <FormControl>
            <Input v-model="createCatStore.confirmPassword" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
  </div>
</template>
