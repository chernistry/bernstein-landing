import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
import { Stats } from '@/components/landing/Stats';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { EmailCapture } from '@/components/landing/EmailCapture';
import { AgentsGrid } from '@/components/landing/AgentsGrid';
import { Features } from '@/components/landing/Features';
import { Compare } from '@/components/landing/Compare';
import { FooterCTA } from '@/components/landing/FooterCTA';
import { Footer } from '@/components/landing/Footer';

const SOFTWARE_APP_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Bernstein',
  description:
    'Open-source multi-agent orchestration system for AI coding agents. Coordinates Claude Code, Codex, Gemini CLI, and 26 other agents to work in parallel using deterministic scheduling, git worktree isolation, and quality gates.',
  url: 'https://bernstein.run',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'Multi-Agent Orchestration',
  operatingSystem: 'macOS, Linux, Windows',
  programmingLanguage: 'Python',
  softwareRequirements: 'Python 3.12+',
  license: 'https://www.apache.org/licenses/LICENSE-2.0',
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  author: {
    '@type': 'Person',
    name: 'Alex Chernysh',
    url: 'https://alexchernysh.com',
  },
  codeRepository: 'https://github.com/chernistry/bernstein',
  downloadUrl: 'https://pypi.org/project/bernstein/',
  featureList: [
    'Deterministic scheduling',
    '29 agent adapters',
    'Git worktree isolation',
    'Quality gates',
    'Cost-aware routing',
    'MCP server mode',
    'A2A protocol support',
  ],
};

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Bernstein?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bernstein is an open-source multi-agent orchestration system that coordinates AI coding agents (like Claude Code, Codex, Gemini CLI) to work in parallel on your codebase. It decomposes goals into tasks, assigns them to agents with isolated git worktrees, and verifies results through quality gates before merging.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I install Bernstein?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Install Bernstein with pipx: 'pipx install bernstein'. You can also use pip or uv. Requires Python 3.12+ and at least one supported CLI coding agent.",
      },
    },
    {
      '@type': 'Question',
      name: 'What AI coding agents does Bernstein support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bernstein supports 29 agents including Claude Code, Codex CLI, Gemini CLI, Cursor, Aider, Amp, Roo Code, Kiro, Qwen, Goose, Ollama, and more. It also has a generic adapter for wrapping any CLI tool.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Bernstein differ from CrewAI or AutoGen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Bernstein's orchestrator is deterministic Python code \u2014 no LLM tokens are spent on coordination. It works with real CLI coding agents, provides git worktree isolation, runs quality gates on every result, and includes cost tracking. CrewAI and AutoGen use LLM-driven coordination and don't support CLI agents.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Bernstein free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Bernstein is open-source under the Apache 2.0 license. You only pay for the AI model API usage of the agents themselves.',
      },
    },
  ],
};

const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Bernstein',
  url: 'https://bernstein.run',
  logo: 'https://bernstein.run/favicon.svg',
  sameAs: [
    'https://github.com/chernistry/bernstein',
    'https://pypi.org/project/bernstein/',
  ],
};

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <HowItWorks />
        <EmailCapture />
        <AgentsGrid />
        <Features />
        <Compare />
      </main>
      <FooterCTA />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_APP_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
      />
    </>
  );
}
