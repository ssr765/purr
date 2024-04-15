<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
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
        <DropdownMenuLabel class="font-normal pt-0">{{ authStore.user!.username }}</DropdownMenuLabel>
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
    <RouterLink :to="{ name: 'login' }" class="px-4 py-2 text-sm font-medium text-ctp-lavender bg-ctp-base border rounded-s-lg hover:bg-ctp-lavender/25 focus:z-10 focus:ring-2 focus:ring-ctp-lavender focus:text-ctp-lavender"> {{ $t('app.layout.header.login') }} </RouterLink>
    <RouterLink :to="{ name: 'register' }" class="px-4 py-2 text-sm font-medium text-ctp-base bg-ctp-lavender border rounded-e-lg hover:bg-ctp-lavender/75 focus:z-10 focus:ring-2 focus:ring-ctp-lavender"> {{ $t('app.layout.header.register') }} </RouterLink>
  </div>
</template>
