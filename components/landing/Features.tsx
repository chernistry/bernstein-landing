'use client';

import { ScrollReveal } from '@/components/ScrollReveal';

export function Features() {
  return (
    <section id="features">
      <ScrollReveal>
        <div className="section-header">
          <h2>Built for production use</h2>
          <p>Not a demo. A system you can run unsupervised.</p>
        </div>
      </ScrollReveal>
      <div className="features-grid">
        <ScrollReveal delay={200}>
          <div className="feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <h3>Deterministic scheduling</h3>
            <p>The orchestrator is pure Python. Zero LLM tokens on coordination. Predictable, debuggable, fast.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={280}>
          <div className="feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24"><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/></svg>
            </div>
            <h3>21 agent adapters</h3>
            <p>Claude Code, Codex, Gemini CLI, Aider, Cloudflare Agents, and 16 more. Mix models in one run. Switch providers without changing config.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={360}>
          <div className="feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3>Quality gates</h3>
            <p>Lint, type check, tests, security scan, architecture conformance. All run before merge. Failed work retries automatically.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={440}>
          <div className="feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            </div>
            <h3>Cost-aware routing</h3>
            <p>Epsilon-greedy bandit learns which model works best per task type. Typical savings of 50-60% vs uniform model selection.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={520}>
          <div className="feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24"><path d="M6 3v12"/><path d="M18 9a3 3 0 100-6 3 3 0 000 6z"/><path d="M6 21a3 3 0 100-6 3 3 0 000 6z"/><path d="M18 9c-3 0-6 1-6 5v1"/></svg>
            </div>
            <h3>Git worktree isolation</h3>
            <p>Each agent works in its own worktree. No merge conflicts between agents. Clean, linear commit history.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={600}>
          <div className="feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M18 9l-5 5-2-2-4 4"/></svg>
            </div>
            <h3>Full observability</h3>
            <p>Per-agent cost tracking, token monitoring, quality trends, Prometheus metrics. Know what happened and what it cost.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={680}>
          <div className="feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>
            </div>
            <h3>Cloudflare cloud execution</h3>
            <p>Run agents on Cloudflare Workers with Durable Workflows, V8 sandbox isolation, R2 workspace sync, and Workers AI routing.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={760}>
          <div className="feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>
            </div>
            <h3>MCP remote transport</h3>
            <p>Expose Bernstein as an MCP server over HTTP. Connect from any MCP client, run orchestration remotely.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
