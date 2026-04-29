'use client';

import type { ReactNode } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

interface FeatureItem {
  title: string;
  eyebrow?: string;
  snippet: string;
  body: ReactNode;
}

interface Pillar {
  eyebrow: string;
  title: string;
  items: FeatureItem[];
}

const pillars: Pillar[] = [
  {
    eyebrow: 'Pillar 01',
    title: 'Orchestrate',
    items: [
      {
        title: 'Deterministic scheduling',
        snippet: 'orchestrator: code',
        body: (
          <>The orchestrator is pure Python. Zero LLM tokens on coordination. Predictable, debuggable, fast.</>
        ),
      },
      {
        title: '37 adapters',
        snippet: 'agents: [claude, codex, gemini, ...]',
        body: (
          <>Claude Code, Codex, Gemini CLI, OpenAI Agents SDK, GitHub Copilot, Droid, Crush, and 24 more. Mix models in one run. Switch providers without changing config.</>
        ),
      },
      {
        title: 'Cost-aware routing',
        snippet: 'router: bandit',
        body: (
          <>
            Epsilon-greedy bandit learns which model works best per task type. Teams routinely report 30&ndash;50% cost reductions &mdash; see the{' '}
            <a href="/blog/cost-aware-routing">cost-aware routing post</a>. Measure yours with{' '}
            <code>bernstein cost</code>.
          </>
        ),
      },
      {
        title: 'Progressive skill packs',
        snippet: 'load_skill("writing-tests")',
        body: (
          <>Role prompts load on demand via the <code>load_skill</code> MCP tool. Agents start with a minimal system prompt, pull only the skills a task needs, and save tokens on every call.</>
        ),
      },
      {
        title: 'ACP bridge',
        eyebrow: 'new in v1.9',
        snippet: 'bernstein acp serve',
        body: (
          <>Native Agent Client Protocol bridge. Zed and any other ACP-compliant editor can dispatch tasks, stream agent output, and read quality-gate results without leaving the editor.</>
        ),
      },
      {
        title: 'Credential vault',
        eyebrow: 'new in v1.9',
        snippet: 'bernstein connect github',
        body: (
          <>OS keychain-backed credential store. <code>bernstein connect &lt;provider&gt;</code> handles OAuth or PAT entry once; every subsequent agent run reads from the keychain. Supports GitHub, Linear, Jira, Slack, and Telegram.</>
        ),
      },
    ],
  },
  {
    eyebrow: 'Pillar 02',
    title: 'Verify',
    items: [
      {
        title: 'Quality gates',
        snippet: 'gates: [lint, types, tests]',
        body: (
          <>Lint, type check, tests, security scan, architecture conformance. All run before merge. Failed work retries automatically.</>
        ),
      },
      {
        title: 'Auto-improvement loop',
        eyebrow: 'experimental',
        snippet: 'bernstein --evolve',
        body: (
          <>On the Bernstein repo itself, self-proposed PRs merged continuously via <code>--evolve</code>.</>
        ),
      },
      {
        title: 'Full observability',
        snippet: 'metrics_port: 9464',
        body: (
          <>Per-agent cost tracking, token monitoring, quality trends, Prometheus metrics. Know what happened and what it cost.</>
        ),
      },
      {
        title: 'MCP remote',
        snippet: 'mcp: { stdio, http }',
        body: (
          <>Expose Bernstein as an MCP server over HTTP. Connect from any MCP client, run orchestration remotely.</>
        ),
      },
      {
        title: 'CI autofix',
        eyebrow: 'new in v1.9',
        snippet: 'bernstein autofix',
        body: (
          <>Daemon that watches Bernstein-opened PRs. When CI fails, it reads the log, spawns an agent against the failing worktree, and pushes a fix commit. No manual intervention for the common lint-and-type-error class of failures.</>
        ),
      },
    ],
  },
  {
    eyebrow: 'Pillar 03',
    title: 'Run anywhere',
    items: [
      {
        title: 'Pluggable sandboxes',
        snippet: 'sandbox: e2b',
        body: (
          <>Run agents in git worktrees, Docker, E2B, Modal, Blaxel, Cloudflare, Daytona, Runloop, or Vercel sandboxes. One protocol, your choice of isolation.</>
        ),
      },
      {
        title: 'Cloudflare cloud execution',
        snippet: 'sandbox: cloudflare',
        body: (
          <>Run agents on Cloudflare Workers with Durable Workflows, V8 sandbox isolation, R2 workspace sync, and Workers AI routing.</>
        ),
      },
      {
        title: 'Cloud artifact sinks',
        snippet: 'storage: s3 | gcs | r2',
        body: (
          <>Buffer <code>.sdd/</code> state and per-task artifacts into S3, GCS, Azure Blob, or Cloudflare R2. Same local-file interface, durable off-box persistence.</>
        ),
      },
      {
        title: 'A2A protocol',
        snippet: 'protocol: a2a',
        body: (
          <>Speak the Agent-to-Agent protocol natively. Publish an agent card, receive tasks, stream results &mdash; interoperate with any A2A-compliant system.</>
        ),
      },
      {
        title: 'Preview server',
        eyebrow: 'new in v1.9',
        snippet: 'bernstein preview start',
        body: (
          <>Sandboxed dev-server with a public tunnel link. Spin up the project&apos;s dev server inside the active worktree and get a shareable HTTPS URL — useful for review or webhook testing without a staging environment.</>
        ),
      },
    ],
  },
];

export function Features() {
  return (
    <section id="features">
      <ScrollReveal>
        <div className="section-header">
          <h2>Built for production use</h2>
          <p>Not a demo. A system you can run unsupervised.</p>
        </div>
      </ScrollReveal>
      {pillars.map((pillar, pIdx) => (
        <ScrollReveal key={pillar.title} delay={150 + pIdx * 80}>
          <section className="features-pillar" aria-labelledby={`pillar-${pIdx}`}>
            <header className="features-pillar-header">
              <span className="features-pillar-eyebrow">{pillar.eyebrow}</span>
              <h3 id={`pillar-${pIdx}`} className="features-pillar-title">{pillar.title}</h3>
            </header>
            <div className="features-pillar-grid">
              {pillar.items.map((item, i) => (
                <div
                  key={item.title}
                  className={`feature${i === 0 ? ' feature-lead' : ''}`}
                >
                  <code className="feature-snippet">{item.snippet}</code>
                  <h3>
                    {item.title}
                    {item.eyebrow && <span className="feature-eyebrow">{item.eyebrow}</span>}
                  </h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      ))}
    </section>
  );
}
