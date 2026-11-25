// https://nuxt.com/docs/api/configuration/nuxt-config
import viteCompression from 'vite-plugin-compression'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  app: {
    head: {
      title: 'Shaaf Yousaf - Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=0.9' },
        { name: 'description', content: 'Engineering ideas through code, design, and film' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/resources/ShaafLabsLogo_Small.png' },
      ],
    },
  },
  
  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/content'
  ],

  content: {
     experimental: { nativeSqlite: true },
  },

  
  css: [
    '~/assets/css/global.css',
  ],
  
  // No font families forced in: the site is Nexa throughout (self-hosted in
  // global.css). @nuxt/fonts still picks up anything a page names on its own.
  
  image: {
    quality: 80,
    format: ['webp', 'png', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  
  icon: {
    size: '24px',
    customCollections: [
      {
        prefix: 'custom',
        dir: './assets/icons',
      },
    ],
  },
  
  vite: {
    plugins: [
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024, // only compress files > 1kb
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/global.css" as *;',
        },
      },
    },
  },
})
