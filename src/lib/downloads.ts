/**
 * Downloads: where the buttons point, and how many there have been.
 *
 * Every download button points at a first-party `/dl/<slug>` route that
 * redirects to the GitHub release asset, so links stay stable when the asset
 * names or the hosting change.
 *
 * The count needs no database and no tracking: GitHub already counts every
 * release asset download, publicly. `/api/downloads.json` sums those counts
 * across all releases and the CDN caches the answer for an hour, so GitHub is
 * asked about once an hour no matter how many people visit. Nothing about a
 * visitor is recorded anywhere.
 *
 * What the number means: downloads from GitHub Releases, which includes
 * package managers (Homebrew, winget, including winget's validation runs) and
 * not only browsers on this site.
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

// ---------------------------------------------------------------- the count

const RELEASES_API = 'https://api.github.com/repos/getuncaged/uncaged/releases?per_page=100';

/**
 * Total downloads of every asset in every release, from GitHub's own counters.
 * `null` when GitHub can't be reached; callers render nothing rather than a
 * misleading 0. GITHUB_TOKEN is optional (it only raises the rate limit).
 */
export async function getDownloadTotal(): Promise<{ total: number; releases: number } | null> {
  const token = import.meta.env.GITHUB_TOKEN ?? '';
  let url: string | null = RELEASES_API;
  let total = 0;
  let releases = 0;
  try {
    for (let page = 0; url && page < 10; page++) {
      const res: Response = await fetch(url, {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'getuncaged.dev',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) return null;
      const list = (await res.json()) as { draft?: boolean; assets?: { download_count?: number }[] }[];
      for (const r of list) {
        if (r.draft) continue;
        releases++;
        for (const a of r.assets ?? []) total += a.download_count ?? 0;
      }
      // follow GitHub's pagination, if there is a next page
      const next = /<([^>]+)>;\s*rel="next"/.exec(res.headers.get('link') ?? '');
      url = next ? next[1] : null;
    }
    return { total, releases };
  } catch {
    return null;
  }
}
