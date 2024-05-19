<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'
import PurrButton from '@/components/utils/PurrButton.vue'
import type { Cat } from '@/models/Cat'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { computed, ref, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import * as yup from 'yup'
import { useCatService } from '@/services/catService'
import { toast } from 'vue-sonner'
import { useCatStore } from '@/stores/catStore'
import { Checkbox } from '@/components/ui/checkbox'

const catStore = useCatStore()
const catService = useCatService()
const { user } = storeToRefs(useAuthStore())
const { t } = useI18n()

const loading = ref(false)
const file = ref<File | null>(null)
const fileUrl = computed(() => (file.value ? URL.createObjectURL(file.value) : null))

const formSchema = yup.object({
  name: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .min(3, t('app.cats.edit.validators.name.min'))
    .max(50, t('app.cats.edit.validators.name.max')),

  catname: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .min(3, t('app.cats.edit.validators.catname.min'))
    .max(30, t('app.cats.edit.validators.catname.max'))
    .matches(/^[\w\d\.]{3,30}$/, t('app.cats.edit.validators.catname.regex')),

  breed: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .min(3, t('app.cats.edit.validators.breed.min'))
    .max(50, t('app.cats.edit.validators.breed.max')),

  color: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .min(3, t('app.cats.edit.validators.color.min'))
    .max(50, t('app.cats.edit.validators.color.max')),

  biography: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .max(255, t('app.cats.edit.validators.biography.max')),

  password: yup
    //
    .string()
    .required(t('app.cats.edit.validators.password.required')),

  new_password: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .min(8, t('app.cats.edit.validators.newPassword.min'))
    .max(50, t('app.cats.edit.validators.newPassword.max'))
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, t('app.cats.edit.validators.newPassword.regex', { chars: '@$!%*?&' })),
})

const { handleSubmit, meta } = useForm({
  validationSchema: formSchema,
})

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
    const response = await catService.uploadAvatar(props.cat.id, file.value)
    toast.success(t('app.settings.settings.editProfile.toast.avatarUpload.success'))
    // Force image reload
    catStore.cat.avatar = response.avatar + '?' + Date.now()
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
    await catService.deleteAvatar(props.cat.id)
    catStore.cat!.avatar = undefined
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
    const response = await catService.editProfile(props.cat.id, {
      name: values.name ?? props.cat.name,
      catname: values.catname ?? props.cat.catname,
      breed: values.breed ?? props.cat.breed,
      color: values.color ?? props.cat.color,
      biography: values.biography ?? props.cat.biography,
      password: values.password,
      new_password: values.new_password,
      new_password_confirmation: values.new_password_confirmation,
      adoption: values.adoption === undefined ? props.cat.adoption : values.adoption,
    })

    catStore.cat! = response
    toast.success(t('app.settings.settings.editProfile.toast.profileUpdate.success'))
  } catch (error) {
    console.log(error)
    toast.error(t('app.settings.settings.editProfile.toast.profileUpdate.error'))
  } finally {
    loading.value = false
  }
})

const props = defineProps({
  cat: {
    type: Object as PropType<Cat>,
    required: true,
  },
})
</script>

<template>
  <Sheet class="h-dvh">
    <SheetTrigger>
      <slot />
    </SheetTrigger>
    <SheetContent class="h-dvh">
      <SheetHeader>
        <SheetTitle class="mb-4">{{ $t('app.cats.edit.sheet.title') }}</SheetTitle>

        <div class="relative">
          <div class="group relative size-[164px] mx-auto rounded-full">
            <img v-if="fileUrl || cat.avatar" :src="fileUrl ? fileUrl : cat.avatar" class="absolute top-0 left-0 object-cover rounded-full size-[164px] scale-[1.01] mx-auto group-hover:hidden z-30" />
            <label for="cat-avatar-input" class="absolute top-0 left-0 rounded-full w-[164px] aspect-square mx-auto border-8 border-ctp-lavender border-dashed flex items-center justify-center group/avatar cursor-pointer hover:bg-ctp-lavender/25">
              <div class="text-center font-heading font-semibold text-ctp-text leading-5 w-3/4 group-hover/avatar:scale-105 transition-all">{{ $t('app.cats.edit.sheet.avatarUpload') }}</div>
              <input :disabled="loading" @change="onChange" id="cat-avatar-input" type="file" class="hidden" />
            </label>
          </div>
          <div v-if="!loading" class="absolute top-0 right-0">
            <button v-if="cat.avatar" @click="!loading ? deleteAvatar() : null" class="cursor-pointer flex items-center justify-center bg-ctp-mantle text-white text-3xl rounded-full size-12 hover:bg-red-500 hover:bg-opacity-25 transition-all hover:text-red-600">
              <span class="icon-[solar--trash-bin-trash-linear]" role="img" aria-hidden="true" />
            </button>
          </div>
          <LoadingSpinner class="absolute top-0 right-0 text-4xl" v-else />
        </div>

        <div class="h-[calc(100dvh-256px)] overflow-y-auto">
          <div class="space-y-2.5 mb-4">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">{{ $t('app.cats.edit.sheet.name') }}</FormLabel>
                <FormControl>
                  <Input class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" :placeholder="cat.name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="catname">
              <FormItem>
                <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">{{ $t('app.cats.edit.sheet.catname') }}</FormLabel>
                <FormControl>
                  <Input class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" :placeholder="cat.catname" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="breed">
              <FormItem>
                <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">{{ $t('app.cats.edit.sheet.breed') }}</FormLabel>
                <FormControl>
                  <Input class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" :placeholder="cat.breed" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="color">
              <FormItem>
                <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">{{ $t('app.cats.edit.sheet.color') }}</FormLabel>
                <FormControl>
                  <Input class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" :placeholder="cat.color" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="biography">
              <FormItem>
                <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">{{ $t('app.cats.edit.sheet.biography') }}</FormLabel>
                <FormControl>
                  <Textarea class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" :placeholder="cat.biography" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">{{ $t('app.cats.edit.sheet.password') }} *</FormLabel>
                <FormControl>
                  <Input class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" placeholder="••••••••" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="new_password">
              <FormItem>
                <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">{{ $t('app.cats.edit.sheet.newPassword') }}</FormLabel>
                <FormControl>
                  <Input class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" placeholder="••••••••" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="new_password_confirmation">
              <FormItem>
                <FormLabel class="font-bold block mb-2 text-sm text-ctp-text">{{ $t('app.cats.edit.sheet.newPasswordConfirmation') }}</FormLabel>
                <FormControl>
                  <Input class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" placeholder="••••••••" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ value, handleChange }" type="checkbox" name="adoption">
              <FormItem class="flex flex-row items-start gap-x-3 space-y-0 rounded-md p-4">
                <FormControl>
                  <Checkbox :checked="value" @update:checked="handleChange" />
                </FormControl>
                <div class="space-y-1 leading-none">
                  <FormLabel>Gato en adopción</FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>

            <div>
              <SheetClose as-child>
                <PurrButton :disabled="!meta.valid" class="w-full" @click="submit">
                  <span>{{ $t('app.cats.edit.sheet.button') }}</span>
                </PurrButton>
              </SheetClose>
            </div>
          </div>
        </div>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
