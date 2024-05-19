<script setup lang="ts">
import { ref } from 'vue'
import { useCreateCatStore } from '@/stores/createCatStore'
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'
import CatnameTooltip from '@/components/app/cats/create/StartingStep/CatnameTooltip.vue'
import { useImageChecker } from '@/composables/imageChecker'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'

const { t } = useI18n()
const imageChecker = useImageChecker()
const createCatStore = useCreateCatStore()

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (imageChecker.checkFile(file)) {
    createCatStore.avatar = file
    createCatStore.analyzeAvatar()
  }
}

const timeout = ref<any>(null)
const checkUsername = async () => {
  // Supose the catname is not valid when changing it.
  createCatStore.validCatname = false

  // Sintax validation.
  await validate()
  await validate() // Vee-validate for painfull form validation!!
  if (!meta.value.valid) {
    console.log('Not valid')
    createCatStore.checking = false
    return
  }

  // Stop checking if catname is empty.
  if (createCatStore.catname === '') {
    clearTimeout(timeout.value)
    timeout.value = null
    return
  }

  createCatStore.checking = true

  // Clear previous timeout to avoid multiple checking API calls.
  if (timeout.value) {
    clearTimeout(timeout.value)
  }

  // Check the catname if not writting for 2 seconds.
  timeout.value = setTimeout(async () => {
    if (meta.value.valid) {
      const exists = await createCatStore.checkCatname()

      if (!meta.value.valid) {
        createCatStore.checking = false
        createCatStore.validCatname = false
      } else {
        createCatStore.validCatname = !exists
        if (!exists) {
          toast.success(t('app.cats.create.createCat.toast.catnameAvailable'))
        } else {
          toast.error(t('app.cats.create.createCat.toast.catnameInUse'))
        }
      }
    }
    timeout.value = null
  }, 2000) // 2s
}

const formSchema = yup.object({
  catname: yup
    .string()
    .transform((curr, orig) => (orig === '' ? undefined : curr))
    .required(t('app.cats.create.createCat.validators.catname.required'))
    .min(3, t('app.cats.create.createCat.validators.catname.min'))
    .max(30, t('app.cats.create.createCat.validators.catname.max'))
    .matches(/^[\w\d\.]{3,30}$/, t('app.cats.create.createCat.validators.catname.regex')),
})

const { validate, meta } = useForm({
  validationSchema: formSchema,
})

const deleteAvatar = async () => {
  if (createCatStore.analyzing) return

  createCatStore.avatar = null
}
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-[auto,1fr] max-w-screen-lg mx-auto">
    <div class="relative">
      <div class="group relative size-[164px] mx-auto rounded-full">
        <img v-if="createCatStore.avatarUrl" :src="createCatStore.avatarUrl" class="absolute top-0 left-0 object-cover rounded-full size-[164px] scale-[1.01] mx-auto group-hover:hidden z-30" />
        <label for="cat-avatar-input" class="absolute top-0 left-0 rounded-full w-[164px] aspect-square mx-auto border-8 border-ctp-lavender border-dashed flex items-center justify-center group/avatar cursor-pointer hover:bg-ctp-lavender/25">
          <div class="text-center font-heading font-semibold text-ctp-text leading-5 w-3/4 group-hover/avatar:scale-105 transition-all">{{ $t('app.settings.settings.editProfile.sheet.avatarUpload') }}</div>
          <input :disabled="createCatStore.analyzing" @change="onChange" id="cat-avatar-input" type="file" class="hidden" />
        </label>
      </div>
      <div v-if="!createCatStore.analyzing" class="absolute left-1/2 translate-x-20 lg:translate-x-0 top-0 lg:left-auto lg:-top-6 lg:-right-4">
        <button v-if="createCatStore.avatarUrl" @click="!createCatStore.analyzing ? deleteAvatar() : null" class="cursor-pointer flex items-center justify-center bg-ctp-mantle text-white text-3xl rounded-full size-12 hover:bg-red-500 hover:bg-opacity-25 transition-all hover:text-red-600">
          <span class="icon-[solar--trash-bin-trash-linear]" role="img" aria-hidden="true" />
        </button>
      </div>
      <LoadingSpinner class="absolute left-1/2 translate-x-20 lg:translate-x-0 top-0 lg:left-auto lg:-top-6 lg:-right-4 text-4xl" v-else />
    </div>
    <div class="space-y-6">
      <div>
        <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">{{ $t('app.cats.create.createCat.steps.starting.form.name') }} *</label>
        <input v-model="createCatStore.name" type="text" id="first_name" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" required />
      </div>
      <div>
        <FormField v-slot="{ componentField }" name="catname">
          <FormItem>
            <FormLabel class="flex items-center gap-2 mb-2 text-sm font-medium text-ctp-text">
              <span>{{ $t('app.cats.create.createCat.steps.starting.form.catname') }} *</span>
              <CatnameTooltip />
            </FormLabel>
            <FormControl>
              <div class="flex relative">
                <span class="inline-flex items-center px-3 text-sm text-ctp-lavender bg-ctp-crust border rounded-e-0 border-ctp-lavender border-e-0 rounded-s-md">
                  <span class="icon-[solar--cat-linear] text-xl transition-colors" :class="createCatStore.validCatname ? 'animate-bounce text-ctp-green' : ''" role="img" aria-hidden="true" />
                </span>
                <Input @input="checkUsername" v-model="createCatStore.catname" class="rounded-none rounded-e-lg block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" type="text" v-bind="componentField" />
                <LoadingSpinner class="text-3xl absolute top-1/2 right-2 -translate-y-1/2" v-if="createCatStore.checking" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>
    <div class="lg:col-span-2">
      <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">{{ $t('app.cats.create.createCat.steps.starting.form.biography') }}</label>
      <textarea v-model="createCatStore.biography" id="message" rows="4" class="block p-2.5 w-full text-sm text-ctp-text bg-ctp-mantle rounded-lg border border-ctp-lavender focus:ring-ctp-lavender focus:border-ctp-lavender"></textarea>
    </div>
  </div>
</template>
