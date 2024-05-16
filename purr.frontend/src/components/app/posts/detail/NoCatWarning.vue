<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <span class="block icon-[ph--warning-bold] text-3xl text-red-500" role="img" aria-hidden="true" />
      </TooltipTrigger>
      <TooltipContent>
        <p class="max-w-sm">{{ $t('app.posts.detail.noCatsWarning') }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
