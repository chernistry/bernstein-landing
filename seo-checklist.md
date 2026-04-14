# SEO, AIO, and AEO Optimization Checklist for bernstein.run

All optimizations applied to the landing page as of 2026-04-14.

---

## Technical SEO (30 items)

- [x] **Canonical URL**: `<link rel="canonical" href="https://bernstein.run">` in HTML + `Link` header in nginx
- [x] **Meta title**: "Bernstein --- Orchestrate Parallel AI Coding Agents" (50 chars)
- [x] **Meta description**: 155 chars, keyword-rich, action-oriented
- [x] **Open Graph: og:title**: Matches page title
- [x] **Open Graph: og:description**: Concise value proposition
- [x] **Open Graph: og:url**: https://bernstein.run
- [x] **Open Graph: og:type**: website
- [x] **Open Graph: og:site_name**: Bernstein
- [x] **Open Graph: og:image**: OG image reference
- [x] **Twitter Card: twitter:card**: summary_large_image
- [x] **Twitter Card: twitter:title**: Present
- [x] **Twitter Card: twitter:description**: Present
- [x] **Twitter Card: twitter:image**: Present
- [x] **robots.txt**: Allows all crawlers, includes Sitemap directive
- [x] **sitemap.xml**: Standard sitemap with lastmod, changefreq, priority
- [x] **Favicon**: SVG favicon (scales to any size), linked in HTML
- [x] **Web App Manifest**: manifest.json with name, icons, theme_color
- [x] **Language declaration**: `<html lang="en">`
- [x] **Charset**: `<meta charset="utf-8">`
- [x] **Viewport meta**: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [x] **Mobile-responsive**: CSS uses clamp(), media queries, flexible grids
- [x] **Semantic HTML5**: Uses header, main, section, nav, footer elements
- [x] **Heading hierarchy**: Single h1, proper h2/h3 nesting
- [x] **Clean URL structure**: Single-page at root, no query params
- [x] **Gzip compression**: Enabled in nginx for text, JSON, SVG, XML, JS, CSS
- [x] **Cache headers**: 30d for static assets, 24h for text/JSON, 1h for HTML
- [x] **Proper MIME types**: All files served with correct Content-Type
- [x] **Keywords meta**: Relevant keywords for search discovery
- [x] **Custom 404 page**: Branded 404.html with link back to home
- [x] **No broken links**: All internal and external links verified

## Security Headers (7 items)

- [x] **X-Frame-Options**: SAMEORIGIN
- [x] **X-Content-Type-Options**: nosniff
- [x] **X-XSS-Protection**: 1; mode=block
- [x] **Referrer-Policy**: strict-origin-when-cross-origin
- [x] **Permissions-Policy**: camera, microphone, geolocation, payment disabled
- [x] **Content-Security-Policy**: Restrictive CSP allowing only necessary sources
- [x] **HSTS**: Handled at Cloudflare layer (not in nginx since TLS terminates upstream)

## Structured Data / Schema.org (8 items)

- [x] **SoftwareApplication**: Full schema with name, description, category, OS, pricing, features
- [x] **FAQPage**: 8 questions with answers in JSON-LD
- [x] **Organization**: Publisher entity with logo, sameAs links
- [x] **WebSite**: Site-level schema
- [x] **BreadcrumbList**: Navigation breadcrumbs
- [x] **Person (author)**: Author entity linked to SoftwareApplication
- [x] **Offer**: Free pricing with availability
- [x] **Inline JSON-LD in HTML**: SoftwareApplication embedded in page `<script type="application/ld+json">`

## SEO Headers via nginx (3 items)

- [x] **X-Robots-Tag**: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`
- [x] **Link rel=canonical**: HTTP header `Link: <https://bernstein.run/>; rel="canonical"`
- [x] **Vary: Accept-Encoding**: Via gzip_vary

---

## AI / LLM Optimization (AIO) (12 items)

