<script setup lang="ts">
useHead({
  title: 'Admin | Romance of Three Kingdoms Database'
})
</script>

<template>
  <div class="w-full bg-white min-h-screen p-x-10">
    <Header />
    <main class="flex gap-[20px] justify-between mt-[60px]">
      <Navigation />
      <div class="w-[calc(100%-250px)]">
        <slot />
      </div>
    </main>
  </div>
</template>

