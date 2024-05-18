<script setup lang="ts">
import { ref } from 'vue'
import SearchCommand from './SearchCommand.vue'
import { SearchIcon } from 'lucide-vue-next'

const searchCmd = ref<InstanceType<typeof SearchCommand> | null>(null)
</script>

<template>
  <button @click="searchCmd?.handleOpenChange()" class="w-full transition-all flex items-center p-2 text-base font-medium text-ctp-text rounded-lg hover:bg-ctp-overlay2/50 group cursor-pointer">
    <SearchIcon class="text-xl w-6" />
    <span class="ml-3">{{ $t('app.layout.sidebar.search') }}</span>
    <div class="flex flex-1 justify-end">
      <SearchCommand ref="searchCmd" />
    </div>
  </button>
</template>
