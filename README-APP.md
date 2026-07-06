# Uncaged — app content brief

> Authoritative, up-to-date facts about the **Uncaged app** for whoever is
> building this site. This is source material, not site code — pull copy and
> data from here into `src/data/site.ts` and the components. It complements the
> site's own [`README.md`](README.md) (which documents the Astro project);
> it does not replace it.
>
> **Golden rule for all copy:** never claim a capability that isn't shipping,
> and never advertise a download artifact that CI doesn't actually produce yet
> (see [Downloads](#downloads--install)). When in doubt, under-promise.

---

## What Uncaged is

A fork of the open-source **Warp** terminal that removes the cloud. You get the
full agentic terminal — blocks, Agent Mode, workflows, keymaps, the GPU
renderer — running **entirely on your machine**. No account, no login, no relay,
no telemetry. Bring any model you like: a local runtime, an API key, or a CLI
agent you already pay for. Your keys never leave your device.

- **Name:** Uncaged
- **Tagline:** *No account. No cloud. No cage.*
- **License:** AGPL-3.0 (free forever, no paid tier)
- **Platforms:** macOS (Apple Silicon) today; Linux/Windows from source / CI artifacts (see below)
- **Config lives in:** `~/.uncaged/` — isolated from any Warp install
- **Repo:** https://github.com/getuncaged/uncaged
- **Org:** https://github.com/getuncaged
- **Site:** https://getuncaged.dev

### How it differs from Warp (the elevator version)

Warp open-sourced its *client*, but the premium agent still runs on Warp's
servers behind a login and a subscription, and even the local Drive pops a
"Sign up for Warp" wall. Uncaged replaces the server-side agent with a **local
agent engine**, strips out every account/paywall gate, turns telemetry off in
code, and makes the Drive fully local. Same terminal, same speed — the cloud is
gone.

---

## Feature set (what to show)

Aligned with `src/data/site.ts` `FEATURES`, plus the fork-specific additions:

| Feature | One-liner |
|---|---|
| **Blocks** | Every command grouped with its output, directory and exit code — navigable, shareable, hand-able to the agent. |
| **Agent Mode** | Describe a task in plain language; the agent plans, runs and repairs — powered by whichever model *you* connected. |
| **Bring-your-own-model** | Local runtime, API key, or CLI agent. One connection is all Agent Mode needs. Keys stay on device. |
| **Workflows** | Parameterized, searchable commands — kept from Warp, minus the login. |
| **Keymaps & editing** | IDE-style input on a real terminal: multi-cursor, completions, fully remappable keys. |
| **Rust-fast rendering** | The GPU-accelerated renderer Warp is known for. Native, not Electron. |
| **Local Drive** | Your workflows, notebooks, themes, env vars and MCP servers — stored on your machine, organized how you want, with optional private-gist backup. No account. |
| **Left-rail panels** | One-click Skills, SSH hosts, Drive and Config panels in the rail. |
| **CLI-agent launchers** | Detected CLI agents (Claude Code, Codex CLI, Gemini CLI, opencode, …) launch straight from the titlebar. |
| **Continuously synced** | Tracks upstream Warp and merges its open-source improvements as they land. |

---

## The Drive (get this story right — it's the fork's signature)

Warp's Drive is a cloud feature gated behind an account. Uncaged's Drive is the
opposite: **100% local, no account, yours to organize.**

- Lives on disk under `~/.uncaged/` — nothing is uploaded anywhere by default.
- Holds workflows, notebooks, themes, launch configs, snippets, env vars and MCP
  server definitions.
- Organize freely: create, rename, delete, and move items in and out of folders.
- **Optional** private-gist backup: one command syncs your config + Drive to a
  **secret** GitHub gist under *your own* account, via the `gh` CLI you already
  have. It **always asks first** and tells you exactly what it uploads; there's
  an opt-in auto-sync toggle for people who want it hands-off. **API keys and
  secrets are never included** in a backup.

**Copy guidance:** frame the Drive as *local-first, private, organizable*.
Safe to say: "your Drive, on your machine, organized how you want, with an
optional private backup." Don't over-specify the exact interaction (e.g. exact
drag gestures) — describe the outcome, not the mechanic.

---

## Models — bring your own (from `PROVIDERS`)

Three ways to connect; one is enough for Agent Mode. Every call goes from the
user's machine straight to the endpoint they chose — nowhere else.

- **Run it locally** (zero keys, zero bills, zero network): Ollama, LM Studio,
  llama.cpp, vLLM.
- **Bring an API key** (paste a key, pick a model): Anthropic, OpenAI, Google,
  Mistral, DeepSeek, Groq, Together, xAI, OpenRouter, or **any OpenAI-compatible
  endpoint**.
- **Use a CLI agent** (drive Agent Mode over ACP with a subscription you already
  pay for): Claude Code, Codex CLI, Gemini CLI.

---

## Privacy posture (from `AUDIT` — enforced in code, code is public)

| Surface | State |
|---|---|
| Account & login | none — the app has no concept of one |
| Telemetry & analytics | off, enforced in code |
| Crash reporting | not compiled into the build |
| Cloud sync & conversation storage | none — history stays in `~/.uncaged/` |
| Auto-update phone-home | none — you update when you choose |

The **only** outbound traffic is (a) to the model endpoint the user configures,
and (b) an explicit, user-initiated gist backup if they turn it on. Nothing else.

---

## Downloads & install

Download links point at the canonical GitHub **latest-release** assets, so they
go live automatically when a release with that asset name is published — no site
change needed.

### What CI actually builds today

The release workflow (`.github/workflows/uncaged-release.yml`, triggered on a
`v*` tag) bundles via `./script/bundle --channel oss --selfsign --arch aarch64`:

| Platform | Asset | Status |
|---|---|---|
| **macOS (Apple Silicon)** | `Uncaged.dmg`, `Uncaged.zip` | ✅ primary, built every release |
| macOS (Intel) | — | build from source (`--arch x86_64`) |
| Linux | `.tar.gz` / `.AppImage` | ⚠️ best-effort in CI — only surface a button once a release asset exists |
| Windows | `.zip` / installer | ⚠️ best-effort in CI — only surface a button once a release asset exists |

> **Honesty guardrail:** only render a download button for a platform whose
> asset actually appears on the latest GitHub release. For not-yet-built
> platforms, link to **"Build from source"** (the repo README) instead of a dead
> binary link.

Canonical macOS URL:

```
https://github.com/getuncaged/uncaged/releases/latest/download/Uncaged.dmg
```

### macOS install + first-run note (important for the FAQ)

Uncaged is **ad-hoc signed** — an independent fork has no Apple Developer ID — so
macOS shows "unidentified developer" on first launch. Clear the quarantine flag
once:

```bash
xattr -dr com.apple.quarantine /Applications/Uncaged.app
```

After that it opens normally. This is expected and worth stating plainly rather
than hiding — it builds trust with the exact audience this app targets.

### System requirements

- **macOS 12 (Monterey) or later**, Apple Silicon. Intel Macs: build from source.
- ~a few hundred MB free; no runtime dependencies to install for the app itself.
- A model to connect (local runtime, API key, or CLI agent) — not required to
  launch the terminal, only to use Agent Mode.

---

## Brand & design

Follows the **Uncaged design system, v1.0 "Ember"**
(`/Users/antonarnaudov/Developer/Uncaged/uncaged-design-system`,
mirrored under the `getuncaged` org):

- **Type:** JetBrains Mono (display/mono) + Inter (body).
- **Palette:** warm night-workbench ground; **gold → ember** accent held to a
  ≤10% "spark" — accent is a highlight, not a wash.
- **Marks:** use the thicker app logos for the product; use the `/ai` caret marks
  for anything representing the agent/AI. Favicon/mark/touch-icon already in
  `public/`.

---

## Canonical links (keep `site.ts` in sync)

| Thing | URL |
|---|---|
| Site | https://getuncaged.dev |
| Repo | https://github.com/getuncaged/uncaged |
| Org | https://github.com/getuncaged |
| Releases | https://github.com/getuncaged/uncaged/releases |
| Latest macOS DMG | https://github.com/getuncaged/uncaged/releases/latest/download/Uncaged.dmg |
| Issues | https://github.com/getuncaged/uncaged/issues |

Current app version: **0.1.0** · License: **AGPL-3.0** · Handle: **@getuncaged**

---

*Maintainer note: the Drive UX (easy create/rename/move, no account gate) is
being finished in the app repo right now. Keep Drive copy outcome-focused until
that lands so nothing on the site gets ahead of the build.*
