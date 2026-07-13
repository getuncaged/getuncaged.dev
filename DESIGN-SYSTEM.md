# Uncaged Web — Design System

> Cold canvas, one warm accent. The web counterpart to the logo's "Ember" system.

**Version 1.0 · "Midnight"**

This is the design system of **getuncaged.dev** — extracted from the shipped site, not aspirational.
Every value here exists in [`src/styles/global.css`](src/styles/global.css) or a component under
[`src/components/`](src/components/). The living gallery at [`/design`](src/pages/design.astro)
renders these primitives from the same CSS, so the spec and the site cannot drift.

Scope: the website and any future web surface (docs, changelog, status). The **logo and mark** are
governed by the separate "Ember" design system in the `uncaged-design-system` repo — Midnight never
alters the mark, its prompt gradient, or its geometry.

---

## 1. Foundation

### The one idea
A cold, disciplined night — blue-black, slate, porcelain — where the only warmth on the page is the
brand's ember. Warmth is never ambient; it marks **action, attention, and the brand itself**.
Everything at rest is cool. Anything that burns, matters.

### The hard rules (non-negotiable)
1. **One dark palette, everywhere.** No light sections, no theme mixing. The base varies only
   through tonal bands within the same cool family.
2. **All bases are cool.** No warm blacks, browns, creams, or beiges — ever. If a surface looks
   warm, it is wrong.
3. **The ember family is the only accent.** Gold → ember → flame. No second accent hue. (Teal was
   tried and executed.)
4. **No pure white.** Text tops out at porcelain `#E8EBF2`.
5. **Product depictions are faithful.** Any mockup of Uncaged UI mirrors the real app's structure,
   labels, and button vocabulary (verify against the app repo — e.g. `right_panel.rs`,
   `ai_page.rs`, `catalog.rs`). Stylized in Midnight's palette, never invented.
6. **Nothing renders below 10.5px**, and meaningful text below 13.5px uses `--ash` or brighter —
   `--muted` is for decorative labels only.

---

## 2. Color

### Base (cool, in elevation order)

| Token | Hex | Role |
|---|---|---|
| `--void` | `#0B0D12` | Page ground |
| `--ground-top` | `#12151D` | Top-of-page gradient head |
| `--panel` | `#12151C` | Cards, table rows, chips |
| `--raised` | `#171B24` | Hover/raised surfaces |
| — band, deep | `#0E1117` | Full-bleed section bands (e.g. `#privacy`) |
| — artifact | `#10141C` | Window/mockup bodies |
| — artifact, deeper | `#0F131A` / `#0D1119` | Code blocks, ledger, panels inside windows |

### Line & text (cool)

| Token | Value | Role |
|---|---|---|
| `--ink` | `#E8EBF2` | Headings, primary text (porcelain — the ceiling) |
| `--ash` | `#8B93A5` | Body/secondary text — the workhorse |
| `--muted` | `#5D6577` | Decorative micro-labels ONLY (fails AA for reading sizes) |
| `--bar` | `#262C3A` | Borders, hairlines, dividers |
| `--line-soft` | `rgba(60, 67, 82, 0.6)` | Interior hairlines (inside windows, tables, lists) |

### Accent (the only warmth)

| Token | Hex | Role |
|---|---|---|
| `--gold` | `#FFB23A` | Gradient head · ok-states (`exit 0`, "In use", ✓) · active chips |
| `--ember` | `#FF7A18` | THE accent: CTAs, carets, active nav, arrows, glows |
| `--ember-deep` | `#FF5E10` | Hover/pressed tail · small accent glyphs on dark |
| `--flame` | `#FF4D1C` | Gradient tail of the display headline only |
| `--grad-prompt` | `gold → ember`, 180° | The brand prompt gradient (cursors, spark dots) |

**Usage ratio:** ≥90% cool, ≤10% warm. On ember fills, label color is `#16100A` (near-black warm),
never white.

### Terminal-diegetic colors (inside mockup glass only)
Real terminals have semantics; inside a window mockup — and nowhere else — these are legal:
failure red `#FF3B47`, diff-added `#7BD88F` on `rgba(94,210,130,.1)`, diff-removed `#FF8089` on
`rgba(255,59,71,.1)`. The fork-tile rebrand tints (`#6AA8FF #7BD88F #FF6AC1 #C8B8FF`) are the one
sanctioned off-palette moment — they depict *other people's* brands.

---

## 3. Typography

