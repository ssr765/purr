<script lang="ts" setup>
// import { initFlowbite } from 'flowbite'
import Sheet from '@/components/ui/sheet/Sheet.vue'
import SheetContent from '@/components/ui/sheet/SheetContent.vue'
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue'
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue'
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue'
import SheetTrigger from '@/components/ui/sheet/SheetTrigger.vue'
import PurrButton from '@/components/utils/PurrButton.vue'
import PurrLogo from '@/components/utils/PurrLogo.vue'
import { onMounted } from 'vue'

const toggleHeaderBackground = () => {
  const header = document.querySelector('.landing-header')
  if (!header) return

  if (window.scrollY < 30) {
    header.classList.add('header-top')
    header.classList.remove('header-scroll')
  } else {
    header.classList.remove('header-top')
    header.classList.add('header-scroll')
  }
}

onMounted(() => {
  // Alternar header opaco o transparente.
  document.addEventListener('scroll', toggleHeaderBackground)

  // Ejectuar la función al cargar la página.
  toggleHeaderBackground()
})
</script>

<template>
  <header>
    <nav class="*:text-ctp-text shadow-lg landing-header transition-all border-ctp-lavender px-4 lg:px-8 py-2.5">
      <div class="flex flex-wrap justify-between items-center mx-auto">
        <RouterLink to="/" class="flex items-center lg:order-2 lg:fixed lg:left-1/2 lg:-translate-x-1/2">
          <PurrLogo class="size-9 lg:origin-top rounded-full transition-all mr-3" />
          <span class="purr-text self-center text-2xl font-semibold whitespace-nowrap text-black dark:text-white">purr.</span>
        </RouterLink>
        <div class="flex items-center lg:order-3">
          <RouterLink to="/app">
            <PurrButton noMargin class="flex items-center justify-center">
              <span>{{ $t('landing.header.cta') }}</span>
              <span class="icon-[mingcute--right-fill] text-lg ml-2" role="img" aria-hidden="true" />
            </PurrButton>
          </RouterLink>

          <Sheet class="lg:hidden">
            <SheetTrigger class="block lg:hidden">
              <PurrButton noMargin noPaddingX class="px-2.5 flex items-center justify-center ml-2">
                <span class="sr-only">{{ $t('landing.header.sr') }}</span>

                <span v-if="true" class="icon-[iconamoon--menu-burger-horizontal] text-xl" role="img" aria-hidden="true" />
                <span v-else class="icon-[ph--x-bold] text-xl" role="img" aria-hidden="true" />
              </PurrButton>
            </SheetTrigger>
            <SheetContent side="left" class="lg:hidden w-[350px] sm:w-[540px] bg-ctp-crust py-10">
              <SheetHeader>
                <SheetTitle>
                  <PurrLogo class="size-20 mx-auto" />
                </SheetTitle>
              </SheetHeader>
              <div class="bg-ctp-crust lg:bg-transparent justify-between items-center w-full lg:flex lg:w-auto lg:order-1 top-[60px] left-0 lg:static mt-4" id="mobile-menu-2">
                <ul class="flex flex-col lg:p-0 font-medium lg:flex-row lg:space-x-8 lg:mt-0 divide-y-2 divide-ctp-lavender lg:divide-y-0">
                  <li>
                    <RouterLink to="/" exactActiveClass="text-black dark:text-white" class="block py-2 pr-4 pl-3 lg:bg-transparent lg:p-0" aria-current="page">{{ $t('landing.header.home') }}</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/features" exactActiveClass="text-black dark:text-white" class="block py-2 pr-4 pl-3 lg:hover:bg-transparent lg:border-0 lg:p-0">{{ $t('landing.header.features') }}</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/ai" exactActiveClass="text-black dark:text-white" class="block py-2 pr-4 pl-3 lg:hover:bg-transparent lg:border-0 lg:p-0">{{ $t('landing.header.ai') }}</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/faqs" exactActiveClass="text-black dark:text-white" class="block py-2 pr-4 pl-3 lg:hover:bg-transparent lg:border-0 lg:p-0">{{ $t('landing.header.faqs') }}</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/tecnologies" exactActiveClass="text-black dark:text-white" class="block py-2 pr-4 pl-3 lg:hover:bg-transparent lg:border-0 lg:p-0">{{ $t('landing.header.techs') }}</RouterLink>
                  </li>
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div class="bg-ctp-crust lg:bg-transparent hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 absolute top-[60px] left-0 lg:static" id="mobile-menu-2">
          <ul class="flex flex-col pt-3.5 pb-3 px-5 lg:p-0 font-medium lg:flex-row lg:space-x-8 lg:mt-0 divide-y-2 divide-ctp-lavender/50 lg:divide-y-0">
            <li>
              <RouterLink to="/" exactActiveClass="text-black dark:text-white" class="flex items-center justify-center py-2 pr-4 pl-3 lg:bg-transparent lg:p-0" aria-current="page">
                <span class="hidden xl:block">{{ $t('landing.header.home') }}</span>
                <span class="icon-[heroicons--home-20-solid] text-xl xl:hidden hover:scale-125 transition-all" role="img" aria-hidden="true" />
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/features" exactActiveClass="text-black dark:text-white" class="flex items-center justify-center py-2 pr-4 pl-3 lg:hover:bg-transparent lg:border-0 lg:p-0">
                <span class="hidden xl:block">{{ $t('landing.header.features') }}</span>
                <span class="icon-[ph--star-fill] text-xl xl:hidden hover:scale-125 transition-all" role="img" aria-hidden="true" />
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/ai" exactActiveClass="text-black dark:text-white" class="flex items-center justify-center py-2 pr-4 pl-3 lg:hover:bg-transparent lg:border-0 lg:p-0">
                <span class="hidden xl:block">{{ $t('landing.header.ai') }}</span>
                <div class="relative h-5 xl:hidden hover:scale-125 transition-all">
                  <span class="icon-[mdi--robot] text-xl opacity-0" role="img" aria-hidden="true" />
                  <span class="icon-[mdi--robot] absolute top-0 left-0 text-xl hover:opacity-0" role="img" aria-hidden="true" />
                  <span class="icon-[mdi--robot-happy] absolute top-0 left-0 text-xl opacity-0 hover:opacity-100" role="img" aria-hidden="true" />
                </div>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/faqs" exactActiveClass="text-black dark:text-white" class="flex items-center justify-center py-2 pr-4 pl-3 lg:hover:bg-transparent lg:border-0 lg:p-0">
                <span class="hidden xl:block">{{ $t('landing.header.faqs') }}</span>
                <span class="icon-[mingcute--question-fill] text-xl xl:hidden hover:scale-125 transition-all" role="img" aria-hidden="true" />
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/tecnologies" exactActiveClass="text-black dark:text-white" class="flex items-center justify-center py-2 pr-4 pl-3 lg:hover:bg-transparent lg:border-0 lg:p-0">
                <span class="hidden xl:block">{{ $t('landing.header.techs') }}</span>
                <span class="icon-[ph--wrench-fill] text-xl xl:hidden hover:scale-125 transition-all" role="img" aria-hidden="true" />
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header-top {
  @apply bg-ctp-crust;
}

.header-top img {
  @apply lg:scale-150 lg:bg-ctp-crust lg:p-2 lg:box-content lg:hover:scale-[2.2] lg:mr-0;
}

.header-top .purr-text {
  @apply lg:hidden;
}

.header-scroll {
  @apply backdrop-blur-md border-b bg-gradient-to-b from-ctp-crust/40 to-ctp-crust/40;
}

.header-scroll .purr-text {
  @apply lg:block;
}
</style>
