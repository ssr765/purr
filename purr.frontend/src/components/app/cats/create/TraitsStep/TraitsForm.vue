<script setup lang="ts">
import { Calendar } from '@/components/ui/calendar'
import { toDate } from 'radix-vue/date'
import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCreateCatStore } from '@/stores/createCatStore'
import { Checkbox } from '@/components/ui/checkbox'

const createCatStore = useCreateCatStore()

const df = new DateFormatter('es-ES', {
  dateStyle: 'long',
})
</script>

<template>
  <div class="space-y-6 max-w-screen-md mx-auto">
    <div>
      <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">{{ $t('app.cats.create.createCat.steps.traits.form.sex.label') }} *</label>
      <select v-model="createCatStore.sex" id="cat" class="bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender block w-full p-2.5">
        <option value="M">{{ $t('app.cats.create.createCat.steps.traits.form.sex.options.male') }}</option>
        <option value="F">{{ $t('app.cats.create.createCat.steps.traits.form.sex.options.female') }}</option>
      </select>
    </div>
    <div>
      <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">{{ $t('app.cats.create.createCat.steps.traits.form.breed') }}</label>
      <input v-model="createCatStore.breed" type="text" id="first_name" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" />
    </div>
    <div>
      <label for="first_name" class="block mb-2 text-sm font-medium text-ctp-text">{{ $t('app.cats.create.createCat.steps.traits.form.color') }}</label>
      <input v-model="createCatStore.color" type="text" id="first_name" class="block bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5" />
    </div>
    <Popover>
      <PopoverTrigger class="w-full">
        <div>
          <label class="text-left block mb-2 text-sm font-medium text-ctp-text">{{ $t('app.cats.create.createCat.steps.traits.form.birthdate.label') }} *</label>
          <div class="flex items-center gap-2 bg-ctp-mantle border border-ctp-lavender text-ctp-text text-sm rounded-lg focus:ring-ctp-lavender focus:border-ctp-lavender w-full p-2.5">
            <span class="icon-[solar--calendar-mark-linear]" role="img" aria-hidden="true" />
            <span>{{ createCatStore.birthdateInput ? df.format(toDate(createCatStore.birthdateInput)) : $t('app.cats.create.createCat.steps.traits.form.birthdate.placeholder') }}</span>
          </div>
        </div>
        <p class="text-ctp-text/75 text-sm text-left mt-2">{{ $t('app.cats.create.createCat.steps.traits.form.birthdate.description') }}</p>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <Calendar initial-focus :min-value="new CalendarDate(1990, 1, 1)" :max-value="today(getLocalTimeZone())" @update:model-value="(v) => (createCatStore.birthdateInput = v)" v-model="createCatStore.birthdateInput" />
      </PopoverContent>
    </Popover>

    <div class="flex gap-2">
      <Checkbox class="mt-[4px]" id="adoption" :checked="createCatStore.adoption" @update:checked="(v) => (createCatStore.adoption = v)" />
      <div class>
        <label for="adoption" class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{{ $t('app.cats.create.createCat.steps.traits.form.adoption.label') }}</label>
        <p class="text-ctp-text/75 text-sm">{{ $t('app.cats.create.createCat.steps.traits.form.adoption.description') }}</p>
      </div>
    </div>
  </div>
</template>
