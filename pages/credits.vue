<script setup lang="ts">
useHead({
  title: 'Credits | Romance of Three Kingdoms Database'
})
const { data } = await useFetch<PageSlugResponseItem>(`/api/pages/slug/credits`, {
  transform: (_data: any) => _data.data
})

useSeoMeta({
  title: () => 'Credits | Romance of Three Kingdoms Database',
  ogTitle: 'Credits | Romance of Three Kingdoms Database',
  description: 'This website collects all the stats for the Romance of Three Kingdoms games, produced by Koei.',
  ogDescription: 'This website collects all the stats for the Romance of Three Kingdoms games, produced by Koei.',
  keywords: 'Romance of Three Kingdoms, ROTK, Database, Generals, Zhuge Liang, Cao Cao, Zhao Yun, Liu Bei, Three Kingdoms',
  robots: 'index, follow',
  contentType: 'text/html; charset=utf-8',
  author: 'Mateus Ávila Isidoro'
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