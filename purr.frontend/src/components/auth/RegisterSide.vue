<template>
  <aside class="h-dvh flex flex-col items-center justify-center w-full gap-16 p-16">
    <img class="dark:hidden w-36" src="/img/logo/dark.webp" alt="" />
    <img class="hidden dark:block w-36" src="/img/logo/light.webp" alt="" />

    <form class="max-w-sm w-full mx-auto">
      <div class="relative z-0 w-full mb-5 group">
        <input type="text" id="floating_name" class="block py-2.5 px-0 w-full text-sm text-ctp-text bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-ctp-lavender peer" placeholder=" " required />
        <label for="floating_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-ctp-lavender peer-focus:dark:text-ctp-lavender peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input type="text" id="floating_username" class="block py-2.5 px-0 w-full text-sm text-ctp-text bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-ctp-lavender peer" placeholder=" " required />
        <label for="floating_username" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-ctp-lavender peer-focus:dark:text-ctp-lavender peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre de usuario</label>
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input type="email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-ctp-text bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-ctp-lavender peer" placeholder=" " required />
        <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-ctp-lavender peer-focus:dark:text-ctp-lavender peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input type="password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-ctp-text bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-ctp-lavender peer" placeholder=" " required />
        <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-ctp-lavender peer-focus:dark:text-ctp-lavender peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contraseña</label>
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input type="password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-ctp-text bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-ctp-lavender peer" placeholder=" " required />
        <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-ctp-lavender peer-focus:dark:text-ctp-lavender peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirma la contraseña</label>
      </div>

      <button type="submit" class="block mx-auto text-ctp-base bg-ctp-lavender hover:bg-ctp-lavender/80 focus:ring-4 focus:outline-none focus:ring-ctp-lavender font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
    </form>

    <p class="text-center">Ya tienes cuenta? <RouterLink class="text-ctp-lavender" :to="{ name: 'login' }"> Inicia sesión! </RouterLink></p>
  </aside>
</template>
