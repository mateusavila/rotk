<template>
  <div class="banner w-full h-[350px] border border-slate-50 flex items-end relative after:z-1 after:absolute after:w-full after:h-[200px] after:bottom-0 after:left-0 after:bg-gradient-to-b from-slate-800/0 to-slate-900/100">
    <NuxtImg :src="`/peach-garden-min.jpg`" class="object-cover z-[1] absolute top-0 left-0 w-full h-[350px]" width="100%" height="350px" />
    <div class="w-full flex items-center content-center justify-center h-[200px] flex-wrap">
      <h2 class="text-white text-[18px] font-['Aleo'] w-full z-[10] text-center mb-[10px]">Select your general</h2>
      <Search />
    </div>
  </div>
</template>