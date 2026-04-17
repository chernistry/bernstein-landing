import type { Metadata, Viewport } from 'next';
import { inter, jetbrainsMono } from '@/lib/fonts';
import '@/styles/globals.css';

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
    'Open-source orchestrator for parallel AI coding agents. Run Claude Code, Codex, Gemini CLI simultaneously. Deterministic scheduling, quality gates, cost tracking. 9,000+ monthly downloads.',
  keywords: [
    'multi-agent orchestration',
    'AI coding agents',
    'Claude Code orchestrator',
    'parallel AI agents',
    'deterministic scheduling',
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
      'Run multiple AI coding agents in parallel on your codebase. Deterministic scheduling. Quality gates. 17 adapters. One command.',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Bernstein: Multi-Agent Orchestration for CLI Coding Agents' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bernstein: Multi-Agent Orchestration for CLI Coding Agents',
    description:
      'Run multiple AI coding agents in parallel on your codebase. Deterministic scheduling. Quality gates. 17 adapters. One command.',
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
      </head>
      <body>{children}</body>
    </html>
  );
}
