<script lang="ts" setup>
import type { GeneralData } from '~/utils'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
const { stats } = defineProps<{ 
  stats: GeneralData['stats'] 
}>()

const tabs = [
{
    key: 'rotk1',
    label: '1',
  },
  {
    key: 'rotk2',
    label: '2',
  },
  {
    key: 'rotk3',
    label: '3',
  },
  {
    key: 'rotk4',
    label: '4',
  },
  {
    key: 'rotk7',
    label: '7',
  },
  {
    key: 'rotk8',
    label: '8',
  },
  {
    key: 'rotk9',
    label: '9',
  },
  {
    key: 'rotk10',
    label: '10',
  },
  {
    key: 'rotk11',
    label: '11',
  }
]
</script>

<template>
  <div class="w-full">
    <UTabs :items="tabs" :orientation="width > 800 ? 'horizontal' : 'vertical'">
      <template #item="{ item }">
        <UCard>
          <template v-if="item.key === 'rotk1'">
            <p v-if="!stats.rotk1">This General didn't appear in this game.</p>
            <div class="w-full gap-[10px] grid sm:grid-cols-3 justify-center" v-if="stats.rotk1">
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-brain"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk1.intelligence }}</p>
                <p class="text-[12px] text-center">Intelligence</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-swords-power"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk1.power }}</p>
                <p class="text-[12px] text-center">War Ability</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-shaking-hands"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk1.charisma }}</p>
                <p class="text-[12px] text-center">Charisma</p>
              </div>
            </div>
          </template>
          <template v-if="item.key === 'rotk2'">
            <p v-if="!stats.rotk2">This General didn't appear in this game.</p>
            <div class="w-full gap-[10px] grid sm:grid-cols-3 justify-center" v-if="stats.rotk2">
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-brain"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk2.intelligence }}</p>
                <p class="text-[12px] text-center">Intelligence</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-swords-power"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk2.power }}</p>
                <p class="text-[12px] text-center">War Ability</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-shaking-hands"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk2.charisma }}</p>
                <p class="text-[12px] text-center">Charisma</p>
              </div>
            </div>
          </template>
          <template v-if="item.key === 'rotk3'">
            <p v-if="!stats.rotk3">This General didn't appear in this game.</p>
            <div class="w-full gap-[10px] grid sm:grid-cols-4 justify-center" v-if="stats.rotk3">
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-brain"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk3.intelligence }}</p>
                <p class="text-[12px] text-center">Intelligence</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-swords-power"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk3.power }}</p>
                <p class="text-[12px] text-center">War Ability</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-shaking-hands"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk3.charisma }}</p>
                <p class="text-[12px] text-center">Charisma</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-vote"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk3.politics }}</p>
                <p class="text-[12px] text-center">Politics</p>
              </div>
            </div>
          </template>
          <template v-if="item.key === 'rotk4'">
            <p v-if="!stats.rotk4">This General didn't appear in this game.</p>
            <div class="w-full gap-[10px] grid sm:grid-cols-5 justify-center" v-if="stats.rotk4">
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-minions"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk4.lead }}</p>
                <p class="text-[12px] text-center">Lead</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-brain"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk4.intelligence }}</p>
                <p class="text-[12px] text-center">Intelligence</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-swords-power"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk4.power }}</p>
                <p class="text-[12px] text-center">War Ability</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-shaking-hands"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk4.charisma }}</p>
                <p class="text-[12px] text-center">Charisma</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-vote"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk4.politics }}</p>
                <p class="text-[12px] text-center">Politics</p>
              </div>
            </div>
          </template>
          <template v-if="item.key === 'rotk7'">
            <p v-if="!stats.rotk7">This General didn't appear in this game.</p>
            <div class="w-full gap-[10px] grid sm:grid-cols-4 justify-center" v-if="stats.rotk7">
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-brain"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk7.intelligence }}</p>
                <p class="text-[12px] text-center">Intelligence</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-swords-power"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk7.power }}</p>
                <p class="text-[12px] text-center">War Ability</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-shaking-hands"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk7.charisma }}</p>
                <p class="text-[12px] text-center">Charisma</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-vote"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk7.politics }}</p>
                <p class="text-[12px] text-center">Politics</p>
              </div>
            </div>
          </template>
          <template v-if="item.key === 'rotk8'">
            <p v-if="!stats.rotk8">This General didn't appear in this game.</p>
            <div class="w-full gap-[10px] grid sm:grid-cols-4 justify-center" v-if="stats.rotk8">
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-brain"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk8.intelligence }}</p>
                <p class="text-[12px] text-center">Intelligence</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-swords-power"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk8.power }}</p>
                <p class="text-[12px] text-center">War Ability</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-shaking-hands"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk8.charisma }}</p>
                <p class="text-[12px] text-center">Charisma</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-vote"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk8.politics }}</p>
                <p class="text-[12px] text-center">Politics</p>
              </div>
            </div>
          </template>
          <template v-if="item.key === 'rotk9'">
            <p v-if="!stats.rotk9">This General didn't appear in this game.</p>
            <div class="w-full gap-[10px] grid sm:grid-cols-4 justify-center" v-if="stats.rotk9">
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-brain"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk9.intelligence }}</p>
                <p class="text-[12px] text-center">Intelligence</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-swords-power"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk9.power }}</p>
                <p class="text-[12px] text-center">War Ability</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-minions"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk9.lead }}</p>
                <p class="text-[12px] text-center">Lead</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-vote"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk9.politics }}</p>
                <p class="text-[12px] text-center">Politics</p>
              </div>
            </div>
          </template>
          <template v-if="item.key === 'rotk10'">
            <p v-if="!stats.rotk10">This General didn't appear in this game.</p>
            <div class="w-full gap-[10px] grid sm:grid-cols-5 justify-center" v-if="stats.rotk10">
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-minions"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk10.lead }}</p>
                <p class="text-[12px] text-center">Lead</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-brain"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk10.intelligence }}</p>
                <p class="text-[12px] text-center">Intelligence</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-swords-power"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk10.power }}</p>
                <p class="text-[12px] text-center">War Ability</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-shaking-hands"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk10.charisma }}</p>
                <p class="text-[12px] text-center">Charisma</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-vote"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk10.politics }}</p>
                <p class="text-[12px] text-center">Politics</p>
              </div>
            </div>
          </template>
          <template v-if="item.key === 'rotk11'">
            <p v-if="!stats.rotk11">This General didn't appear in this game.</p>
            <div class="w-full gap-[10px] grid sm:grid-cols-5 justify-center" v-if="stats.rotk11">
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-minions"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk11.lead }}</p>
                <p class="text-[12px] text-center">Lead</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-brain"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk11.intelligence }}</p>
                <p class="text-[12px] text-center">Intelligence</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-swords-power"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk11.power }}</p>
                <p class="text-[12px] text-center">War Ability</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-shaking-hands"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk11.charisma }}</p>
                <p class="text-[12px] text-center">Charisma</p>
              </div>
              <div class="flex flex-wrap w-full items-center content-center justify-center">
                <p class="text-[30px] w-full text-center"><UIcon name="i-game-icons-vote"></UIcon></p>
                <p class="text-[40px] w-full leading-[40px] text-center font-['Aleo'] font-black">{{ stats.rotk11.politics }}</p>
                <p class="text-[12px] text-center">Politics</p>
              </div>
            </div>
          </template>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>