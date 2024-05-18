<script setup lang="ts">
import Logo from '@/assets/img/logo/black.webp'
import { useHead, useSeoMeta } from 'unhead'
import { useI18n } from 'vue-i18n'

const email = import.meta.env.VITE_CONTACT_EMAIL as string
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
  title: `${t('landing.cookiePolicy.metaTitle')} | purr. - ${t('slogan')}`,
  ogImage: Logo,
})
</script>

<template>
  <div class="h-40 flex items-center justify-center px-20 bg-ctp-lavender *:text-black">
    <h1 class="text-3xl md:text-5xl text-center font-semibold">{{ $t('landing.cookiePolicy.title') }}</h1>
  </div>
  <div class="p-10 mx-auto max-w-screen-lg space-y-8">
    <section>
      <p>{{ $t('landing.cookiePolicy.introduction') }}</p>
    </section>

    <section>
      <h2>{{ $t('landing.cookiePolicy.whatAreCookies.title') }}</h2>
      <p>{{ $t('landing.cookiePolicy.whatAreCookies.content') }}</p>
    </section>

    <section>
      <h2>{{ $t('landing.cookiePolicy.cookiesExplain.title') }}</h2>
      <p>{{ $t('landing.cookiePolicy.cookiesExplain.content') }}</p>
    </section>

    <section>
      <h3>{{ $t('landing.cookiePolicy.cookiesExplain.essential.title') }}</h3>
      <p>
        <strong>{{ $t('landing.cookiePolicy.cookiesExplain.essential.cookies.session.name') }}: </strong>
        <span>{{ $t('landing.cookiePolicy.cookiesExplain.essential.cookies.session.description') }}</span>
      </p>
      <p>
        <strong>{{ $t('landing.cookiePolicy.cookiesExplain.essential.cookies.xsrf.name') }}: </strong>
        <span>{{ $t('landing.cookiePolicy.cookiesExplain.essential.cookies.xsrf.description') }}</span>
      </p>
      <p>
        <strong>{{ $t('landing.cookiePolicy.cookiesExplain.essential.cookies.gdpr.name') }}: </strong>
        <span>{{ $t('landing.cookiePolicy.cookiesExplain.essential.cookies.gdpr.description') }}</span>
      </p>
    </section>

    <section>
      <h3>{{ $t('landing.cookiePolicy.cookiesExplain.necessary.title') }}</h3>
      <p>
        <strong>{{ $t('landing.cookiePolicy.cookiesExplain.necessary.cookies.locale.name') }}: </strong>
        <span>{{ $t('landing.cookiePolicy.cookiesExplain.necessary.cookies.locale.description') }}</span>
      </p>
    </section>

    <section>
      <h2>{{ $t('landing.cookiePolicy.noTracking.title') }}</h2>
      <p>{{ $t('landing.cookiePolicy.noTracking.content') }}</p>
    </section>

    <section>
      <h2>{{ $t('landing.cookiePolicy.cookieManagement.title') }}</h2>
      <p>{{ $t('landing.cookiePolicy.cookieManagement.content') }}</p>
    </section>

    <section>
      <h2>{{ $t('landing.cookiePolicy.policyUpdate.title') }}</h2>
      <p>{{ $t('landing.cookiePolicy.policyUpdate.content') }}</p>
    </section>

    <section>
      <strong>{{ $t('landing.cookiePolicy.contact', { email }) }}</strong>
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
