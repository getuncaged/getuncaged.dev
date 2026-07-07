# getuncaged.dev

Product website for [Uncaged](https://github.com/getuncaged/uncaged) — the
agentic terminal with no account, no cloud, no cage. Built with
[Astro](https://astro.build), fully static, zero client frameworks.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve the production build locally
```

## Where things live

| What | Where |
|---|---|
| All copy-adjacent data — URLs, version, providers, features, FAQ | [`src/data/site.ts`](src/data/site.ts) |
| Design tokens (palette, type, motion) | [`src/styles/global.css`](src/styles/global.css) — spec in [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md), living gallery at [`/design`](src/pages/design.astro) |
| Page sections | [`src/components/`](src/components/) |
| Brand assets (favicon, mark, touch icon) | [`public/`](public/) |

Colors, type and voice follow **Midnight**, the site's own design system
([`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md), living gallery at `/design`):
JetBrains Mono + Inter on a cool blue-black ground, with the gold→ember family
as the only warmth on the page. The logo itself is governed by the separate
"Ember" system in the `uncaged-design-system` repo.

## Downloads

Download buttons point at the canonical GitHub latest-release asset:

```
https://github.com/getuncaged/uncaged/releases/latest/download/Uncaged.dmg
```

They go live automatically the moment a release with an `Uncaged.dmg` asset is
published — no site change needed. New platforms: add a card in
`src/components/Downloads.astro` and the URL in `src/data/site.ts`.

## Deploy

Deployed on [Vercel](https://vercel.com) at
[getuncaged.dev](https://getuncaged.dev). Astro is auto-detected; `vercel.json`
adds security headers and immutable caching for hashed assets. Every push to
`master` redeploys.
