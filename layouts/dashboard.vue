<script setup lang="ts">
import { useUserStore } from '~/stores/user'
const user = useUserStore()

const items = [
  [{
    label: user.user.name,
    slot: 'account',
    disabled: true
  }],
  [{
    label: 'Settings',
    icon: 'i-game-icons-cog'
  }], 
  [{
    label: 'Sign out',
    icon: 'i-game-icons-exit-door',
    click: async() => await navigateTo('/admin/logoff')
  }]
]
</script>  

<template>
    <div class="w-full">
      <header class="prose w-full min-w-full px-[20px] py-[10px] bg-gray-900 flex gap-[20px] items-center justify-between">
        <div class="w-full flex items-center m-auto justify-between">
          <div class="w-[300px] flex gap-[10px] items-center">
            <nuxt-link to="/" class="w-[300px] flex gap-[10px] items-center">
              <img src="../public/logo-4.webp" alt="Romance of Three Kingdoms" width="467" height="154" loading="lazy" class="max-w-[150px] h-auto m-0">
              <h1 class="font-['Aleo'] text-[20px] text-white font-semibold mb-0">Database</h1>
            </nuxt-link>
          </div>
          <div class="w-[32px]">
            <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-end' }">
              <template #account="{ item }">
                <div class="text-left">
                  <p class="m-0 text-[12px]">
                    Signed in as
                  </p>
                  <p class="truncate font-medium text-gray-900 dark:text-white m-0">
                    {{ item.label }}
                  </p>
                </div>
              </template>
              <UAvatar 
                :ui="{ size: { sm: 'h-8 w-8 text-sm m-0' } }"
                :alt="user.user.name"
                :src="user.user.avatar"></UAvatar>
            </UDropdown>
          </div>
        </div>
      </header>
      <main class="bg-slate-100 w-full min-h-screen flex items-start justify-between">
        <nav class="w-[220px] bg-slate-800 text-white p-[20px] h-screen">
          <ul>
            <li class="my-[5px]">
              <nuxt-link to="/admin/dashboard">Dashboard</nuxt-link>
            </li>
            <li class="my-[5px]">
              <nuxt-link to="/admin/generals">Generals</nuxt-link>
            </li>
            <li class="my-[5px]">
              <nuxt-link to="/admin/pages">Pages</nuxt-link>
            </li>
            <li class="my-[5px]">
              <nuxt-link to="/admin/logoff">Logoff</nuxt-link>
            </li>
          </ul>
        </nav>
        <div class="w-[calc(100%-260px)] py-[20px]">
          <slot></slot>
        </div>
      </main>
      <UNotifications :ui="{ position: 'top-0 bottom-auto' }" />
    </div>
</template>
