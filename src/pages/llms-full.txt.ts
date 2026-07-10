/**
 * /llms-full.txt — the complete site content as clean markdown for LLMs and
 * AI search engines (llmstxt.org "full" companion). Generated from
 * src/data/site.ts at build time: one source of truth, zero drift.
 */
import type { APIRoute } from 'astro';
import { SITE, DOWNLOADS, AUDIT, FAQ } from '../data/site';

const strip = (s: string) => s.replace(/`/g, '');

const body = `# ${SITE.name} — ${SITE.tagline}

> ${SITE.descriptionLong}

License: AGPL-3.0 · Version: ${SITE.version} · Platforms: macOS, Linux, Windows
Website: ${SITE.url} · Source: ${SITE.github}

## What Uncaged is

Uncaged is a fork of the open-source Warp terminal with the cloud cut out —
the same agentic terminal emulator, running entirely on the user's machine.
There is no account, no login, no subscription, no telemetry and no cloud
relay. It is a fully open-source Warp alternative: same terminal, same speed,
none of the cloud.

Removed from Warp: account & login, cloud-relayed AI requests, telemetry &
crash reporting, subscription/credits/caps, Warp & Oz branding.

In their place: a local agent engine (uncaged_engine) that runs on the user's
machine, the model the user chooses (local runtime, API key, or CLI agent),
and a swappable brand layer (the whole identity in three files).

Kept from Warp: blocks, agent mode, code review, tools panel, workflows,
keymaps, IDE-grade editing, GPU-fast rendering — synced with upstream Warp.

## Privacy: zero telemetry, one outbound call

The only network request Uncaged ever makes is the one to the model endpoint
the user configures. The source is public, so this is verifiable:

${AUDIT.map((row) => `- ${row.surface}: ${row.state}`).join('\n')}

## Models: every model, no middleman

The AI inside Uncaged runs on a model the user chooses — picked once in
Settings → AI Models, switchable any time:

- CLI agents over ACP (use an existing plan, no API key): Claude Code,
  Gemini CLI, Codex CLI
- Local runtimes (fully private, no key): Ollama, LM Studio, llama.cpp, vLLM
- Provider API keys: Anthropic, OpenAI, OpenRouter, Google, Groq, DeepSeek,
  Mistral, xAI, Together — or any OpenAI-compatible endpoint

Keys are stored on disk (~/.uncaged/) and never leave the device.

## Install

macOS · Linux (one command):
    curl -fsSL ${SITE.url}/install.sh | bash

Windows (PowerShell):
    irm ${SITE.url}/install.ps1 | iex

Direct downloads (latest release):

- macOS: Apple Silicon .dmg — ${DOWNLOADS.macos.primary.href}
- macOS: Intel .dmg — ${DOWNLOADS.macos.others[0]!.href}
- Linux x86_64: .deb — ${DOWNLOADS.linux.others[0]!.href}
- Linux x86_64: .rpm — ${DOWNLOADS.linux.others[1]!.href}
- Linux x86_64: AppImage — ${DOWNLOADS.linux.others[2]!.href}
- Linux x86_64: .tar.gz — ${DOWNLOADS.linux.primary.href}
- Windows x64 installer — ${DOWNLOADS.windows.primary.href}
- Windows ARM64 installer — ${DOWNLOADS.windows.others[0]!.href}

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
