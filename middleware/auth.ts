import { jwtVerify } from 'jose'

export default defineNuxtRouteMiddleware(async () => {
  if (process.server) return
  const { public: { secretjwt } } = useRuntimeConfig()

  const token = window.localStorage.getItem('token')
  if (!token) {
    return navigateTo('/admin')
  }

  // Validar token
  const secretKeyBuffer = new TextEncoder().encode(secretjwt)
  try {
    // Verifique o token
    await jwtVerify(token, secretKeyBuffer, {
      issuer: "Romance of Three Kingdoms Database",
      audience: "romance-of-three-kingdoms",
    })
  } catch (error) {
    return navigateTo('/admin')
  }
})