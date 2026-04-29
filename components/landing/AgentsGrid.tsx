'use client';

import { useMemo, useState } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

interface Agent {
  name: string;
  models: string;
  category: 'CLI' | 'SDK' | 'Editor' | 'Cloud' | 'Local' | 'Infra' | 'Adapter' | 'Orchestrator';
  monogram: string;
  hue: number | null; // null = muted, no hue
}

const agents: Agent[] = [
  { name: 'Claude Code', models: 'Anthropic · Opus 4, Sonnet 4.6, Haiku 4.5', category: 'CLI', monogram: 'CC', hue: 30 },
  { name: 'Codex CLI', models: 'OpenAI · GPT-5, GPT-5 mini', category: 'CLI', monogram: 'CX', hue: 155 },
  { name: 'Gemini CLI', models: 'Google · Gemini 2.5 Pro, Flash', category: 'CLI', monogram: 'GM', hue: 270 },
  { name: 'OpenAI Agents SDK', models: 'OpenAI · GPT-5, GPT-4.1 (Responses API)', category: 'SDK', monogram: 'OA', hue: 155 },
  { name: 'Cursor', models: 'Cursor · Sonnet 4.6, Opus 4, GPT-5', category: 'Editor', monogram: 'Cu', hue: 80 },
  { name: 'Aider', models: 'Anthropic / OpenAI · any chat model', category: 'CLI', monogram: 'Ai', hue: 200 },
  { name: 'Ollama', models: 'Local · offline, any model', category: 'Local', monogram: 'Ol', hue: 260 },
  { name: 'Amp', models: 'Sourcegraph · Sonnet, GPT-5', category: 'CLI', monogram: 'Am', hue: 200 },
  { name: 'Goose', models: 'Block · Sonnet, GPT-5, local', category: 'CLI', monogram: 'Go', hue: 30 },
  { name: 'Kiro', models: 'AWS · Bedrock, Sonnet, Haiku', category: 'Editor', monogram: 'Ki', hue: 60 },
  { name: 'Qwen', models: 'Alibaba · Qwen3 Coder, Max', category: 'CLI', monogram: 'Qw', hue: 0 },
  { name: 'Cloudflare Agents', models: 'Cloudflare · Workers AI, DO, R2', category: 'Cloud', monogram: 'Cf', hue: 30 },
  { name: 'Cody', models: 'Sourcegraph · Sonnet, GPT-5', category: 'Editor', monogram: 'Cd', hue: 220 },
  { name: 'Continue', models: 'VS Code · any OpenAI-compatible', category: 'Editor', monogram: 'Co', hue: 180 },
  { name: 'OpenCode', models: 'OSS · any OpenAI-compatible', category: 'CLI', monogram: 'Oc', hue: 140 },
  { name: 'Kilo', models: 'OSS · any OpenAI-compatible', category: 'CLI', monogram: 'Kl', hue: 20 },
  { name: 'IaC', models: 'Platform · Terraform, Pulumi', category: 'Infra', monogram: 'IaC', hue: 200 },
  { name: 'GitHub Copilot', models: 'GitHub · GPT-5, Sonnet', category: 'CLI', monogram: 'Gh', hue: 280 },
  { name: 'Droid', models: 'Factory AI · Sonnet, GPT-5', category: 'CLI', monogram: 'Dr', hue: 45 },
  { name: 'Crush', models: 'Charm · Sonnet, GPT-5, OpenRouter', category: 'CLI', monogram: 'Ch', hue: 340 },
  { name: 'Auggie', models: 'Augment Code · any model', category: 'CLI', monogram: 'Ag', hue: 100 },
  { name: 'Kimi', models: 'Moonshot · Kimi K2, K1.5', category: 'CLI', monogram: 'Km', hue: 240 },
  { name: 'Rovo Dev', models: 'Atlassian · Sonnet, GPT-5', category: 'CLI', monogram: 'Rv', hue: 210 },
  { name: 'Cline', models: 'Anthropic / OpenAI / OpenRouter', category: 'CLI', monogram: 'Cl', hue: 190 },
  { name: 'Codebuff', models: 'Anthropic / OpenAI', category: 'CLI', monogram: 'Cb', hue: 130 },
  { name: 'Pi', models: 'Anthropic / OpenAI / OpenRouter', category: 'CLI', monogram: 'Pi', hue: 15 },
  { name: 'Mistral Vibe', models: 'Mistral · Codestral, Large', category: 'CLI', monogram: 'Mi', hue: 340 },
  { name: 'Autohand', models: 'Anthropic / OpenAI', category: 'CLI', monogram: 'Ah', hue: 170 },
  { name: 'Forge', models: 'forgecode · any model', category: 'CLI', monogram: 'Fg', hue: 55 },
  { name: 'Hermes', models: 'Nous Research · Anthropic / OpenAI', category: 'CLI', monogram: 'He', hue: 295 },
  { name: 'OpenHands', models: 'Any LiteLLM-supported · autonomous loop', category: 'CLI', monogram: 'OH', hue: 25 },
  { name: 'Open Interpreter', models: 'Any · local code execution', category: 'CLI', monogram: 'OI', hue: 165 },
  { name: 'gptme', models: 'Anthropic / OpenAI / OpenRouter', category: 'CLI', monogram: 'gm', hue: 115 },
  { name: 'Plandex', models: 'Plandex Cloud or self-hosted', category: 'CLI', monogram: 'Pl', hue: 250 },
  { name: 'AIChat', models: 'OpenAI / Anthropic / Groq / Gemini', category: 'CLI', monogram: 'Ac', hue: 75 },
  { name: 'Letta Code', models: 'Letta-routed · cross-task memory', category: 'CLI', monogram: 'Lc', hue: 320 },
  { name: 'Generic', models: 'Any OpenAI-compatible', category: 'Adapter', monogram: '·', hue: null },
  { name: 'Composio', models: '@aoagents/ao · wrapped as a single agent', category: 'Orchestrator', monogram: 'Co', hue: 305 },
  { name: 'Ralphex', models: 'umputun/ralphex · wrapped as a single agent', category: 'Orchestrator', monogram: 'Rx', hue: 5 },
];

