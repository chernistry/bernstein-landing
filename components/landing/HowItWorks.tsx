'use client';

import { ScrollReveal } from '@/components/ScrollReveal';

export function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Set a goal',
      desc: 'Describe what you want built. Bernstein decomposes it into tasks with the right roles, models, and dependencies.',
    },
    {
      num: '02',
      title: 'Agents work in parallel',
      desc: 'Each agent gets its own git worktree. Opus for architecture, Sonnet for implementation, Haiku for tests. Automatically routed.',
    },
    {
      num: '03',
      title: 'Verified and merged',
      desc: 'Quality gates run lint, types, and tests on every result. Only verified work gets merged. Failed tasks retry with escalated models.',
    },
  ];

  return (
    <section id="how">
      <ScrollReveal>
        <div className="section-header">
          <h2>How it works</h2>
          <p>Three steps. No babysitting.</p>
        </div>
      </ScrollReveal>
      <div className="steps">
        {steps.map((step, i) => (
          <ScrollReveal key={step.num} delay={200 + i * 100}>
            <div className="step">
              <div className="step-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
