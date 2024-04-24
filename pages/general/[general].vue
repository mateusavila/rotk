<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import type { GeneralData, NamesGenerals } from '~/utils'

const { params: { general } } = useRoute()
const { pending, data: generalInfo } = await useLazyAsyncData('data', () => $fetch<GeneralData>(`/api/general/${general}`))

const names = useStorage<NamesGenerals[]>('names', [])
const { rating } = useRatings()

useSeoMeta({
  title: () => `${generalInfo.value?.name} | Romance of Three Kingdoms Database`,
  ogTitle: () => `${generalInfo.value?.name} | Romance of Three Kingdoms Database`,
  description: 'This website collects all the stats for the Romance of Three Kingdoms games, produced by Koei.',
  ogDescription: 'This website collects all the stats for the Romance of Three Kingdoms games, produced by Koei.',
  keywords: 'Romance of Three Kingdoms, ROTK, Database, Generals, Zhuge Liang, Cao Cao, Zhao Yun, Liu Bei, Three Kingdoms',
  robots: 'index, follow',
  contentType: 'text/html; charset=utf-8',
  author: 'Mateus Ávila Isidoro'
})

// chart
const { series, chartOptions } = useRadarGraph()

watch(() => generalInfo.value, (info) => {
  if (info && info.advanced_stats.stats_averages) {
    series.value[0].data = [info.advanced_stats.stats_averages.intelligence ?? 0, info.advanced_stats.stats_averages.charisma ?? 0, info.advanced_stats.stats_averages.power ?? 0, info.advanced_stats.stats_averages.lead ?? 0, info.advanced_stats.stats_averages.politics ?? 0 ]
  }
}, { immediate: true, deep: true })
</script>

<template>
  <NuxtLayout>
    <template v-if="pending">
      <div class="w-full h-[180px]">
        <Skeleton width="100%" height="180px" rounded="10px" />
      </div>
      <section class="w-full my-[20px] flex gap-[40px] flex-wrap">
        <div class="lg:w-[calc(70%-20px)] w-full h-[300px]">
          <Skeleton width="100%" height="300px" rounded="10px" />
        </div>
        <div class="lg:w-[calc(30%-20px)] w-full h-[300px]">
          <Skeleton width="100%" height="300px" rounded="10px" />
        </div>
      </section>
    </template>
    <template v-if="!pending">
      <div class="w-full" v-if="generalInfo">
        <div class="w-full sm:h-[180px] h-auto bg-slate-200 rounded-[10px] p-[20px] flex items-center flex-wrap content-center justify-between relative">
          <div class="sm:w-[150px] w-full mb-[20px] sm:mb-0">
            <img :src="`/${generalInfo.avatar}`" :alt="generalInfo.name" width="256" height="256" loading="lazy" class="w-full h-auto block rounded-[10px] shadow" />
          </div>
          <div class="sm:w-[calc(100%-180px)] w-full">
            <h1 class="sm:text-[40px] text-[30px] font-['Aleo'] font-black w-full m-0">{{ generalInfo.name }}</h1>
            <p class="w-full text-[16px] m-0">Birth: {{ generalInfo.birth }} <span v-if="generalInfo.death">| Death: {{ generalInfo.death }}</span></p>
            <SkillsBox :skills="generalInfo.skills" />
            <RatingBadge position="absolute" size="big" :rating="rating(generalInfo.advanced_stats)" rounded="lg:rounded-[20px] rounded-[10px]" />
          </div>
        </div>
        <section class="w-full my-[20px] flex gap-[40px] flex-wrap">
          <div class="lg:w-[calc(70%-20px)] w-full">
            <div class="w-full mb-[40px]">
              <h2 class="font-['Aleo'] text-[24px] font-black">Biography</h2>
              <div v-if="generalInfo.bio.length > 3" v-html="generalInfo.bio"></div>
              <p v-else>We are looking for help here.</p>
            </div>
            <div class="w-full mb-[40px]">
              <h2 class="font-['Aleo'] text-[24px] font-black">Stats by Game</h2>
              <StatsGame :stats="generalInfo.stats"/>
            </div>
            <div class="w-full mb-[40px]">
              <h2 class="font-['Aleo'] text-[24px] font-black">Advanced Stats</h2>
              <AdvancedStatsGame :stats="generalInfo.advanced_stats" />
            </div>
          </div>
          <div class="lg:w-[calc(30%-20px)] w-full">
            <div class="w-full">
              <h2 class="font-['Aleo'] text-[24px] font-black">Overall</h2>
              <ClientOnly>
              <div class="w-full h-[290px] flex justify-center">
                <apexchart type="radar" height="290" :options="chartOptions" :series="series"></apexchart>
              </div>
            </ClientOnly>
            </div>
            <div class="w-full mb-[20px]" v-if="names">
              <h2 class="font-['Aleo'] text-[24px] font-black">Search</h2>
              <Search :list="names" :fullsize="true" base-url="../" />
            </div>
            <div class="w-full mb-[20px]" v-if="generalInfo.generals && generalInfo.generals.length">
              <h2 class="font-['Aleo'] text-[24px] font-black">With same surname</h2>
              <div class="grid lg:grid-cols-5 ms:grid-cols-3 grid-cols-2 gap-[10px] mt-[5px]">
                <UTooltip v-for="general, index in generalInfo.generals" :text="general.name">
                  <nuxt-link :key="index" :to="`/general/${general.slug}`">
                    <img :src="`/${general.avatar}`" :alt="general.name" width="256" height="256" loading="lazy" class="w-full h-auto block rounded-[10px] shadow" />
                  </nuxt-link>
                </UTooltip>
              </div>
            </div>
            <div class="w-full mb-[20px]" v-if="generalInfo.hiperlinks && generalInfo.hiperlinks.length">
              <h2 class="font-['Aleo'] text-[24px] font-black">Extra information</h2>
              <div class="w-full mt-[10px]">
                <ul>
                  <li v-for="item, index in generalInfo.hiperlinks" :key="index">
                    &bull; <nuxt-link :to="item.url" :external="true" class="hover:underline" target="_blank">{{ item.label }}</nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="w-full mb-[20px]">
              <h2 class="font-['Aleo'] text-[24px] font-black">Secondary Skills</h2>
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