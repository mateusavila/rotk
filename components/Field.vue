<script lang="ts" setup generic="T">
import { vMaska } from 'maska'
import type { FieldsComponents, FieldsComponentsChild } from '~/utils/design'
const { type, id, options, fields } = defineProps<FieldsComponents>()

const model = defineModel<string | number | Record<string, any> | unknown[] | undefined | any>()
const current = computed(() => options && options.find((item) => item.value === model.value))
const passwordType = ref<boolean>(true)

// upload
const fileList = ref<File[]>()
const filenames = computed(() => fileList.value?.map((file) => file.name))
const upload = (event: Event) => {
  const { files } = event.target as HTMLInputElement
  if (files) {
    fileList.value = Array.from(files)
    model.value = {
      id: id || 'file',
      files
    }
  }
}

// ui error label
const uiErrorLabel = ref({
  error: 'mt-[10px] mb-0'
})

onMounted(() => {
  if (type === 'array') {
    model.value = []
  }
})

// array
const fieldsList = ref<FieldsComponentsChild[]>([])
const fieldsStr = toRaw(fields)
const add = () => {
  model.value = []
  fieldsList.value.push(fieldsStr)
  const values = fieldsList.value.map((fields: FieldsComponentsChild, i: number) => {
    const fieldList = toRaw(fields)
    // @ts-ignore
    return fieldList.map((f: FieldsComponentsChild, index: number) => ({
      name: f.id,
      value: f.value
    }))
  })
  nextTick(() => model.value.push(...values))
}
const remove = () => {
  fieldsList.value.pop()
}
</script>


