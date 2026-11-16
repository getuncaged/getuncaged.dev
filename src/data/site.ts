/**
 * Single source of truth for names, URLs, versions and section content.
 * Release URLs point at the canonical GitHub "latest release" assets —
 * they go live the moment a release with that asset name is published.
 */

import { dl } from '../lib/downloads';

export const SITE = {
  name: 'Uncaged',
  url: 'https://getuncaged.dev',
  // SERP title (57 chars): brand + the queries that matter — "warp terminal",
  // "open source terminal". The brand tagline lives on as `tagline` (OG/social).
  title: 'Uncaged — Open-Source Warp Fork, No Cloud, No Account',
  tagline: 'No account. No cloud. No cage.',
  // Meta description, 152 chars — front-loaded keywords, truncation-safe.
  description:
    'Free, open-source Warp terminal fork with the cloud cut out — no account, no telemetry. The same agentic terminal, any AI model: local, API key, or CLI.',
  // The full pitch — JSON-LD, llms.txt, anywhere length isn't capped.
  descriptionLong:
    'Uncaged is a fork of the open-source Warp terminal that removes the cloud. The full agentic terminal — blocks, split panes, one input with a Terminal / Agent Mode switch, workflows, keymaps, the GPU renderer — running on your machine. No account, no login, no relay, no telemetry. Power Agent Mode with any model: one running locally (Ollama, LM Studio), the CLI agent you already pay for (Claude Code, Codex CLI, Gemini CLI), or an API key. Keys and history are stored only on your machine.',
  version: '0.3.5',
  license: 'AGPL-3.0',
  github: 'https://github.com/getuncaged/uncaged',
  githubOrg: 'https://github.com/getuncaged',
  issues: 'https://github.com/getuncaged/uncaged/issues',
  releases: 'https://github.com/getuncaged/uncaged/releases',
  releasesLatest: 'https://github.com/getuncaged/uncaged/releases/latest',
  // The "latest" URLs resolve to the newest published release, so these never
  // need per-version edits. See ../../DOWNLOADS.md in the app repo for the
  // canonical asset manifest.
  latestBase: 'https://github.com/getuncaged/uncaged/releases/latest/download',
  // Primary per-OS actions used across Hero, CTA and JSON-LD.
  // macOS leads with Apple Silicon; Windows leads with the x64 installer.
  dmg: 'https://github.com/getuncaged/uncaged/releases/latest/download/Uncaged-macos-aarch64.dmg',
  linuxTar: 'https://github.com/getuncaged/uncaged/releases/latest/download/Uncaged-linux-x86_64.tar.gz',
  windowsSetup:
    'https://github.com/getuncaged/uncaged/releases/latest/download/Uncaged-windows-x86_64-setup.exe',
  migrateDoc: 'https://github.com/getuncaged/uncaged/blob/main/docs/migrate-from-warp.md',
  forkingDoc: 'https://github.com/getuncaged/uncaged/blob/main/FORKING.md',
  uncagedDoc: 'https://github.com/getuncaged/uncaged/blob/main/UNCAGED.md',
  faqDoc: 'https://github.com/getuncaged/uncaged/blob/main/FAQ.md',
  handle: '@getuncaged',
};

/**
 * Download matrix — the real assets published by the release workflow to
 * GitHub Releases (getuncaged/uncaged). Every href is a "latest release"
 * URL, so the buttons keep working across versions with no edits here.
 *
 * `note: 'coming'` marks a format whose build/publish target isn't live yet
 * (the Apple Silicon .dmg finishes ~an hour after each release cut) — it's
 * shown de-emphasised rather than as a working download.
 */
// Download hrefs now go through the first-party `/dl/<slug>` counter route
// (see ../lib/downloads.ts), which records the click and then redirects to the
// GitHub asset. `SITE.latestBase` is still the canonical asset base used by
// structured data and docs.

export const DOWNLOADS = {
  macos: {
    primary: {
      label: 'Download .dmg',
      arch: 'Apple Silicon',
      href: dl('macos-arm64'),
    },
    others: [{ label: 'Intel .dmg', arch: 'x86_64', href: dl('macos-x64') }],
    // The tap is live (getuncaged/homebrew-tap) and re-synced on every release.
    brew: {
      cmd: 'brew install --cask getuncaged/tap/uncaged',
      status: 'live' as const,
    },
  },
  linux: {
    primary: {
      label: 'Download .tar.gz',
      arch: 'x86_64',
      href: dl('linux-x64-tar'),
    },
    others: [
      { label: '.deb', arch: 'Debian · Ubuntu', href: dl('linux-x64-deb') },
      { label: '.rpm', arch: 'Fedora · RHEL · SUSE', href: dl('linux-x64-rpm') },
      { label: 'AppImage', arch: 'any distro', href: dl('linux-x64-appimage') },
    ],
    // arm64 Linux now builds natively in CI and ships the same four formats.
    arm64: [
      { label: '.deb', arch: 'Debian · Ubuntu', href: dl('linux-arm64-deb') },
      { label: '.rpm', arch: 'Fedora · RHEL · SUSE', href: dl('linux-arm64-rpm') },
      { label: 'AppImage', arch: 'any distro', href: dl('linux-arm64-appimage') },
      { label: '.tar.gz', arch: 'aarch64', href: dl('linux-arm64-tar') },
    ],
  },
  windows: {
    primary: {
      label: 'Download installer',
      arch: 'x64 · Windows 11 / 10',
      href: dl('windows-x64'),
    },
    others: [
      {
        label: 'ARM64 installer',
        arch: 'Windows 11 / 10',
        href: dl('windows-arm64'),
      },
    ],
    // Published in microsoft/winget-pkgs.
    winget: {
      cmd: 'winget install Uncaged.Uncaged',
      status: 'live' as const,
    },
  },
};

