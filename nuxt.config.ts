// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: 'preload', as: 'image', href: '/peach-garden-min.avif' },
        { rel: 'preload', as: 'image', href: '/logo-4.avif' }
      ]
    }
  },
  modules: ['@nuxt/ui', '@nuxtjs/google-fonts', '@vueuse/nuxt', '@nuxt/image', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  googleFonts: {
    families: {
      Aleo: [400, 600, 800],
    }
  },
  ui: {
    icons: ['game-icons']
  },
  runtimeConfig: {
    public: {
      secretjwt: process.env.NUXT_SECRET_WEBTOKEN,
    },
    secretjwt: process.env.NUXT_SECRET_WEBTOKEN,
    turso: {
      url: process.env.NUXT_TURSO_DB_URL,
      authToken: process.env.NUXT_TURSO_DB_AUTH_TOKEN
    }
  }
})
