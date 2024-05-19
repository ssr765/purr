<script setup lang="ts">
import { useCreateCatStore } from '@/stores/createCatStore'

const createCatStore = useCreateCatStore()
</script>

<template>
  <div class="space-y-6 max-w-screen-md mx-auto">
    <div>
      <label for="password_step_password" class="block mb-2 text-sm font-medium text-ctp-text">{{ $t('app.cats.create.createCat.steps.password.form.password') }} *</label>
      <input v-model="createCatStore.password" type="password" id="password_step_password" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" required />
    </div>
    <div>
      <label for="password_step_password_confirmation" class="block mb-2 text-sm font-medium text-ctp-text">{{ $t('app.cats.create.createCat.steps.password.form.passwordConfirmation') }} *</label>
      <input v-model="createCatStore.confirmPassword" type="password" id="password_step_password_confirmation" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" required />
    </div>
  </div>
</template>
