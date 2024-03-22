<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  search: z.string().min(1, 'Please add a word'),
})

type Schema = z.output<typeof schema>

const state = reactive({
  search: undefined
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data)
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="w-[calc(100%-60px)] max-w-[400px] mx-auto z-[10] flex gap-[5px] items-center" @submit="onSubmit">
    <UInput 
      class="w-full"
      v-model="state.search" 
      placeholder="Search" 
      icon="i-heroicons-magnifying-glass-20-solid"
      size="xl" />
  </UForm>
</template>