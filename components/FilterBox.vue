<script lang="ts" setup>
const emit = defineEmits<{
  open: []
}>()
const open = () => emit('open')
</script>

<template>
  <div class="w-full p-[20px] bg-slate-700 text-white flex justify-center flex-wrap">
    <h2 class="w-full text-[18px] text-white flex items-center justify-center gap-[10px] font-['Aleo'] font-bold mb-[12px]">Advanced Filter</h2>
    <UButton icon="i-game-icons-swords-emblem" type="button" color="red" size="xl" @click="open" :ui="{ font: `font-bold font-['Aleo']` }">Find your next general</UButton>
  </div>
</template>
