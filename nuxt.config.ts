import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/main.css'],

  nitro: {
    publicAssets: [{ dir: 'public', maxAge: 0 }],
    compatibilityDate: '2025-09-12'
  },
  

  modules: ['@nuxtjs/tailwindcss']
})