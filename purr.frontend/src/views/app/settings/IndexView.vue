<script setup lang="ts">
import DeleteAccount from '@/components/app/settings/DeleteAccount.vue'
import { Switch } from '@/components/ui/switch'
import { useSettingsStore } from '@/stores/settingsStore'
const settingsStore = useSettingsStore()
</script>

<template>
  <section v-if="settingsStore.settingsLoaded" class="mx-auto max-w-screen-md w-full">
    <h2 class="text-5xl lg:text-6xl text-center p-2 lg:p-4">{{ $t('app.settings.title') }}</h2>
    <div v-for="(value, name) in settingsStore.settings" :key="name" class="flex gap-2">
      <!--  -->
      <Switch />
      <div>
        <div>{{ name }}</div>
        <div>{{ name }}</div>
      </div>
    </div>

    <DeleteAccount>
      <button type="button" class="flex items-center bg-ctp-mantle text-red-500 hover:text-white hover:bg-red-500 font-medium rounded-lg py-2.5 px-7 transition-all">
        <span class="mr-2 h-4 w-4 icon-[solar--trash-bin-trash-linear]" role="img" aria-hidden="true" />
        <span>{{ $t('app.settings.settings.deleteAccount.name') }}</span>
      </button>
    </DeleteAccount>
  </section>
  <div v-else>
    <h1>Ajustes no disponibles</h1>
  </div>
</template>
