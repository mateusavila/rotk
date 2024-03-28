<script setup lang="ts">
useHead({
  title: 'Credits | Romance of Three Kingdoms Database'
})
const { data } = await useFetch<PageSlugResponseItem>(`/api/pages/slug/credits`, {
  transform: (_data: any) => _data.data
})
</script>

<template>
  <NuxtLayout name="default">
    <div class="prose min-w-full max-w-full w-full">
      <h1>Credits</h1>
      <div class="w-full" v-if="data" v-html="data?.content.replace(/(<p><br><\/p>)/gm, '')"></div>
    </div>
  </NuxtLayout>
</template>