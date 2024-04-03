<script setup lang="ts">
const query = useRoute().query;
const filter = useRoute().fullPath;

const { rating } = useRatings()
const page = ref(1);
const q = ref()
q.value = query
const params = ref({ page });
const { data, pending  } = await useFetch(`/api${filter}`, {
  params,
  watch: [params],
  transform: (_data: { data: any; total: number }) => {
    return {
      data: _data.data,
      total: _data.total,
    };
  },
});

const { intelligence, power, charisma, lead, politics, type_intelligence, type_power, type_charisma, type_lead, type_politics } = query

let picks: {label: string, icon: string, value: number, type: string }[] = []

if (intelligence) {
  picks.push({
    label: 'Intelligence',
    value: +intelligence,
    type: `${type_intelligence}`,
    icon: 'i-game-icons-brain'
  })
}if (power) {
  picks.push({
    label: 'Power',
    value: +power,
    type: `${type_power}`,
    icon: 'i-game-icons-swordman'
  })
}if (lead) {
  picks.push({
    label: 'Lead',
    value: +lead,
    type: `${type_lead}`,
    icon: 'i-game-icons-minions'
  })
}if (charisma) {
  picks.push({
    label: 'Charisma',
    value: +charisma,
    type: `${type_charisma}`,
    icon: 'i-game-icons-shaking-hands'
  })
}if (politics) {
  picks.push({
    label: 'Politics',
    value: +politics,
    type: `${type_politics}`,
    icon: 'i-game-icons-vote'
  })
}

const columns = [
  {
    key: "image",
    label: "Image",
    class: "w-[60px]",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "game",
    label: "Game",
    class: "w-[80px]",
  },
  {
    key: "value",
    label: "Stat/Value",
    class: "w-[120px]",
  },
  {
    key: "rating",
    label: "Rating",
    class: "w-[60px]",
  },
];

const nameIcon = (stat: string) => {
  if (stat === 'intelligence') {
    return 'i-game-icons-brain'
  }
  if (stat === 'charisma') {
    return 'i-game-icons-shaking-hands'
  }
  if (stat === 'lead') {
    return 'i-game-icons-minions'
  }
  if (stat === 'power') {
    return 'i-game-icons-swordman'
  }
  if (stat === 'politics') {
    return 'i-game-icons-vote'
  }
}

const openModal = ref(false)
const open = () => openModal.value = true
const close = async (queryString: string) => {
  openModal.value = false
  await navigateTo(`/filter?page=1&${queryString}`);
  window.location.reload()
}


const getTheType = (type: string) => {
  if (type === 'gt') {
    return 'i-heroicons-chevron-right'
  }
  if (type === 'lt') {
    return 'i-heroicons-chevron-left'
  }
  return 'i-heroicons-bars-2'
}
</script>

<template>
  <NuxtLayout name="default">
    <div class="w-full flex items-center justify-between sm:flex-nowrap flex-wrap">
      <h1
      class="text-[24px] font-semibold text-slate-900 font-['Aleo'] mb-[20px] sm:w-auto w-full">
        Showing results for:
      </h1>
      <UButton icon="i-game-icons-swords-emblem" type="button" color="red" size="xl" @click="open" :ui="{ font: `font-bold font-['Aleo']`, block: 'w-full flex justify-center items-center' }">Find your next general</UButton>
    </div>
    <div class="w-full grid sm:grid-cols-5 gap-[10px] justify-center my-[20px]">
      <div
        class="w-full p-[10px] text-[20px] text-center rounded-[10px] bg-slate-200"
        v-for="(i, index) in picks"
        :key="index">
          <p class="text-slate-800 flex items-center  flex-wrap content-center">
            <span class="flex justify-center w-full items-center gap-[5px] sm:text-[14px] text-[12px] font-['Aleo'] font-bold"><UIcon :name="i.icon"></UIcon>{{ i.label }}</span>
            <span class="flex justify-center w-full items-center gap-[5px] sm:text-[24px] text-[18px] font-['Aleo'] font-bold"><UIcon :name="getTheType(i.type)"></UIcon> {{ i.value }}</span>
          </p>
        </div>
      </div>
    <template v-if="data && data.data">
      <div class="w-full sm:overflow-visible overflow-auto">
        <UTable :rows="data.data ?? []" :columns="columns" :ui="{ base: 'sm:min-w-full min-w-[500px]' }">
        <template #image-data="{ row: { avatar, name, slug } }">
          <nuxt-link :to="`/general/${slug}`">
            <UAvatar :src="`../../${avatar}`" :alt="name" />
          </nuxt-link>
        </template>
        <template #name-data="{ row: { name, slug } }">
          <nuxt-link :to="`/general/${slug}`" class="hover:underline">
            {{ name }}
          </nuxt-link>
        </template>
        <template #rating-data="{ row: { advanced_stats } }">
          <RatingBadge size="smallest" :rating="rating(advanced_stats)" position="relative" rounded="rounded-[3px]" />
        </template>
        <template #value-data="{ row: { value, stat } }">
          <UTooltip :text="`${stat} ${value}`">
            <p class="text-[16px] flex items-center gap-[5px]">
              <UIcon :name="nameIcon(stat)"></UIcon>
              <RatingBadge size="smallest" :rating="value" position="relative" rounded="rounded-[3px] text-[14px]" />
            </p>
          </UTooltip>
        </template>
      </UTable>
      </div>
      <div
        class="w-full mt-[20px] mb-[10px] flex justify-end"
        v-if="data.total && data.total > 10">
        <UPagination
          v-model="page"
          :page-count="10"
          :max="7"
          :total="data?.total"
        />
      </div>
    </template>
    <UModal
      v-model="openModal"
      :ui="{
        background: 'bg-slate-700 dark:bg-gray-900',
        overlay: { background: 'bg-slate-800/90' },
      }"
    >
      <div class="w-full max-w-[500px]">
        <AdvancedFilter @close="close" />
      </div>
    </UModal>
  </NuxtLayout>
</template>
