<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const toolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ['link', 'clean']
]
const text = defineModel<string>()
</script>

<template>
  <div class="box-editor">
    <QuillEditor theme="snow"
      v-model:content="text"
      :toolbar="toolbar"
      content-type="html" />
  </div>
</template>

<style>
.box-editor {
  width: 100%;
  height: auto;
}

.ql-editor {
  box-sizing: border-box;
  min-height: 180px;
  background: #fff;
}

.ql-snow .ql-tooltip {
  left: 0 !important;
  top: 0 !important
}
</style>