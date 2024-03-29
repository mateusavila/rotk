<script setup lang="ts">
const menuOpen = ref(false)

const openMenuAction = () => menuOpen.value = !menuOpen.value
</script>  

<template>
  <div class="w-full">
    <header class="prose w-full min-w-full sm:px-[40px] px-[20px] py-[10px] bg-gray-900 flex gap-[20px] items-center justify-between relative">
      <div class="w-full flex items-center m-auto max-w-[1080px] justify-between relative">
        <div class="w-[300px] flex gap-[10px] items-center">
          <nuxt-link to="/" class="w-[300px] flex gap-[10px] items-center">
            <img src="../public/logo-4.webp" alt="Romance of Three Kingdoms" width="351" height="116" loading="lazy" class="sm:max-w-[150px] max-w-[120px] h-auto m-0" />
            <h1 class="font-['Aleo'] text-[20px] text-white font-semibold mb-0">Database</h1>
          </nuxt-link>
        </div>
        <UButton
          :ui="{ base: 'sm:hidden block absolute right-[-10px] top-[50%] translate-y-[-50%]', color: { white: { ghost: 'text-white hover:bg-transparent' } } }"
          :icon="menuOpen ? 'i-heroicons-x-mark-20-solid' : 'i-heroicons-bars-3-20-solid'"
          size="xl"
          color="white"
          square
          variant="ghost"
          @click="openMenuAction"
        />
        <nav class="text-white gap-[10px] sm:flex hidden">
          <nuxt-link class="text-white font-['Aleo'] text-[14px] font-semibold no-underline hover:underline" to="/">Home</nuxt-link>
          <!-- <nuxt-link class="text-white font-['Aleo'] text-[14px] font-semibold no-underline hover:underline" to="/about">About</nuxt-link> -->
          <nuxt-link class="text-white font-['Aleo'] text-[14px] font-semibold no-underline hover:underline" to="/credits">Credits</nuxt-link>
          </nav>
        </div>
      </header>
      <USlideover v-model="menuOpen" side="left" :ui="{ background: 'bg-black', overlay: { background: 'bg-gray-800/75 dark:bg-gray-800/75' }, width: 'w-full max-w-[calc(100%-60px)]' }">
        <div class="w-full p-[10px] pt-[80px]">
          <div class="w-full block p-[10px]">
            <nuxt-link class="text-white font-['Aleo'] text-[18px] font-semibold no-underline hover:underline" to="/">Home</nuxt-link>
          </div>
          <!-- <div class="w-full block p-[10px]">
            <nuxt-link class="text-white font-['Aleo'] text-[18px] font-semibold no-underline hover:underline" to="/about">About</nuxt-link>
          </div> -->
          <div class="w-full block p-[10px]">
            <nuxt-link class="text-white font-['Aleo'] text-[18px] font-semibold no-underline hover:underline" to="/credits">Credits</nuxt-link>
          </div>
        </div>
      </USlideover>
    <main class="bg-slate-100 w-full py-[20px] min-h-screen">
      <div class="w-[calc(100%-40px)] max-w-[1080px] m-auto py-[20px]">
        <slot></slot>
      </div>
    </main>
    <footer class="flex py-[20px] px-[40px] bg-gray-900 text-white text-center">
      <p class="w-full text-[12px]">This website is not affiliated with Koei or any other project, such as Kongming.net. The images and graphics used on this website are the property of Kongming.net.  All information and opinions expressed on this website are the responsibility of the authors and do not necessarily reflect the views of any other individual or organization. We reserve the right to modify or remove any content at any time without notice. By accessing this website, you agree to be bound by the terms of use.</p>
    </footer>
    <UNotifications :ui="{ position: 'top-0 bottom-auto' }" />
  </div>
</template>
