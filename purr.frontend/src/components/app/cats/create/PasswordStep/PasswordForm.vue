<script setup lang="ts">
import { useCreateCatStore } from '@/stores/createCat'

const createCatStore = useCreateCatStore()
</script>

<template>
  <div class="space-y-6 max-w-screen-md mx-auto">
    <div>
      <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">Contraseña *</label>
      <input v-model="createCatStore.password" type="password" id="first_name" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" required />
    </div>
    <div>
      <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">Repite la contraseña *</label>
      <input v-model="createCatStore.confirmPassword" type="password" id="first_name" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" required />
    </div>
  </div>
</template>