export const AUDIT = [
  { surface: 'Account & login', state: 'removed from the code (0.3.5) — the app has no concept of one' },
  { surface: 'Telemetry & analytics', state: 'the pipeline and every event type are deleted, not switched off' },
  { surface: 'Crash reporting', state: 'Sentry and crash reporting to Warp are removed from the code' },
  { surface: 'Cloud sync & conversation storage', state: 'none — Drive, history and conversations stay on this machine; gist backup only when you run it' },
  { surface: 'Update checks', state: 'off until you say yes; then GitHub’s public releases API, verified against its SHA-256' },
  { surface: 'Warp’s servers', state: 'the client code is deleted; the one leftover server address is an unroutable placeholder' },
];

export const FAQ = [
  {
    q: 'Do I need an account?',
    a: 'No. Uncaged has no accounts and no login. The app runs on your machine with its own local profile — connect a model and you’re working.',
  },
  {
    q: 'Does my data go anywhere?',
    a: 'Not to us — there is no "us" server-side. Your prompts go only to the model endpoint you choose (or nowhere, with a local model). There is no telemetry, no analytics and no crash reporter in the release build, and every Warp server address is hard-wired to an unroutable one. Update checks stay off until you accept a one-time banner; after that Uncaged reads GitHub’s public releases API with no identifier beyond its version. Anything else — installing a language server, browsing the theme gallery, gist backup — happens only when you ask for it. The code is public.',
  },
  {
    q: 'What does it cost?',
    a: 'Nothing, forever — Uncaged is AGPL-3.0 open source with no paid tier. You pay your model provider if you use one, or nothing at all with a local model.',
  },
  {
    q: 'Which platforms are supported?',
    a: 'macOS (Apple Silicon and Intel, .dmg), Linux x86_64 and arm64 (.deb, .rpm, AppImage and .tar.gz) and Windows (x64 and ARM64 installers) — all from GitHub Releases. You can also install with Homebrew (brew install --cask getuncaged/tap/uncaged), winget (winget install Uncaged.Uncaged — new versions land there after Microsoft’s review), or the one-line curl / PowerShell installer.',
  },
  {
    q: 'Which models can I connect?',
    a: 'Local runtimes (Ollama, LM Studio, llama.cpp, vLLM), hosted APIs (Anthropic, OpenAI, Google, Mistral, DeepSeek, Groq, Together, xAI, OpenRouter, or any OpenAI-compatible endpoint), and the CLI agents you already pay for — Claude Code, Codex CLI and Gemini CLI — driven by your own login. One connection is all Agent Mode needs. CLI agents run their own tool loop, so in Agent Mode they answer in text for now; API and local models get Uncaged’s native tools.',
  },
  {
    q: 'How is this different from Warp?',
    a: 'Warp open-sourced its terminal, but its agent runs on Warp’s servers behind a Warp login, metered by Warp’s plans. Uncaged replaces that with a local agent engine that calls the model you connect, removes the account and paywall gates, and builds without telemetry or a crash reporter. Same Rust, GPU-rendered terminal; none of the cloud.',
  },
  {
    q: 'Can I fork it and ship my own terminal?',
    a: 'That’s the point. Upstream services are cut off, accounts are gone, and the Warp and Oz marks are replaced. What’s left of the identity is a thin brand layer: app/src/brand.rs holds the repo URL every in-app link reads, the updater’s release feed and the About text; three SVGs carry the marks; catalog.rs is the model gallery; four files give your build its own app id and config directory. The display name and the default theme’s accent are still set in a few dozen places, so a full rename ends with a find-and-replace. FORKING.md walks it end to end, and AGPL-3.0 keeps every fork as open as this one.',
  },
  {
    q: 'macOS says the app is from an unidentified developer.',
    a: 'Expected for a browser download — Uncaged is ad-hoc signed because an independent fork has no Apple Developer ID. Clear the quarantine flag once with `xattr -dr com.apple.quarantine /Applications/Uncaged.app` and it opens normally from then on. The curl installer clears it for you; Homebrew prints the same command if macOS still blocks the app.',
  },
  {
    q: 'Does it update itself?',
    a: 'Only if you say so. On first run a banner asks whether to check GitHub for new releases; until you accept, there is no update traffic at all. Once on, downloads are verified against the SHA-256 checksum GitHub publishes and Uncaged asks before restarting. Homebrew installs update through brew upgrade instead.',
  },
  {
    q: 'Can I migrate from Warp?',
    a: 'Yes. Uncaged is fully isolated from any Warp install — its own config directory and app identity — so nothing is shared unless you copy it over. The migration guide covers themes, keybindings and workflows.',
  },
];
