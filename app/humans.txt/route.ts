export function GET() {
  const content = [
    '/* TEAM */',
    'Creator: Alex Chernysh',
    'Site: https://alexchernysh.com',
    'GitHub: https://github.com/chernistry',
    'Location: Europe',
    '',
    '/* THANKS */',
    'Bernstein orchestrates: Claude Code, Codex CLI, Gemini CLI, and 14 more agents',
    '',
    '/* SITE */',
    'Standards: HTML5, CSS3, TypeScript',
    'Framework: Next.js 14 (App Router)',
    'Language: TypeScript, Python',
    'Hosting: OVH VPS, Caddy, Docker',
    'CDN: Cloudflare',
    'Email: Kit (ConvertKit)',
    'Design: OKLCH color space, Inter + JetBrains Mono',
    'Build: Node.js 20, standalone Docker output',
    'Last updated: 2026-04-17',
    '',
  ].join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
