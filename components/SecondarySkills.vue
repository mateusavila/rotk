<script lang="ts" setup>
const {} = defineProps<{
  luck: number
  health: number
  soldiers: number
  loyalty: number
  navy_command: number
  army_command: number
}>()
</script>

<template>
  <div class="grid my-[20px] lg:grid-cols-2 md:grid-cols-6 sm:grid-cols-3 grid-cols-1 gap-[10px] w-full">
    <div class="bg-slate-50 p-[10px] flex items-center content-center justify-center flex-wrap rounded-[10px]">
      <p class="text-[30px] w-full text-center text-[#ffc700]"><UIcon name="i-game-icons-dice-six-faces-six"></UIcon></p>
      <p class="text-[32px] font-bold w-full text-center leading-[32px] text-[#ffc700]">{{ luck }}</p>
      <p class="text-[14px] font-['Aleo'] w-full text-center text-[#ffc700]">Luck</p>
    </div>
    <div class="bg-slate-50 p-[10px] flex items-center content-center justify-center flex-wrap rounded-[10px]">
      <p class="text-[30px] w-full text-center text-[#27ae60]"><UIcon name="i-game-icons-health-normal"></UIcon></p>
      <p class="text-[32px] font-bold w-full text-center leading-[32px] text-[#27ae60]">{{ health }}</p>
      <p class="text-[14px] font-['Aleo'] w-full text-center text-[#27ae60]">Health</p>
    </div>
    <div class="bg-slate-50 p-[10px] flex items-center content-center justify-center flex-wrap rounded-[10px]">
      <p class="text-[30px] w-full text-center text-[#007bff]"><UIcon name="i-game-icons-cut-diamond"></UIcon></p>
      <p class="text-[32px] font-bold w-full text-center leading-[32px] text-[#007bff]">{{ loyalty }}</p>
      <p class="text-[14px] font-['Aleo'] w-full text-center text-[#007bff]">Loyalty</p>
    </div>
    <div class="bg-slate-50 p-[10px] flex items-center content-center justify-center flex-wrap rounded-[10px]">
      <p class="text-[30px] w-full text-center text-[#b71c1c]"><UIcon name="i-game-icons-swordwoman"></UIcon></p>
      <p class="text-[32px] font-bold w-full text-center leading-[32px] text-[#b71c1c]">{{ soldiers }}</p>
      <p class="text-[14px] font-['Aleo'] w-full text-center text-[#b71c1c]">Soldiers</p>
    </div>
    <div class="bg-slate-50 p-[10px] flex items-center content-center justify-center flex-wrap rounded-[10px]">
      <p class="text-[30px] w-full text-center text-[#0099ff]"><UIcon name="i-game-icons-battleship"></UIcon></p>
      <p class="text-[32px] font-bold w-full text-center leading-[32px] text-[#0099ff]">{{ navy_command }}</p>
      <p class="text-[14px] font-['Aleo'] w-full text-center text-[#0099ff]">Navy Command</p>
    </div>
    <div class="bg-slate-50 p-[10px] flex items-center content-center justify-center flex-wrap rounded-[10px]">
      <p class="text-[30px] w-full text-center text-[#cd5c5c]"><UIcon name="i-game-icons-swords-emblem"></UIcon></p>
      <p class="text-[32px] font-bold w-full text-center leading-[32px] text-[#cd5c5c]">{{ army_command }}</p>
      <p class="text-[14px] font-['Aleo'] w-full text-center text-[#cd5c5c]">Army Command</p>
    </div>
  </div>
</template>
