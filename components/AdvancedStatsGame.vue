<script lang="ts" setup>
import type { GeneralData } from '~/utils'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
const { stats } = defineProps<{ 
  stats: GeneralData['advanced_stats'] 
}>()

const tabs = [
  {
    key: 'averages_per_game',
    label: 'Averages per Game',
  },
  {
    key: 'totals_per_game',
    label: 'Totals per Game',
  },
  {
    key: 'stats_averages',
    label: 'Stats Averages',
  },
  {
    key: 'stats_max',
    label: 'Best Possible',
  },
  {
    key: 'stats_min',
    label: 'Worst Possible',
  }
]
// chart

const series = ref([{
    name: "Average per game",
    data: [
      stats.averages_per_game.rotk1 ?? 0,
      stats.averages_per_game.rotk2 ?? 0,
      stats.averages_per_game.rotk3 ?? 0,
      stats.averages_per_game.rotk4 ?? 0,
      stats.averages_per_game.rotk7 ?? 0,
      stats.averages_per_game.rotk8 ?? 0,
      stats.averages_per_game.rotk9 ?? 0,
      stats.averages_per_game.rotk10 ?? 0,
      stats.averages_per_game.rotk1 ?? 0,
    ]
}])
const seriesTotals = ref([{
    name: "Totals per game",
    data: [
      stats.totals_per_game.rotk1 ?? 0,
      stats.totals_per_game.rotk2 ?? 0,
      stats.totals_per_game.rotk3 ?? 0,
      stats.totals_per_game.rotk4 ?? 0,
      stats.totals_per_game.rotk7 ?? 0,
      stats.totals_per_game.rotk8 ?? 0,
      stats.totals_per_game.rotk9 ?? 0,
      stats.totals_per_game.rotk10 ?? 0,
      stats.totals_per_game.rotk1 ?? 0,
    ]
}])
const chartOptions = ref({
  chart: {
    type: 'area',
    height: 300,
    width: 'auto',
    zoom: {
      enabled: false
    },
    
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  title: {
    text: 'Average Evolution By Game',
    align: 'left'
  },
  markers: {
    size: 5,
    hover: {
      size: 9
    }
  },
  xaxis: {
    categories: ['ROTK 1', 'ROTK 2', 'ROTK 3', 'ROTK 4', 'ROTK 7', 'ROTK 8', 'ROTK 9', 'ROTK 10', 'ROTK 11']
  },
  yaxis: {
    opposite: true,
    min: 0,
    max: 100,
    tickAmount: 5,
    labels: {
      formatter: (val: number) => `${val}`
    }
  },
  legend: {
    horizontalAlign: 'left'
  }
})
const chartOptionsTotals = ref({
  chart: {
    type: 'area',
    height: 300,
    width: 'auto',
    zoom: {
      enabled: false
    },
    
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  title: {
    text: 'Average Evolution By Game',
    align: 'left'
  },
  markers: {
    size: 5,
    hover: {
      size: 9
    }
  },
  xaxis: {
    categories: ['ROTK 1', 'ROTK 2', 'ROTK 3', 'ROTK 4', 'ROTK 7', 'ROTK 8', 'ROTK 9', 'ROTK 10', 'ROTK 11']
  },
  yaxis: {
    opposite: true,
    min: 0,
    max: 500,
    tickAmount: 5,
    labels: {
      formatter: (val: number) => `${val}`
    }
  },
  legend: {
    horizontalAlign: 'left'
  }
})
</script>

<template>
  <div class="w-full">
    <UTabs :items="tabs" :orientation="width > 800 ? 'horizontal' : 'vertical'">
      <template #item="{ item }">
        <UCard>
          <template v-if="item.key === 'averages_per_game'">
            <div class="w-full">
              <ClientOnly>
                <div class="w-full h-[300px]">
                  <apexchart type="area" height="300" 
                  width="100%" :options="chartOptions" :series="series"></apexchart>
                </div>
              </ClientOnly>
            </div>
          </template>
          <template v-if="item.key === 'totals_per_game'">
            <div class="w-full">
              <ClientOnly>
                <div class="w-full h-[300px]">
                  <apexchart type="area" height="300" 
                  width="100%" :options="chartOptionsTotals" :series="seriesTotals"></apexchart>
                </div>
              </ClientOnly>
            </div>
          </template>
          <template v-if="item.key === 'stats_averages'">
            <div class="w-full gap-[10px] grid sm:grid-cols-5 justify-center">
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-minions"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.stats_averages.lead }}</p>
                <p class="text-[12px] text-center">Lead</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-brain"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.stats_averages.intelligence }}</p>
                <p class="text-[12px] text-center">Intelligence</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-swords-power"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.stats_averages.power }}</p>
                <p class="text-[12px] text-center">War Ability</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-shaking-hands"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.stats_averages.charisma }}</p>
                <p class="text-[12px] text-center">Charisma</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-vote"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.stats_averages.politics }}</p>
                <p class="text-[12px] text-center">Politics</p>
              </div>
            </div>
          </template>
          <template v-if="item.key === 'stats_max'">
            <div class="w-full gap-[10px] grid sm:grid-cols-5 justify-center">
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-minions"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.stats_max.lead }}</p>
                <p class="text-[12px] text-center">Lead</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-brain"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.stats_max.intelligence }}</p>
                <p class="text-[12px] text-center">Intelligence</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-swords-power"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.stats_max.power }}</p>
                <p class="text-[12px] text-center">War Ability</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-shaking-hands"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.stats_max.charisma }}</p>
                <p class="text-[12px] text-center">Charisma</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-vote"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.stats_max.politics }}</p>
                <p class="text-[12px] text-center">Politics</p>
              </div>
            </div>
          </template>
          <template v-if="item.key === 'stats_min'">
            <div class="w-full gap-[10px] grid sm:grid-cols-5 justify-center">
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-minions"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.stats_min.lead }}</p>
                <p class="text-[12px] text-center">Lead</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-brain"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.stats_min.intelligence }}</p>
                <p class="text-[12px] text-center">Intelligence</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-swords-power"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.stats_min.power }}</p>
                <p class="text-[12px] text-center">War Ability</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-shaking-hands"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.stats_min.charisma }}</p>
                <p class="text-[12px] text-center">Charisma</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-vote"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.stats_min.politics }}</p>
                <p class="text-[12px] text-center">Politics</p>
              </div>
            </div>
          </template>
          
          
        </UCard>
      </template>
    </UTabs>
  </div>
</template>