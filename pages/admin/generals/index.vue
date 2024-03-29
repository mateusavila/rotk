<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
definePageMeta({
  middleware: ["auth"]
})
const toast = useToast()
const q = ref<{ key: string, value: string, avatar: string }>()
const page = ref(1)

const search = ref('')
watch(() => q.value, (s) => {
  if (s && s.key.length) {
    search.value = s.key
  }
}, { deep: true })

const params = ref({ page, search })
const { data, pending, refresh } = await useFetch('/api/list', {
  params,
  watch: [params],
  transform: (_data: {data: GeneralData[], total: number}) => {
    return {
      data: _data.data,
      total: _data.total
    }
  }
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

const isOpen = ref(false)
const id = ref('')
const loading = ref(false)
const hasBeenDeleted = ref(false)
const result = ref({
  title: '',
  text: ''
})

const openRemoveItem = (ID: string) => {
  isOpen.value = true
  hasBeenDeleted.value = false
  id.value = ID
  result.value = {
    title: 'Are you sure?',
    text: `There's no other way to bring back this general without help of the administrator.`
  }
}

const closeAfterSave = () => {
  isOpen.value = false
  setTimeout(() => hasBeenDeleted.value = false, 1000)
}
const confirmDelete = async () => {
  const token = window.localStorage.getItem('token')
  loading.value = true
  hasBeenDeleted.value = true
  try {
    const response = await $fetch(`/api/generals/${id.value}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    loading.value = false
    result.value = {
      title: 'Success',
      text: response.message
    }
    await refresh()
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
    click: () => openRemoveItem(row.id)
  }]
]

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
const list = useStorage<NamesGenerals[]>('names', await namesList())
</script>

<template>
  <NuxtLayout name="dashboardnew">
    <h1 class="font-['Aleo'] text-[32px] font-semibold">Generals</h1>
    <div class="main-tables w-[calc(100%-40px)]">
      <div class="flex py-3.5 border-b border-gray-200 dark:border-gray-700 justify-between">
        <SearchAdmin v-model="q" :list="list" :fullsize="false" base-url="" />
      </div>
      <UTable :loading="pending"
        :rows="data?.data"
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
      <div class="w-full mt-[20px] mb-[10px] flex justify-end" v-if="data && data?.data.length > 0">
        <UPagination v-model="page"
          :page-count="10"
          :max="10"
          :total="data?.total" />
      </div>
    </div>
    <UModal v-model="isOpen">
      <div class="w-full relative p-[20px]">
        <Loading :is-loading="loading" />
        <h2 class="font-['Aleo'] text-[24px] font-semibold mb-[20px] text-center">{{result.title}}</h2>
        <p class="text-[16px] my-[20px] text-center">{{ result.text }}</p>
        <div class="w-full flex justify-center gap-[20px]" v-if="!hasBeenDeleted">
          <UButton color="gray" @click="isOpen = false">Cancel</UButton>
          <UButton color="red" @click="confirmDelete()">Confirm</UButton>
        </div>
        <div class="w-full flex justify-center gap-[20px]" v-if="hasBeenDeleted">
          <UButton @click="closeAfterSave">Close</UButton>
        </div>
      </div>
    </UModal>
  </NuxtLayout>
</template>
