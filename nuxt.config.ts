import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [tsconfigPaths()],
  },
  devtools: {
    enabled: true
  },
  modules: ['@nuxtjs/tailwindcss', 'vuetify-nuxt-module']
})