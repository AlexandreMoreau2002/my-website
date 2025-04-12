import { defineConfig } from 'astro/config'

export default defineConfig({
  output: 'static',
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
    routing: {
      prefixDefaultLocale: true,
    },
  },
})
