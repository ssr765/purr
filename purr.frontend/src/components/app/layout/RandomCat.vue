<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCatStore } from '@/stores/cat'

const catStore = useCatStore()

const numbers = ['icon-[ph--dice-one]', 'icon-[ph--dice-two]', 'icon-[ph--dice-three]', 'icon-[ph--dice-four]', 'icon-[ph--dice-five]', 'icon-[ph--dice-six]']
const diceIcon = ref('icon-[ph--dice-one]')
const rollDice = () => {
  diceIcon.value = numbers[Math.floor(Math.random() * numbers.length)]
}

const randomCat = () => {
  rollDice()
  catStore.fetchRandomCat()
}

onMounted(() => {
  rollDice()
})
</script>

<template>
  <button :disabled="catStore.loading" @click="randomCat()" class="w-full transition-all flex items-center p-2 text-base font-medium text-ctp-text rounded-lg hover:bg-ctp-overlay2/50 group cursor-pointer">
    <span :class="diceIcon" class="text-xl w-6" role="img" aria-hidden="true" />
    <span class="ml-3">Gato aleatorio</span>
  </button>
</template>
