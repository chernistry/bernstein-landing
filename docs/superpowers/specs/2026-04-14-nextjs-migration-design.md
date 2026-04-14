# bernstein.run: Next.js Migration + Blog Engine

## Context

bernstein.run is currently a single `index.html` served by nginx:alpine in Docker on an OVH VPS (135.125.243.120). Caddy reverse-proxies HTTPS traffic to the container. The site has 98 SEO/AIO optimizations (llms.txt, structured data, ai.txt, etc.) and a Kit email capture form.

The site needs a blog for Community Spotlight posts and technical content. A static HTML approach doesn't scale. The homepage at alexchernysh.com already runs a proven Next.js 14 + MDX blog engine on the same VPS.

## Decision: Next.js 14 App Router, Standalone Docker

Same stack as homepage. SSR enables dynamic sitemap/robots, OG image generation, and future API routes (Kit webhooks, analytics). The 4-stage Docker build produces a ~200MB image. Caddy proxies to port 3000 instead of 80.

## File Structure

```
bernstein_landing/
├── app/
│   ├── layout.tsx              # root layout, fonts, global metadata, JSON-LD
│   ├── page.tsx                # landing page (ported from index.html)
│   ├── not-found.tsx           # 404 page
│   ├── robots.ts               # dynamic robots.txt
│   ├── sitemap.ts              # dynamic sitemap (includes blog posts)
│   ├── blog/
│   │   ├── page.tsx            # blog index
│   │   └── [slug]/
│   │       └── page.tsx        # individual blog post
│   ├── llms.txt/route.ts       # dynamic llms.txt
│   ├── llms-full.txt/route.ts  # dynamic llms-full.txt
│   ├── ai.txt/route.ts         # dynamic ai.txt
│   └── api/
│       └── og/route.tsx        # dynamic OG image generation (Satori)
├── content/
│   └── blog/                   # MDX posts: <slug>/index.mdx
│       └── community-spotlight-april-2026/
│           └── index.mdx       # first post
├── components/
│   ├── landing/                # LandingHero, HowItWorks, AgentsGrid, Features, Compare, EmailCapture, CTA
│   └── blog/                   # Callout, Figure, Lead, CodeBlock, SmartLink, InlineCode, TocSidebar
├── lib/
│   ├── mdx.ts                  # blog engine (from homepage, stripped: no i18n, no research sections)
│   ├── blog-headings.ts        # TOC extraction (verbatim from homepage)
│   ├── seo.ts                  # bernstein-specific SEO (JSON-LD, OG, Twitter, llms.txt generation)
│   └── fonts.ts                # Inter + JetBrains Mono via next/font
├── styles/
│   └── globals.css             # Tailwind + OKLCH custom properties from current design
├── public/
│   ├── favicon.svg
│   ├── manifest.json
│   ├── structured-data.json
│   └── .well-known/
│       ├── security.txt
│       └── ai-plugin.json
├── Dockerfile                  # 4-stage standalone (node:20-alpine)
├── docker-compose.yml
├── next.config.mjs
├── next-sitemap.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .github/workflows/deploy-vps.yml  # updated for Next.js build
```

## Blog Engine

Ported from homepage (`lib/mdx.ts`), stripped to essentials:

- **Frontmatter**: `title`, `description`, `date`, `tags[]`, `draft?`, `hero?` (validated with Zod)
- **MDX pipeline**: `gray-matter` + `next-mdx-remote/rsc` + `rehype-pretty-code` + `remark-gfm`
- **No i18n**: single `index.mdx` per slug, no locale resolution
- **No math**: no `remark-math`/`rehype-katex` (add later if needed)
- **No mermaid**: no client-side diagram rendering (add later if needed)
- **TOC**: `blog-headings.ts` copied verbatim, drives sticky sidebar on desktop
- **Reading time**: `reading-time` package
- **MDX components**: `Callout`, `Figure`, `Lead`, `KeyPoints`, `SectionBreak`, `a` (SmartLink), `code` (InlineCode), `h2`/`h3` (anchored), `pre` (copy button), `img`

## Landing Page

Current `index.html` decomposed into React components:

| Component | Content |
|-----------|---------|
| `LandingHero` | h1, subtitle, CTA buttons, terminal demo |
| `HowItWorks` | 3-step flow cards |
| `EmailCapture` | Kit form with async fetch submit |
| `AgentsGrid` | 18 agent cards |
| `Features` | 6 feature cards |
| `Compare` | comparison table |
| `FooterCTA` | final CTA + footer |
| `Nav` | glassmorphism nav with scroll links |

Design tokens (OKLCH) preserved exactly from current CSS. Tailwind configured with custom properties.

## SEO/AIO (all 98 optimizations preserved + enhanced)

**Dynamic routes replace static files:**
- `robots.ts` — Next.js native, auto-includes sitemap URL
- `sitemap.ts` — auto-includes all blog posts with lastmod
- `llms.txt/route.ts` — regenerated on every request, includes blog post list
- `llms-full.txt/route.ts` — full content including blog excerpts
- `ai.txt/route.ts` — AI agent discovery

**Preserved as static:**
- `.well-known/security.txt`, `.well-known/ai-plugin.json`
- `manifest.json`, `favicon.svg`, `structured-data.json`

**Enhanced:**
- Per-blog-post JSON-LD (`TechArticle` schema)
- Per-blog-post OG images (generated via Satori at `/api/og?title=...`)
- Blog index JSON-LD (`Blog` schema with `BlogPosting` items)
- RSS feed at `/rss.xml` (generated at build time)
- `humans.txt` served via route handler

**Headers (via next.config.mjs):**
- CSP, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- Referrer-Policy, Permissions-Policy
- X-Robots-Tag, canonical Link

## Deployment

**Container change:** `nginx:alpine` (port 80) → `node:20-alpine` standalone (port 3000)

**Caddy update:** change `reverse_proxy bernstein-landing:80` to `reverse_proxy bernstein-landing:3000`

**docker-compose.yml:** update to build Next.js Dockerfile, expose port 3000, same `deploy_homepage` network

**CI/CD:** same GitHub Actions workflow (SSH → git pull → docker compose up), no changes needed except the Dockerfile handles the build

**Health check:** `wget -q --spider http://127.0.0.1:3000/` in Dockerfile

## Email Capture

Kit form stays as-is:
- Async fetch POST to `https://app.kit.com/forms/9325480/subscriptions`
- Inline success state ("You're in")
- Sending domain verified: `bernstein.run` (DKIM + SPF + DMARC via Cloudflare DNS)

## First Blog Post

`content/blog/community-spotlight-april-2026/index.mdx` — template Community Spotlight post to validate the engine works end-to-end.

## Out of Scope

- i18n / multi-locale
- Math rendering (KaTeX)
- Mermaid diagrams
- Comments system
- Analytics dashboard
- CMS / admin panel
