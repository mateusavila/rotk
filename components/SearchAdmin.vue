<script lang="ts" setup>
import type { NamesGenerals } from '~/utils'
const search = ref<{key: string, label: string, avatar: string}>()
const { list, fullsize } = defineProps<{ list: NamesGenerals[], fullsize: boolean }>() 
const model = defineModel()
watch(() => search.value, async (s) => {
  if (s?.key.length) {
    model.value = s
  }
}, { immediate: true, deep: true })
</script>

<template>
  <div class=" z-[10] flex gap-[5px]" :class="{
    'sm:w-[calc(100%-60px)] w-[calc(100%-20px)] max-w-[300px]': !fullsize,
    'w-full': fullsize
  }">
    <USelectMenu 
      :options="list"
      searchable
      searchable-placeholder="Search a general..."
      class="w-full"
      v-model="search" 
      placeholder="Search"
      icon="i-heroicons-magnifying-glass-20-solid">
      <template #option="{ option: general }">
        {{ general.label }}
      </template>
    </USelectMenu>
  </div>
</template>