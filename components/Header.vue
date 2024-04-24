<script lang="ts" setup>
import { useUserStore } from '~/stores/user'
const user = useUserStore()

const items = [
  [
    {
      label: user.user.name,
      slot: 'account',
      id: 'dropdown-account',
      disabled: true
    }
  ],
  // [
  //   {
  //     label: 'Settings',
  //     to: '/admin/settings',
  //     id: 'dropdown-configuration',
  //     icon: 'i-game-icons-cog',
  //     click: async() => await navigateTo('/admin/settings')
  //   }
  // ],
  [
    {
      label: 'Sign out',
      to: '/admin/logoff',
      id: 'dropdown-logorr',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: async() => await navigateTo('/admin/logoff')
    }
  ]
]
</script>

<template>
  <header
    class="z-[100] fixed top-0 left-0 w-full h-[60px] bg-white px-[10px] flex items-center justify-between">
    <nuxt-link to="/" class="w-[300px] flex gap-[10px] items-center">
      <img src="../public/logo-4.webp" alt="Romance of Three Kingdoms" width="467" height="154" loading="lazy" class="max-w-[150px] h-auto m-0">
      <h1 class="font-['Aleo'] text-[20px] text-white font-semibold mb-0">Database</h1>
    </nuxt-link>
    <UDropdown :items="items"
      :popper="{ placement: 'bottom-start' }">
      <UAvatar 
        :ui="{ size: { sm: 'h-8 w-8 text-sm m-0' } }"
        :alt="user.user.name"
        :src="user.user.avatar"></UAvatar>
      <template #account="{ item }">
        <div class="text-left">
          <p>
            Logado como:
          </p>
          <p class="truncate font-medium text-gray-900 dark:text-white">
            {{ item.label }}
          </p>
        </div>
      </template>
    </UDropdown>
  </header>
</template>
