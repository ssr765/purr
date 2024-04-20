<script setup lang="ts">
import { Calendar } from '@/components/ui/calendar'
import { toDate } from 'radix-vue/date'
import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCreateCatStore } from '@/stores/createCat'

const createCatStore = useCreateCatStore()

const df = new DateFormatter('es-ES', {
  dateStyle: 'long',
})
</script>

<template>
  <div class="space-y-6 max-w-screen-md mx-auto">
    <div>
      <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">Sexo del gato *</label>
      <select v-model="createCatStore.sex" id="cat" class="bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender block w-full p-2.5">
        <option value="M">Macho</option>
        <option value="F">Hembra</option>
      </select>
    </div>
    <div>
      <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">Raza del gato</label>
      <input v-model="createCatStore.breed" type="text" id="first_name" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" />
    </div>
    <div>
      <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">Color del gato</label>
      <input v-model="createCatStore.color" type="text" id="first_name" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" />
    </div>
    <Popover>
      <PopoverTrigger class="w-full">
        <div>
          <label class="text-left block mb-2 text-sm font-medium text-ctp-text">Nacimiento del gato</label>
          <div class="flex items-center gap-2 bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5">
            <span class="icon-[solar--calendar-mark-linear]" role="img" aria-hidden="true" />
            <span>{{ createCatStore.birthdateInput ? df.format(toDate(createCatStore.birthdateInput)) : 'Elige fecha' }}</span>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <Calendar initial-focus :min-value="new CalendarDate(1990, 1, 1)" :max-value="today(getLocalTimeZone())" @update:model-value="(v) => (createCatStore.birthdateInput = v)" v-model="createCatStore.birthdateInput" />
      </PopoverContent>
    </Popover>
  </div>
</template>