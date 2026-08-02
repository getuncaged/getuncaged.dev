import type { APIRoute } from 'astro';
import { assetUrl, recordDownload, ASSETS } from '../../lib/downloads';

/**
 * `/dl/<slug>` — count a download, then hand the visitor to GitHub.
 *
 * This is the only server-rendered route on the site; everything else stays
 * static. It exists so we can report *real* downloads started by a browser
 * from getuncaged.dev, instead of GitHub's asset counter (which is dominated by
 * package-manager CI and crawlers walking every file in every release).
 *
 * We store one integer per asset and nothing else — no IP, no user-agent, no
 * cookie, no timestamp. Nothing here can identify a visitor.
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

  // Best-effort: a metrics failure must never cost someone their download.
  await recordDownload(slug);

  return new Response(null, {
    status: 302,
    headers: {
      Location: target,
      // Never cache the hop, or intermediaries would swallow the count.
      // The site-wide Referrer-Policy (strict-origin-when-cross-origin) still
      // applies, so GitHub sees getuncaged.dev as the referrer — which lets
      // GitHub's own traffic stats corroborate this counter.
      'Cache-Control': 'no-store, max-age=0',
    },
  });
};

/** Surfaces the known slugs for debugging/tests. */
export const knownSlugs = Object.keys(ASSETS);
