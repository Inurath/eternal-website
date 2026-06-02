// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://eternalwebsite.com',
  vite: {
    plugins: [tailwindcss()]
  }
  // For sitemap + better SEO on deploy: npx astro add sitemap (adds @astrojs/sitemap integration)
  // Then import sitemap from '@astrojs/sitemap' and add to integrations: [sitemap()]
});