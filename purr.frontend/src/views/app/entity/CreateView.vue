<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useHead, useSeoMeta } from 'unhead'

import Logo from '@/assets/img/logo/black.webp'
import EntityForm from '@/components/app/entity/create/EntityForm.vue'

const { t } = useI18n()

useHead({
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
})

useSeoMeta({
  title: `${t('app.entity.create.metadata.title')} | purr.`,
  ogTitle: 'Register a Legal Entity on purr.',
  description: 'Become a legal entity on purr. to access additional features and services. Register your business or organization to unlock new opportunities.',
  ogDescription: 'Register your business or organization as a legal entity on purr. to access additional features and services. Unlock new opportunities for your entity.',
  ogImage: Logo,
})
</script>

<template>
  <section class="mx-auto max-w-screen-xl w-full">
    <h2 class="text-5xl lg:text-6xl text-center p-2 lg:p-4">Registrar una entidad</h2>
    <p class="text-center text-lg lg:text-xl mb-8 lg:mb-16">Al registrar una entidad en purr., tendras acceso a nuevas caracteristicas en la plataforma, como aumentar el limite de gatos, aparecer en los mapas segun el tipo de entidad que seas y hacer que los usuarios se puedan poner en contacto contigo para adoptar gatos.</p>
    <EntityForm />
  </section>
</template>