| Face | Family | Used for |
|---|---|---|
| **JetBrains Mono Variable** | `--mono` | Headings, labels, buttons, chips, data, code, nav — every short string |
| **Inter Variable** | `--sans` | Sentences: body copy, section subs, FAQ answers |

### Scale

| Style | Spec |
|---|---|
| Display (hero H1) | Mono 800 · `clamp(38px, 4.9vw, 56px)` (longest beat holds one line) · lh 1.06 · ls −0.025em |
| Section H2 | Mono 700 · `clamp(30px, 3.6vw, 42px)` · lh 1.2 · max-width 22ch |
| Card/column H3 | Mono 700 · 13.5–17px |
| Body / section sub | Inter 400 · 17px · lh 1.65 · `--ash` · max-width 52–56ch |
| Eyebrow | Mono 500 · 13px · `--ash` · ember `❯` prefix |
| Button | Mono 700 · 14px (15.5px for the primary download) |
| Artifact UI text | Mono · 11–13.5px (floor 10.5px for command strings) |
| Meta/micro | Mono 500 · 11–12.5px · `--muted` for decoration, `--ash` when it must be read |

### Rules
- Mono carries the personality; Inter stays invisible. If a string is under ~8 words, it is mono.
- Eyebrows are lowercase, numbered on the stage rail: `01 · no cloud`.
- One flame-gradient text moment per page (the hero's last line). Never set body text in accent colors.
- Vary headline shapes — the two-beat staccato pair ("X. Y.") is the house style but must not be
  every heading on a page.

---

## 4. Layout & space

| Token/pattern | Value |
|---|---|
| Container | `min(1120px, 100% − 48px)`, centered, `z-index: 1` |
| Section rhythm | `padding-block: clamp(84px, 6vw + 44px, 128px)` — 128px on desktop, compressing on small screens · head → content gap 64–72px |
| Radii | 8 (`--radius-s`) · 12 (`--radius`) · 16 (`--radius-l`) · buttons 10–12 · windows 14 |
| Hairline | 1px `--bar` at 0.6 opacity, full container width |
| Bands | Full-bleed `#0E1117` + `border-block: 1px solid --bar` for one section per page region |
| Column dividers | `border-left: 1px solid --bar` between equal grid columns (the install matrix) |

**The stage rail** is the page's spine: numbered eyebrows (`01…05`) with one unnumbered intro
artifact ("the fork"). Nav labels quote the rail vocabulary verbatim — one vocabulary, two places.
Every section head sits on the same left edge; centered heads are reserved for the intro ledger and
the install/CTA action moments.

**Grid discipline:** every multi-column track is `minmax(0, 1fr)` — never bare `1fr` (min-content
blowout) and never implicit auto columns for card stacks. Code blocks scroll inside their boxes.

**The command never wraps.** The install one-liner is the product's proof, so it renders on one
line everywhere it appears (hero, install section, CTA). When space runs out it scrolls inside its
box like a real terminal line, with a fade cue on the clipped edge (`.is-overflowing`, set by the
shared script) — never a URL broken mid-word.

**The script leads.** Every column of the install matrix puts the one-line installer on top
(the ember-bordered `is-hero` command) with direct downloads demoted below an "or download"
separator. The macOS column pairs its `.dmg` buttons with the one-time Gatekeeper-clear command
(`xattr -dr com.apple.quarantine …`, copyable) — a browser download gets quarantined without an
Apple Dev ID, and the first run must never dead-end in "app is damaged".

---

## 5. Motion

Base easing `--fast: 140ms cubic-bezier(0.4, 0, 0.2, 1)` for hovers (color, border, ≤1px lift).
Everything below dies under `prefers-reduced-motion` via the global kill switch.

The sanctioned animations — each exists to say something, not to decorate:

| Animation | Spec | Meaning |
|---|---|---|
| Cursor blink | 1.1s `steps(1)`, prompt gradient block | The terminal is alive |
| Demo typing | 24–50ms/char, staggered reveals | The product working |
| Model/connection cycling | 2.4–3.2s interval swaps | Any model, one session |
| Orb drift | 34/41/47s, alternate, fixed layer | The room breathes |
| Spark rise | 10–16s linear loops, ember dots | Embers off the brand |
| Glow breathe | 13–16s alternate on hero/CTA radials | The one warm light |
| Wire pulse | 2.8s dot along the outbound line | Exactly one call leaves |
| Ticker marquee | 36s linear, duplicated list, edge-masked | Everything kept |
| FAQ answer settle | 220ms fade + 5px rise on `[open]` | Response to input, not decoration |

Scroll-triggered reveals are banned (tried, removed). Content is present at first paint.

---

## 6. Atmosphere

Three fixed light-field orbs behind the whole page (`.atmosphere`): ember top-right
(`rgba(255,122,24,.12)`), teal-leaning cool bottom-left (`rgba(62,201,180,.08)`), slate-blue
mid-right (`rgba(92,130,220,.08)`) — soft radial gradients, no `filter: blur`. A fine dot grid
(`rgba(230,235,245,.07)`, 27px) masked around the hero terminal. Grain overlay at 0.028 opacity,
fixed, over everything. Deep shadows on artifacts: `0 24px 70px −18px rgba(0,0,0,.85)` plus a 1px
porcelain inset highlight on window tops.

---

## 7. Components

**Buttons** — `.btn` mono 700; primary: prompt-gradient face (`#FF8A2E → --ember`), `#16100A`
label, inset top highlight, ember glow shadow; hover deepens gradient, lifts 1px, widens glow;
active settles back. Ghost: `--bar` border, ink label, 5% ink wash on hover. Download buttons carry
the 16px stroke arrow-to-tray icon (1.8px, round caps).

**Window chrome** (any product artifact) — 14px radius, `#10141C` body, header row: three 11px
dots (first `#384051`), mono 11.5px title left, muted hint right, `--bar` bottom border on
`rgba(22,26,35,.6)`. Interior hairlines use `--line-soft`.

**Code block** — `#0F131A`, 12px radius, ember `❯` prompt, ink text, 10.5–13px. Copy control is a
right cap (static flex sibling, `--line-soft` left border), never floating over text; long commands
fade out under a 26px right mask and scroll.

**Eyebrow / stage rail** — `❯` in ember + `NN · label` mono 13. Scrollspy underlines the active
nav label in ember (2px, 7px offset) and clears above stage 01.

**Chips & badges** — 999px radius, mono 10.5–12px: neutral (`--bar` border, ash), group badges
("Your login" / "On-device" / "API key"), gold-filled state chips ("In use", version).

**Ledger** — the removed/replaced two-column card: `−` items in ash with `--ember-deep` glyphs,
`+` items ink-bold with `--gold` glyphs and muted detail lines, joined by the ember arrow.

**Audit table** — `--panel` rows, mono 13.5px, ink terms left, ash values right prefixed `∅` in
`--ember-deep`.

**Buttons inside mockups** use the real app's vocabulary: `Connect` (unsaved preset), `Use` /
`Edit` (saved connection), gold-filled `In use` (active). Never invent labels the app doesn't have.

**FAQ** — `<details name>` accordion rows on `--bar` rules; mono 16px questions with muted
two-digit indices; `+` rotates 45° and turns ember when open; Inter answers at 64ch.

---

## 8. Voice

Professional and precise — engineering claims, not vibes.

- Every claim must be verifiable in the repo ("not compiled into the build", "history stays in
  `~/.uncaged/`"). If the code can't back it, the site can't say it.
- Feature names match the app verbatim: Code review, Tools panel, Agent Mode, Settings → AI Models.
- No cute idioms in headlines ("Asked, answered." died for this). No claiming freedoms the license
  already grants — the claim is engineering ("built to be forked"), not permission.
- The possessive triad ("your models, your keys, your machine") appears **once** per page, in the
  closing CTA.
- Em-dashes are a budget, not a habit. Errors state what happened and what to do next.

---

## 9. Accessibility floor

- Text ≥ 4.5:1 against its surface wherever it must be read; `--muted` (≈3.6:1) is decoration only.
- Absolute type floor 10.5px (command strings), 11px labels, 13.5px+ for reading.
- Focus: 2px `--gold` outline, 3px offset. `aria-current` follows the scrollspy.
- Every animation obeys `prefers-reduced-motion`; demos render their final state instantly.
- Mockups carry `role="img"` with full-sentence `aria-label`s describing what they show.

---

## 10. Forking Midnight

Like the app, this system is one thin layer: retint by editing the `:root` block in
`global.css` (base six + accent four), swap the two font imports in `Base.astro`, and replace the
mark via `Logo.astro`. The rules in §1 survive any retint: cool base, one warm accent family,
faithful product depictions, the type floor. Change the colors, keep the discipline.
