// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://getuncaged.dev',
  // Everything is prerendered to static HTML by default — the homepage keeps
  // shipping as a plain file with no JS. The adapter exists only so the single
  // `/dl/<slug>` counting route (which opts out via `prerender = false`) can
  // run server-side. See src/lib/downloads.ts for why that route exists.
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
