<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import PurrButton from '@/components/utils/PurrButton.vue'

const authStore = useAuthStore()

const register = () => {
  const data = {
    name: name.value,
    username: username.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
  }
  authStore.register(data)
}

const name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
</script>

<template>
  <aside class="h-dvh flex flex-col items-center justify-center w-full gap-16 p-16">
    <img class="dark:hidden w-36" src="/img/logo/dark.webp" alt="" />
    <img class="hidden dark:block w-36" src="/img/logo/light.webp" alt="" />

    <form @submit.prevent="register()" class="max-w-sm w-full mx-auto">
      <div class="relative z-0 w-full mb-5 group">
        <input v-model="name" type="text" id="register_name" class="block py-2.5 px-0 w-full text-sm text-ctp-text bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-ctp-lavender peer" placeholder=" " required />
        <label for="register_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-ctp-lavender peer-focus:dark:text-ctp-lavender peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{{ $t('auth.register.name') }} </label>
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input v-model="username" type="text" id="register_username" class="block py-2.5 px-0 w-full text-sm text-ctp-text bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-ctp-lavender peer" placeholder=" " required />
        <label for="register_username" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-ctp-lavender peer-focus:dark:text-ctp-lavender peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{{ $t('auth.register.username') }} </label>
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input v-model="email" type="email" id="register_email" class="block py-2.5 px-0 w-full text-sm text-ctp-text bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-ctp-lavender peer" placeholder=" " required />
        <label for="register_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-ctp-lavender peer-focus:dark:text-ctp-lavender peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{{ $t('auth.register.email') }} </label>
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input v-model="password" type="password" id="register_password" class="block py-2.5 px-0 w-full text-sm text-ctp-text bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-ctp-lavender peer" placeholder=" " required />
        <label for="register_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-ctp-lavender peer-focus:dark:text-ctp-lavender peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{{ $t('auth.register.password') }} </label>
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input v-model="password_confirmation" type="password" id="register_repeat_password" class="block py-2.5 px-0 w-full text-sm text-ctp-text bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-ctp-lavender peer" placeholder=" " required />
        <label for="register_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-ctp-lavender peer-focus:dark:text-ctp-lavender peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{{ $t('auth.register.passwordConfirmation') }} </label>
      </div>

      <PurrButton type="submit" class="mx-auto"> {{ $t('auth.register.button') }}</PurrButton>
      <button type="submit" class="block mx-auto text-ctp-base bg-ctp-lavender hover:bg-ctp-lavender/80 focus:ring-4 focus:outline-none focus:ring-ctp-lavender font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{{ $t('auth.register.button') }}</button>
    </form>

    <p class="text-center">
      {{ $t('auth.register.haveAccount.content') }} <RouterLink class="text-ctp-lavender" :to="{ name: 'auth-login' }"> {{ $t('auth.register.haveAccount.link') }} </RouterLink>
    </p>
  </aside>
</template>
