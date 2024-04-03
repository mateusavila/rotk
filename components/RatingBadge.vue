<script setup lang="ts">
const { rating, size = 'big', position = 'absolute', rounded } = defineProps<{
  rating: number | 'X'
  size?: string,
  position?: string,
  rounded?: string
}>()

const rat = +rating
</script>

<template>
  <div class="flex items-center content-center justify-center shadow"
  :class="[rounded, {
    'lg:w-[120px] w-[40px] h-[40px] lg:h-[120px]': size === 'big',
    'w-[32px] h-[32px]': size === 'small',
    'w-[30px] h-[24px]': size === 'smallest',
    'absolute lg:top-[50%] sm:top-auto top-[30px] lg:right-[20px] sm:right-auto right-[30px] lg:translate-y-[-50%] lg:left-auto sm:left-[125px] left-auto lg:bottom-auto sm:bottom-[20px] bottom-auto': position === 'absolute',
    'bg-gradient-to-bl from-[#000] via-[#400000] to-[#562683] text-white': +rating >= 100,
    'bg-gradient-to-bl from-[#188fff] via-[#e1a6e7] to-[#f9a205] text-white': rating === 99,
    'bg-gradient-to-bl from-[#ff96df] to-[#ad388a] text-white': typeof rating === 'number' && rating > 96 && rating <= 98,
    'bg-gradient-to-bl from-[#00aace] to-[#005668] text-white': typeof rating === 'number' && rating > 92 && rating <= 96,
    'bg-gradient-to-bl from-[#a51fff] to-[#5b1c86] text-white': typeof rating === 'number' && rating > 89 && rating <= 92,
    'bg-gradient-to-bl from-[#e70000] to-[#810000] text-white': typeof rating === 'number' && rating > 84 && rating <= 89,
    'bg-gradient-to-bl from-[#05c715] to-[#03630b] text-white': typeof rating === 'number' && rating > 79 && rating <= 84,
    'bg-gradient-to-bl from-[#d6bb5c] to-[#a38829] text-white': typeof rating === 'number' && rating > 74 && rating <= 79,
    'bg-gradient-to-bl from-[#a2a2a2] to-[#6f6f6f] text-white': typeof rating === 'number' && rating > 69 && rating <= 74,
    'bg-gradient-to-bl from-[#cc5b00] to-[#662d00] text-white': typeof rating === 'number' && rating > 64 && rating <= 69,
    'bg-[#d40] text-white': typeof rating === 'number' && rating > 59 && rating <= 64,
    'bg-[#900] text-white': (typeof rating === 'number' && rating < 59) || rating === 'X',
  }]"
  
  >
    <p class="font-['Aleo'] font-black" :class="{
      'lg:text-[50px] text-[22px]': size === 'big'
    }">{{ rating }}</p>
  </div>
</template>