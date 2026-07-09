/**
 * Single source of truth for names, URLs, versions and section content.
 * Release URLs point at the canonical GitHub "latest release" assets —
 * they go live the moment a release with that asset name is published.
 */

export const SITE = {
  name: 'Uncaged',
  url: 'https://getuncaged.dev',
  title: 'Uncaged — No account. No cloud. No cage.',
  description:
    'Uncaged is a fork of the open-source Warp terminal that removes the cloud. The full agentic experience — blocks, workflows, keymaps — running entirely on your machine. No account, no login, no relay. Bring any model: local, API key, or a CLI agent. Your keys never leave your device.',
  version: '0.2.4',
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
  migrateDoc: 'https://github.com/getuncaged/uncaged/blob/master/docs/migrate-from-warp.md',
  forkingDoc: 'https://github.com/getuncaged/uncaged/blob/master/FORKING.md',
  uncagedDoc: 'https://github.com/getuncaged/uncaged/blob/master/UNCAGED.md',
  faqDoc: 'https://github.com/getuncaged/uncaged/blob/master/FAQ.md',
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
const asset = (name: string) => `${SITE.latestBase}/${name}`;

export const DOWNLOADS = {
  macos: {
    primary: {
      label: 'Download .dmg',
      arch: 'Apple Silicon',
      href: asset('Uncaged-macos-aarch64.dmg'),
    },
    others: [
      { label: 'Intel .dmg', arch: 'x86_64', href: asset('Uncaged-macos-x86_64.dmg') },
    ],
    // Homebrew tap isn't published yet — surfaced as "coming", not runnable.
    brew: {
      cmd: 'brew install --cask getuncaged/tap/uncaged',
      status: 'coming' as const,
    },
  },
  linux: {
    primary: {
      label: 'Download .tar.gz',
      arch: 'x86_64',
      href: asset('Uncaged-linux-x86_64.tar.gz'),
    },
    // The full x86_64 package set, all live in the v0.2.4 release.
    others: [
      { label: '.deb', arch: 'Debian · Ubuntu', href: asset('Uncaged-linux-x86_64.deb') },
      { label: '.rpm', arch: 'Fedora · RHEL · SUSE', href: asset('Uncaged-linux-x86_64.rpm') },
      { label: 'AppImage', arch: 'any distro', href: asset('Uncaged-linux-x86_64.AppImage') },
    ],
    // arm64 Linux is best-effort and not published yet.
    note: 'arm64 Linux builds are on the way.',
  },
  windows: {
    primary: {
      label: 'Download installer',
      arch: 'x64 · Windows 11 / 10',
      href: asset('Uncaged-windows-x86_64-setup.exe'),
    },
    others: [
      {
        label: 'ARM64 installer',
        arch: 'Windows 11 / 10',
        href: asset('Uncaged-windows-aarch64-setup.exe'),
      },
    ],
    // winget submission is pending upstream — surfaced as "coming".
    winget: {
      cmd: 'winget install Uncaged.Uncaged',
      status: 'coming' as const,
    },
  },
};

export const AUDIT = [
  { surface: 'Account & login', state: 'none — the app has no concept of one' },
  { surface: 'Telemetry & analytics', state: 'off, enforced in code' },
  { surface: 'Crash reporting', state: 'not compiled into the build' },
  { surface: 'Cloud sync & conversation storage', state: 'none — history stays in ~/.uncaged/' },
  { surface: 'Update checks', state: 'none — updates are manual, from GitHub Releases' },
];

export const FAQ = [
  {
    q: 'Do I need an account?',
    a: 'No. Uncaged has no accounts and no login. It runs entirely on your machine with its own local profile — connect a model and you’re working.',
  },
  {
    q: 'Does my data go anywhere?',
    a: 'Not to us — there is no "us" server-side. The only outbound traffic is to the model endpoint you configure yourself. No telemetry, no analytics, no crash reporting, no cloud sync. It’s enforced in code, and the code is public.',
  },
  {
    q: 'What does it cost?',
    a: 'Nothing, forever — Uncaged is AGPL-3.0 open source with no paid tier. You pay your model provider if you use one, or nothing at all with a local model.',
  },
  {
    q: 'Which platforms are supported?',
    a: 'macOS (Apple Silicon and Intel, .dmg), Linux x86_64 (.deb, .rpm, AppImage and .tar.gz) and Windows (x64 and ARM64 installers) — all from GitHub Releases. Homebrew, winget and arm64 Linux builds are on the way.',
  },
  {
    q: 'Which models can I connect?',
    a: 'Local runtimes (Ollama, LM Studio, llama.cpp, vLLM), hosted APIs (Anthropic, OpenAI, Google, Mistral, DeepSeek, Groq, Together, xAI, OpenRouter, or any OpenAI-compatible endpoint), and CLI agents like Claude Code, Codex CLI and Gemini CLI over ACP. One connection is all Agent Mode needs.',
  },
  {
    q: 'How is this different from Warp?',
    a: 'Warp open-sourced its client, but the premium agent runs on Warp’s servers behind a login and subscription. Uncaged replaces that with a local agent engine, removes the account and paywall gates, and ships with telemetry off. Same terminal, same speed — the cloud is gone.',
  },
  {
    q: 'Can I fork it and ship my own terminal?',
    a: 'That’s the point. Every upstream service, account profile, and Warp/Oz mark has been carved out of the product — the whole identity lives in a thin brand layer: one Rust constants file, two SVGs, and the provider catalog. Swap those, rebuild, and it’s yours. FORKING.md walks it end to end, and AGPL-3.0 keeps every fork as open as this one.',
  },
  {
    q: 'macOS says the app is from an unidentified developer.',
    a: 'Expected — Uncaged is ad-hoc signed because an independent fork has no Apple Developer ID. Clear the quarantine flag once with `xattr -dr com.apple.quarantine /Applications/Uncaged.app` and it opens normally from then on.',
  },
  {
    q: 'Can I migrate from Warp?',
    a: 'Yes. Uncaged is fully isolated from any Warp install — its own config directory and app identity — so nothing is shared unless you copy it over. The migration guide covers themes, keybindings and workflows.',
  },
];
