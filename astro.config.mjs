// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://getuncaged.dev',
  // Everything is prerendered to static HTML by default — the homepage keeps
  // shipping as a plain file. The adapter exists only for two small routes that
  // opt out via `prerender = false`: the `/dl/<slug>` download redirect and
  // `/api/downloads.json` (the GitHub download count). See src/lib/downloads.ts.
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      // /design is an internal gallery; /dl/* are redirects, not pages.
      filter: (page) => !page.includes('/design') && !page.includes('/dl/'),
      // stamp build time so index-refresh requests see the page as fresh
      serialize: (item) => ({ ...item, lastmod: new Date().toISOString() }),
    }),
  ],
});