- [x] **llms.txt**: Concise product summary optimized for LLM consumption (emerging standard)
- [x] **llms-full.txt**: Comprehensive technical reference (~500 lines) covering architecture, CLI, API, configuration, FAQ
- [x] **ai.txt**: AI crawler information file with metadata, permissions, key facts
- [x] **ai-plugin.json**: OpenAI plugin manifest format in .well-known/
- [x] **Clear factual content**: No marketing fluff --- direct, engineer-to-engineer language
- [x] **Entity-rich descriptions**: Named entities (Claude Code, Codex, Gemini CLI, etc.) throughout
- [x] **Comparison table**: Bernstein vs CrewAI vs AutoGen vs LangGraph --- great for AI citation
- [x] **Install instructions**: Actionable `pipx install bernstein` with multiple alternatives
- [x] **Version information**: Software version in structured data
- [x] **Date information**: Last updated dates in sitemap, humans.txt, structured data
- [x] **Author attribution**: Alex Chernysh linked throughout with personal URL
- [x] **License information**: Apache 2.0 mentioned in HTML, structured data, llms.txt, ai.txt

---

## Answer Engine Optimization (AEO) (14 items)

- [x] **FAQ structured data**: 8 Q&A pairs in JSON-LD FAQPage schema
- [x] **Direct answer paragraphs**: Hero section and feature descriptions written as direct answers
- [x] **Numbered steps**: "How it works" section with 3 clear numbered steps
- [x] **Comparison data**: Feature comparison table (4 products, 6 features)
- [x] **Statistics and numbers**: 110+ stars, 7.7K downloads, 29 adapters, 2,600+ tests
- [x] **Code examples**: Install commands, CLI usage examples
- [x] **Definition-style content**: "Bernstein is an open-source multi-agent orchestration system..."
- [x] **Action-oriented content**: "Start orchestrating in 30 seconds" with immediate steps
- [x] **Feature list**: Enumerated features with concise descriptions
- [x] **Supported agents list**: Complete list of 29 adapters with model information
- [x] **Pricing clarity**: "Free / Open Source / Apache 2.0" --- clear for featured snippets
- [x] **How-to content**: Installation + usage flow for how-to rich results
- [x] **What-is content**: Clear definitional opening for answer boxes
- [x] **vs-comparison content**: Direct comparison framing for "[X] vs [Y]" queries

---

## Discoverability Files (7 items)

- [x] **robots.txt**: Explicit Allow for 14+ AI bot user agents
- [x] **sitemap.xml**: Standard XML sitemap
- [x] **security.txt**: .well-known/security.txt with contact, expiry, policy
- [x] **humans.txt**: Credits file with team, site, software info
- [x] **manifest.json**: Web App Manifest for PWA behavior
- [x] **favicon.svg**: Scalable vector favicon (conductor's baton)
- [x] **og-image.html**: Screenshot-ready OG image template (1200x630)

---

## Content Quality (8 items)

- [x] **No marketing-speak**: Written like a senior engineer, not a marketing page
- [x] **Scannable structure**: Short paragraphs, bullet points, tables
- [x] **Above-the-fold value**: Install command visible without scrolling
- [x] **Social proof**: Star count, download count, test count
- [x] **Clear CTA**: "View on GitHub" primary, "Documentation" secondary
- [x] **Newsletter signup**: Buttondown integration for email capture
- [x] **External links**: GitHub, PyPI, docs, author site
- [x] **Internal anchor links**: Nav links to sections (#how, #features, #compare)

---

## Performance (5 items)

- [x] **No external CSS/JS**: All styles inline, zero render-blocking resources
- [x] **No web fonts**: System font stack (-apple-system, etc.)
- [x] **Minimal DOM**: Single-page, ~400 lines HTML
- [x] **SVG favicon**: No raster image optimization needed
- [x] **Gzip on all text**: nginx compresses HTML, CSS, JS, JSON, XML, SVG

---

## Accessibility (4 items)

- [x] **Semantic HTML**: Proper element usage (nav, main, section, footer)
- [x] **Color contrast**: Light text on dark background (>7:1 ratio)
- [x] **Responsive design**: Works on mobile, tablet, desktop
- [x] **Form labels**: Email input with placeholder text, submit button with text

---

## Total: 98 optimizations applied
