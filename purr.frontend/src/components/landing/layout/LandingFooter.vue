<script setup lang="ts">
import PurrLogo from '@/components/utils/PurrLogo.vue'
</script>

<template>
  <footer class="bg-ctp-crust p-8 lg:p-10">
    <div class="mx-auto max-w-screen-xl text-center">
      <a href="#" class="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white flex-col gap-2">
        <PurrLogo class="size-20" />
        <span class="self-center whitespace-nowrap">purr.</span>
      </a>
      <p class="my-4">{{ $t('landing.footer.content') }}</p>
      <hr class="opacity-30 h-px bg-ctp-lavender my-2 w-[400px] mx-auto" />
      <p class="my-4 font-light">
        <RouterLink @click="$scrollToTop" :to="{ name: 'landing-privacy-policy' }" class="hover:underline">{{ $t('landing.footer.privacyPolicy') }}</RouterLink>
      </p>
      <hr class="opacity-30 h-px bg-ctp-lavender my-2 w-[400px] mx-auto" />
      <span class="text-sm text-ctp-subtext0 sm:text-center">© 2024 <a href="#" class="hover:underline">The purr. team</a>. {{ $t('landing.footer.rights') }}</span>
    </div>
  </footer>
</template>
