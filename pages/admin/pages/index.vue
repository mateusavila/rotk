<script lang="ts" setup>
import { refDebounced } from '@vueuse/core'
import type { CustomFields, PagesInterface } from '~/utils'
definePageMeta({
  middleware: ["auth"]
})

interface PageResponse {
  data: {
    pages: PagesInterface,
    meta_pages: CustomFields[]
  }[],
  total: number
}
const toast = useToast()
const search = ref('')
const q = refDebounced(search, 1000)
const page = ref(1)
const params = ref({ page, q })
const { data, pending, refresh } = await useFetch<PageResponse>('/api/pages/list', {
  params,
  watch: [page, params]
})

const columns: any[] = [
  {
    key: 'title',
    label: 'Title'
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
    text: `This action is irreversible`
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
    const response = await $fetch(`/api/pages/delete/${id.value}`, {
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

const items = (row: PagesInterface) => [
  [{
    label: 'Edit Page',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => useRouter().push({
      path: `/admin/pages/edit/${row.id}`
    })
  }],
  [{
    label: 'Delete Page',
    icon: 'i-heroicons-trash-20-solid',
    click: () => openRemoveItem(row.id)
  }]
]
</script>

<template>
  <NuxtLayout name="dashboardnew">
    <h1 class="font-['Aleo'] text-[32px] font-semibold">Page</h1>
    <div class="main-tables w-[calc(100%-40px)]">
      <div
        class="flex py-3.5 border-b border-gray-200 dark:border-gray-700 justify-between">
        <UInput v-model="search"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search Page" />
        <UButton to="/admin/pages/create"
          icon="i-heroicons-plus-circle">Add Page</UButton>
      </div>
      
      <UTable :loading="pending"
        :rows="data?.data"
        :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No page has been found' }"
        :columns="columns"
        :sort="{ column: 'title', direction: 'asc' }">
        <template #title-data="{ row: { pages: {title, id } } }">
          <nuxt-link :to="`/admin/pages/edit/${id}`" class="hover:underline">{{ title }}</nuxt-link>
        </template>
        <template #actions-data="{ row: { pages } }">
          <UDropdown :items="items(pages)">
            <UButton color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>
      <div class="w-full mt-[20px] mb-[10px] flex justify-end" v-if="data && data?.data.length > 1">
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
