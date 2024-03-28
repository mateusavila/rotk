<script lang="ts" setup>
const { params: { id } } = useRoute()
</script>

<template>
  <NuxtLayout name="dashboardnew">
    {{ id }}
  </NuxtLayout>
</template>
