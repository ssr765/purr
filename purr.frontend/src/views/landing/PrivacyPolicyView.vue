<script setup lang="ts">
import Logo from '@/assets/img/logo/black.webp'
import { useSeoMeta } from 'unhead'
import { useI18n } from 'vue-i18n'

const email = import.meta.env.VITE_CONTACT_EMAIL as string
const { t } = useI18n()

useSeoMeta({
  title: `${t('landing.privacyPolicy.metaTitle')} | purr. - ${t('slogan')}`,
  ogImage: Logo,
})
</script>

<template>
  <div class="h-40 flex items-center justify-center px-20 bg-ctp-lavender *:text-black">
    <h1 class="text-3xl md:text-5xl text-center font-semibold">{{ $t('landing.privacyPolicy.title') }}</h1>
  </div>
  <div class="p-10 mx-auto max-w-screen-lg space-y-8">
    <section>
      <p>{{ $t('landing.privacyPolicy.introduction') }}</p>
    </section>

    <section>
      <h2>{{ $t('landing.privacyPolicy.informationCollected.title') }}</h2>
      <section>
        <h3>{{ $t('landing.privacyPolicy.informationCollected.userSpecific.title') }}</h3>
        <p>
          <strong>{{ $t('landing.privacyPolicy.informationCollected.userSpecific.name.name') }}: </strong>
          <span>{{ $t('landing.privacyPolicy.informationCollected.userSpecific.name.description') }}</span>
        </p>
        <p>
          <strong>{{ $t('landing.privacyPolicy.informationCollected.userSpecific.email.name') }}: </strong>
          <span>{{ $t('landing.privacyPolicy.informationCollected.userSpecific.email.description') }}</span>
        </p>
      </section>

      <section>
        <h4>{{ $t('landing.privacyPolicy.informationCollected.userSpecific.googleTitle') }}</h4>
        <p>
          <strong>{{ $t('landing.privacyPolicy.informationCollected.userSpecific.googleId.name') }}: </strong>
          <span>{{ $t('landing.privacyPolicy.informationCollected.userSpecific.googleId.description') }}</span>
        </p>
        <p>
          <strong>{{ $t('landing.privacyPolicy.informationCollected.userSpecific.googleAvatar.name') }}: </strong>
          <span>{{ $t('landing.privacyPolicy.informationCollected.userSpecific.googleAvatar.description') }}</span>
        </p>
      </section>
      <section>
        <h3>{{ $t('landing.privacyPolicy.informationCollected.catSpecific.title') }}</h3>
        <p>
          <strong>{{ $t('landing.privacyPolicy.informationCollected.catSpecific.traits.name') }}: </strong>
          <span>{{ $t('landing.privacyPolicy.informationCollected.catSpecific.traits.description') }}</span>
        </p>
        <p>
          <strong>{{ $t('landing.privacyPolicy.informationCollected.catSpecific.adoption.name') }}: </strong>
          <span>{{ $t('landing.privacyPolicy.informationCollected.catSpecific.adoption.description') }}</span>
        </p>
      </section>
    </section>

    <section>
      <h2>{{ $t('landing.privacyPolicy.informationUse.title') }}</h2>
      <p>{{ $t('landing.privacyPolicy.informationUse.content') }}</p>
    </section>

    <section>
      <h2>{{ $t('landing.privacyPolicy.informationSharing.title') }}</h2>
      <p>{{ $t('landing.privacyPolicy.informationSharing.content') }}</p>
      <ul>
        <li>{{ $t('landing.privacyPolicy.informationSharing.list.0') }}</li>
        <li>{{ $t('landing.privacyPolicy.informationSharing.list.1') }}</li>
      </ul>
    </section>

    <section>
      <h2>{{ $t('landing.privacyPolicy.privacyRights.title') }}</h2>
      <p>{{ $t('landing.privacyPolicy.privacyRights.content', { email }) }}</p>
    </section>

    <section>
      <h2>{{ $t('landing.privacyPolicy.informationSecurity.title') }}</h2>
      <p>{{ $t('landing.privacyPolicy.informationSecurity.content') }}</p>
    </section>

    <section>
      <h2>{{ $t('landing.privacyPolicy.policyUpdate.title') }}</h2>
      <p>{{ $t('landing.privacyPolicy.policyUpdate.content') }}</p>
    </section>

    <section>
      <strong>{{ $t('landing.privacyPolicy.contact', { email }) }}</strong>
    </section>
  </div>
</template>

<style scoped>
h2 {
  @apply text-3xl font-semibold mb-4;
}

h3 {
  @apply text-2xl font-semibold mb-2;
}

h4 {
  @apply text-xl font-semibold mb-1.5;
}

ul {
  @apply list-disc ml-4;
}

p {
  @apply mb-1;
}

section {
  @apply mb-4;
}
</style>
