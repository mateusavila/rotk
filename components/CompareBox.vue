<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import type { NamesGenerals, compareGenerals, CompareGenerals } from '~/utils'

const { list } = defineProps<{ list: NamesGenerals[] }>()
const state = reactive({
  general1: undefined,
  general2: undefined
})

const onSubmit = async (event: FormSubmitEvent<CompareGenerals>) => {
  const { general1, general2 } = event.data
  await navigateTo(`/compare/${general1}/${general2}`)
}

</script>

<template>
  <div class="w-full p-[20px] rounded-[6px] bg-slate-900 text-white my-[20px] flex items-center justify-between">
    <h2 class="text-[18px] text-white flex items-center gap-[10px] font-['Aleo'] font-bold"> Compare the generals!</h2>
    <UForm :schema="compareGenerals" :state="state" class="flex items-center gap-[10px] w-[calc(100%-220px)] justify-between" @submit="onSubmit">
      <UFormGroup :ui="{ wrapper: 'w-[calc(50%-40px)]' }" name="general1">
        <USelectMenu 
          :options="list"
          searchable
          searchable-placeholder="Search a general..."
          class="w-full"
          v-model="state.general1" 
          placeholder="General"
          value-attribute="key"
          icon="i-game-icons-swordman">
          <template #option="{ option: general }">
            {{ general.label }}
          </template>
        </USelectMenu>
      </UFormGroup>
      <UIcon  name="i-game-icons-crossed-swords" class="text-[24px]"></UIcon>
      <UFormGroup :ui="{ wrapper: 'w-[calc(50%-40px)]' }" name="general2">
        <USelectMenu 
          :options="list"
          searchable
          searchable-placeholder="Search a general..."
          class="w-full"
          v-model="state.general2" 
          placeholder="General"
          value-attribute="key"
          icon="i-game-icons-swordman">
          <template #option="{ option: general }">
            {{ general.label }}
          </template>
        </USelectMenu>
      </UFormGroup>
      <UButton type="submit">Go!</UButton>
    </UForm>
  </div>
</template>
