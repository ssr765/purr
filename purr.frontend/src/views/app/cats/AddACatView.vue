<script setup lang="ts">
import AddCatForm from '@/components/app/cats/create/AddACat/AddCatForm.vue'
</script>

<template>
  <section>
    <h2 class="text-5xl lg:text-6xl text-center p-2 lg:p-4">{{ $t('app.cats.create.addACat.content.title') }}</h2>
    <p class="text-center mb-8 lg:mb-16">{{ $t('app.cats.create.addACat.content.description') }}</p>
    <AddCatForm />
  </section>
</template>
