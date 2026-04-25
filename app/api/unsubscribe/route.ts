import { NextResponse } from 'next/server';
import { verifyUnsubToken } from '@/lib/unsub';

/**
 * One-click unsubscribe endpoint.
 *
 * GET  /api/unsubscribe?a=<audience>&e=<email>&x=<expiry>&t=<hmac>
 *      → renders a small confirmation page; PATCHes contact in Resend.
 * POST /api/unsubscribe?... (RFC 8058 one-click) → 200 plain JSON.
 */

export const runtime = 'nodejs';

async function unsubscribeContact(audienceId: string, email: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY_BERNSTEIN;
  if (!apiKey) {
    console.error('[unsub] RESEND_API_KEY_BERNSTEIN missing — cannot patch contact');
    return false;
  }
  const r = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts/${encodeURIComponent(email)}`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ unsubscribed: true }),
      cache: 'no-store',
    },
  );
  if (!r.ok) {
    console.error('[unsub] Resend PATCH failed', r.status, await r.text());
    return false;
  }
  return true;
}

function htmlConfirmPage(state: 'ok' | 'invalid'): string {
  const message =
    state === 'ok' ? "You're unsubscribed." : 'This unsubscribe link is invalid or expired.';
  const sub =
    state === 'ok'
      ? "We won't email you again. If this was a mistake, just sign up again."
      : 'If you keep getting emails, reply to one of them — they go straight to my inbox.';
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${state === 'ok' ? 'Unsubscribed' : 'Invalid unsubscribe link'} · bernstein.run</title>
<style>
  html,body{margin:0;padding:0;background:#FAFAFA;color:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Segoe UI",system-ui,Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;}
  .wrap{max-width:560px;margin:0 auto;padding:80px 24px;text-align:center;}
  .eyebrow{font-family:ui-monospace,"SF Mono",Menlo,Consolas,monospace;font-size:11px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#737380;margin:0 0 24px;}
  h1{font-size:34px;line-height:1.12;font-weight:600;letter-spacing:-0.028em;margin:0 0 16px;color:#0A0A0A;}
  p{font-size:16px;line-height:1.65;color:#3F3F46;margin:0 0 24px;}
  a{color:#0A0A0A;text-decoration:underline;}
  @media (prefers-color-scheme: dark) {
    html,body{background:#0B0C10;color:#F2F2F4;}
    .eyebrow{color:#707078;}
    h1{color:#F2F2F4;}
    p{color:#A8A8B2;}
    a{color:#F2F2F4;}
  }
</style></head>
<body><div class="wrap">
<p class="eyebrow">bernstein.run</p>
<h1>${message}</h1>
<p>${sub}</p>
<p><a href="https://bernstein.run">Return to bernstein.run</a></p>
</div></body></html>`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const verify = verifyUnsubToken(searchParams);
  if (!verify.ok) {
    return new Response(htmlConfirmPage('invalid'), {
      status: 400,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
  }
  await unsubscribeContact(verify.audienceId!, verify.email!);
  return new Response(htmlConfirmPage('ok'), {
    status: 200,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const verify = verifyUnsubToken(searchParams);
  if (!verify.ok) {
    return NextResponse.json({ ok: false, reason: verify.reason }, { status: 400 });
  }
  const success = await unsubscribeContact(verify.audienceId!, verify.email!);
  return NextResponse.json({ ok: success });
}
