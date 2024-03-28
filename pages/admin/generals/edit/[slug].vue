<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import { vMaska } from 'maska'
import type { GeneralInfoSchema } from '../../../../utils/index'
import { generalInfoSchema } from '../../../../utils/index'
definePageMeta({
  middleware: ["auth"]
})
const toast = useToast()
const { slugConverter } = useSlug()
const user = useUserStore()
const { params: { slug } } = useRoute()
const { data, pending } = await useLazyFetch<GeneralData>(`/api/general/${slug}`)
const { calculateAverages, calculateTotals, intAverages, powAverages, polAverages, leaAverages, chaAverages, getMaxValue, getMinValue, intArray, polArray, powArray, leaArray, chaArray } = useRatings()

const isOpen = ref(false)
const loading = ref(false)
const result = ref<{ title: string, text: string }>({
  title: '',
  text: ''
})

const totals = ref<(number | null)[]>([])
const averages = ref<(number | null)[]>([]) 
const totalsAverageTable = ref<{game: string, total: number | null, average: number | null}[]>([])
const statsAverageTable = ref<{ stat: string, average: number | null}[]>([])

watch(() => data.value, (d) => {
  if (d && !d.stats.rotk1.active) {
    d.stats.rotk1.intelligence = null
    d.stats.rotk1.power = null
    d.stats.rotk1.charisma = null
  }
  if (d && !d.stats.rotk2.active) {
    d.stats.rotk2.intelligence = null
    d.stats.rotk2.power = null
    d.stats.rotk2.charisma = null
  }
  if (d && !d.stats.rotk3.active) {
    d.stats.rotk3.intelligence = null
    d.stats.rotk3.power = null
    d.stats.rotk3.charisma = null
    d.stats.rotk3.politics = null
  }
  if (d && !d.stats.rotk4.active) {
    d.stats.rotk4.lead = null
    d.stats.rotk4.intelligence = null
    d.stats.rotk4.power = null
    d.stats.rotk4.charisma = null
    d.stats.rotk4.politics = null
  }
  if (d && !d.stats.rotk7.active) {
    d.stats.rotk7.intelligence = null
    d.stats.rotk7.power = null
    d.stats.rotk7.charisma = null
    d.stats.rotk7.politics = null
  }
  if (d && !d.stats.rotk8.active) {
    d.stats.rotk8.intelligence = null
    d.stats.rotk8.power = null
    d.stats.rotk8.charisma = null
    d.stats.rotk8.politics = null
  }
  if (d && !d.stats.rotk9.active) {
    d.stats.rotk9.intelligence = null
    d.stats.rotk9.power = null
    d.stats.rotk9.lead = null
    d.stats.rotk9.politics = null
  }
  if (d && !d.stats.rotk10.active) {
    d.stats.rotk10.intelligence = null
    d.stats.rotk10.power = null
    d.stats.rotk10.charisma = null
    d.stats.rotk10.lead = null
    d.stats.rotk10.politics = null
  }
  if (d && !d.stats.rotk11.active) {
    d.stats.rotk11.intelligence = null
    d.stats.rotk11.power = null
    d.stats.rotk11.charisma = null
    d.stats.rotk11.lead = null
    d.stats.rotk11.politics = null
  }
  if(d && d.stats) {
    averages.value = calculateAverages(d.stats)
    totals.value = calculateTotals(d.stats)
    statsAverageTable.value = [
      {
        stat: 'Intelligence',
        average: intAverages(d.stats)
      },
      {
        stat: 'Power',
        average: powAverages(d.stats)
      },
      {
        stat: 'Charisma',
        average: chaAverages(d.stats)
      },
      {
        stat: 'Politics',
        average: polAverages(d.stats)
      },
      {
        stat: 'Lead',
        average: leaAverages(d.stats)
      }
    ]
    totalsAverageTable.value = [
    { game: 'ROTK 1', total: totals.value[0], average: averages.value[0] },
    { game: 'ROTK 2', total: totals.value[1], average: averages.value[1] },
    { game: 'ROTK 3', total: totals.value[2], average: averages.value[2] },
    { game: 'ROTK 4', total: totals.value[3], average: averages.value[3] },
    { game: 'ROTK 7', total: totals.value[4], average: averages.value[4] },
    { game: 'ROTK 8', total: totals.value[5], average: averages.value[5] },
    { game: 'ROTK 9', total: totals.value[6], average: averages.value[6] },
    { game: 'ROTK 10', total: totals.value[7], average: averages.value[7] },
    { game: 'ROTK 11', total: totals.value[8], average: averages.value[8] },
    ]
  }
}, { deep: true, immediate: true })

