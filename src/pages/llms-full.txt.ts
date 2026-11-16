/**
 * /llms-full.txt — the complete site content as clean markdown for LLMs and
 * AI search engines (llmstxt.org "full" companion). Generated from
 * src/data/site.ts at build time: one source of truth, zero drift.
 */
import { ASSETS, assetUrl } from '../lib/downloads';
import type { APIRoute } from 'astro';
import { SITE, DOWNLOADS, AUDIT, FAQ } from '../data/site';

const strip = (s: string) => s.replace(/`/g, '');

const body = `# ${SITE.name} — ${SITE.tagline}

> ${SITE.descriptionLong}

License: AGPL-3.0 · Version: ${SITE.version} · Platforms: macOS, Linux, Windows
Website: ${SITE.url} · Source: ${SITE.github}

## What Uncaged is

Uncaged is a fork of the open-source Warp terminal with the cloud cut out —
the same agentic terminal emulator, running on the user's machine.
There is no account, no login, no subscription, no telemetry and no cloud
relay. It is a fully open-source Warp alternative: the same Rust terminal,
none of the cloud.

Removed from Warp: account & login, cloud-relayed AI requests, telemetry &
crash reporting, subscription/credits/caps, Warp & Oz branding.

In their place: a local agent engine (uncaged_engine) that runs on the user's
machine, the model the user chooses (local runtime, API key, or CLI agent),
and a swappable brand layer (the identity lives in a thin layer of files).

Kept from Warp: blocks, agent mode, code review, workflows, keymaps,
IDE-grade editing, GPU-fast rendering.

New in Uncaged 0.3 (the first releases from Uncaged's own line):
- Split panes as rounded cards. Split and Arrange from the tab menu (side by
  side, one large with the rest stacked, grid, unsplit into tabs), drag a tab
  onto a pane to split it there, open a conversation in a split pane.
- One input, two modes: a Terminal / Agent Mode switch (Cmd-I), lit only in
  the focused pane. Natural-language autodetection is off by default.
- Effort control in the model chip (e.g. "sonnet | Medium effort"), and a model
  menu that lists what your provider actually serves.
- Themes: 23 built in ("Uncaged" by default), a community library in
  the "Theme gallery" (getuncaged/uncaged-themes), and the "Theme creator":
  colours, a gradient or picture background, Dark or Light, and all 16 terminal
  colours, with a live terminal preview, or a theme generated from an image in
  three steps. "Share with the community" submits yours to the gallery as a PR.
- Code search on your machine: repositories are indexed locally (nothing is
  uploaded) and searched with search_codebase in Agent Mode. Claude Code,
  Gemini CLI and Codex get the same search as an MCP tool served on 127.0.0.1.
- One-line command headers: a finished block reads like a classic shell, the
  prompt then the command on the same row.
- Grouped tabs (macOS) and pinned tabs.
- Light on the machine (0.3.5): an idle window uses about 0.01% CPU and about
  150 MB; the macOS DMG is about 92 MB. Uncaged never starts at login.
- Opt-in, checksum-verified updates from GitHub Releases.

## Privacy: no account, no telemetry, no Warp servers

Prompts go only to the model endpoint the user configures (or nowhere, with a
local model). Update checks are off until the user accepts a one-time banner;
when on, Uncaged reads GitHub's public releases API with no identifier beyond
its version in the User-Agent. Other traffic happens only when the user asks
for it: installing a language server (nodejs.org, npm), the theme gallery
(GitHub), gist backup (via the user's own gh CLI). Since 0.3.5 the code that
talked to Warp's servers (account, telemetry, crash reporting, cloud sync,
shared sessions, cloud agents) is removed, not just switched off; the one
leftover server address is an unroutable placeholder. The source is public, so
this is verifiable:

${AUDIT.map((row) => `- ${row.surface}: ${row.state}`).join('\n')}

## Models: every model, no middleman

The AI inside Uncaged runs on a model the user chooses — picked once in
Settings → Models, switchable any time:

- CLI agents (use an existing plan, no API key): Claude Code, Gemini CLI,
  Codex CLI. They run their own tool loop, so in Agent Mode they answer in
  text for now; API and local models get Uncaged's native tools.
- Local runtimes (fully private, no key): Ollama, LM Studio, llama.cpp, vLLM
- Provider API keys: Anthropic, OpenAI, OpenRouter, Google, Groq, DeepSeek,
  Mistral, xAI, Together — or any OpenAI-compatible endpoint

Connections, API keys included, are stored as plain JSON in
~/.uncaged/connections.json (not encrypted, not in the Keychain) and are sent
only to the provider they belong to.

## Install

macOS · Linux (one command):
    curl -fsSL ${SITE.url}/install.sh | bash

Windows (PowerShell):
    irm ${SITE.url}/install.ps1 | iex

Direct downloads (latest release):

${Object.entries(ASSETS).map(([slug, file]) => `- ${file} — ${assetUrl(slug)}`).join('\n')}

All builds, checksums and changelogs: ${SITE.releases}

## Built to fork

The entire product identity lives in three files — the brand constants
(app/src/brand.rs), two SVGs (app/assets/bundled/svg/brand/), and the
provider catalog (crates/uncaged_engine/src/catalog.rs). Swap them, rebuild,
and ship your own terminal on a proven engine. ${SITE.forkingDoc} walks it
end to end; AGPL-3.0 keeps every fork as open as this one.

## FAQ

${FAQ.map((item) => `### ${item.q}\n\n${strip(item.a)}`).join('\n\n')}

## Links

- Website: ${SITE.url}
- GitHub: ${SITE.github}
- Releases: ${SITE.releases}
- Issues: ${SITE.issues}
- Connect a model: ${SITE.uncagedDoc}
- Migrate from Warp: ${SITE.migrateDoc}
- Fork & rebrand: ${SITE.forkingDoc}

Uncaged is an independent community fork of the open-source Warp client
(© Denver Technologies, Inc.). Not affiliated with or endorsed by Warp.
`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
