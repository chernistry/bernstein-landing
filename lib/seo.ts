import { getAllPosts, type PostIndex, type FrontmatterT } from '@/lib/mdx';

export const SITE_URL = 'https://bernstein.run';
export const SITE_NAME = 'Bernstein';
export const AUTHOR = 'Alex Chernysh';

export function buildBlogPostJsonLd(slug: string, fm: FrontmatterT, readingMinutes: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: fm.title,
    description: fm.description,
    datePublished: fm.date,
    author: { '@type': 'Person', name: AUTHOR, url: 'https://alexchernysh.com' },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    url: `${SITE_URL}/blog/${slug}`,
    timeRequired: `PT${readingMinutes}M`,
    ...(fm.tags ? { keywords: fm.tags.join(', ') } : {}),
  };
}

export function buildBlogIndexJsonLd(posts: PostIndex[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    url: `${SITE_URL}/blog`,
    author: { '@type': 'Person', name: AUTHOR, url: 'https://alexchernysh.com' },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.fm.title,
      description: p.fm.description,
      datePublished: p.fm.date,
      url: `${SITE_URL}/blog/${p.slug}`,
    })),
  };
}

export async function buildLlmsTxt(): Promise<string> {
  const posts = await getAllPosts();
  const postList = posts
    .map((p) => `- [${p.fm.title}](${SITE_URL}/blog/${p.slug}) — ${p.fm.description}`)
    .join('\n');

  return `# Bernstein

> Orchestrate any AI coding agent. Any model. One command.

Bernstein is an open-source multi-agent orchestration system for AI coding agents. It takes a goal, decomposes it into tasks, assigns them to AI coding agents running in parallel, verifies output via quality gates, and merges results.

## Key Facts

- **Type**: Multi-agent orchestrator for CLI coding agents
- **License**: Apache 2.0
- **Language**: Python 3.12+
- **Install**: \`pipx install bernstein\`
- **Author**: ${AUTHOR}
- **Website**: ${SITE_URL}
- **GitHub**: https://github.com/chernistry/bernstein
- **PyPI**: https://pypi.org/project/bernstein/
- **Documentation**: https://bernstein.readthedocs.io/

## What It Does

1. Takes a goal in plain English
2. Decomposes it into tasks with roles, priorities, and dependencies
3. Spawns AI coding agents in isolated git worktrees
4. Routes tasks to the right model (Opus for architecture, Sonnet for implementation, Haiku for tests)
5. Runs quality gates (lint, type check, tests, security scan) on every result
6. Merges verified work, retries failures with escalated models

## Supported Agents (29 adapters)

Claude Code, Codex CLI, Gemini CLI, Cursor, Aider, Amp, Roo Code, Kiro, Qwen, Goose, Ollama, Cody, Continue, OpenCode, Tabby, Kilo, IaC, and more via a generic CLI adapter.

${posts.length > 0 ? `## Blog Posts\n\n${postList}` : ''}

## Links

- Documentation: https://bernstein.readthedocs.io/
- GitHub Issues: https://github.com/chernistry/bernstein/issues
- PyPI: https://pypi.org/project/bernstein/
`;
}
