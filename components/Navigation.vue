<script lang="ts" setup>
const links = ref([
  {
    url: '/admin/dashboard',
    label: 'Dashboard',
    icon: 'i-heroicons-presentation-chart-line'
  },
  {
    url: '/admin/generals',
    label: 'Generals',
    icon: 'i-game-icons-cavalry'
  },
  {
    url: '/admin/pages',
    label: 'Pages',
    icon: 'i-game-icons-black-book'
  },
  {
    url: '/admin/settings',
    label: 'Settings',
    icon: 'i-game-icons-cog'
  }
])

const route = useRoute()
</script>

<template>
  <nav
    class="menu w-[200px] overflow-hidden min-h-screen bg-blue-100 rounded-r-[6px]">
    <ul class="list-none py-[20px] m-0">
      <li :key="index"
        class="relative"
        v-for="({ url, label, icon }, index) in links">
        <NuxtLink :to="url"
          class="color-slate-600 flex h-[32px] items-center no-underline flex-wrap text-[14px] font-regular gap-[10px] pl-[13px] hover:bg-blue-200 transition"
          :class="{
            'bg-blue-200 hover:bg-blue-300': url === route.path
          }">
          <UIcon :name="icon"></UIcon>
          {{ label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>