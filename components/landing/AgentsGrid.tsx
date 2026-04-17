'use client';

import type { ReactNode } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

interface Agent {
  name: string;
  models: string;
  category: string;
  icon: ReactNode;
}

const agents: Agent[] = [
  {
    name: 'Claude Code', models: 'Opus 4.7, Sonnet 4.6, Haiku 4.5', category: 'CLI',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="6" r="2" /><path d="M10 8v4" /><path d="M7 16l3-4 3 4" /><path d="M6 12c-2 0-3-1-3-2" /><path d="M14 12c2 0 3-1 3-2" />
      </svg>
    ),
  },
  {
    name: 'Codex CLI', models: 'GPT-5 family', category: 'CLI',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10l4-4M4 10l4 4" /><path d="M11 14h5" />
      </svg>
    ),
  },
  {
    name: 'Gemini CLI', models: 'Gemini 2.5 Pro', category: 'CLI',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="10" r="5" /><circle cx="12" cy="10" r="5" />
      </svg>
    ),
  },
  {
    name: 'Cursor', models: 'Any model via Cursor', category: 'Editor',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 3l10 7-4 1-3 5z" />
      </svg>
    ),
  },
  {
    name: 'Aider', models: 'Any OpenAI/Anthropic', category: 'CLI',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l2 5h-3l1 5-5-6h3z" />
      </svg>
    ),
  },
  {
    name: 'Ollama', models: 'Local, fully offline', category: 'Local',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 17v-3c0-2 2-4 4-6 0 2 1 3 2 4s2 2 2 4v1" /><circle cx="10" cy="5" r="2" /><path d="M8 6c-1 1-3 1-3 3" />
      </svg>
    ),
  },
  {
    name: 'Amp', models: 'Sourcegraph Amp', category: 'CLI',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 2L7 11h6l-4 7" />
      </svg>
    ),
  },
  {
    name: 'Goose', models: 'Block Goose CLI', category: 'CLI',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 5c0-2 3-3 4-1s0 4-1 5c2 1 4 3 4 5v2H6v-2c0-2 1-3 2-4" /><circle cx="10" cy="5" r="1" />
      </svg>
    ),
  },
  {
    name: 'Kiro', models: 'AWS Kiro CLI', category: 'Editor',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h12c1 0 2 1 2 2v1c0 1-1 2-3 2H5c-2 0-3 1-3 2v1c0 1 1 2 2 2h12" />
      </svg>
    ),
  },
  {
    name: 'Qwen', models: 'Alibaba Qwen Agent', category: 'CLI',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2l2.5 5 5.5.8-4 3.9.9 5.3L10 14.5 5.1 17l.9-5.3-4-3.9L7.5 7z" />
      </svg>
    ),
  },
  {
    name: 'Cloudflare Agents', models: 'Workers, Workflows, DO', category: 'Cloud',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="7" /><path d="M2 10h16" /><path d="M10 3c2 2 3 4.5 3 7s-1 5-3 7" /><path d="M10 3c-2 2-3 4.5-3 7s1 5 3 7" />
      </svg>
    ),
  },
  {
    name: 'Cody', models: 'Sourcegraph Cody', category: 'Editor',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="7" /><path d="M7 9c0-1 1-2 3-2s3 1 3 2" /><circle cx="7.5" cy="8" r="1" /><circle cx="12.5" cy="8" r="1" />
      </svg>
    ),
  },
  {
    name: 'Continue', models: 'VS Code / JetBrains', category: 'Editor',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4v12l8-6z" /><path d="M14 4v12" />
      </svg>
    ),
  },
  {
    name: 'OpenCode', models: 'Any OpenAI-compatible', category: 'CLI',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="14" height="14" rx="2" /><path d="M7 8l3 3-3 3" /><path d="M11 14h3" />
      </svg>
    ),
  },
  {
    name: 'Kilo', models: 'Any OpenAI-compatible', category: 'CLI',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4v12" /><path d="M5 10l8-6v12z" />
      </svg>
    ),
  },
  {
    name: 'IaC', models: 'Terraform, Pulumi', category: 'Infra',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="10" width="4" height="7" /><rect x="8" y="5" width="4" height="12" /><rect x="13" y="8" width="4" height="9" />
      </svg>
    ),
  },
  {
    name: 'Generic', models: 'Any CLI agent', category: 'Adapter',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h12M4 13h12" /><circle cx="7" cy="7" r="1.5" /><circle cx="13" cy="13" r="1.5" />
      </svg>
    ),
  },
];

export function AgentsGrid() {
  return (
    <section id="agents" aria-labelledby="agents-heading">
      <ScrollReveal>
        <div className="section-header">
          <h2 id="agents-heading">Works with every major coding agent <span className="agent-count">17</span></h2>
          <p>Mix local models for boilerplate with cloud models for architecture. In the same run.</p>
        </div>
      </ScrollReveal>
      <div className="agents-grid">
        {agents.map((agent, i) => (
          <ScrollReveal key={agent.name} delay={200 + Math.min(i * 50, 600)}>
            <div className="agent-card">
              <span className="agent-icon">{agent.icon}</span>
              <div>
                <div className="agent-name">
                  {agent.name}
                  {agent.category && <span className="agent-badge">{agent.category}</span>}
                </div>
                <div className="agent-models">{agent.models}</div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal delay={800}>
        <div className="agents-more-wrap">
          <a href="https://bernstein.readthedocs.io/" className="agents-more">
            View all 17 adapters and configuration &rarr;
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
