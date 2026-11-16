import type { APIRoute } from 'astro';
import { getDownloadTotal } from '../../lib/downloads';

/**
 * `/api/downloads.json` — the total download count, from GitHub's own release
 * asset counters. No database: Vercel's CDN caches the answer for an hour (and
 * serves the last good one for a day while it refreshes), so GitHub is asked
 * about once an hour however many people visit.
 */
export const prerender = false;

export const GET: APIRoute = async () => {
  const count = await getDownloadTotal();
  return new Response(JSON.stringify({ source: 'github-releases', ...(count ?? { total: null }) }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': count
        ? 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
        : 'public, max-age=0, s-maxage=300',
    },
  });
};
