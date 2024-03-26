<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { login } from '../utils/index'
import { jwtVerify } from 'jose'
import type { LoggedUser, Login } from '../utils/index'
const toast = useToast()
const state = reactive({
  email: undefined,
  password: undefined
})

const isLoading = ref(false)

const onSubmit = async (event: FormSubmitEvent<Login>) => {
  isLoading.value = true
  try {
    const { token } = await $fetch('/api/auth/login', {
      method: 'POST',
      body: event.data
    })
    const { public: { secretjwt } } = useRuntimeConfig()
    const secretKeyBuffer = new TextEncoder().encode(secretjwt)
    window.localStorage.setItem('token', token)
    const { payload } = await jwtVerify(token, secretKeyBuffer, {
      issuer: "Romance of Three Kingdoms Database",
      audience: "romance-of-three-kingdoms",
    })

    const user = useUserStore()
    user.updateUser(payload.user as LoggedUser)
    navigateTo('/admin/dashboard')
  } catch (error) {
    isLoading.value = false
    toast.add({
      id: 'error',
      color: 'red',
      title: 'Error!',
      description: `Aparently, there's error in this request.`,
      icon: 'i-game-icons-info'
    })
  }
}
</script>

<template>
  <UForm :schema="login" :state="state" class="space-4" @submit="onSubmit">
    <Loading :is-loading="isLoading" />
    <UFormGroup label="Email" name="email">
      <UInput leading-icon="i-game-icons-walk" size="xl" v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password" class="mt-[10px]">
      <UInput leading-icon="i-game-icons-locked-door" size="xl" v-model="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit" class="mt-[10px] float-right">
      Login
    </UButton>
  </UForm>
</template>