import type { Metadata, Viewport } from 'next';
import { inter, jetbrainsMono } from '@/lib/fonts';
import '@/styles/globals.css';
import '@/styles/ux-nav-hero.css';
import '@/styles/ux-stats-how-email.css';
import '@/styles/ux-agents-features-compare.css';
import '@/styles/ux-faq-footer.css';
import '@/styles/ux-blog.css';

const SITE_URL = 'https://bernstein.run';

export const viewport: Viewport = {
  themeColor: '#131316',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bernstein: Multi-Agent Orchestration for CLI Coding Agents',
    template: '%s | Bernstein',
  },
  description:
    'Open-source orchestrator for parallel AI coding agents. Run Claude Code, Codex, Gemini CLI simultaneously. Deterministic scheduling, quality gates, cost tracking. 11k+ monthly downloads, 37 adapters.',
  keywords: [
    'multi-agent orchestration',
    'AI coding agents',
    'Claude Code orchestrator',
    'OpenAI Agents SDK orchestrator',
    'parallel AI agents',
    'deterministic scheduling',
    'A2A protocol',
    'MCP server',
    'Alex Chernysh',
  ],
  authors: [{ name: 'Alex Chernysh', url: 'https://alexchernysh.com' }],
  creator: 'Alex Chernysh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Bernstein',
    title: 'Bernstein: Multi-Agent Orchestration for CLI Coding Agents',
    description:
      'Run multiple AI coding agents in parallel on your codebase. Deterministic scheduling. Quality gates. 37 adapters. One command.',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Bernstein: Multi-Agent Orchestration for CLI Coding Agents' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bernstein: Multi-Agent Orchestration for CLI Coding Agents',
    description:
      'Run multiple AI coding agents in parallel on your codebase. Deterministic scheduling. Quality gates. 37 adapters. One command.',
    images: ['/api/og'],
  },
  icons: { icon: '/favicon.svg' },
  manifest: '/manifest.json',
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': '/rss.xml',
      'text/markdown': '/llms.txt',
    },
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#131316',
    'format-detection': 'telephone=no',
    'ai-content': 'https://bernstein.run/llms.txt',
    'ai-content-full': 'https://bernstein.run/llms-full.txt',
    'agent-card': 'https://bernstein.run/.well-known/agent-card.json',
    'mcp-server': 'https://bernstein.run/.well-known/mcp/server-card.json',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://app.kit.com" />
        <link rel="preconnect" href="https://app.kit.com" crossOrigin="anonymous" />
        {/* AIO: extended LLM reference alongside the primary llms.txt alternate */}
        <link
          rel="alternate"
          type="text/markdown"
          href="/llms-full.txt"
          title="Bernstein — full technical reference for LLMs"
        />
        {/* Author identity — signals crawler/LLM graph connections */}
        <link rel="author" href="https://alexchernysh.com" />
        <link rel="me" href="https://alexchernysh.com" />
        <link rel="me" href="https://github.com/chernistry" />
      </head>
      <body>{children}</body>
    </html>
  );
}
