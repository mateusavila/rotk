<script lang="ts" setup>
import type { NamesGenerals } from '~/types'
const search = ref<{key: string, label: string, avatar: string}>()
const { list } = defineProps<{ list: NamesGenerals[] }>() 

const onChange = async () => {
  if (search.value && search.value.key.length > 1) {
    await navigateTo(`/general/${search.value.key}`)
  }
}
</script>

<template>
  <div class="w-full">
    <USelectMenu 
      :options="list"
      searchable
      searchable-placeholder="Search a general..."
      class="w-full"
      v-model="search" 
      placeholder="Search" 
      @change="onChange"
      icon="i-heroicons-magnifying-glass-20-solid"
      size="xl" />
  </div>
</template>~/utils