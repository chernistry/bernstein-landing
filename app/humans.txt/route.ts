export function GET() {
  return new Response(
    `/* TEAM */\nAuthor: Alex Chernysh\nSite: https://alexchernysh.com\nGitHub: https://github.com/chernistry\n\n/* SITE */\nFramework: Next.js 14\nLanguage: TypeScript\nCSS: Tailwind CSS + OKLCH\nHosting: OVH VPS + Caddy\nDomain: bernstein.run\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
