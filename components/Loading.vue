<script lang="ts" setup>
  const { isLoading } = defineProps<{
    isLoading: boolean
  }>()
</script>

<template>
  <div class="w-full absolute z-[10] top-0 left-0 h-full bg-white rounded-[10px] flex items-center justify-center" v-if="isLoading">
    <NuxtImg src="./loading.svg" alt="loading" />
  </div>
</template>
