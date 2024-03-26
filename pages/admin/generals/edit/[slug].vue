<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { vMaska } from 'maska'
const user = useUserStore()
const { params: { slug } } = useRoute()
const { data, pending } = await useLazyFetch<GeneralData>(`/api/general/${slug}`)

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  skills: z.array(z.string()),
  bio: z.string().optional(),
  birth: z.coerce.number().optional(),
  luck: z.coerce.number(),
  health: z.coerce.number(),
  soldiers: z.coerce.number(),
  loyalty: z.coerce.number(),
  navigation: z.boolean(),
  is_ruler: z.boolean(),
  navy_command: z.coerce.number(),
  army_command: z.coerce.number(),
  stats: z.object({
    rotk1: z.boolean().or(z.object({
      intelligence: z.coerce.number().min(1).max(100),
      power: z.coerce.number().min(1).max(100),
      charisma: z.coerce.number().min(1).max(100)
    })),
    rotk2: z.boolean().or(z.object({
      intelligence: z.coerce.number().min(1).max(100),
      power: z.coerce.number().min(1).max(100),
      charisma: z.coerce.number().min(1).max(100)
    })),
    rotk3: z.boolean().or(z.object({
      intelligence: z.coerce.number().min(1).max(100),
      power: z.coerce.number().min(1).max(100),
      charisma: z.coerce.number().min(1).max(100),
      politics: z.coerce.number().min(1).max(100),
    })),
    rotk4: z.boolean().or(z.object({
      lead: z.coerce.number().min(1).max(100),
      intelligence: z.coerce.number().min(1).max(100),
      power: z.coerce.number().min(1).max(100),
      charisma: z.coerce.number().min(1).max(100),
      politics: z.coerce.number().min(1).max(100),
    })),
    rotk7: z.boolean().or(z.object({
      intelligence: z.coerce.number().min(1).max(100),
      power: z.coerce.number().min(1).max(100),
      charisma: z.coerce.number().min(1).max(100),
      politics: z.coerce.number().min(1).max(100),
    })),
    rotk8: z.boolean().or(z.object({
      intelligence: z.coerce.number().min(1).max(100),
      power: z.coerce.number().min(1).max(100),
      charisma: z.coerce.number().min(1).max(100),
      politics: z.coerce.number().min(1).max(100),
    })),
    rotk9: z.boolean().or(z.object({
      intelligence: z.coerce.number().min(1).max(100),
      power: z.coerce.number().min(1).max(100),
      lead: z.coerce.number().min(1).max(100),
      politics: z.coerce.number().min(1).max(100),
    })),
    rotk10: z.boolean().or(z.object({
      lead: z.coerce.number().min(1).max(100),
      intelligence: z.coerce.number().min(1).max(100),
      power: z.coerce.number().min(1).max(100),
      charisma: z.coerce.number().min(1).max(100),
      politics: z.coerce.number().min(1).max(100),
    })),
  })
}).required()

type Schema = z.output<typeof schema>

  async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data)
}

const rotk1Stat = ref(!!data.value?.stats.rotk1)
const rotk2Stat = ref(!!data.value?.stats.rotk2)
</script>

<template>
  <NuxtLayout name="dashboardnew">
    <h1 class="font-['Aleo'] text-[32px] font-semibold">Edit General Info</h1>
    <div class="w-[calc(100%-40px)] my-[50px] relative" v-if="user">
    <Loading :is-loading="pending" />
    <ClientOnly v-if="data">
      <h2 class="font-['Aleo'] text-[18px] font-semibold mb-[20px]">Basic Information</h2>
      <UForm :schema="schema"
        :state="data"
        @submit="onSubmit">
        <UFormGroup name="name" label="Name">
          <UInput v-model="data.name" :disabled="user.user.level !== 1"></UInput>
        </UFormGroup>
        <UFormGroup name="bio" label="Bio" class="mt-[30px]">
          <Editor v-model="data.bio" :disabled="user.user.level !== 1" />
        </UFormGroup>
        <div class="w-full mt-[30px] grid lg:grid-cols-4 sm:grid-cols-2 gap-[20px]">
          <UFormGroup name="birth" label="Birth">
            <UInput v-model="data.birth" data-maska="###"
            v-maska></UInput>
          </UFormGroup>
          <UFormGroup name="luck" label="Luck">
            <UInput v-model="data.luck" data-maska="###"
            v-maska></UInput>
          </UFormGroup>
          <UFormGroup name="health" label="Health">
            <UInput v-model="data.health" data-maska="###"
            v-maska></UInput>
          </UFormGroup>
          <UFormGroup name="soldiers" label="Soldiers">
            <UInput v-model="data.soldiers" data-maska="######"
            v-maska></UInput>
          </UFormGroup>
          <UFormGroup name="loyalty" label="Loyalty">
            <UInput v-model="data.loyalty" data-maska="###"
            v-maska></UInput>
          </UFormGroup>
          <UFormGroup name="navy_command" label="Navy Command">
            <UInput v-model="data.navy_command" data-maska="###"
            v-maska></UInput>
          </UFormGroup>
          <UFormGroup name="army_command" label="Army Command">
            <UInput v-model="data.army_command" data-maska="###"
            v-maska></UInput>
          </UFormGroup>
        </div>
        <div class="w-full mt-[30px]">
          <h2 class="font-['Aleo'] text-[20px] font-semibold mb-[20px]">Stats By Game</h2>
          <h2 class="font-['Aleo'] text-[16px] font-semibold">Stats ROTK 1</h2>
          <div class="w-full mb-[10px] flex gap-[10px] items-center">
            <UToggle v-model="rotk1Stat"></UToggle> <span class="text-[14px]">Activate Stat ROTK1</span>
          </div>
          <div class="w-full grid grid-cols-3 gap-[20px]">
            <UFormGroup name="rotk1_inteligence" label="Intelligence">
              <UInput v-model="data.stats.rotk1.intelligence" :disabled="!rotk1Stat" data-maska="###" v-maska></UInput>
            </UFormGroup>
            <UFormGroup name="rotk1_inteligence" label="Power">
              <UInput v-model="data.stats.rotk1.power" :disabled="!rotk1Stat" data-maska="###" v-maska></UInput>
            </UFormGroup>
            <UFormGroup name="rotk1_inteligence" label="Charisma">
              <UInput v-model="data.stats.rotk1.charisma" :disabled="!rotk1Stat" data-maska="###" v-maska></UInput>
            </UFormGroup>
          </div>
        </div>
        <UButton type="submit" class="mt-[30px]">Submit</UButton>
      </UForm>
    </ClientOnly>
    </div>
  </NuxtLayout>
</template>
