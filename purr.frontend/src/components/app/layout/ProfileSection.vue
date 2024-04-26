<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, User } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const authStore = useAuthStore()
</script>
<template>
  <div v-if="authStore.isAuthenticated">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <button>
          <Avatar>
            <AvatarImage :src="authStore.user!.avatar ?? ''" :alt="$t('app.layout.header.user.avatarAlt')" />
            <AvatarFallback class="text-lg text-ctp-text">{{ authStore.user!.username[0].toUpperCase() }}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>{{ $t('app.layout.header.user.myAccount') }}</DropdownMenuLabel>
        <DropdownMenuLabel class="font-normal pt-0 leading-[0.75] pb-2">{{ authStore.user!.username }}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User class="mr-2 h-4 w-4" />
            <span>{{ $t('app.layout.header.user.profile') }}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem @click="authStore.logout()">
          <LogOut class="mr-2 h-4 w-4" />
          <span>{{ $t('app.layout.header.user.logout') }}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <div v-else class="inline-flex rounded-md">
    <RouterLink :to="{ name: 'auth-login' }" class="bg-ctp-mantle block overflow-hidden relative focus:outline-none border border-ctp-lavender hover:text-white hover:dark:text-black dark:text-white text-black hover:bg-gradient-to-br from-ctp-lavender via-ctp-lavender to-ctp-mauve hover:bg-ctp-lavender/75 font-medium rounded-l-lg text-sm px-7 py-2.5 active:translate-y-1 transition-all"> {{ $t('app.layout.header.login') }} </RouterLink>
    <RouterLink :to="{ name: 'auth-register' }" class="bg-ctp-crust block overflow-hidden relative focus:outline-none border border-ctp-lavender hover:text-white hover:dark:text-black dark:text-white text-black hover:bg-gradient-to-br from-ctp-lavender via-ctp-lavender to-ctp-mauve hover:bg-ctp-lavender/75 font-medium rounded-r-lg text-sm px-7 py-2.5 active:translate-y-1 transition-all border-l-0"> {{ $t('app.layout.header.register') }} </RouterLink>
  </div>
</template>
