<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'

import { ref, watch } from 'vue'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'
import { useCatService } from '@/services/catService'
import type { Cat } from '@/models/Cat'
import { toast } from 'vue-sonner'
import { useI18n } from 'vue-i18n'
import CatPlaceholderAvatar from '@/components/utils/CatPlaceholderAvatar.vue'
import { useCatStore } from '@/stores/catStore'

const { t } = useI18n()
const catService = useCatService()
const catStore = useCatStore()

const open = ref(false)

defineExpose({ handleOpenChange })

const { Meta_J, Ctrl_J } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'j' && (e.metaKey || e.ctrlKey)) e.preventDefault()
  },
})

watch([Meta_J, Ctrl_J], (v) => {
  if (v[0] || v[1]) handleOpenChange()
})

function handleOpenChange() {
  open.value = !open.value

  cats.value = []
  value.value = ''
}

const timeout = ref<number | null>(null)
const inputUpdate = (e: Event) => {
  cats.value = []
  value.value = (e.target as HTMLInputElement).value
  loading.value = true

  if (timeout.value) clearTimeout(timeout.value)

  timeout.value = setTimeout(() => {
    if (value.value !== '') {
      search()
    }
  }, 1000)
}

const search = async () => {
  try {
    const result = await catService.search(value.value)
    cats.value = result
  } catch (error) {
    toast.error(t('app.search.error'))
  } finally {
    loading.value = false
  }
}

const cats = ref<Cat[]>([])

const value = ref('')
const loading = ref(true)
</script>

<template>
  <div class="flex items-center">
    <p class="text-muted-foreground flex items-center">
      <kbd class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span class="text-base icon-[vaadin--ctrl-a]" role="img" aria-hidden="true" />
        <span class="text-xs">J</span>
      </kbd>
    </p>
    <CommandDialog v-model:open="open" class="z-[7000]">
      <CommandInput @input="inputUpdate" :placeholder="$t('app.search.placeholder')" />
      <CommandList>
        <div v-if="value === ''">
          <CommandGroup :heading="$t('app.search.groupLabels.recentlyViewed')">
            <RouterLink @click="open = false" v-for="cat in catStore.recentlyViewed" :key="cat.id" :to="{ name: 'app-cats-profile', params: { catname: cat.catname } }">
              <CommandItem :value="cat.id" class="cursor-pointer">
                <div class="flex items-center gap-2">
                  <img v-if="cat.avatar" :src="cat.avatar" alt="" class="size-8 rounded-full object-cover" />
                  <CatPlaceholderAvatar v-else class="size-8" />
                  <div>
                    <p class="text-lg leading-4">{{ cat.name }}</p>
                    <p class="text-ctp-text">@{{ cat.catname }}</p>
                  </div>
                </div>
              </CommandItem>
            </RouterLink>
          </CommandGroup>
        </div>
        <CommandEmpty v-if="value != ''" class="min-h-20 flex items-center justify-center">
          <LoadingSpinner v-if="loading" class="text-3xl" />
          <span v-else>{{ $t('app.search.noResults') }}</span>
        </CommandEmpty>
        <CommandGroup :heading="$t('app.search.groupLabels.cats')">
          <RouterLink @click="open = false" v-for="cat in cats" :key="cat.id" :to="{ name: 'app-cats-profile', params: { catname: cat.catname } }">
            <CommandItem :value="cat.id" class="cursor-pointer">
              <div class="flex items-center gap-2">
                <img v-if="cat.avatar" :src="cat.avatar" alt="" class="size-8 rounded-full" />
                <CatPlaceholderAvatar v-else class="size-8" />
                <div>
                  <p class="text-lg leading-4">{{ cat.name }}</p>
                  <p class="text-ctp-text">@{{ cat.catname }}</p>
                </div>
              </div>
            </CommandItem>
          </RouterLink>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </div>
</template>
