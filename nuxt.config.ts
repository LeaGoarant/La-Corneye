import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['vuetify/styles'],
  plugins: ['~/plugins/vuetify.ts'],
  vite: {
    plugins: [tsconfigPaths()]
  },
  devtools: {
    enabled: true
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: ['@nuxtjs/tailwindcss', 'vuetify-nuxt-module']
})