import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
import { Stats } from '@/components/landing/Stats';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { EmailCapture } from '@/components/landing/EmailCapture';
import { AgentsGrid } from '@/components/landing/AgentsGrid';
import { Features } from '@/components/landing/Features';
import { Compare } from '@/components/landing/Compare';
import { FAQ } from '@/components/landing/FAQ';
import { FooterCTA } from '@/components/landing/FooterCTA';
import { Footer } from '@/components/landing/Footer';
import { BackToTop } from '@/components/landing/BackToTop';

const SOFTWARE_APP_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Bernstein',
  description:
    'Open-source multi-agent orchestration system for AI coding agents. Coordinates Claude Code, Codex, Gemini CLI, and 14 other agents to work in parallel using deterministic scheduling, git worktree isolation, and quality gates.',
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
    '17 agent adapters',
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
        text: 'Install with pipx install bernstein (recommended), or use pip install bernstein or uv pip install bernstein. Homebrew support is coming soon. Requires Python 3.12+ and at least one supported CLI coding agent installed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What AI coding agents does Bernstein support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bernstein ships 17 adapters: Claude Code, Codex CLI, Gemini CLI, Cursor, Aider, Amp, Kiro, Kilo, Qwen, Goose, Cody, Continue, OpenCode, Ollama, Cloudflare Agents, IaC, and a Generic adapter that wraps any CLI tool.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Bernstein differ from CrewAI or AutoGen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Bernstein\u2019s orchestrator is deterministic Python code \u2014 zero LLM tokens spent on coordination. It works with real CLI coding agents (not toy wrappers), provides git worktree isolation per agent, runs quality gates on every output, tracks costs, and uses an epsilon-greedy bandit to route tasks to the best model. CrewAI and AutoGen use LLM-driven coordination and don\u2019t support CLI agents.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can Bernstein run agents in the cloud?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Bernstein includes a Cloudflare Workers integration with Durable Workflows for long-running orchestration, V8 isolate sandboxes for agent execution, R2 storage for artifacts, and KV for state. You can also run it on any server with SSH access.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Bernstein free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Bernstein is open-source under the Apache 2.0 license. You only pay for the AI model API usage of the agents themselves (e.g. your Anthropic or OpenAI API key).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Bernstein task server API?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bernstein runs a local REST API on port 8052. Endpoints include POST /tasks (create), GET /tasks?status=open (list), POST /tasks/{id}/complete, POST /tasks/{id}/fail, POST /bulletin (cross-agent findings), and GET /status (dashboard). Agents use this API to coordinate without direct communication.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Bernstein support MCP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Bernstein exposes an MCP (Model Context Protocol) server that lets any MCP-compatible client control orchestration \u2014 create tasks, check status, approve merges, and monitor costs through standard MCP tool calls.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does quality verification work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quality gates run automatically on every agent output before merge. They execute lint (Ruff), type checking (Pyright), tests (pytest), and security scans. A cross-model verifier can optionally have a second model review the diff. Only outputs that pass all gates get merged to the target branch.',
      },
    },
    {
      '@type': 'Question',
      name: 'What models does Bernstein use for task routing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bernstein routes tasks to the optimal model based on complexity: Opus for architecture and hard problems, Sonnet for standard implementation, Haiku for tests and boilerplate. An epsilon-greedy contextual bandit learns which model performs best for each task type over time.',
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

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Bernstein',
  url: 'https://bernstein.run',
  description: 'Open-source multi-agent orchestration for CLI coding agents',
  publisher: { '@type': 'Organization', name: 'Bernstein' },
};

const SITELINKS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'SiteNavigationElement',
      position: 1,
      name: 'Blog',
      description: 'Engineering deep-dives, tutorials, and project updates',
      url: 'https://bernstein.run/blog',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 2,
      name: 'Documentation',
      description: 'Installation, configuration, adapter guide, and API reference',
      url: 'https://bernstein.readthedocs.io/',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 3,
      name: 'Getting Started',
      description: 'Your first multi-agent run in 5 minutes',
      url: 'https://bernstein.run/blog/getting-started',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 4,
      name: 'GitHub',
      description: 'Source code, issues, and community contributions',
      url: 'https://github.com/chernistry/bernstein',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 5,
      name: 'PyPI',
      description: 'Python package — install with pipx install bernstein',
      url: 'https://pypi.org/project/bernstein/',
    },
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
        <FAQ />
      </main>
      <FooterCTA />
      <Footer />
      <BackToTop />
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SITELINKS_JSON_LD) }}
      />
    </>
  );
}