<template>
  <template v-if="type === 'array'">
    <div class="w-full">
      <div class="w-full mt-[20px] mb-[20px]"
        :key="`${JSON.stringify(f)}-${i}`"
        v-for="f, i in fieldsList">
        <Field :key="`${JSON.stringify(field)}-${index}`"
          v-if="model[i]"
          v-for="field, index in f"
          :type="(field.type as FieldType)"
          :id="`${field.id}${index}`"
          :icon="field.icon"
          :label="field.label"
          :options="field.options"
          :placeholder="field.placeholder"
          :fields="field.fields"
          grid-cards="grid-cols-1 gap-[10px]"
          grid-item-class="p-[10px] border-[1px] border-[#dee2e2] rounded-[3px] text-[14px]"
          grid-card-active="bg-[#efefef]"
          :upload-message="field.uploadMessage"
          :upload-class-component="field.uploadClassComponent || ''"
          v-model="model[i][index].value" />


      </div>
      <div class="w-full flex gap-[10px] justify-center">
        <UButton size="xs"
          variant="outline"
          color="red"
          type="button"
          @click="remove">Remover</UButton>
        <UButton size="xs"
          type="button"
          @click="add">Adicionar</UButton>
      </div>
    </div>
  </template>
  <template v-if="type === 'textarea'">
    <div class="w-full">
      <UFormGroup :error="!error && errorMessage"
        :label="label ?? undefined"
        :name="id"
        :ui="uiErrorLabel">
        <UTextarea :placeholder="placeholder"
          :id="id"
          :size="size"
          v-model="model" />
      </UFormGroup>
    </div>
  </template>
  <template v-if="type === 'select'">
    <div class="w-full">
      <UFormGroup :error="!error && errorMessage"
        :label="label ?? undefined"
        :name="id"
        :ui="uiErrorLabel">
        <USelectMenu :options="options"
          :searchable="searchable"
          :searchable-placeholder="searchablePlaceholder"
          :id="id"
          :size="size"
          :icon="icon"
          value-attribute="value"
          option-attribute="label"
          v-model="model">
          <template #label>
            {{ current ? current.label : placeholder }}
          </template>
        </USelectMenu>
      </UFormGroup>
    </div>
  </template>
  <template v-if="type === 'checkbox'">
    <div class="w-full">
      <UFormGroup :error="!error && errorMessage"
        :name="id"
        :ui="uiErrorLabel">
        <UCheckbox v-model="model"
          :ui="{ wrapper: 'relative flex items-center' }"
          :name="id"
          :id="id"
          :label="label" />
      </UFormGroup>
    </div>
  </template>
  <template v-if="type === 'radiogroup'">
    <div class="w-full">
      <UFormGroup :error="!error && errorMessage"
        :name="id"
        :ui="uiErrorLabel">
        <URadioGroup v-model="model"
          :name="id"
          :ui-radio="{ wrapper: 'relative flex items-center', container: 'h-20px flex items-center' }"
          :options="options"
          :id="id"
          :label="label">
        </URadioGroup>
      </UFormGroup>
    </div>
  </template>
  <template v-if="type === 'toggle'">
    <label :for="id"
      class="w-full flex items-center gap-[10px]">
      <UToggle v-model="model"
        :id="id" />
      <span class="text-[14px] text-gray-700"
        v-if="label">{{ label }}</span>
    </label>
  </template>
  <template v-if="type === 'range'">
    <div class="w-full">
      <URange v-model="model"
        :name="id"
        :id="id"
        :min="min"
        :max="max"
        :step="step" />
    </div>
  </template>

  <template v-if="type === 'number'">
    <div class="w-full">
      <UFormGroup :error="!error && errorMessage"
        :name="id"
        :ui="uiErrorLabel">
        <UInput v-model="model"
          :name="id"
          :placeholder="placeholder"
          :id="id"
          type="number"
          :min="min"
          :max="max"
          :step="step" />
      </UFormGroup>
    </div>
  </template>
  <template v-if="type === 'password'">
    <div class="w-full">
      <UFormGroup :error="!error && errorMessage"
        :label="label"
        :name="id"
        :ui="uiErrorLabel">
        <UInput v-model="model"
          :name="id"
          :placeholder="placeholder"
          :id="id"
          :ui="{ icon: { trailing: { pointer: '', wrapper: `absolute inset-y-0 end-0 flex items-center z-10` } } }"
          icon="i-heroicons-lock-closed"
          :type="passwordType ? 'password' : 'text'">
          <template #trailing>
            <UButton color="gray"
              :ui="{ base: 'z-10 cursor-pointer relative' }"
              variant="link"
              :icon="passwordType ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'"
              :padded="false"
              @click="passwordType = !passwordType" />
          </template>
        </UInput>
      </UFormGroup>
    </div>
  </template>
  <template v-if="type === 'upload'">
    <div class="w-full">
      <UploadBox :id="id || 'upload'"
        :wrapper-class="uploadClassComponent"
        v-model="model"
        :upload-message="uploadMessage"
        :default-image-value="defaultImageValue"
        :multiple="multiple" />
    </div>
  </template>
  <template v-if="type === 'file'">
    <div class="relative w-full">
      <div
        class="w-full w-full min-h-48px bd-1-#dadada rd-6px flex items-center p-0-10 relative cursor-pointer"
        :class="{
          'bd-1-#e84118 error-input-field': showError
        }">
        <UButton>
          <UIcon name="i-heroicons-document-arrow-up" /> Carregar Arquivo
        </UButton>
        <input type="file"
          :id="id"
          :multiple="multiple || false"
          class="absolute z-10 w-full h-full opacity-0 cursor-pointer"
          @change="upload">
      </div>
      <div class="w-full mt-[10px] flex flex-wrap gap-[5px]">
        <p class="m-0 w-full text-[14px] color-#666 flex items-center flex-wrap gap-[5px] relative"
          :key="index"
          v-for="name, index in filenames">
          <UIcon name="i-heroicons-document-arrow-up" /> {{ name }}
          <UButton color="red"
            size="2xs"
            square
            :ui="{ rounded: 'rounded-full' }">
            <UIcon name="i-heroicons-x-mark" />
          </UButton>
        </p>
      </div>
    </div>
  </template>
  <template v-if="type === 'cardcheckbox'">
    <UFormGroup :error="!error && errorMessage"
      :label="label"
      :name="id"
      :ui="uiErrorLabel"
      class="w-full">
      <div class="w-full grid"
        :class="[gridCards]">
        <label class="grid-item"
          v-for="option in options"
          :key="option.label"
          :class="[gridItemClass, option.value === model ? gridCardActive : '']">
          <input type="radio"
            name="card-item"
            v-model="model"
            :value="option.value"
            class="absolute hidden opacity-0">
          <slot :option="option"
            name="card-item" />
        </label>
      </div>
    </UFormGroup>
  </template>

  <template v-if="type === 'money'">
    <div class="w-full">
      <UFormGroup :error="!error && errorMessage"
        :label="label"
        :name="id"
        :ui="uiErrorLabel">
        <UInput v-model="model"
          :name="id"
          data-maska="9.99#,##"
          data-maska-tokens="9:[0-9]:repeated"
          data-maska-reversed
          icon="i-heroicons-banknotes"
          v-maska
          :placeholder="placeholder"
          :id="id"
          :type="type" />
      </UFormGroup>
    </div>
  </template>
  <template v-if="type === 'divisor'">
    <UDivider :label="label" />
  </template>
  <template v-if="type === 'editor'">
    <div class="w-full">
      <UFormGroup :error="!error && errorMessage"
        :label="label"
        :name="id"
        :ui="uiErrorLabel">
        <Editor v-model="model" />
      </UFormGroup>
    </div>
  </template>
  <template
    v-if="!['range', 'toggle', 'radiogroup', 'checkbox', 'select', 'textarea', 'number', 'password', 'file', 'upload', 'money', 'cardcheckbox', 'divisor', 'editor', 'array'].includes(type)">
    <div class="w-full">
      <UFormGroup :error="!error && errorMessage"
        :label="label"
        :name="id"
        :ui="uiErrorLabel">
        <UInput v-model="model"
          :name="id"
          :data-maska="mask"
          v-maska
          :icon="icon"
          :placeholder="placeholder"
          :id="id"
          :type="type" />
      </UFormGroup>
    </div>
  </template>
</template>
