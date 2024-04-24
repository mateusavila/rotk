<script lang="ts" setup>
import type { FamousGenerals } from '~/utils'
interface ComponentInterface {
  list: FamousGenerals[],
  title: string
}

const { title, list } = defineProps<ComponentInterface>()
</script>

<template>
  <div class="w-full my-[50px]">
    <h2 class="font-['Aleo'] text-[24px] font-semibold color-slate-900 mb-[20px]">{{ title }}</h2>
    <div class="w-full grid lg:grid-cols-4 sm:grid-cols-2 gap-[20px]">
      <ULink :to="slug" v-for="{ image, name, width, height, slug }, index in list" :key="index">
        <UCard  :ui="{ base: 'relative', body: { padding: 'p-0 sm:p-0' }}">
          <img :src="image" :alt="`Portrait of the general ${name}`" :width="width" :height="height" loading="lazy" class="w-full h-full block z-[1]" />
          <div class="absolute bottom-0 left-0 w-full py-[10px] px-[20px] z-[10] bg-gradient-to-b from-slate-800/10 to-slate-900/100">
            <p class="text-white font-['Aleo'] text-[16px] font-semibold">{{ name }}</p>
          </div>
        </UCard>
      </ULink>
    </div>
  </div>
</template>