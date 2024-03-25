<script lang="ts" setup>
import { useUserStore } from '../../stores/user'
definePageMeta({
  middleware: ["auth"]
})

onMounted(async () => { 
  const user = useUserStore()
  user.$reset()
  window.localStorage.removeItem('token'); 
  await navigateTo('/admin') 
})

</script>

<template>
  <NuxtLayout name="dashboard">
    <h1>Login executado com sucesso</h1>
  </NuxtLayout>
</template>