const CATEGORY_ORDER: Agent['category'][] = [
  'CLI',
  'SDK',
  'Editor',
  'Cloud',
  'Local',
  'Infra',
  'Adapter',
  'Orchestrator',
];

function monogramStyle(hue: number | null): React.CSSProperties {
  if (hue === null) {
    return {
      background: 'color-mix(in oklch, var(--text-muted) 20%, var(--surface))',
      color: 'var(--text-muted)',
    };
  }
  return {
    background: `color-mix(in oklch, oklch(0.7 0.12 ${hue}) 30%, var(--surface))`,
    color: `oklch(0.82 0.14 ${hue})`,
  };
}

export function AgentsGrid() {
  const [filter, setFilter] = useState<string>('all');

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: agents.length };
    for (const cat of CATEGORY_ORDER) c[cat.toLowerCase()] = 0;
    for (const a of agents) c[a.category.toLowerCase()] += 1;
    return c;
  }, []);

  const visibleAgents = useMemo(
    () => (filter === 'all' ? agents : agents.filter((a) => a.category.toLowerCase() === filter)),
    [filter],
  );

  const chips: { key: string; label: string }[] = [
    { key: 'all', label: 'All' },
    ...CATEGORY_ORDER.filter((c) => counts[c.toLowerCase()] > 0).map((c) => ({
      key: c.toLowerCase(),
      label: c,
    })),
  ];

  return (
    <section id="agents" aria-labelledby="agents-heading">
      <ScrollReveal>
        <div className="section-header">
          <h2 id="agents-heading">
            Works with every major coding agent <span className="agent-count">37</span>
          </h2>
          <p>
            Mix local models for boilerplate with cloud models for architecture. In the same run. Plus 2 leaf-node delegation adapters that wrap competing CLI orchestrators —{' '}
            <a href="/blog/orchestrate-the-orchestrators">we orchestrate them too</a>.
          </p>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <div className="agent-filters" role="group" aria-label="Filter agents by category">
          {chips.map((chip) => {
            const active = filter === chip.key;
            return (
              <button
                key={chip.key}
                type="button"
                className={`agent-chip${active ? ' agent-chip-active' : ''}`}
                aria-pressed={active}
                onClick={() => setFilter(chip.key)}
              >
                {chip.label} <span className="agent-chip-count">&middot; {counts[chip.key] ?? 0}</span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>
      <ScrollReveal delay={180}>
        <div className="agents-grid">
          {visibleAgents.map((agent, i) => (
            <div
              key={agent.name}
              className="agent-card agent-card-staggered"
              style={{ animationDelay: `${Math.min(i * 10, 300)}ms` }}
            >
              <span className="agent-monogram" style={monogramStyle(agent.hue)} aria-hidden="true">
                {agent.monogram}
              </span>
              <div>
                <div className="agent-name">
                  {agent.name}
                  {agent.category && <span className="agent-badge">{agent.category}</span>}
                </div>
                <div className="agent-models">{agent.models}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal delay={260}>
        <div className="agents-more-wrap">
          <a href="https://bernstein.readthedocs.io/" className="agents-more">
            View all 37 adapters and configuration &rarr;
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
