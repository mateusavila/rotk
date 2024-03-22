// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: 'preload', as: 'image', href: '/peach-garden-min.jpg' }
      ]
    }
  },
  modules: ['@nuxt/ui', '@nuxtjs/google-fonts', '@vueuse/nuxt', '@nuxt/image'],
  googleFonts: {
    families: {
      Aleo: [200, 300, 400, 600, 800],
      Barlow: [200, 300, 400, 600, 800],
    }
  },
  ui: {
    icons: ['game-icons']
  },
  runtimeConfig: {
    turso: {
      url: process.env.NUXT_TURSO_DB_URL,
      authToken: process.env.NUXT_TURSO_DB_AUTH_TOKEN
    }
  }
})
