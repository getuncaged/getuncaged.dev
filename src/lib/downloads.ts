/**
 * First-party download counting.
 *
 * Why this exists: GitHub's release `download_count` is not an adoption metric.
 * It counts every crawler, package-manager CI job and mirror that walks the
 * asset list — on this repo that inflated the raw total to roughly twice the
 * plausible human number. So every download button on getuncaged.dev points at
 * a first-party `/dl/<slug>` route, which counts the click server-side and then
 * redirects to the real GitHub asset. What we display is therefore *downloads
 * started from this website by a browser*, which is the only signal we can
 * honestly call ours.
 *
 * Privacy: the route stores ONE integer per asset. No IP, no user-agent, no
 * cookie, no referrer, no timestamp, nothing per-visitor. It cannot be used to
 * identify or profile anyone, which is the whole point — a site that sells
 * "zero telemetry" does not get to quietly instrument its visitors.
 */

/** The canonical "latest release" asset base on GitHub. */
export const LATEST_BASE = 'https://github.com/getuncaged/uncaged/releases/latest/download';

/**
 * slug -> release asset filename.
 *
 * Slugs are stable, human-readable and safe to put in a URL. Adding a platform
 * means adding one line here; the route and the counter pick it up for free.
 */
export const ASSETS: Record<string, string> = {
  'macos-arm64': 'Uncaged-macos-aarch64.dmg',
  'macos-x64': 'Uncaged-macos-x86_64.dmg',

  'linux-x64-tar': 'Uncaged-linux-x86_64.tar.gz',
  'linux-x64-deb': 'Uncaged-linux-x86_64.deb',
  'linux-x64-rpm': 'Uncaged-linux-x86_64.rpm',
  'linux-x64-appimage': 'Uncaged-linux-x86_64.AppImage',

  'linux-arm64-tar': 'Uncaged-linux-aarch64.tar.gz',
  'linux-arm64-deb': 'Uncaged-linux-aarch64.deb',
  'linux-arm64-rpm': 'Uncaged-linux-aarch64.rpm',
  'linux-arm64-appimage': 'Uncaged-linux-aarch64.AppImage',

  'windows-x64': 'Uncaged-windows-x86_64-setup.exe',
  'windows-arm64': 'Uncaged-windows-aarch64-setup.exe',
};

/** The site-relative URL a download button should point at. */
export const dl = (slug: keyof typeof ASSETS | string) => `/dl/${slug}`;

/** The GitHub asset a slug resolves to, or null if the slug is unknown. */
export function assetUrl(slug: string): string | null {
  const name = ASSETS[slug];
  return name ? `${LATEST_BASE}/${name}` : null;
}

// ---------------------------------------------------------------- the store

/**
 * Counting is backed by a Redis-compatible REST endpoint (Vercel KV or Upstash
 * — both speak the same protocol and both have a usable free tier).
 *
 * It is entirely OPTIONAL. With no credentials configured the redirects still
 * work perfectly and the counter simply reports `null`, which the UI renders as
 * "no number yet" rather than a zero. A metrics backend must never be able to
 * take the download buttons down.
 */
const REST_URL = import.meta.env.KV_REST_API_URL ?? import.meta.env.UPSTASH_REDIS_REST_URL ?? '';
const REST_TOKEN =
  import.meta.env.KV_REST_API_TOKEN ?? import.meta.env.UPSTASH_REDIS_REST_TOKEN ?? '';

export const countingEnabled = Boolean(REST_URL && REST_TOKEN);

const KEY_TOTAL = 'dl:total';
const keyFor = (slug: string) => `dl:asset:${slug}`;

async function redis(command: string[]): Promise<unknown | null> {
  if (!countingEnabled) return null;
  try {
    const res = await fetch(REST_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${REST_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
      // Never let a slow metrics backend hold up a user's download.
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { result?: unknown };
    return json.result ?? null;
  } catch {
    // Counting is best-effort by design. Swallow and carry on.
    return null;
  }
}

/** Record one download of `slug`. Never throws; never blocks the redirect. */
export async function recordDownload(slug: string): Promise<void> {
  if (!countingEnabled) return;
  await Promise.allSettled([redis(['INCR', KEY_TOTAL]), redis(['INCR', keyFor(slug)])]);
}

/**
 * Total downloads started from this website. `null` when counting is not
 * configured or the store is unreachable — callers must render a fallback
 * rather than printing a misleading 0.
 */
export async function getDownloadTotal(): Promise<number | null> {
  const raw = await redis(['GET', KEY_TOTAL]);
  const n = typeof raw === 'string' ? Number.parseInt(raw, 10) : typeof raw === 'number' ? raw : NaN;
  return Number.isFinite(n) ? n : null;
}
