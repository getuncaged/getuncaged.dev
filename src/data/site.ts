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
  version: '0.1.0',
  license: 'AGPL-3.0',
  github: 'https://github.com/getuncaged/uncaged',
  githubOrg: 'https://github.com/getuncaged',
  issues: 'https://github.com/getuncaged/uncaged/issues',
  releases: 'https://github.com/getuncaged/uncaged/releases',
  releasesLatest: 'https://github.com/getuncaged/uncaged/releases/latest',
  dmg: 'https://github.com/getuncaged/uncaged/releases/latest/download/Uncaged.dmg',
  migrateDoc: 'https://github.com/getuncaged/uncaged/blob/master/docs/migrate-from-warp.md',
  uncagedDoc: 'https://github.com/getuncaged/uncaged/blob/master/UNCAGED.md',
  faqDoc: 'https://github.com/getuncaged/uncaged/blob/master/FAQ.md',
  handle: '@getuncaged',
};

export const PROVIDERS = {
  local: {
    title: 'Run it locally',
    blurb: 'A runtime on your own hardware. Zero keys, zero bills, zero network.',
    items: ['Ollama', 'LM Studio', 'llama.cpp', 'vLLM'],
  },
  api: {
    title: 'Bring an API key',
    blurb: 'Paste a key, pick a model. The call goes from your machine to that endpoint — nowhere else.',
    items: [
      'Anthropic',
      'OpenAI',
      'Google',
      'Mistral',
      'DeepSeek',
      'Groq',
      'Together',
      'xAI',
      'OpenRouter',
      'Any OpenAI-compatible',
    ],
  },
  cli: {
    title: 'Use a CLI agent',
    blurb: 'Drive Agent Mode with the subscription you already pay for, over ACP.',
    items: ['Claude Code', 'Codex CLI', 'Gemini CLI'],
  },
};

export const FEATURES = [
  {
    title: 'Blocks',
    body: 'Every command is grouped with its output, directory and exit code — context you can navigate, share, and hand straight to the agent.',
    icon: 'blocks',
  },
  {
    title: 'Agent Mode',
    body: 'Describe the task in plain language. The agent plans, runs and repairs commands — powered by whichever model you connected.',
    icon: 'agent',
  },
  {
    title: 'Workflows',
    body: 'Parameterized, searchable commands for the incantations you refuse to memorize. Kept from Warp, minus the login.',
    icon: 'workflows',
  },
  {
    title: 'Keymaps & editing',
    body: 'IDE-style input on top of a real terminal: multi-cursor, completions, and fully remappable keybindings.',
    icon: 'keys',
  },
  {
    title: 'Rust-fast rendering',
    body: 'The same GPU-accelerated renderer Warp is known for. Native, not Electron — your fans stay quiet.',
    icon: 'speed',
  },
  {
    title: 'Continuously synced',
    body: 'Uncaged tracks upstream Warp and merges its open-source improvements as they land.',
    icon: 'sync',
  },
];

export const AUDIT = [
  { surface: 'Account & login', state: 'none — the app has no concept of one' },
  { surface: 'Telemetry & analytics', state: 'off, enforced in code' },
  { surface: 'Crash reporting', state: 'not compiled into the build' },
  { surface: 'Cloud sync & conversation storage', state: 'none — history stays in ~/.uncaged/' },
  { surface: 'Auto-update phone-home', state: 'none — you update when you choose' },
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
    q: 'Which models can I connect?',
    a: 'Local runtimes (Ollama, LM Studio, llama.cpp, vLLM), hosted APIs (Anthropic, OpenAI, Google, Mistral, DeepSeek, Groq, Together, xAI, OpenRouter, or any OpenAI-compatible endpoint), and CLI agents like Claude Code, Codex CLI and Gemini CLI over ACP. One connection is all Agent Mode needs.',
  },
  {
    q: 'How is this different from Warp?',
    a: 'Warp open-sourced its client, but the premium agent runs on Warp’s servers behind a login and subscription. Uncaged replaces that with a local agent engine, removes the account and paywall gates, and ships with telemetry off. Same terminal, same speed — the cloud is gone.',
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
