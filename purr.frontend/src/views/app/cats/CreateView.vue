<script setup lang="ts">
import { ref } from 'vue'
import StartingStep from '@/components/app/cats/create/StartingStep.vue'
import TraitsStep from '@/components/app/cats/create/TraitsStep.vue'
import PasswordStep from '@/components/app/cats/create/PasswordStep.vue'
import FinalStep from '@/components/app/cats/create/FinalStep.vue'

const step = ref(0)
</script>

<template>
  <StartingStep v-if="step == 0" />
  <TraitsStep v-if="step == 1" />
  <PasswordStep v-if="step == 2" />
  <FinalStep v-if="step == 3" />
</template>
