<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <span class="block icon-[material-symbols--help-outline-rounded] text-lg" role="img" aria-hidden="true" />
      </TooltipTrigger>
      <TooltipContent>
        <p class="max-w-sm text-center">El catname es lo que para los humanos suele ser el username, es un apodo único para tu gato. ¡Sé original!</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
