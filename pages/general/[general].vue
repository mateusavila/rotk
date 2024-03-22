<script lang="ts" setup>
import type { GeneralData } from '~/types'

const { params: { general } } = useRoute()
const { pending, data: generalInfo } = await useLazyAsyncData('data', () => $fetch<GeneralData>(`/api/general/${general}`))

useHead({
  title: (generalInfo.value && `${generalInfo.value.name} | Romance of Three Kingdoms Database`) ?? 'Romance of Three Kingdoms Database'
})
</script>

<template>
  <NuxtLayout>
    <template v-if="pending">
      <div class="w-full h-[180px]">
        <Skeleton width="100%" height="180px" rounded="10px" />
      </div>
    </template>
    <template v-if="!pending">
      <div class="w-full" v-if="generalInfo">
      <div class="w-full h-[180px] bg-slate-200 rounded-[10px] p-[20px] flex items-center flex-wrap content-center justify-between">
        <div class="w-[150px]">
          <NuxtImg :src="`/${generalInfo.avatar}`" :alt="generalInfo.name" width="256" height="256" loading="lazy" class="w-full h-auto block rounded-[10px] shadow" />
        </div>
        <div class="w-[calc(100%-180px)]">
          <h1 class="text-[40px] font-['Aleo'] font-black w-full m-0">{{ generalInfo.name }}</h1>
          <p class="w-full text-[16px] m-0">Birth: {{ generalInfo.birth }}</p>
          <SkillsBox :skills="generalInfo.skills" />
        </div>
      </div>
      <section class="w-full my-[20px] flex gap-[40px]">
        <div class="w-[calc(70%-20px)]">
          <div class="w-full mb-[40px]">
            <h2 class="font-['Aleo'] text-[24px]  font-black">Biography {{ generalInfo.name }}</h2>
            <p v-if="generalInfo.bio.length > 3">{{ generalInfo.bio }}</p>
            <p v-else>We are looking for help here.</p>
          </div>
          <div class="w-full mb-[40px]">
            <h2 class="font-['Aleo'] text-[24px] font-black">Stats by Game</h2>
            <StatsGame :stats="generalInfo.stats"/>
          </div>
        </div>
        <div class="w-[calc(30%-20px)]">
          <div class="w-full mb-[20px]">
            <h2 class="font-['Aleo'] text-[24px]  font-black">Secondary Skills</h2>
            <SecondarySkills 
              :luck="generalInfo.luck" 
              :health="generalInfo.health" 
              :soldiers="generalInfo.soldiers" 
              :loyalty="generalInfo.loyalty" 
              :navy_command="generalInfo.navy_command" 
              :army_command="generalInfo.army_command" />
          </div>
        </div>
      </section>
    </div>
    </template>
  </NuxtLayout>
</template>
