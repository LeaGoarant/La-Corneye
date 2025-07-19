import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [
      tsconfigPaths()
    ],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./', import.meta.url))
      }
    }
  },
  devtools: {
    enabled: true
  },
  modules: ['@nuxtjs/tailwindcss', 'vuetify-nuxt-module']
})