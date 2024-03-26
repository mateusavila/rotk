<script lang="ts" setup>
  useHead({
    title: 'Admin | Romance of Three Kingdoms Database'
  })
</script>

<template>
  <NuxtLayout name="loginnew">
    <div class="w-full flex items-center content-center justify-center h-[450px]">
      <div class="w-[calc(100%-30px)] max-w-[400px] mx-auto p-[20px] rounded-[10px] bg-slate-200 relative">
        <h1 class="font-['Aleo'] text-[20px] text-slate-900 font-bold text-center">Administration Page</h1>
        <Login />
      </div>
    </div>
  </NuxtLayout>
</template>
