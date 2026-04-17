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
    .map((p) => `- [${p.fm.title}](${SITE_URL}/blog/${p.slug}): ${p.fm.description}`)
    .join('\n');

  return `# Bernstein

> Open-source multi-agent orchestration system for AI coding agents. Decomposes goals into parallel tasks, routes to optimal models, verifies via quality gates, merges results. 17 adapters, Cloudflare cloud execution, deterministic Python scheduling. Apache 2.0.

## Docs

- [Documentation](https://bernstein.readthedocs.io/): Full technical documentation
- [Architecture](https://bernstein.readthedocs.io/en/latest/ARCHITECTURE/): System architecture and design
- [Getting Started](https://bernstein.readthedocs.io/en/latest/GETTING_STARTED/): Installation and quickstart
- [Adapter Guide](https://bernstein.readthedocs.io/en/latest/ADAPTER_GUIDE/): Supported agents and how to add your own
- [API Reference](https://bernstein.readthedocs.io/en/latest/openapi-reference/): Task server REST API
- [Cloudflare Guide](https://bernstein.readthedocs.io/en/latest/cloudflare-overview/): Cloud execution on Cloudflare Workers
- [Configuration](https://bernstein.readthedocs.io/en/latest/CONFIG/): bernstein.yaml reference

## Resources

- [GitHub](https://github.com/chernistry/bernstein): Source code and issues
- [PyPI](https://pypi.org/project/bernstein/): Python package
- [npm](https://www.npmjs.com/package/bernstein-orchestrator): Node.js wrapper
- [Full Technical Reference](${SITE_URL}/llms-full.txt): Comprehensive 500+ line reference for LLMs
- [OpenAPI Spec](${SITE_URL}/openapi.yaml): REST API specification
- [RSS Feed](${SITE_URL}/rss.xml): Blog updates

${posts.length > 0 ? `## Blog\n\n${postList}` : ''}

## Optional

- [Changelog](https://bernstein.readthedocs.io/en/latest/CHANGELOG/): Version history
- [Contributing](https://bernstein.readthedocs.io/en/latest/CONTRIBUTING/): How to contribute
- [License](https://github.com/chernistry/bernstein/blob/main/LICENSE): Apache 2.0
`;
}
