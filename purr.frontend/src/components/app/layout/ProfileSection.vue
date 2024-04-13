<template>
  <div class="inline-flex rounded-md">
    <RouterLink :to="{ name: 'login' }" class="px-4 py-2 text-sm font-medium text-ctp-lavender bg-ctp-base border rounded-s-lg hover:bg-ctp-lavender/25 focus:z-10 focus:ring-2 focus:ring-ctp-lavender focus:text-ctp-lavender"> Login </RouterLink>
    <RouterLink :to="{ name: 'register' }" class="px-4 py-2 text-sm font-medium text-ctp-base bg-ctp-lavender border rounded-e-lg hover:bg-ctp-lavender/75 focus:z-10 focus:ring-2 focus:ring-ctp-lavender"> Registro </RouterLink>
  </div>
</template>
