<script lang="ts" setup>
import { ref } from 'vue';

const like = ref(false);

const addLike = () => {
    like.value = !like.value
}
</script>

<template>
    <button :ref="button" @click="addLike()">
        <font-awesome-icon v-if="like" icon="fa-solid fa-heart" class="text-red-600" />
        <font-awesome-icon v-else icon="fa-regular fa-heart" />
    </button>
</template>