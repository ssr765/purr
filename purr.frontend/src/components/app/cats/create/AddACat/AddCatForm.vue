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
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import { useI18n } from 'vue-i18n'

const catService = useCatService()
const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const { t } = useI18n()

const loading = ref(false)

const formSchema = yup.object({
  catname: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .required(t('app.cats.create.addACat.validators.catname.required'))
    .matches(/^[\w\d\.]{3,30}$/, t('app.cats.create.addACat.validators.catname.regex')),

  password: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .required(t('app.cats.create.addACat.validators.password.required')),
})

const { handleSubmit, values } = useForm({
  validationSchema: formSchema,
})

const submit = handleSubmit(async () => {
  try {
    loading.value = true
    const cat = await catService.addCat(values.catname, values.password)
    if (!user.value!.cats) {
      user.value!.cats = []
    }

    user.value!.cats.push(cat)
    router.push({ name: 'app-cats-profile', params: { catname: cat.catname } })
    toast.success(t('app.cats.create.addACat.toast.success', { cat_name: cat.name }))
  } catch (error) {
    const axiosError = error as AxiosError
    if (axiosError.response?.status === 409) {
      toast.error('El gato con ese catname ya te pertenece')
    } else if (axiosError.response?.status === 403) {
      toast.error(t('app.cats.create.addACat.toast.wrongPassword'))
    } else {
      toast.error(t('app.cats.create.addACat.toast.error'))
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
        <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">{{ $t('app.cats.create.addACat.content.catname') }}</FormLabel>
        <FormControl>
          <Input class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">{{ $t('app.cats.create.addACat.content.password') }}</FormLabel>
        <FormControl>
          <Input class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <PurrButton v-if="!loading" class="w-full lg:w-auto mx-auto" @click="submit">{{ $t('app.cats.create.addACat.content.button') }}</PurrButton>
    <LoadingSpinner v-else class="text-4xl mx-auto" />
  </div>
</template>
