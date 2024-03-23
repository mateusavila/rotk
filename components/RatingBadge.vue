<script setup lang="ts">
const { rating } = defineProps<{
  rating: number
}>()
</script>

<template>
  <div class="lg:w-[120px] w-[40px] h-[40px] lg:h-[120px] absolute lg:top-[50%] sm:top-auto top-[30px] lg:right-[20px] sm:right-auto right-[30px] lg:rounded-[20px] rounded-[10px] lg:translate-y-[-50%] flex items-center content-center justify-center shadow lg:left-auto sm:left-[125px] left-auto lg:bottom-auto sm:bottom-[20px] bottom-auto"
  :class="{
    'bg-gradient-to-bl from-[#000] via-[#400000] to-[#562683] text-white': rating === 100,
    'bg-gradient-to-bl from-[#188fff] via-[#e1a6e7] to-[#f9a205] text-white': rating === 99,
    'bg-gradient-to-bl from-[#ff96df] to-[#ad388a] text-white': rating > 96 && rating <= 98,
    'bg-gradient-to-bl from-[#00aace] to-[#005668] text-white': rating > 92 && rating <= 95,
    'bg-gradient-to-bl from-[#a51fff] to-[#5b1c86] text-white': rating > 89 && rating <= 92,
    'bg-gradient-to-bl from-[#e70000] to-[#810000] text-white': rating > 84 && rating <= 89,
    'bg-gradient-to-bl from-[#05c715] to-[#03630b] text-white': rating > 79 && rating <= 84,
    'bg-gradient-to-bl from-[#d6bb5c] to-[#a38829] text-white': rating > 74 && rating <= 79,
    'bg-gradient-to-bl from-[#a2a2a2] to-[#6f6f6f] text-white': rating > 69 && rating <= 74,
    'bg-gradient-to-bl from-[#cc5b00] to-[#662d00] text-white': rating > 64 && rating <= 69,
    'bg-[#d40] text-white': rating > 59 && rating <= 64,
    'bg-[#900] text-white': rating < 59,
  }"
  
  >
    <p class="lg:text-[50px] text-[22px] font-['Aleo'] font-black">{{ rating }}</p>
  </div>
</template>