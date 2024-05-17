<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useSettingsStore } from '@/stores/settingsStore'
import US from '@/assets/img/flags/us.svg'
import ES from '@/assets/img/flags/es.svg'
import CA from '@/assets/img/flags/ca.svg'
import JP from '@/assets/img/flags/jp.svg'
import PurrButton from '@/components/utils/PurrButton.vue'

const { changeLanguage } = useSettingsStore()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <slot>
        <PurrButton noMargin noPaddingX class="px-4">
          <span class="block text-xl icon-[heroicons--language]" role="img" aria-hidden="true" />
        </PurrButton>
      </slot>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @click="changeLanguage('es')" class="flex gap-1.5">
        <img :src="ES" class="size-5 rounded-md" alt="" />
        <span>ESP</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="changeLanguage('en')" class="flex gap-1.5">
        <img :src="US" class="size-5 rounded-md" alt="" />
        <span>ENG</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="changeLanguage('ca')" class="flex gap-1.5">
        <img :src="CA" class="size-5 rounded-md" alt="" />
        <span>CAT</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="changeLanguage('ja')" class="flex gap-1.5">
        <img :src="JP" class="size-5 rounded-md" alt="" />
        <span>JPN</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
