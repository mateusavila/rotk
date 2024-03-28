<script lang="ts" setup>
const { list } = defineProps<{list?: CustomFields[]}>()
const emit = defineEmits<{
  update: [list: CustomFields[]]
}>()

const newList = ref<CustomFields[]>([])

onMounted(() => {
  if (list && list.length) {
    newList.value = [...list]
  }
})

const add = () => newList.value.push({
  key: '',
  type: '',
  value: ''
})
const remove = (index?: number) => {
  if (!index) {
    return newList.value.pop()
  }
  return newList.value.splice(index, 1)
} 

const options = ref<OptionsSelect[]>([
  {
    label: 'Text',
    value: 'text'
  },
  {
    label: 'Big Text',
    value: 'big_text'
  },
  // {
  //   label: 'Image',
  //   value: 'image'
  // },
  // {
  //   label: 'File',
  //   value: 'file'
  // }
])

const toBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

const upload = async (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    newList.value[index].value = {
      file: target.files[0],
      content:  await toBase64(target.files[0])
    }
  }
}

const uploadImage = async (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    const file = target.files[0]
    const { name, size } = file
    const content = await toBase64(file)
    const img = new Image()
    img.onload = () => {
      const dimensions =  {
        width: img.naturalWidth,
        height: img.naturalHeight
      }
      newList.value[index].value = {
        file: {
          name,
          size,
        },
        content,
        dimensions
      }
    }
    img.src = content as string
  }
}

const model = defineModel<CustomFields[]>()

watch(() => newList.value, (l) => {
  model.value = l
}, { immediate: true, deep: true })
</script>

<template>
  <div class="w-full">
    <div class="w-full flex flex-wrap gap-[20px] relative my-[20px] bg-slate-50 p-[10px]" v-for="item, index in newList" :key="index">
      <UFormGroup class="w-[calc(50%-10px)]" :name="`meta_pages.${index}.key`" label="Key">
        <UInput v-model="item.key"></UInput>
      </UFormGroup>
      <UFormGroup class="w-[calc(50%-10px)]" :name="`meta_pages.${index}.type`" label="Type">
        <USelect v-model="item.type" :options="options"></USelect>
      </UFormGroup>
      <UFormGroup class="w-full" name="value" label="Text" v-if="item.type === 'text'">
        <UInput v-model="item.value"></UInput>
      </UFormGroup>
      <UFormGroup class="w-full" name="value" label="Content" v-if="item.type === 'big_text'">
        <Editor v-model="item.value" />
      </UFormGroup>
      <UFormGroup class="w-full" name="value" label="Image" v-if="item.type === 'image'">
        <UInput type="file" size="sm" accept="image/png, image/jpg, image/avif, image/webp, image/jpeg, image/svg+xml" @change="uploadImage($event, index)" />
      </UFormGroup>
      <UFormGroup class="w-full" name="value" label="File" v-if="item.type === 'file'">
        <UInput type="file" size="sm" accept=".pdf,.html,.htm,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.xls,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="upload($event, index)" />
      </UFormGroup>
    </div>
    <div class="w-full mb-[50px] flex justify-center gap-[10px]" >
      <UButton icon="i-heroicons-minus-circle" color="red" type="button" @click="remove" class="mt-[10px]" v-if="newList.length">Remove</UButton>
      <UButton icon="i-heroicons-plus-circle" color="green" type="button" @click="add" class="mt-[10px]">Add Custom Field</UButton>
    </div>
  </div>
</template>
