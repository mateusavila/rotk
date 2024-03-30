<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import type { FamousGenerals, NamesGenerals } from '~/utils'
  const { params: { general1, general2 } } = useRoute()
  const { data } = await useFetch<GeneralData[]>(`/api/compare/${general1},${general2}`, {
  transform: (_data: any) => _data.data
})

useHead({
  title: 'Romance of Three Kingdoms Database'
})

useSeoMeta({
  title: 'Romance of Three Kingdoms Database',
  ogTitle: 'Romance of Three Kingdoms Database',
  description: 'This website collects all the stats for the Romance of Three Kingdoms games, produced by Koei.',
  ogDescription: 'This website collects all the stats for the Romance of Three Kingdoms games, produced by Koei.',
  keywords: 'Romance of Three Kingdoms, ROTK, Database, Generals, Zhuge Liang, Cao Cao, Zhao Yun, Liu Bei, Three Kingdoms',
  robots: 'index, follow',
  contentType: 'text/html; charset=utf-8',
  author: 'Mateus Ávila Isidoro'
})

const general1Info = computed(() => data.value && data.value[0])
const general2Info = computed(() => data.value && data.value[1])
const { rating } = useRatings()

const namesList = async (): Promise<NamesGenerals[]> => {
  const { data } = await $fetch('/api/names')
  if (!data) {
    return []
  }
  return data.map((item) => ({
    label: item.label ?? '',
    key: item.key ?? '',
    avatar: item.avatar ?? ''
  }))
}
const names = useStorage<NamesGenerals[]>('names', await namesList())
</script>

