// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://getuncaged.dev',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/design'),
      // stamp build time so index-refresh requests see the page as fresh
      serialize: (item) => ({ ...item, lastmod: new Date().toISOString() }),
    }),
  ],
});
