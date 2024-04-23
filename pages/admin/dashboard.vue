<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"]
})
</script>

<template>
  <NuxtLayout name="dashboardnew">
    <h1 class="font-['Aleo'] text-[32px] font-semibold">Dashboard</h1>
    <p>We are building a new dashboard page.</p>
  </NuxtLayout>
</template>
