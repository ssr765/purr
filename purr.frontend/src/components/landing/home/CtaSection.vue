<template>
  <section class="bg-ctp-lavender">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-ctp-base">{{ $t('landing.home.cta.title') }}</h2>
        <p class="mb-6 font-light text-ctp-base md:text-lg">{{ $t('landing.home.cta.content') }}</p>
        <a href="#" class="inline-flex items-center text-black bg-ctp-text hover:bg-ctp-text/75 focus:ring-4 focus:ring-ctp-text font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          {{ $t('landing.home.cta.cta') }}
          <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
      </div>
    </div>
  </section>
</template>