<template>
  <NuxtLayout name="default">
    <div class="w-full">
      <h1 class="font-['Aleo'] text-[24px] font-semibold color-slate-900 mb-[20px]">General Comparison</h1>
      <CompareBox :list="names" />
      <div class="w-full flex flex-wrap" v-if="general1Info && general2Info">
        <table class="w-full table-fixed mb-[30px]">
          <tbody>
            <tr class="border border-slate-200">
              <td class="border border-slate-200 p-[8px] bg-white text-right w-[calc(50%-50px)]">
                <RatingBadge class="float-right" position="" size="small" :rating="rating(general1Info.advanced_stats)" rounded="rounded-[6px]" />
              </td>
              <td class="border border-slate-200 p-[8px] bg-white text-center w-[100px] font-semibold">Overall</td>
              <td class="border border-slate-200 p-[8px] bg-white text-left w-[calc(50%-50px)]">
                <RatingBadge position="" size="small" rounded="rounded-[6px]" :rating="rating(general2Info.advanced_stats)" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="border border-slate-200 p-[8px] bg-white text-right w-[calc(50%-50px)]">
                <img :src="`/${general1Info.avatar}`" :alt="general1Info.name" width="256" height="256" loading="lazy" class="w-full h-auto inline-block max-w-[100px] rounded-[10px] shadow" />
              </td>
              <td class="border border-slate-200 p-[8px] bg-white text-center w-[100px] font-semibold">Avatar</td>
              <td class="border border-slate-200 p-[8px] bg-white text-left w-[calc(50%-50px)]">
                <img :src="`/${general2Info.avatar}`" :alt="general2Info.name" width="256" height="256" loading="lazy" class="w-full h-auto inline-block max-w-[100px] rounded-[10px] shadow" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="border border-slate-200 p-[8px] bg-gray-50 text-right w-[calc(50%-50px)]">{{ general1Info.name }}</td>
              <td class="border border-slate-200 p-[8px] bg-gray-50 text-center w-[100px] font-semibold">Name</td>
              <td class="border border-slate-200 p-[8px] bg-gray-50 text-left w-[calc(50%-50px)]">{{ general2Info.name }}</td>
            </tr>
            <tr class="border border-slate-200">
              <td class="border border-slate-200 p-[8px] bg-white text-right w-[calc(50%-50px)]">{{ general1Info.birth }}</td>
              <td class="border border-slate-200 p-[8px] bg-white text-center w-[100px] font-semibold">Birth</td>
              <td class="border border-slate-200 p-[8px] bg-white text-left w-[calc(50%-50px)]">{{ general2Info.birth }}</td>
            </tr>
            <tr class="border border-slate-200">
              <td class="border border-slate-200 p-[8px] bg-gray-50 text-right w-[calc(50%-50px)]">{{ general1Info.skills.join(', ') }}</td>
              <td class="border border-slate-200 p-[8px] bg-gray-50 text-center w-[100px] font-semibold">Skills</td>
              <td class="border border-slate-200 p-[8px] bg-gray-50 text-left w-[calc(50%-50px)]">{{ general2Info.skills.join(', ') }}</td>
            </tr>
            <tr class="border border-slate-200">
              <td class="border border-slate-200 p-[8px] bg-white text-right w-[calc(50%-50px)]">{{ general1Info.health }}</td>
              <td class="border border-slate-200 p-[8px] bg-white text-center w-[100px] font-semibold">Health</td>
              <td class="border border-slate-200 p-[8px] bg-white text-left w-[calc(50%-50px)]">{{ general2Info.health }}</td>
            </tr>
            <tr class="border border-slate-200">
              <td class="border border-slate-200 p-[8px] bg-gray-50 text-right w-[calc(50%-50px)]">{{ general1Info.soldiers}}</td>
              <td class="border border-slate-200 p-[8px] bg-gray-50 text-center w-[100px] font-semibold">Soldiers</td>
              <td class="border border-slate-200 p-[8px] bg-gray-50 text-left w-[calc(50%-50px)]">{{ general2Info.soldiers}}</td>
            </tr>
            <tr class="border border-slate-200">
              <td class="border border-slate-200 p-[8px] bg-white text-right w-[calc(50%-50px)]">{{ general1Info.loyalty }}</td>
              <td class="border border-slate-200 p-[8px] bg-white text-center w-[100px] font-semibold">Loyalty</td>
              <td class="border border-slate-200 p-[8px] bg-white text-left w-[calc(50%-50px)]">{{ general2Info.loyalty }}</td>
            </tr>
            <tr class="border border-slate-200">
              <td class="border border-slate-200 p-[8px] bg-gray-50 text-right w-[calc(50%-50px)]">{{ general1Info.navy_command}}</td>
              <td class="border border-slate-200 p-[8px] bg-gray-50 text-center w-[100px] font-semibold">Navy Cmd.</td>
              <td class="border border-slate-200 p-[8px] bg-gray-50 text-left w-[calc(50%-50px)]">{{ general2Info.navy_command}}</td>
            </tr>
            <tr class="border border-slate-200">
              <td class="border border-slate-200 p-[8px] bg-white text-right w-[calc(50%-50px)]">{{ general1Info.army_command }}</td>
              <td class="border border-slate-200 p-[8px] bg-white text-center w-[100px] font-semibold">Army Cmd.</td>
              <td class="border border-slate-200 p-[8px] bg-white text-left w-[calc(50%-50px)]">{{ general2Info.army_command }}</td>
            </tr>
          </tbody>
        </table>
        <h2 class="font-['Aleo'] text-[20px] font-semibold color-slate-900 mb-[20px]">Stats per Game</h2>
        <table class="w-full table-fixed mb-[30px]">
          <colgroup>
            <col style="width: calc(100% - 50px);">
            <col style="width: 100px;">
            <col style="width: calc(100% - 50px);">
          </colgroup>
          <tbody>
            <tr class="border border-slate-200">
              <td colspan="3" class="text-center bg-white p-[10px]">Romance of Three Kingdoms 1</td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk1.intelligence ? +general1Info.stats.rotk1.intelligence : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-brain"></UIcon> <br>Intelligence</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk1.intelligence ? +general2Info.stats.rotk1.intelligence : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right bg-white"> 
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk1.power ? +general1Info.stats.rotk1.power : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px] bg-white"><UIcon name="i-game-icons-swords-power"></UIcon> <br>power</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk1.power ? +general2Info.stats.rotk1.power : 'X'" rounded="rounded-[6px] float-left" />  
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk1.charisma ? +general1Info.stats.rotk1.charisma : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-shaking-hands"></UIcon><br>charisma</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk1.charisma ? +general2Info.stats.rotk1.charisma : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
          </tbody>
        </table>
        <table class="w-full table-fixed mb-[30px]">
          <colgroup>
            <col style="width: calc(100% - 50px);">
            <col style="width: 100px;">
            <col style="width: calc(100% - 50px);">
          </colgroup>
          <tbody>
            <tr class="border border-slate-200">
              <td colspan="3" class="text-center bg-white p-[10px]">Romance of Three Kingdoms 2</td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk2.intelligence ? +general1Info.stats.rotk2.intelligence : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-brain"></UIcon> <br>Intelligence</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk2.intelligence ? +general2Info.stats.rotk2.intelligence : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right bg-white"> 
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk2.power ? +general1Info.stats.rotk2.power : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px] bg-white"><UIcon name="i-game-icons-swords-power"></UIcon> <br>power</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk2.power ? +general2Info.stats.rotk2.power : 'X'" rounded="rounded-[6px] float-left" />  
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk2.charisma ? +general1Info.stats.rotk2.charisma : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-shaking-hands"></UIcon><br>charisma</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk2.charisma ? +general2Info.stats.rotk2.charisma : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
          </tbody>
        </table>
        <table class="w-full table-fixed mb-[30px]">
          <colgroup>
            <col style="width: calc(100% - 50px);">
            <col style="width: 100px;">
            <col style="width: calc(100% - 50px);">
          </colgroup>
          <tbody>
            <tr class="border border-slate-200">
              <td colspan="3" class="text-center bg-white p-[10px]">Romance of Three Kingdoms 3</td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk3.intelligence ? +general1Info.stats.rotk3.intelligence : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-brain"></UIcon> <br>Intelligence</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk3.intelligence ? +general2Info.stats.rotk3.intelligence : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right bg-white"> 
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk3.power ? +general1Info.stats.rotk3.power : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px] bg-white"><UIcon name="i-game-icons-swords-power"></UIcon> <br>power</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk3.power ? +general2Info.stats.rotk3.power : 'X'" rounded="rounded-[6px] float-left" />  
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk3.charisma ? +general1Info.stats.rotk3.charisma : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-shaking-hands"></UIcon><br>charisma</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk3.charisma ? +general2Info.stats.rotk3.charisma : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk3.politics ? +general1Info.stats.rotk3.politics : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px] bg-white"><UIcon name="i-game-icons-vote"></UIcon><br>politics</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk3.politics ? +general2Info.stats.rotk3.politics : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
          </tbody>
        </table>
        <table class="w-full table-fixed mb-[30px]">
          <colgroup>
            <col style="width: calc(100% - 50px);">
            <col style="width: 100px;">
            <col style="width: calc(100% - 50px);">
          </colgroup>
          <tbody>
            <tr class="border border-slate-200">
              <td colspan="3" class="text-center bg-white p-[10px]">Romance of Three Kingdoms 4</td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk4.lead ? +general1Info.stats.rotk4.lead : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-brain"></UIcon> <br>Lead</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk4.lead ? +general2Info.stats.rotk4.lead : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk4.intelligence ? +general1Info.stats.rotk4.intelligence : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px] bg-white"><UIcon name="i-game-icons-brain"></UIcon> <br>Intelligence</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk4.intelligence ? +general2Info.stats.rotk4.intelligence : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk4.power ? +general1Info.stats.rotk4.power : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-swords-power"></UIcon> <br>power</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk4.power ? +general2Info.stats.rotk4.power : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk4.charisma ? +general1Info.stats.rotk4.charisma : 'X'" rounded="rounded-[6px]" />  
              </td>
              <td class="max-w-[100px] text-center w-[100px] bg-white"><UIcon name="i-game-icons-shaking-hands"></UIcon><br>charisma</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk4.charisma ? +general2Info.stats.rotk4.charisma : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk4.politics ? +general1Info.stats.rotk4.politics : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-vote"></UIcon><br>politics</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk4.politics ? +general2Info.stats.rotk4.politics : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
          </tbody>
        </table>
        <table class="w-full table-fixed mb-[30px]">
          <colgroup>
            <col style="width: calc(100% - 50px);">
            <col style="width: 100px;">
            <col style="width: calc(100% - 50px);">
          </colgroup>
          <tbody>
            <tr class="border border-slate-200">
              <td colspan="3" class="text-center bg-white p-[10px]">Romance of Three Kingdoms 7</td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk7.intelligence ? +general1Info.stats.rotk7.intelligence : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-brain"></UIcon> <br>Intelligence</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk7.intelligence ? +general2Info.stats.rotk7.intelligence : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right bg-white"> 
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk7.power ? +general1Info.stats.rotk7.power : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px] bg-white"><UIcon name="i-game-icons-swords-power"></UIcon> <br>power</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk7.power ? +general2Info.stats.rotk7.power : 'X'" rounded="rounded-[6px] float-left" />  
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk7.charisma ? +general1Info.stats.rotk7.charisma : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-shaking-hands"></UIcon><br>charisma</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk7.charisma ? +general2Info.stats.rotk7.charisma : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk7.politics ? +general1Info.stats.rotk7.politics : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px] bg-white"><UIcon name="i-game-icons-vote"></UIcon><br>politics</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk7.politics ? +general2Info.stats.rotk7.politics : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
          </tbody>
        </table>
        <table class="w-full table-fixed mb-[30px]">
          <colgroup>
            <col style="width: calc(100% - 50px);">
            <col style="width: 100px;">
            <col style="width: calc(100% - 50px);">
          </colgroup>
          <tbody>
            <tr class="border border-slate-200">
              <td colspan="3" class="text-center bg-white p-[10px]">Romance of Three Kingdoms 8</td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk8.intelligence ? +general1Info.stats.rotk8.intelligence : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-brain"></UIcon> <br>Intelligence</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk8.intelligence ? +general2Info.stats.rotk8.intelligence : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right bg-white"> 
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk8.power ? +general1Info.stats.rotk8.power : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px] bg-white"><UIcon name="i-game-icons-swords-power"></UIcon> <br>power</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk8.power ? +general2Info.stats.rotk8.power : 'X'" rounded="rounded-[6px] float-left" />  
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk8.charisma ? +general1Info.stats.rotk8.charisma : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-shaking-hands"></UIcon><br>charisma</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk8.charisma ? +general2Info.stats.rotk8.charisma : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk8.politics ? +general1Info.stats.rotk8.politics : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px] bg-white"><UIcon name="i-game-icons-vote"></UIcon><br>politics</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk8.politics ? +general2Info.stats.rotk8.politics : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
          </tbody>
        </table>
        <table class="w-full table-fixed mb-[30px]">
          <colgroup>
            <col style="width: calc(100% - 50px);">
            <col style="width: 100px;">
            <col style="width: calc(100% - 50px);">
          </colgroup>
          <tbody>
            <tr class="border border-slate-200">
              <td colspan="3" class="text-center bg-white p-[10px]">Romance of Three Kingdoms 9</td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk9.lead ? +general1Info.stats.rotk9.lead : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-minions"></UIcon><br>lead</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk9.lead ? +general2Info.stats.rotk9.lead : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk9.intelligence ? +general1Info.stats.rotk9.intelligence : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px] bg-white"><UIcon name="i-game-icons-brain"></UIcon> <br>intelligence</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk9.intelligence ? +general2Info.stats.rotk9.intelligence : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk9.power ? +general1Info.stats.rotk9.power : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-swords-power"></UIcon> <br>power</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk9.power ? +general2Info.stats.rotk9.power : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk9.politics ? +general1Info.stats.rotk9.politics : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px] bg-white"><UIcon name="i-game-icons-vote"></UIcon><br>politics</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk9.politics ? +general2Info.stats.rotk9.politics : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
          </tbody>
        </table>
        <table class="w-full table-fixed mb-[30px]">
          <colgroup>
            <col style="width: calc(100% - 50px);">
            <col style="width: 100px;">
            <col style="width: calc(100% - 50px);">
          </colgroup>
          <tbody>
            <tr class="border border-slate-200">
              <td colspan="3" class="text-center bg-white p-[10px]">Romance of Three Kingdoms 10</td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk10.lead ? +general1Info.stats.rotk10.lead : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-brain"></UIcon> <br>Lead</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk10.lead ? +general2Info.stats.rotk10.lead : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk10.intelligence ? +general1Info.stats.rotk10.intelligence : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px] bg-white"><UIcon name="i-game-icons-brain"></UIcon> <br>Intelligence</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk10.intelligence ? +general2Info.stats.rotk10.intelligence : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk10.power ? +general1Info.stats.rotk10.power : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-swords-power"></UIcon> <br>power</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk10.power ? +general2Info.stats.rotk10.power : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk10.charisma ? +general1Info.stats.rotk10.charisma : 'X'" rounded="rounded-[6px]" />  
              </td>
              <td class="max-w-[100px] text-center w-[100px] bg-white"><UIcon name="i-game-icons-shaking-hands"></UIcon><br>charisma</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk10.charisma ? +general2Info.stats.rotk10.charisma : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk10.politics ? +general1Info.stats.rotk10.politics : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-vote"></UIcon><br>politics</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk10.politics ? +general2Info.stats.rotk10.politics : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
          </tbody>
        </table>
        <table class="w-full table-fixed mb-[30px]">
          <colgroup>
            <col style="width: calc(100% - 50px);">
            <col style="width: 100px;">
            <col style="width: calc(100% - 50px);">
          </colgroup>
          <tbody>
            <tr class="border border-slate-200">
              <td colspan="3" class="text-center bg-white p-[10px]">Romance of Three Kingdoms 11</td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk11.lead ? +general1Info.stats.rotk11.lead : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-brain"></UIcon> <br>Lead</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk11.lead ? +general2Info.stats.rotk11.lead : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk11.intelligence ? +general1Info.stats.rotk11.intelligence : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px] bg-white"><UIcon name="i-game-icons-brain"></UIcon> <br>Intelligence</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk11.intelligence ? +general2Info.stats.rotk11.intelligence : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk11.power ? +general1Info.stats.rotk11.power : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-swords-power"></UIcon> <br>power</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk11.power ? +general2Info.stats.rotk11.power : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk11.charisma ? +general1Info.stats.rotk11.charisma : 'X'" rounded="rounded-[6px]" />  
              </td>
              <td class="max-w-[100px] text-center w-[100px] bg-white"><UIcon name="i-game-icons-shaking-hands"></UIcon><br>charisma</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] bg-white">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk11.charisma ? +general2Info.stats.rotk11.charisma : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
            <tr class="border border-slate-200">
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px] text-right">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general1Info.stats.rotk11.politics ? +general1Info.stats.rotk11.politics : 'X'" rounded="rounded-[6px]" />
              </td>
              <td class="max-w-[100px] text-center w-[100px]"><UIcon name="i-game-icons-vote"></UIcon><br>politics</td>
              <td class="min-w-[calc(50%-50px)] max-w-[calc(50%-50px)] w-full p-[5px]">
                <RatingBadge class="float-right" position="" size="smallest" :rating="general2Info.stats.rotk11.politics ? +general2Info.stats.rotk11.politics : 'X'" rounded="rounded-[6px] float-left" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NuxtLayout>
</template>
