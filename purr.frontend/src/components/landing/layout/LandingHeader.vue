<script lang="ts" setup>
// import { initFlowbite } from 'flowbite'
import { onMounted } from 'vue'

const toggleHeaderBackground = () => {
  const header = document.querySelector('.landing-header')
  const mobileMenu = document.querySelector('#mobile-menu-2')

  if (!header) return

  if (window.scrollY < 30) {
    header.classList.add('bg-ctp-crust')
    header.classList.remove('backdrop-blur-md')
    header.classList.remove('border-b')

    // Quitar la oscuridad al header.
    header.classList.remove('bg-gradient-to-b')
    header.classList.remove('from-ctp-crust/40')
    header.classList.remove('to-ctp-crust/40')
  } else {
    header.classList.remove('bg-ctp-crust')
    header.classList.add('backdrop-blur-md')
    header.classList.add('border-b')

    // Agregar oscuridad al header.
    header.classList.add('bg-gradient-to-b')
    header.classList.add('from-ctp-crust/40')
    header.classList.add('to-ctp-crust/40')
  }
}

onMounted(() => {
  // Flowbite init.
  // initFlowbite()

  // Alternar header opaco o transparente.
  document.addEventListener('scroll', toggleHeaderBackground)

  // Ejectuar la función al cargar la página.
  toggleHeaderBackground()
})
</script>

<template>
  <header>
    <nav class="*:text-ctp-text shadow-lg bg-ctp-crust landing-header transition-all border-ctp-lavender px-4 lg:px-6 py-2.5">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <RouterLink to="/" class="flex items-center">
          <img src="/public/img/logo/light.webp" class="hidden dark:block mr-3 h-9" alt="purr. Logo" />
          <img src="/public/img/logo/dark.webp" class="block dark:hidden mr-3 h-9" alt="purr. Logo" />
          <span class="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white">purr.</span>
        </RouterLink>
        <div class="flex items-center lg:order-2">
          <RouterLink to="/app" class="transition-all text-ctp-text bg-ctp-base hover:bg-ctp-lavender/35 focus:ring-4 focus:ring-ctp-lavender font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
            <span>{{ $t('landing.header.cta') }}</span>
            <font-awesome-icon icon="fa-solid fa-arrow-right" class="ml-2" />
          </RouterLink>
          <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-ctp-text rounded-lg lg:hidden hover:bg-ctp-lavender/35 focus:outline-none focus:ring-2 focus:ring-ctp-lavender" aria-controls="mobile-menu-2" aria-expanded="false">
            <span class="sr-only">{{ $t('landing.header.sr') }}</span>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
        <div class="bg-ctp-crust lg:bg-transparent hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 absolute top-[60px] left-0 lg:static" id="mobile-menu-2">
          <ul class="flex flex-col pt-3.5 pb-3 px-5 lg:p-0 font-medium lg:flex-row lg:space-x-8 lg:mt-0 divide-y-2 divide-ctp-lavender/50 lg:divide-y-0">
            <li>
              <RouterLink to="/" exactActiveClass="text-black dark:text-white" class="block py-2 pr-4 pl-3 hover:bg-ctp-lavender/35 lg:bg-transparent lg:p-0" aria-current="page">{{ $t('landing.header.home') }}</RouterLink>
            </li>
            <li>
              <RouterLink to="/features" exactActiveClass="text-black dark:text-white" class="block py-2 pr-4 pl-3 hover:bg-ctp-lavender/35 lg:hover:bg-transparent lg:border-0 lg:p-0">{{ $t('landing.header.features') }}</RouterLink>
            </li>
            <li>
              <RouterLink to="/ai" exactActiveClass="text-black dark:text-white" class="block py-2 pr-4 pl-3 hover:bg-ctp-lavender/35 lg:hover:bg-transparent lg:border-0 lg:p-0">{{ $t('landing.header.ai') }}</RouterLink>
            </li>
            <li>
              <RouterLink to="/faqs" exactActiveClass="text-black dark:text-white" class="block py-2 pr-4 pl-3 hover:bg-ctp-lavender/35 lg:hover:bg-transparent lg:border-0 lg:p-0">{{ $t('landing.header.faqs') }}</RouterLink>
            </li>
            <li>
              <RouterLink to="/tecnologies" exactActiveClass="text-black dark:text-white" class="block py-2 pr-4 pl-3 hover:bg-ctp-lavender/35 lg:hover:bg-transparent lg:border-0 lg:p-0">{{ $t('landing.header.techs') }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
