import { buildLlmsTxt } from '@/lib/seo';

export async function GET() {
  const content = await buildLlmsTxt();
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' },
  });
}
