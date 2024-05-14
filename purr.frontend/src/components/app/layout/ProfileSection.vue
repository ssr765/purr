<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>
<template>
  <div v-if="authStore.isAuthenticated" class="flex items-center gap-6">
    <div v-if="user!.admin" class="font-semibold">ADMINISTRADOR</div>
    <DropdownMenu>
      <div class="h-10">
        <DropdownMenuTrigger as-child>
          <button>
            <Avatar>
              <AvatarImage :src="authStore.user!.avatar ?? ''" :alt="$t('app.layout.header.user.avatarAlt')" />
              <AvatarFallback class="text-lg text-ctp-text">{{ authStore.user!.username[0].toUpperCase() }}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>{{ authStore.user!.name }}</DropdownMenuLabel>
        <DropdownMenuLabel class="font-normal pt-0 leading-[0.75]">@{{ authStore.user!.username }}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <RouterLink :to="{ name: 'app-settings' }">
            <DropdownMenuItem>
              <span class="block icon-[quill--cog-alt] size-4 mr-2" role="img" aria-hidden="true" />
              <span>{{ $t('app.layout.header.dropdown.settings') }}</span>
            </DropdownMenuItem>
          </RouterLink>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem @click="authStore.logout()">
          <LogOut class="mr-2 h-4 w-4" />
          <span>{{ $t('app.layout.header.dropdown.logout') }}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <div v-else class="inline-flex rounded-md">
    <RouterLink :to="{ name: 'auth-login' }" class="bg-ctp-mantle block overflow-hidden relative focus:outline-none border border-ctp-lavender hover:text-white hover:dark:text-black dark:text-white text-black hover:bg-gradient-to-br from-ctp-lavender via-ctp-lavender to-ctp-mauve hover:bg-ctp-lavender/75 font-medium rounded-l-lg text-sm px-7 py-2.5 active:translate-y-1 transition-all"> {{ $t('app.layout.header.login') }} </RouterLink>
    <RouterLink :to="{ name: 'auth-register' }" class="bg-ctp-crust block overflow-hidden relative focus:outline-none border border-ctp-lavender hover:text-white hover:dark:text-black dark:text-white text-black hover:bg-gradient-to-br from-ctp-lavender via-ctp-lavender to-ctp-mauve hover:bg-ctp-lavender/75 font-medium rounded-r-lg text-sm px-7 py-2.5 active:translate-y-1 transition-all border-l-0"> {{ $t('app.layout.header.register') }} </RouterLink>
  </div>
</template>
