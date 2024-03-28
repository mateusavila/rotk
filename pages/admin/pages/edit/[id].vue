<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
definePageMeta({
  middleware: ["auth"]
})
const { params: { id } } = useRoute()

const { data } = await useLazyFetch<PageResponseItem>(`/api/pages/item/${id}`)
const toast = useToast()
const { slugConverter } = useSlug()
const isOpen = ref(false)
const loading = ref(false)
const result = ref<{ title: string, text: string }>({
  title: '',
  text: ''
})

const state = reactive<{
  title: string,
  content: string
  meta_pages: CustomFields[]
}>({
  title: data.value?.data.title ?? '',
  content: data.value?.data.content ?? '',  
  meta_pages: []
})

data.value?.data.meta_pages.map((meta: CustomFields) => {
  state.meta_pages.push(meta)
})

const onSubmit = async(event: FormSubmitEvent<PageSchema>) => {
  isOpen.value = true
  loading.value = true

  const { title, content, meta_pages } = event.data
  const user = useUserStore()

  const body = {
    pages: {
      title,
      content,
      author_id: user.user.id,
      slug: slugConverter(title)
    },
    meta_pages
  }
  const token = window.localStorage.getItem('token')
  try {
    const response = await $fetch(`/api/pages/update/${id}`, {
      method: 'PUT',
      body,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    console.log(response)
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

</script>

<template>
  <NuxtLayout name="dashboardnew">
    <h1 class="font-['Aleo'] text-[32px] font-semibold">Edit Page</h1>
    <div class="w-[calc(100%-40px)] my-[50px] relative">
      <ClientOnly>
        <UForm :schema="pageSchema"
          :state="state"
          @submit="onSubmit">
          <UFormGroup name="title" label="Title">
            <UInput v-model="state.title"></UInput>
          </UFormGroup>
          <UFormGroup name="content" label="Content" class="mt-[30px]">
            <Editor v-model="state.content" />
          </UFormGroup>
          <div class="w-full my-[20px]">
            <h2 class="text-[16px] font-semibold mb-[20px] font-['Aleo']">Custom Fields</h2>
            <CustomFields :list="state.meta_pages" v-model="state.meta_pages" />
          </div>
          <div class="w-full my-[20px] flex justify-center">
            <UButton size="xl" type="submit">Save Page</UButton>
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
          <UButton to="/admin/pages">Close</UButton>
        </div>
      </div>
    </UModal>
  </NuxtLayout>
</template>
