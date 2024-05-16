<script setup lang="ts">
import StartingForm from './StartingStep/StartingForm.vue'
</script>

<template>
  <section>
    <h2 class="text-5xl lg:text-6xl text-center p-2 lg:p-4">{{ $t('app.cats.create.createCat.steps.starting.title') }}</h2>
    <p class="text-center mb-8 lg:mb-16">{{ $t('app.cats.create.createCat.steps.starting.description') }}</p>
    <StartingForm />
    <RouterLink :to="{ name: 'app-cats-create-add-a-cat' }" class="mt-4 block text-center text-ctp-lavender font-semibold text-lg hover:underline">{{ $t('app.cats.create.createCat.steps.starting.alreadyExists') }}</RouterLink>
  </section>
</template>
