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
// 
</script>

<template>
  <div class="w-full">
    <UTabs :items="tabs" :orientation="width > 800 ? 'horizontal' : 'vertical'">
      <template #item="{ item }">
        <UCard>
          <template v-if="item.key === 'averages_per_game'">
            <div class="w-full grid lg:grid-cols-9 sm:grid-cols-4 xxsm:grid-cols-2 gap-[20px]">
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.averages_per_game.rotk1">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="stats.averages_per_game.rotk1">{{ stats.averages_per_game.rotk1 }}</p>
                <p class="text-[12px] text-center">ROTK 1</p>
              </div>
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.averages_per_game.rotk2">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black"  v-if="stats.averages_per_game.rotk2">{{ stats.averages_per_game.rotk2 }}</p>
                <p class="text-[12px] text-center">ROTK 2</p>
              </div>
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.averages_per_game.rotk3">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black"  v-if="stats.averages_per_game.rotk3">{{ stats.averages_per_game.rotk3 }}</p>
                <p class="text-[12px] text-center">ROTK 3</p>
              </div>
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.averages_per_game.rotk4">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black"  v-if="stats.averages_per_game.rotk4">{{ stats.averages_per_game.rotk4 }}</p>
                <p class="text-[12px] text-center">ROTK 4</p>
              </div>
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.averages_per_game.rotk7">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black"  v-if="stats.averages_per_game.rotk7">{{ stats.averages_per_game.rotk7 }}</p>
                <p class="text-[12px] text-center">ROTK 7</p>
              </div>
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.averages_per_game.rotk8">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black"  v-if="stats.averages_per_game.rotk8">{{ stats.averages_per_game.rotk8 }}</p>
                <p class="text-[12px] text-center">ROTK 8</p>
              </div>
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.averages_per_game.rotk9">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black"  v-if="stats.averages_per_game.rotk9">{{ stats.averages_per_game.rotk9 }}</p>
                <p class="text-[12px] text-center">ROTK 9</p>
              </div>
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.averages_per_game.rotk10">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black"  v-if="stats.averages_per_game.rotk10">{{ stats.averages_per_game.rotk10 }}</p>
                <p class="text-[12px] text-center">ROTK 10</p>
              </div>
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.averages_per_game.rotk11">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black"  v-if="stats.averages_per_game.rotk11">{{ stats.averages_per_game.rotk11 }}</p>
                <p class="text-[12px] text-center">ROTK 11</p>
              </div>
            </div>
          </template>
          <template v-if="item.key === 'totals_per_game'">
            <div class="w-full grid lg:grid-cols-9 sm:grid-cols-4 xxsm:grid-cols-2 gap-[20px]">
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.totals_per_game.rotk1">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="stats.totals_per_game.rotk1">{{ stats.totals_per_game.rotk1 }}</p>
                <p class="text-[12px] text-center">ROTK 1</p>
              </div>
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.totals_per_game.rotk2">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="stats.totals_per_game.rotk2">{{ stats.totals_per_game.rotk2 }}</p>
                <p class="text-[12px] text-center">ROTK 2</p>
              </div>
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.totals_per_game.rotk3">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="stats.totals_per_game.rotk3">{{ stats.totals_per_game.rotk3 }}</p>
                <p class="text-[12px] text-center">ROTK 3</p>
              </div>
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.totals_per_game.rotk4">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="stats.totals_per_game.rotk4">{{ stats.totals_per_game.rotk4 }}</p>
                <p class="text-[12px] text-center">ROTK 4</p>
              </div>
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.totals_per_game.rotk7">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="stats.totals_per_game.rotk7">{{ stats.totals_per_game.rotk7 }}</p>
                <p class="text-[12px] text-center">ROTK 7</p>
              </div>
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.totals_per_game.rotk8">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="stats.totals_per_game.rotk8">{{ stats.totals_per_game.rotk8 }}</p>
                <p class="text-[12px] text-center">ROTK 8</p>
              </div>
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.totals_per_game.rotk9">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="stats.totals_per_game.rotk9">{{ stats.totals_per_game.rotk9 }}</p>
                <p class="text-[12px] text-center">ROTK 9</p>
              </div>
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.totals_per_game.rotk10">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="stats.totals_per_game.rotk10">{{ stats.totals_per_game.rotk10 }}</p>
                <p class="text-[12px] text-center">ROTK 10</p>
              </div>
              <div class="w-full">
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="!stats.totals_per_game.rotk11">absent</p>
                <p class="text-[24px] w-full leading-[24px] text-center font-['Aleo'] font-black" v-if="stats.totals_per_game.rotk11">{{ stats.totals_per_game.rotk11 }}</p>
                <p class="text-[12px] text-center">ROTK 11</p>
              </div>
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
~/utils