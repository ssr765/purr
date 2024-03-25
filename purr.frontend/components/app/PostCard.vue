<script setup>
import { ref } from 'vue'

const like = ref(false)

const addLike = () => {
  like.value = !like.value
}
</script>

<template>
  <article class="max-w-xl bg-ctp-mantle border border-ctp-lavender rounded-lg shadow m-auto text-ctp-text">
    <div class="relative">
      <img v-on:dblclick="addLike()" class="w-full rounded-lg" src="/public/img/mockcat.webp" alt="" />
      <div class="absolute p-2 bottom-0 right-0 bg-red-500 bg-opacity-50">ssr765</div>
    </div>
    <div class="grid col-span-2">
      <div class="p-4 pb-2 text-3xl flex gap-4">
        <button @click="addLike()">
          <font-awesome-icon v-if="like" icon="fa-solid fa-heart" class="text-red-500" />
          <font-awesome-icon v-else icon="fa-regular fa-heart" />
        </button>
        <font-awesome-icon icon="fa-regular fa-comment" />
        <font-awesome-icon icon="fa-regular fa-bookmark" />
      </div>
      <div class="text-sm p-4 pt-2 text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, cupiditate asperiores dolor veritatis facilis nobis dolore velit ut nihil deserunt.</div>
    </div>
  </article>
</template>
