<script setup lang="ts">

</script>  

<template>
  <div class="w-full">
    <header class="prose w-full min-w-full sm:px-[40px] px-[20px] py-[10px] bg-gray-900 flex gap-[20px] items-center justify-between">
      <div class="w-full flex items-center m-auto max-w-[1080px] justify-between">
        <div class="w-[300px] flex gap-[10px] items-center">
          <nuxt-link to="/" class="w-[300px] flex gap-[10px] items-center">
            <img src="../public/logo3.png" alt="Romance of Three Kingdoms" width="467" height="154" loading="lazy" class="max-w-[150px] h-auto m-0">
            <h1 class="font-['Aleo'] text-[20px] text-white font-semibold mb-0">Database</h1>
          </nuxt-link>
        </div>
        <nav class="text-white hidden gap-[10px] sm:flex">
          <nuxt-link class="text-white font-['Aleo'] text-14px font-semibold" to="/">Home</nuxt-link>
          <!-- <nuxt-link class="text-white font-['Aleo'] text-14px font-semibold" to="/about">About</nuxt-link>
            <nuxt-link class="text-white font-['Aleo'] text-14px font-semibold" to="/contribute">Contribute</nuxt-link> -->
          </nav>
        </div>
      </header>
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
