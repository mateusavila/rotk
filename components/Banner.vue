<script setup lang="ts">
import type { NamesGenerals } from '~/types'

const { list } = defineProps<{ list: NamesGenerals[] }>()
</script>

<template>
  <div class="banner w-full sm:h-[350px] h-[280px] border border-slate-50 flex items-end relative after:z-1 after:absolute after:w-full after:h-[200px] after:bottom-0 after:left-0 after:bg-gradient-to-b from-slate-800/0 to-slate-900/100">
    <img format="avif" :src="`/peach-garden-min.avif`" class="object-cover z-[1] absolute top-0 left-0 w-full sm:h-[350px] h-[280px]" width="100%" height="350px" alt="Liu Bei, Zhang Fei and Guan Yu. They are in ceremony, doing the Oath of Peach Garden." />
    <div class="w-full flex items-center content-center justify-center sm:h-[200px] h-[120px] flex-wrap">
      <h2 class="text-white text-[18px] font-['Aleo'] w-full z-[10] text-center mb-[10px]">Select your general</h2>
      <Search :list="list" :fullsize="false" base-url="" />
    </div>
  </div>
</template>