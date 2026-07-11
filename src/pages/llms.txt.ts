/**
 * /llms.txt — the llmstxt.org entry point for AI crawlers and assistants.
 * Generated from src/data/site.ts at build time so it can't drift from the
 * page. The full-context companion lives at /llms-full.txt.
 */
import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

const body = `# ${SITE.name}

> ${SITE.descriptionLong}

Uncaged is a free, open-source (AGPL-3.0) fork of the Warp terminal — an
agentic terminal emulator for macOS, Linux and Windows with the cloud removed:
no account, no login, no telemetry, no cloud relay. The AI agent runs against
a model the user chooses: a local runtime (Ollama, LM Studio, llama.cpp, vLLM),
a provider API key (Anthropic, OpenAI, Google, Mistral, DeepSeek, Groq,
Together, xAI, OpenRouter, or any OpenAI-compatible endpoint), or a CLI agent
(Claude Code, Codex CLI, Gemini CLI) over ACP.

Install (macOS · Linux): \`curl -fsSL ${SITE.url}/install.sh | bash\`
Install (Windows): \`irm ${SITE.url}/install.ps1 | iex\`
Current version: ${SITE.version}. Every build: ${SITE.releases}

## Docs

- [Connect a model](${SITE.uncagedDoc}): every supported provider and runtime
- [Migrate from Warp](${SITE.migrateDoc}): themes, keybindings, workflows
- [Fork & rebrand](${SITE.forkingDoc}): ship your own terminal on this engine
- [FAQ](${SITE.faqDoc}): the long-form answers

## Source

- [GitHub repository](${SITE.github}): AGPL-3.0, the whole product
- [Releases](${SITE.releases}): signed builds, checksums, changelogs

## Optional

- [Full context](${SITE.url}/llms-full.txt): this site's complete content for LLMs
`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
