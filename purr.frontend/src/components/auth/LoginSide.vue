<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import PurrButton from '@/components/utils/PurrButton.vue'
import GoogleButton from '@/components/utils/auth/GoogleButton.vue'
import PurrLogo from '../utils/PurrLogo.vue'
import LoadingSpinner from '../utils/LoadingSpinner.vue'

const authStore = useAuthStore()

const login = () => {
  authStore.login(email.value, password.value)
}

const email = ref('')
const password = ref('')
</script>

<template>
  <aside class="h-dvh flex flex-col items-center justify-center w-full gap-16 p-16">
    <PurrLogo class="size-36" />

    <form @submit.prevent="login()" class="max-w-sm w-full mx-auto space-y-8">
      <div class="space-y-4">
        <div class="relative z-0 w-full group">
          <input v-model="email" type="email" id="login_email" class="block py-2.5 px-0 w-full text-sm text-ctp-text bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-ctp-lavender peer" placeholder=" " required />
          <label for="login_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-ctp-lavender peer-focus:dark:text-ctp-lavender peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{{ $t('auth.login.email') }}</label>
        </div>
        <div class="relative z-0 w-full group">
          <input v-model="password" type="password" id="login_password" class="block py-2.5 px-0 w-full text-sm text-ctp-text bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-ctp-lavender peer" placeholder=" " required />
          <label for="login_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-ctp-lavender peer-focus:dark:text-ctp-lavender peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{{ $t('auth.login.password') }}</label>
        </div>
      </div>
      <div v-if="!authStore.loading" class="flex flex-col gap-2">
        <PurrButton type="submit" class="mx-auto w-full"> {{ $t('auth.login.button') }}</PurrButton>
        <!-- <GoogleButton /> -->
      </div>
      <div v-else>
        <LoadingSpinner class="text-5xl" />
      </div>
    </form>
    <p class="text-center">
      {{ $t('auth.login.noAccount.content') }} <RouterLink class="text-ctp-lavender" :to="{ name: 'auth-register' }"> {{ $t('auth.login.noAccount.link') }} </RouterLink>
    </p>
  </aside>
</template>
