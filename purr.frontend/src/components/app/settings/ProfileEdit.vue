<script setup lang="ts">
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import PurrButton from '@/components/utils/PurrButton.vue'
import { useUserService } from '@/services/userService'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'
import { useI18n } from 'vue-i18n'

const userService = useUserService()
const { user } = storeToRefs(useAuthStore())
const { t } = useI18n()

const formSchema = yup.object({
  name: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .min(3, t('app.settings.settings.editProfile.validators.name.min'))
    .max(50, t('app.settings.settings.editProfile.validators.name.max')),

  username: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .min(3, t('app.settings.settings.editProfile.validators.username.min'))
    .max(30, t('app.settings.settings.editProfile.validators.username.max'))
    .matches(/^[\w\d\.]{3,30}$/, t('app.settings.settings.editProfile.validators.username.regex')),

  email: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .email('El email no es válido'),

  password: yup
    //
    .string()
    .required(t('app.settings.settings.editProfile.validators.password.required')),

  new_password: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .min(8, t('app.settings.settings.editProfile.validators.newPassword.min'))
    .max(50, t('app.settings.settings.editProfile.validators.newPassword.max'))
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, t('app.settings.settings.editProfile.validators.newPassword.regex', { chars: '@$!%*?&' })),
})

const { validate, handleSubmit, meta } = useForm({
  validationSchema: formSchema,
})

const inputValidate = async () => {
  try {
    await validate()
  } catch (error) {
    console.log(error)
  }
}

const loading = ref(false)
const file = ref<File | null>(null)
const fileUrl = computed(() => (file.value ? URL.createObjectURL(file.value) : ''))

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const fileInput = target.files?.[0]
  if (!fileInput) return
  file.value = fileInput
  submitAvatar()
}

const submitAvatar = async () => {
  if (!file.value) return

  try {
    loading.value = true
    const response = await userService.uploadAvatar(user.value!.id, file.value)
    toast.success(t('app.settings.settings.editProfile.toast.avatarUpload.success'))
    user.value!.avatar = response.avatar
    file.value = null
  } catch (error) {
    console.log(error)
    toast.error(t('app.settings.settings.editProfile.toast.avatarUpload.error'))
  } finally {
    loading.value = false
  }
}

const deleteAvatar = async () => {
  try {
    loading.value = true
    await userService.deleteAvatar(user.value!.id)
    user.value!.avatar = undefined
    toast.success(t('app.settings.settings.editProfile.toast.avatarDelete.success'))
  } catch (error) {
    console.log(error)
    toast.error(t('app.settings.settings.editProfile.toast.avatarDelete.error'))
  } finally {
    loading.value = false
  }
}

const submit = handleSubmit(async (values) => {
  try {
    loading.value = true
    const response = await userService.editProfile(user.value!.id, {
      name: values.name ?? user.value!.name,
      username: values.username ?? user.value!.username,
      email: values.email ?? user.value!.email,
      password: values.password,
      new_password: values.new_password,
    })

    user.value = response
    toast.success(t('app.settings.settings.editProfile.toast.profileUpdate.success'))
  } catch (error) {
    console.log(error)
    toast.error(t('app.settings.settings.editProfile.toast.profileUpdate.error'))
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <Sheet>
    <SheetTrigger>
      <slot />
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle class="mb-4">{{ $t('app.settings.settings.editProfile.sheet.title') }}</SheetTitle>

        <div class="relative">
          <div class="group relative size-[164px] mx-auto rounded-full">
            <img v-if="fileUrl || user!.avatar" :src="fileUrl ? fileUrl : user!.avatar" class="absolute top-0 left-0 object-cover rounded-full size-[164px] scale-[1.01] mx-auto group-hover:hidden z-30" />
            <label for="cat-avatar-input" class="absolute top-0 left-0 rounded-full w-[164px] aspect-square mx-auto border-8 border-ctp-lavender border-dashed flex items-center justify-center group/avatar cursor-pointer hover:bg-ctp-lavender/25">
              <div class="text-center font-heading font-semibold text-ctp-text leading-5 w-3/4 group-hover/avatar:scale-105 transition-all">{{ $t('app.settings.settings.editProfile.sheet.avatarUpload') }}</div>
              <input :disabled="loading" @change="onChange" id="cat-avatar-input" type="file" class="hidden" />
            </label>
          </div>
          <div v-if="!loading" class="absolute top-0 right-0">
            <button v-if="user!.avatar" @click="!loading ? deleteAvatar() : null" class="cursor-pointer flex items-center justify-center bg-ctp-mantle text-white text-3xl rounded-full size-12 hover:bg-red-500 hover:bg-opacity-25 transition-all hover:text-red-600">
              <span class="icon-[solar--trash-bin-trash-linear]" role="img" aria-hidden="true" />
            </button>
          </div>
          <LoadingSpinner class="absolute top-0 right-0 text-4xl" v-else />
        </div>

        <div class="space-y-2.5 mb-4">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">{{ $t('app.settings.settings.editProfile.sheet.name') }}</FormLabel>
              <FormControl>
                <Input @input="inputValidate" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" :placeholder="user!.name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">{{ $t('app.settings.settings.editProfile.sheet.username') }}</FormLabel>
              <FormControl>
                <Input @input="inputValidate" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" :placeholder="user!.username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">{{ $t('app.settings.settings.editProfile.sheet.email') }}</FormLabel>
              <FormControl>
                <Input @input="inputValidate" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" :placeholder="user!.email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">{{ $t('app.settings.settings.editProfile.sheet.password') }} *</FormLabel>
              <FormControl>
                <Input @input="inputValidate" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" placeholder="••••••••" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="new_password">
            <FormItem>
              <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">{{ $t('app.settings.settings.editProfile.sheet.newPassword') }}</FormLabel>
              <FormControl>
                <Input @input="inputValidate" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" placeholder="••••••••" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <div>
          <SheetClose as-child>
            <PurrButton :disabled="!meta.valid" class="w-full" @click="submit">
              <span>{{ $t('app.settings.settings.editProfile.sheet.button') }}</span>
            </PurrButton>
          </SheetClose>
        </div>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
