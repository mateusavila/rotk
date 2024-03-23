<script lang="ts" setup>
const {} = defineProps<{
  width: string
  height: string
  rounded: string
}>()
</script>

<template>
  <div class="skeleton" :class="[`w-[${width}]`, `h-[${height}]`, `rounded-[${rounded}]`]">

  </div>
</template>

<style>
@keyframes pulse-bg {
  0% {
    background-color: #ddd;
  }
  50% {
    background-color: #d0d0d0;
  }
  100% {
    background-color: #ddd;
  }
}
.skeleton {
  animation: pulse-bg 1s infinite;
}
</style>