// columns table
const columnsTotalsAverage = [
{
    key: 'game',
    label: 'Game'
  },
  {
    key: 'average',
    label: 'Average'
  },
  {
    key: 'total',
    label: 'Total'
  }
]

const onSubmit = async(event: FormSubmitEvent<GeneralInfoSchema>) => {
  // console.log(event.data)

  isOpen.value = true
  loading.value = true

  const { name, bio, skills, birth, luck, health, soldiers, loyalty, navigation, is_ruler, navy_command, army_command, stats } = event.data

  const body = {
    name, 
    slug: slugConverter(name),
    avatar: `${slugConverter(name)}.jpg`,
    skills: toRaw(skills), 
    bio, 
    birth, 
    luck, 
    health, 
    soldiers, 
    loyalty, 
    navigation, 
    is_ruler, 
    navy_command, 
    army_command, 
    stats: toRaw(stats),
    advanced_stats: {
      averages_per_game: {
        rotk1: totalsAverageTable.value[0].average,
        rotk2: totalsAverageTable.value[1].average,
        rotk3: totalsAverageTable.value[2].average,
        rotk4: totalsAverageTable.value[3].average,
        rotk7: totalsAverageTable.value[4].average,
        rotk8: totalsAverageTable.value[5].average,
        rotk9: totalsAverageTable.value[6].average,
        rotk10: totalsAverageTable.value[7].average,
        rotk11: totalsAverageTable.value[8].average,
      },
      totals_per_game: {
        rotk1: totalsAverageTable.value[0].total,
        rotk2: totalsAverageTable.value[1].total,
        rotk3: totalsAverageTable.value[2].total,
        rotk4: totalsAverageTable.value[3].total,
        rotk7: totalsAverageTable.value[4].total,
        rotk8: totalsAverageTable.value[5].total,
        rotk9: totalsAverageTable.value[6].total,
        rotk10: totalsAverageTable.value[7].total,
        rotk11: totalsAverageTable.value[8].total,
      },
      stats_averages: {
        intelligence: statsAverageTable.value[0].average,
        power: statsAverageTable.value[1].average,
        charisma: statsAverageTable.value[2].average,
        politics: statsAverageTable.value[3].average,
        lead: statsAverageTable.value[4].average,
      },
      stats_max: {
        intelligence: getMaxValue(intArray(stats as GeneralData['stats'])),
        power: getMaxValue(powArray(stats as GeneralData['stats'])),
        charisma: getMaxValue(chaArray(stats as GeneralData['stats'])),
        politics: getMaxValue(polArray(stats as GeneralData['stats'])),
        lead: getMaxValue(leaArray(stats as GeneralData['stats'])),
      },
      stats_min: {
        intelligence: getMinValue(intArray(stats as GeneralData['stats'])),
        power: getMinValue(powArray(stats as GeneralData['stats'])),
        charisma: getMinValue(chaArray(stats as GeneralData['stats'])),
        politics: getMinValue(polArray(stats as GeneralData['stats'])),
        lead: getMinValue(leaArray(stats as GeneralData['stats'])),
      }
    }

  }

  const token = window.localStorage.getItem('token')
  try {
    const response = await $fetch(`/api/generals/${(data.value as GeneralData).id}`, {
      method: 'PUT',
      body,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    // console.log(response)
    loading.value = false
    result.value = {
      title: 'Success',
      text: response.message
    }
  } catch (error) {
    loading.value = false
    isOpen.value = false
    toast.add({
      id: 'error',
      color: 'red',
      title: 'Error!',
      description: `Aparently, there's error in this request.`,
      icon: 'i-game-icons-info'
    })
  }
}

const skills = ['Foreign', 'Spy', 'Recruit', 'Build', 'Bribe', 'Rebel', 'Gossip', 'Arson', 'Snoop', 'Infantry', 'Cavalry', 'Archery', 'Naval', 'Fire', 'Boulder', 'Provoke', 'Weather', 'Wind', 'Chaos', 'Chain', 'Bolt', 'Repair', 'Taunt', 'Lies'].sort()

</script>

<template>
  <NuxtLayout name="dashboardnew">
    <h1 class="font-['Aleo'] text-[32px] font-semibold">Edit General Info</h1>
    <div class="w-[calc(100%-40px)] my-[20px] relative" v-if="user">
    <Loading :is-loading="pending" />
    <ClientOnly v-if="data">
      <h2 class="font-['Aleo'] text-[18px] font-semibold mb-[20px]">Basic Information</h2>
      <UForm :schema="generalInfoSchema"
        :state="data"
        @submit="onSubmit">
        <UFormGroup name="name" label="Name">
          <UInput v-model="data.name" :disabled="user.user.level !== 1"></UInput>
        </UFormGroup>
        <UFormGroup name="skills" label="Skills" class="mt-[20px]">
          <USelectMenu v-model="data.skills" :options="skills" multiple placeholder="Select Skill" />
        </UFormGroup>

        <UFormGroup name="bio" label="Bio" class="mt-[30px]">
          <Editor v-model="data.bio" :disabled="user.user.level !== 1" />
        </UFormGroup>
        <div class="w-full mt-[30px] grid lg:grid-cols-4 sm:grid-cols-2 gap-[20px]">
          <UFormGroup name="birth" label="Birth">
            <UInput v-model="data.birth" data-maska="###"
            v-maska></UInput>
          </UFormGroup>
          <UFormGroup name="luck" label="Luck">
            <UInput v-model="data.luck" data-maska="###"
            v-maska></UInput>
          </UFormGroup>
          <UFormGroup name="health" label="Health">
            <UInput v-model="data.health" data-maska="###"
            v-maska></UInput>
          </UFormGroup>
          <UFormGroup name="soldiers" label="Soldiers">
            <UInput v-model="data.soldiers" data-maska="######"
            v-maska></UInput>
          </UFormGroup>
          <UFormGroup name="loyalty" label="Loyalty">
            <UInput v-model="data.loyalty" data-maska="###"
            v-maska></UInput>
          </UFormGroup>
          <UFormGroup name="navy_command" label="Navy Command">
            <UInput v-model="data.navy_command" data-maska="###"
            v-maska></UInput>
          </UFormGroup>
          <UFormGroup name="army_command" label="Army Command">
            <UInput v-model="data.army_command" data-maska="###"
            v-maska></UInput>
          </UFormGroup>
        </div>
        <div class="w-full mt-[30px]">
          <h2 class="font-['Aleo'] text-[20px] font-semibold mb-[20px]">Stats By Game</h2>
          <div class="w-full mb-[20px] border-b border-slate-300 pb-[20px]">
            <h2 class="font-['Aleo'] text-[16px] font-semibold mb-[20px]">Stats ROTK 1</h2>
            <div class="w-full mb-[10px] flex gap-[10px] items-center">
              <UToggle v-model="data.stats.rotk1.active"></UToggle> <span class="text-[14px]">Activate Stats ROTK1</span>
            </div>
            <div class="w-full grid sm:grid-cols-3 gap-[20px]">
              <UFormGroup name="rotk1_intelligence" label="Intelligence">
                <UInput v-model="data.stats.rotk1.intelligence"  :disabled="!data.stats.rotk1.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk1_power" label="Power">
                <UInput v-model="data.stats.rotk1.power" :disabled="!data.stats.rotk1.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk1_charisma" label="Charisma">
                <UInput v-model="data.stats.rotk1.charisma" :disabled="!data.stats.rotk1.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
            </div>
          </div>
          <div class="w-full mb-[20px] border-b border-slate-300 pb-[20px]">
            <h2 class="font-['Aleo'] text-[16px] font-semibold mb-[20px]">Stats ROTK 2</h2>
            <div class="w-full mb-[10px] flex gap-[10px] items-center">
              <UToggle v-model="data.stats.rotk2.active"></UToggle> <span class="text-[14px]">Activate Stats ROTK2</span>
            </div>
            <div class="w-full grid sm:grid-cols-3 gap-[20px]">
              <UFormGroup name="rotk2_intelligence" label="Intelligence">
                <UInput v-model="data.stats.rotk2.intelligence"  :disabled="!data.stats.rotk2.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk2_power" label="Power">
                <UInput v-model="data.stats.rotk2.power" :disabled="!data.stats.rotk2.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk2_charisma" label="Charisma">
                <UInput v-model="data.stats.rotk2.charisma" :disabled="!data.stats.rotk2.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
            </div>
          </div>
          <div class="w-full mb-[20px] border-b border-slate-300 pb-[20px]">
            <h2 class="font-['Aleo'] text-[16px] font-semibold mb-[20px]">Stats ROTK 3</h2>
            <div class="w-full mb-[10px] flex gap-[10px] items-center">
              <UToggle v-model="data.stats.rotk3.active"></UToggle> <span class="text-[14px]">Activate Stats ROTK3</span>
            </div>
            <div class="w-full grid sm:grid-cols-4 gap-[20px]">
              <UFormGroup name="rotk3_intelligence" label="Intelligence">
                <UInput v-model="data.stats.rotk3.intelligence"  :disabled="!data.stats.rotk3.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk3_power" label="Power">
                <UInput v-model="data.stats.rotk3.power" :disabled="!data.stats.rotk3.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk3_charisma" label="Charisma">
                <UInput v-model="data.stats.rotk3.charisma" :disabled="!data.stats.rotk3.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk3_politics" label="Politics">
                <UInput v-model="data.stats.rotk3.politics" :disabled="!data.stats.rotk3.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
            </div>
          </div>
          <div class="w-full mb-[20px] border-b border-slate-300 pb-[20px]">
            <h2 class="font-['Aleo'] text-[16px] font-semibold mb-[20px]">Stats ROTK 4</h2>
            <div class="w-full mb-[10px] flex gap-[10px] items-center">
              <UToggle v-model="data.stats.rotk4.active"></UToggle> <span class="text-[14px]">Activate Stats ROTK4</span>
            </div>
            <div class="w-full grid sm:grid-cols-5 gap-[20px]">
              <UFormGroup name="rotk4_lead" label="Lead">
                <UInput v-model="data.stats.rotk4.lead" :disabled="!data.stats.rotk4.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk4_intelligence" label="Intelligence">
                <UInput v-model="data.stats.rotk4.intelligence"  :disabled="!data.stats.rotk4.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk4_power" label="Power">
                <UInput v-model="data.stats.rotk4.power" :disabled="!data.stats.rotk4.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk4_charisma" label="Charisma">
                <UInput v-model="data.stats.rotk4.charisma" :disabled="!data.stats.rotk4.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk4_politics" label="Politics">
                <UInput v-model="data.stats.rotk4.politics" :disabled="!data.stats.rotk4.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
            </div>
          </div>
          <div class="w-full mb-[20px] border-b border-slate-300 pb-[20px]">
            <h2 class="font-['Aleo'] text-[16px] font-semibold mb-[20px]">Stats ROTK 7</h2>
            <div class="w-full mb-[10px] flex gap-[10px] items-center">
              <UToggle v-model="data.stats.rotk7.active"></UToggle> <span class="text-[14px]">Activate Stats ROTK7</span>
            </div>
            <div class="w-full grid sm:grid-cols-4 gap-[20px]">
              <UFormGroup name="rotk7_intelligence" label="Intelligence">
                <UInput v-model="data.stats.rotk7.intelligence"  :disabled="!data.stats.rotk7.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk7_power" label="Power">
                <UInput v-model="data.stats.rotk7.power" :disabled="!data.stats.rotk7.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk7_charisma" label="Charisma">
                <UInput v-model="data.stats.rotk7.charisma" :disabled="!data.stats.rotk7.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk7_politics" label="Politics">
                <UInput v-model="data.stats.rotk7.politics" :disabled="!data.stats.rotk7.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
            </div>
          </div>
          <div class="w-full mb-[20px] border-b border-slate-300 pb-[20px]">
            <h2 class="font-['Aleo'] text-[16px] font-semibold mb-[20px]">Stats ROTK 8</h2>
            <div class="w-full mb-[10px] flex gap-[10px] items-center">
              <UToggle v-model="data.stats.rotk8.active"></UToggle> <span class="text-[14px]">Activate Stats ROTK8</span>
            </div>
            <div class="w-full grid sm:grid-cols-4 gap-[20px]">
              <UFormGroup name="rotk8_intelligence" label="Intelligence">
                <UInput v-model="data.stats.rotk8.intelligence"  :disabled="!data.stats.rotk8.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk8_power" label="Power">
                <UInput v-model="data.stats.rotk8.power" :disabled="!data.stats.rotk8.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk8_charisma" label="Charisma">
                <UInput v-model="data.stats.rotk8.charisma" :disabled="!data.stats.rotk8.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk8_politics" label="Politics">
                <UInput v-model="data.stats.rotk8.politics" :disabled="!data.stats.rotk8.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
            </div>
          </div>
          <div class="w-full mb-[20px] border-b border-slate-300 pb-[20px]">
            <h2 class="font-['Aleo'] text-[16px] font-semibold mb-[20px]">Stats ROTK 9</h2>
            <div class="w-full mb-[10px] flex gap-[10px] items-center">
              <UToggle v-model="data.stats.rotk9.active"></UToggle> <span class="text-[14px]">Activate Stats ROTK9</span>
            </div>
            <div class="w-full grid sm:grid-cols-4 gap-[20px]">
              <UFormGroup name="rotk9_lead" label="Lead">
                <UInput v-model="data.stats.rotk9.lead" :disabled="!data.stats.rotk9.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk9_intelligence" label="Intelligence">
                <UInput v-model="data.stats.rotk9.intelligence"  :disabled="!data.stats.rotk9.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk9_power" label="Power">
                <UInput v-model="data.stats.rotk9.power" :disabled="!data.stats.rotk9.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk9_politics" label="Politics">
                <UInput v-model="data.stats.rotk9.politics" :disabled="!data.stats.rotk1.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
            </div>
          </div>
          <div class="w-full mb-[20px] border-b border-slate-300 pb-[20px]">
            <h2 class="font-['Aleo'] text-[16px] font-semibold mb-[20px]">Stats ROTK 10</h2>
            <div class="w-full mb-[10px] flex gap-[10px] items-center">
              <UToggle v-model="data.stats.rotk10.active"></UToggle> <span class="text-[14px]">Activate Stats ROTK10</span>
            </div>
            <div class="w-full grid sm:grid-cols-5 gap-[20px]">
              <UFormGroup name="rotk10_lead" label="Lead">
                <UInput v-model="data.stats.rotk10.lead"  :disabled="!data.stats.rotk10.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk10_intelligence" label="Intelligence">
                <UInput v-model="data.stats.rotk10.intelligence"  :disabled="!data.stats.rotk10.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk10_power" label="Power">
                <UInput v-model="data.stats.rotk10.power" :disabled="!data.stats.rotk10.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk10_charisma" label="Charisma">
                <UInput v-model="data.stats.rotk10.charisma" :disabled="!data.stats.rotk10.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk10_politics" label="Politics">
                <UInput v-model="data.stats.rotk11.politics" :disabled="!data.stats.rotk10.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
            </div>
          </div>
          <div class="w-full mb-[20px] border-b border-slate-300 pb-[20px]">
            <h2 class="font-['Aleo'] text-[16px] font-semibold mb-[20px]">Stats ROTK 11</h2>
            <div class="w-full mb-[10px] flex gap-[10px] items-center">
              <UToggle v-model="data.stats.rotk11.active"></UToggle> <span class="text-[14px]">Activate Stats ROTK11</span>
            </div>
            <div class="w-full grid sm:grid-cols-5 gap-[20px]">
              <UFormGroup name="rotk11_lead" label="Lead">
                <UInput v-model="data.stats.rotk11.lead"  :disabled="!data.stats.rotk11.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk11_intelligence" label="Intelligence">
                <UInput v-model="data.stats.rotk11.intelligence"  :disabled="!data.stats.rotk11.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk11_power" label="Power">
                <UInput v-model="data.stats.rotk11.power" :disabled="!data.stats.rotk11.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk11_charisma" label="Charisma">
                <UInput v-model="data.stats.rotk11.charisma" :disabled="!data.stats.rotk11.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
              <UFormGroup name="rotk11_politics" label="Politics">
                <UInput v-model="data.stats.rotk11.politics" :disabled="!data.stats.rotk11.active" data-maska="###" v-maska></UInput>
              </UFormGroup>
            </div>
          </div>
        </div>
        <div class="w-full my-[20px] flex justify-center">
          <UButton type="submit" class="mt-[30px]">Save General</UButton>
        </div>
        <div class="w-full my-[20px]">
          <h2 class="font-['Aleo'] text-[18px] font-semibold mb-[20px]">Advanced Statistics (for nerds)</h2>
          <UTable :columns="columnsTotalsAverage" :rows="totalsAverageTable">
            <template #average-data="{ row }">
              {{ row.average ? row.average : 'Not present in game' }}
            </template>
            <template #total-data="{ row }">
              {{ row.total ? row.total : 'Not present in game' }}
            </template>
          </UTable>
          <UTable :rows="statsAverageTable">
            <template #average-data="{ row }">
              {{ row.average ? row.average : 'Not available' }}
            </template>
          </UTable>
        </div>
        <div class="w-full my-[20px] flex justify-center">
          <UButton type="submit" class="mt-[30px]">Save General</UButton>
        </div>
      </UForm>
    </ClientOnly>
    </div>
    <UModal v-model="isOpen" prevent-close>
      <div class="w-full relative p-[20px]">
        <Loading :is-loading="loading" />
        <h2 class="font-['Aleo'] text-[24px] font-semibold mb-[20px] text-center">{{result.title}}</h2>
        <p class="text-[16px] my-[20px] text-center">{{ result.text }}</p>
        <div class="w-full flex justify-center">
          <UButton to="/admin/generals">Close</UButton>
        </div>
      </div>
    </UModal>
  </NuxtLayout>
</template>
