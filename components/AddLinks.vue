<script lang="ts" setup>
const { list } = defineProps<{list?: AddLinks[]}>()
const emit = defineEmits<{
  update: [list: AddLinks[]]
}>()

const newList = ref<AddLinks[]>([])

onMounted(() => {
  if (list && list.length) {
    newList.value = [...list]
  }
})

const add = () => newList.value.push({ url: '', label: '' })
const remove = (index?: number) => {
  if (!index) {
    return newList.value.pop()
  }
  return newList.value.splice(index, 1)
} 

const model = defineModel<AddLinks[]>()

watch(() => newList.value, (l) => {
  model.value = l
}, { immediate: true, deep: true })
</script>

<template>
  <div class="w-full">
    <div class="w-full flex flex-wrap gap-[20px] relative my-[20px] bg-slate-50 p-[10px]" v-for="item, index in newList" :key="index">
      <UFormGroup class="sm:w-[calc(50%-10px)] w-full" name="value" label="Title of URL">
        <UInput v-model="item.label" type="label"></UInput>
      </UFormGroup>
      <UFormGroup class="sm:w-[calc(50%-10px)] w-full" name="value" label="Add URL">
        <UInput v-model="item.url" type="url"></UInput>
      </UFormGroup>
    </div>
    <div class="w-full mb-[50px] flex justify-center gap-[10px]" >
      <UButton icon="i-heroicons-minus-circle" color="red" type="button" @click="remove" class="mt-[10px]" v-if="newList.length">Remove</UButton>
      <UButton icon="i-heroicons-plus-circle" color="green" type="button" @click="add" class="mt-[10px]">Add Link</UButton>
    </div>
  </div>
</template>
