<script setup lang="ts">
useHead({
  title: 'Admin | Romance of Three Kingdoms Database'
})
</script>

<template>
  <div class="w-full bg-white min-h-[calc(100vh-100px)] p-x-10">
    <Header />
    <main class="flex gap-[20px] justify-between mt-[60px]">
      <div class="w-full">
        <slot />
      </div>
    </main>
  </div>
</template>

