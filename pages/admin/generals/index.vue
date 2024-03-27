<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"]
})
const q = ref('')
const page = ref(1)
const params = ref({ page, q })
const { data, pending } = await useFetch('/api/list', {
  params,
  watch: [page, params],
  transform: (_data: {data: GeneralData[]}) => _data.data
})

const columns: any[] = [
  {
    key: 'image',
    label: 'Image',
    class: 'w-[80px]'
  },
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'actions',
    label: 'Actions',
    sortable: false,
    class: 'w-[65px]'
  }
]
const items = (row: GeneralData) => [
  [{
    label: 'Edit General',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => useRouter().push({
      path: `/admin/generals/edit/${row.slug}`
    })
  }],
  [{
    label: 'Delete general',
    icon: 'i-heroicons-trash-20-solid',
    click: () => console.log('Remove', row.id)
  }]
]

</script>

<template>
  <NuxtLayout name="dashboardnew">
    <h1 class="font-['Aleo'] text-[32px] font-semibold">Generals</h1>
    <div class="main-tables w-[calc(100%-40px)]">
      <div
        class="flex py-3.5 border-b border-gray-200 dark:border-gray-700 justify-between">
        <UInput v-model="q"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search General" />
        <!-- <UButton to="/generals/create"
          icon="i-heroicons-plus-circle">Add general</UButton> -->
      </div>
      
      <UTable :loading="pending"
        :rows="data"
        :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No General has been found' }"
        :columns="columns"
        :sort="{ column: 'title', direction: 'asc' }">
        <template #image-data="{ row: { avatar, name, slug } }">
          <nuxt-link :to="`/admin/generals/${slug}`">
            <UAvatar :src="`../../${avatar}`" :alt="name" />
          </nuxt-link>
        </template>
        <template #name-data="{ row: { name, slug } }">
          <nuxt-link :to="`/admin/generals/${slug}`" class="hover:underline">{{ name }}</nuxt-link>
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>
      <div class="w-full mt-[20px] mb-[10px] flex justify-end" v-if="data && data.length > 0">
        <UPagination v-model="page"
          :page-count="2"
          :max="5"
          :total="data.length" />
      </div>
    </div>
  </NuxtLayout>
</template>
