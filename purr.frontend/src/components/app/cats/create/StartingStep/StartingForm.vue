<script setup lang="ts">
import { ref } from 'vue'
import { useCreateCatStore } from '@/stores/createCat'
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'

const createCatStore = useCreateCatStore()

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  createCatStore.avatar = file
}

const timeout = ref<any>(null)
const checkUsername = () => {
  // Stop checking if catname is empty.
  if (createCatStore.catname === '') {
    clearTimeout(timeout.value)
    timeout.value = null
    return
  }

  createCatStore.checking = true

  // Supose the catname is not valid when changing it.
  createCatStore.validCatname = false

  // Clear previous timeout to avoid multiple checking API calls.
  if (timeout.value) {
    clearTimeout(timeout.value)
  }

  // Check the catname if not writting for 2 seconds.
  timeout.value = setTimeout(async () => {
    await createCatStore.checkCatname()
    timeout.value = null
  }, 2000) // 2s
}
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-[auto,1fr] max-w-screen-lg mx-auto">
    <div>
      <img v-if="createCatStore.avatarUrl" :src="createCatStore.avatarUrl" class="object-cover rounded-full w-[164px] h-[164px] mx-auto mt-4" />
      <label v-else for="cat-avatar-input" class="rounded-full w-[164px] aspect-square mx-auto border-8 border-ctp-lavender border-dashed flex items-center justify-center group/avatar cursor-pointer hover:bg-ctp-lavender/25">
        <div class="text-center font-heading font-semibold text-ctp-text leading-5 w-3/4 group-hover/avatar:scale-105 transition-all">Sube el avatar de tu gato</div>
        <input @change="onChange" id="cat-avatar-input" type="file" class="hidden" />
      </label>
    </div>
    <div class="space-y-6">
      <div>
        <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">Nombre del gato *</label>
        <input v-model="createCatStore.name" type="text" id="first_name" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" required />
      </div>
      <div>
        <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">Catname *</label>
        <div class="flex relative">
          <span class="inline-flex items-center px-3 text-sm text-ctp-lavender bg-ctp-crust border rounded-e-0 border-ctp-lavender border-e-0 rounded-s-md">
            <span class="icon-[solar--cat-linear] text-xl transition-colors" :class="createCatStore.validCatname ? 'animate-bounce text-ctp-green' : ''" role="img" aria-hidden="true" />
          </span>
          <input @input="checkUsername" v-model="createCatStore.catname" type="text" id="website-admin" class="rounded-none rounded-e-lg block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" />
          <LoadingSpinner class="text-3xl absolute top-1/2 right-2 -translate-y-1/2" v-if="timeout !== null" />
        </div>
      </div>
    </div>
    <div class="lg:col-span-2">
      <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">Biografía del gato</label>
      <textarea v-model="createCatStore.biography" id="message" rows="4" class="block p-2.5 w-full text-sm text-ctp-text bg-ctp-mantle rounded-lg border border-ctp-lavender focus:ring-ctp-lavender focus:border-ctp-lavender"></textarea>
    </div>
  </div>
</template>
