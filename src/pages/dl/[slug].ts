import type { APIRoute } from 'astro';
import { assetUrl, ASSETS } from '../../lib/downloads';

/**
 * `/dl/<slug>` — hand the visitor to the GitHub release asset.
 *
 * A stable first-party link for every download button. Nothing is recorded:
 * the download count comes from GitHub's own asset counters (see
 * src/lib/downloads.ts and /api/downloads.json).
 */
export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug ?? '';
  const target = assetUrl(slug);

  // Unknown slug: send them somewhere useful rather than 404-ing a download.
  if (!target) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: 'https://github.com/getuncaged/uncaged/releases/latest',
        'Cache-Control': 'no-store',
      },
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: target,
      // The hop always points at /releases/latest, so the edge can keep it.
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
};

/** Surfaces the known slugs for debugging/tests. */
export const knownSlugs = Object.keys(ASSETS);
