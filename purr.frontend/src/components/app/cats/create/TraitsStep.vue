<script setup lang="ts">
import TraitsForm from './TraitsStep/TraitsForm.vue'
import { useCreateCatStore } from '@/stores/createCatStore'

const { catname } = useCreateCatStore()
</script>

<template>
  <section>
    <h2 class="text-5xl lg:text-6xl text-center p-2 lg:p-4">{{ catname !== 'sans' ? $t('app.cats.create.createCat.steps.traits.title') : 'NYEH HEH HEH HEH HEH HEH HEH HEH HEH!' }}</h2>
    <p class="text-center mb-8 lg:mb-16">{{ $t('app.cats.create.createCat.steps.traits.description') }}</p>
    <TraitsForm />
  </section>
</template>
