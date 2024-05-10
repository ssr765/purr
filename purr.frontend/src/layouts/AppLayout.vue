<script lang="ts" setup>
import { computed, ref } from 'vue'
import { RouterView } from 'vue-router'
import ProfileSection from '@/components/app/layout/ProfileSection.vue'
import { useRoute } from 'vue-router'
import RandomCat from '@/components/app/layout/RandomCat.vue'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import PurrLogo from '@/components/utils/PurrLogo.vue'

const route = useRoute()
const { user } = storeToRefs(useAuthStore())

const collapsedSidebar = ref(false)

const applyPadding = computed(() => {
  const pathRegex = /^\/app\/cats\/(.+)$/
  return pathRegex.test(route.path) && route.path !== '/app/cats/create'
})
</script>

<template>
  <div class="antialiased bg-ctp-base">
    <nav class="bg-ctp-crust border-b border-ctp-lavender px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex justify-start items-center gap-2">
          <button @click="collapsedSidebar = !collapsedSidebar" data-drawer-target="drawer-navigation" data-drawer-toggle="drawer-navigation" aria-controls="drawer-navigation" class="flex items-center justify-center p-2 mr-2 text-ctp-text rounded-lg cursor-pointer md:hidden hover:text-ctp-text hover:bg-ctp-base focus:bg-ctp-base focus:ring-2 focus:ring-ctp-base">
            <span v-if="!collapsedSidebar" class="icon-[iconamoon--menu-burger-horizontal] text-xl" role="img" aria-hidden="true" />
            <span v-else class="icon-[ph--x-bold] text-xl" role="img" aria-hidden="true" />
            <span class="sr-only">Toggle sidebar</span>
          </button>
          <RouterLink :to="{ name: 'app-home' }" class="flex items-center justify-between mr-4">
            <PurrLogo class="size-8 mr-3" />
            <span class="text-black font-hero self-center text-2xl font-semibold whitespace-nowrap dark:text-white">purr.</span>
          </RouterLink>
          <form class="hidden md:block md:pl-2">
            <label for="topbar-search" class="sr-only">{{ $t('app.layout.search') }}</label>
            <div class="relative md:w-64 lg:w-96">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <span class="icon-[iconamoon--search] text-xl" role="img" aria-hidden="true" />
              </div>
              <input type="text" name="email" id="topbar-search" class="bg-ctp-base border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5" placeholder="Buscar" />
            </div>
          </form>
        </div>
        <div class="flex items-center lg:order-2">
          <ProfileSection />
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <aside class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform bg-ctp-mantle border-r border-ctp-lavender md:translate-x-0" :class="collapsedSidebar ? '' : '-translate-x-full'" aria-label="Sidenav" id="drawer-navigation">
      <div class="overflow-y-auto py-5 px-3 h-full">
        <form class="md:hidden mb-4">
          <label for="sidebar-search" class="sr-only">{{ $t('app.layout.search') }}</label>
          <div class="relative">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <span class="icon-[iconamoon--search] text-xl" role="img" aria-hidden="true" />
            </div>
            <input type="text" name="search" id="sidebar-search" class="bg-ctp-base border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2" placeholder="Buscar" />
          </div>
        </form>
        <ul class="space-y-2">
          <li>
            <RouterLink :to="{ name: 'app-feed' }" exactActiveClass="bg-ctp-overlay2/25" class="transition-all flex items-center p-2 text-base font-medium text-ctp-text rounded-lg hover:bg-ctp-overlay2/50 group">
              <span class="icon-[ion--paw-outline] text-xl w-6" role="img" aria-hidden="true" />
              <span class="ml-3">{{ $t('app.layout.sidebar.feed') }}</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'app-explore' }" exactActiveClass="bg-ctp-overlay2/25" class="transition-all flex items-center p-2 text-base font-medium text-ctp-text rounded-lg hover:bg-ctp-overlay2/50 group">
              <span class="icon-[carbon--explore] text-xl w-6" role="img" aria-hidden="true" />
              <span class="ml-3">Explorar</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'app-maps' }" exactActiveClass="bg-ctp-overlay2/25" class="transition-all flex items-center p-2 text-base font-medium text-ctp-text rounded-lg hover:bg-ctp-overlay2/50 group">
              <span class="icon-[solar--map-linear] text-xl w-6" role="img" aria-hidden="true" />
              <span class="ml-3">{{ $t('app.layout.sidebar.maps') }}</span>
            </RouterLink>
          </li>
          <li>
            <RandomCat />
          </li>
        </ul>
        <div v-if="user">
          <hr class="h-px bg-ctp-lavender my-2" />
          <ul class="space-y-2">
            <li>
              <RouterLink :to="{ name: 'app-posts-likes' }" exactActiveClass="bg-ctp-overlay2/25" class="transition-all flex items-center p-2 text-base font-medium text-ctp-text rounded-lg hover:bg-ctp-overlay2/50 group">
                <span class="icon-[solar--heart-linear] text-xl w-6" role="img" aria-hidden="true" />
                <span class="ml-3">Mis likes</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'app-posts-saved' }" exactActiveClass="bg-ctp-overlay2/25" class="transition-all flex items-center p-2 text-base font-medium text-ctp-text rounded-lg hover:bg-ctp-overlay2/50 group">
                <span class="icon-[iconamoon--bookmark-light] text-xl w-6" role="img" aria-hidden="true" />
                <span class="ml-3">Mis guardados</span>
              </RouterLink>
            </li>
          </ul>
          <hr class="h-px bg-ctp-lavender my-2" />
          <ul class="space-y-2">
            <li>
              <RouterLink :to="{ name: 'app-posts-create' }" exactActiveClass="bg-ctp-overlay2/25" class="transition-all flex items-center p-2 text-base font-medium text-ctp-text rounded-lg hover:bg-ctp-overlay2/50 group">
                <span class="icon-[ion--plus-round] text-xl w-6" role="img" aria-hidden="true" />
                <span class="ml-3">{{ $t('app.layout.sidebar.create') }}</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'app-cats-create' }" exactActiveClass="bg-ctp-overlay2/25" class="transition-all flex items-center p-2 text-base font-medium text-ctp-text rounded-lg hover:bg-ctp-overlay2/50 group">
                <span class="icon-[ion--plus-round] text-xl w-6" role="img" aria-hidden="true" />
                <span class="ml-3">Crear gato</span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <main :class="applyPadding ? 'md:ml-64 min-h-dvh pt-[61px]' : 'p-4 md:ml-64 min-h-dvh pt-20'" class="max-h-app overflow-auto">
      <!--  style="scrollbar-gutter: stable" -->
      <RouterView />
    </main>
  </div>
</template>
