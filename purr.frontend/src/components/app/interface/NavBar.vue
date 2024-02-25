<template>
  <div class="space-y-4 h-full">
    <div class="font-thin text-6xl text-center font-raleway mb-10">purr.</div>
    <div>
      <router-link to="/app">
        <div class="px-8 py-4 bg-gray-600 rounded-md space-x-4">
          <font-awesome-icon icon="fa-solid fa-home" />
          <span>Home</span>
        </div>
      </router-link>
    </div>
    <div>
      <router-link to="/app/test">
        <div class="px-8 py-4 bg-gray-800 rounded-md space-x-4">
          <font-awesome-icon icon="fa-solid fa-home" />
          <span>test</span>
        </div>
      </router-link>
    </div>

    <div>
      <router-link to="/app/search">
        <div class="px-8 py-4 bg-gray-800 rounded-md space-x-4">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          <span>Buscar</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
