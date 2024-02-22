<script lang="ts" setup>
import LikeButton from '@/components/post/LikeButton.vue';
</script>

<template>
    <div class="max-w-xl bg-white border border-gray-200 rounded-lg shadow m-auto">
        <div class="relative">
            <img class="w-full" src="@/assets/cat.webp" alt="">
            <div class="absolute p-2 bottom-0 right-0 bg-red-500 bg-opacity-50">ssr765</div>
        </div>
        <div class="grid col-span-2">
            <div class="p-4 pb-2 text-3xl flex gap-4">
                <LikeButton />
                <font-awesome-icon icon="fa-regular fa-comment" />
                <font-awesome-icon icon="fa-regular fa-bookmark" />
            </div>
            <div class="text-sm p-4 pt-2 text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, cupiditate asperiores dolor veritatis facilis nobis dolore velit ut nihil deserunt.
            </div>
        </div>
    </div>
</template>