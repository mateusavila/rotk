<script lang="ts" setup>
import type { NamesGenerals } from '~/utils'
const search = ref<{key: string, label: string, avatar: string}>()
const { list, fullsize, baseUrl = '' } = defineProps<{ list: NamesGenerals[], fullsize: boolean, baseUrl: string }>() 


watch(() => search.value, async (s) => {
  if (s?.key.length) {
    await navigateTo(`/general/${s.key}`)
  }
}, { immediate: true, deep: true })
</script>

<template>
  <div class=" z-[10] flex gap-[5px] items-center" :class="{
    'sm:w-[calc(100%-60px)] w-[calc(100%-20px)] max-w-[400px] mx-auto': !fullsize,
    'w-full': fullsize
  }">
    <USelectMenu 
      :options="list"
      searchable
      searchable-placeholder="Search a general..."
      class="w-full"
      v-model="search" 
      placeholder="Search"
      icon="i-heroicons-magnifying-glass-20-solid"
      size="xl">
      <template #option="{ option: general }">
        <UAvatar v-if="general.avatar" :src="`${baseUrl}${general.avatar}`" size="2xs" /> {{ general.label }}
      </template>
    </USelectMenu>
  </div>
</template>