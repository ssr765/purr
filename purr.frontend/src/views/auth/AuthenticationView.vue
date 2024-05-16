<script setup lang="ts">
import LoginSide from '@/components/auth/LoginSide.vue'
import RegisterSide from '@/components/auth/RegisterSide.vue'

import Logo from '@/assets/img/logo/black.webp'
import { useSeoMeta } from 'unhead'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()

const dynamicMetadata = (name: string) => {
  if (name === 'auth-login') {
    useSeoMeta({
      title: `${t('auth.login.metaTitle')} | purr. - ${t('slogan')}`,
      ogTitle: 'Log In to your purr. Account',
      description: 'Log in to start sharing and enjoying exclusive cat content. Connect and interact with cat lovers on purr., your cat community.',
      ogDescription: 'Sign in to purr. to post, comment, and enjoy the ultimate cat social network. Engage with a global community of cat enthusiasts.',
      ogImage: Logo,
    })
  } else if (name === 'auth-register') {
    useSeoMeta({
      title: `${t('auth.register.metaTitle')} | purr. - ${t('slogan')}`,
      ogTitle: 'Sign Up and join purr. Today',
      description: 'Register to join purr., the social network just for cats and their enthusiasts. Start creating cat profiles and connect globally.',
      ogDescription: 'Sign up for purr. to begin posting and sharing as your cat. Connect with cat lovers worldwide and enjoy exclusive features.',
      ogImage: Logo,
    })
  }
}

watch(
  () => route.name,
  (name) => {
    dynamicMetadata(String(name))
  },
)

dynamicMetadata(String(route.name))

defineProps({
  mode: String,
})
</script>

<template>
  <div class="overflow-hidden h-dvh">
    <section class="grid grid-cols-2 w-[200%] lg:grid-cols-4 2xl:grid-cols-5 lg:w-[133.33%] 2xl:w-[125%] transition-transform duration-1000" :class="{ '-translate-x-1/2 lg:-translate-x-1/4 2xl:-translate-x-[20%]': mode === 'register' }">
      <LoginSide />
      <div class="hidden lg:block lg:col-span-2 2xl:col-span-3 rounded-xl overflow-hidden max-h-dvh">
        <img class="w-full h-full object-cover" src="/img/mockcat.webp" alt="" />
      </div>
      <RegisterSide />
    </section>
  </div>
</template>
