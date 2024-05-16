<script setup lang="ts">
import DeleteAccount from '@/components/app/settings/DeleteAccount.vue'
import { Switch } from '@/components/ui/switch'
import { useSettingsStore } from '@/stores/settingsStore'

import Logo from '@/assets/img/logo/black.webp'
import { useHead, useSeoMeta } from 'unhead'
import { useI18n } from 'vue-i18n'
import CreateEntityDialog from '@/components/app/settings/CreateEntityDialog.vue'
import ProfileEdit from '@/components/app/settings/ProfileEdit.vue'
import RegularButton from '@/components/utils/RegularButton.vue'

const { t } = useI18n()
const settingsStore = useSettingsStore()

useHead({
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
})

useSeoMeta({
  title: `${t('app.settings.metadata.title')} | purr.`,
  ogTitle: 'Manage Your Account Settings on purr.',
  description: 'Adjust your settings to tailor your purr. account to your preferences. Manage privacy, notifications, and account details securely.',
  ogDescription: 'Personalize your interaction on purr. with customizable settings. Control your privacy, manage notifications, and update your profile.',
  ogImage: Logo,
})
</script>

<template>
  <section v-if="settingsStore.settingsLoaded" class="mx-auto max-w-screen-md w-full">
    <h2 class="text-5xl lg:text-6xl text-center p-2 lg:p-4">{{ $t('app.settings.title') }}</h2>
    <div v-if="false">
      <h3 class="text-xl">Entidad</h3>
      <div>
        <p class="mb-4">Actualmente no eres una entidad legal</p>
        <CreateEntityDialog />
      </div>
      <hr class="h-px bg-ctp-lavender my-5" />
      <div v-for="(value, name) in settingsStore.settings" :key="name" class="flex gap-2">
        <!--  -->
        <Switch />
        <div>
          <div>{{ name }}</div>
          <div>{{ name }}</div>
        </div>
      </div>
      <hr class="h-px bg-ctp-lavender my-5" />
    </div>
    <h3 class="text-xl mb-4">{{ $t('app.settings.profileSettings') }}</h3>
    <div class="mb-4">
      <ProfileEdit>
        <RegularButton>
          <span>{{ $t('app.settings.settings.editProfile.name') }}</span>
        </RegularButton>
      </ProfileEdit>
    </div>
    <div>
      <DeleteAccount>
        <button type="button" class="flex items-center bg-ctp-mantle text-sm border border-red-500 text-red-500 hover:text-white hover:bg-red-500 font-medium rounded-lg py-2.5 px-7 transition-all">
          <span class="mr-2 h-4 w-4 icon-[solar--trash-bin-trash-linear]" role="img" aria-hidden="true" />
          <span>{{ $t('app.settings.settings.deleteAccount.name') }}</span>
        </button>
      </DeleteAccount>
      <p class="text-ctp-text/80 text-sm italic mt-2">{{ $t('app.settings.settings.deleteAccount.rickReference.quote') }}</p>
      <p class="text-ctp-text/80 text-sm italic text-end">{{ $t('app.settings.settings.deleteAccount.rickReference.attribution') }}</p>
    </div>
  </section>
  <div v-else>
    <h2 class="text-5xl lg:text-6xl text-center p-2 lg:p-4">{{ $t('app.settings.noSettings') }}</h2>
  </div>
</template>
