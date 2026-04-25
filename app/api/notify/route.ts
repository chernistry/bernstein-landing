import { NextResponse } from 'next/server';

/**
 * Bernstein newsletter signup endpoint.
 *
 * 1. Adds the email to the Resend `bernstein` audience (idempotent).
 * 2. Immediately sends a confirmation email so the visitor knows it worked.
 *
 * Required env (set on the OVH VPS in /srv/bernstein-landing/app/.env):
 *   - RESEND_API_KEY_BERNSTEIN  : Full-Access key for the bernstein.run Resend account.
 *   - BERNSTEIN_AUDIENCE_ID     : Optional override; defaults to the audience ID
 *                                 created on 2026-04-25.
 *
 * If the env is not set (e.g. preview deploys, local dev without an .env), the
 * route falls back to a 200/noop stub so the UI does not break.
 */

const BERNSTEIN_AUDIENCE_ID =
  process.env.BERNSTEIN_AUDIENCE_ID ?? 'da86b0ba-b5e9-4e7d-90de-5911b417a39d';

const FROM = 'Bernstein <hello@bernstein.run>';
const SUBJECT = 'Welcome to Bernstein';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const runtime = 'nodejs';

async function alreadyExists(apiKey: string, email: string): Promise<boolean> {
  const r = await fetch(
    `https://api.resend.com/audiences/${BERNSTEIN_AUDIENCE_ID}/contacts/${encodeURIComponent(email)}`,
    { headers: { Authorization: `Bearer ${apiKey}` }, cache: 'no-store' },
  );
  return r.status === 200;
}

async function createContact(apiKey: string, email: string): Promise<Response> {
  return fetch(`https://api.resend.com/audiences/${BERNSTEIN_AUDIENCE_ID}/contacts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, unsubscribed: false }),
    cache: 'no-store',
  });
}

function confirmationHtml(): string {
  return `<!doctype html>
<html><body style="font-family:ui-sans-serif,system-ui,sans-serif;color:#171717;background:#fff;margin:0;padding:24px">
<table style="max-width:560px;margin:0 auto;padding:24px"><tr><td>
<h1 style="font-size:22px;font-weight:600;margin:0 0 16px">Welcome to Bernstein.</h1>
<p style="font-size:15px;line-height:1.55;margin:0 0 16px">You signed up for occasional notes from <strong>bernstein.run</strong>: the OSS CLI, the cloud add-ons, and the consulting work that uses them. No daily noise — only when there is actually something worth opening.</p>
<p style="font-size:15px;line-height:1.55;margin:0 0 16px">If you want to start poking at Bernstein right now, the 60-second quickstart is here:</p>
<p style="margin:24px 0"><a href="https://bernstein.run/quickstart" style="background:#171717;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:500">Open quickstart</a></p>
<p style="font-size:15px;line-height:1.55;margin:0 0 16px">Reply to this email if anything is broken, surprising, or missing — it goes straight to my inbox.</p>
<p style="font-size:15px;line-height:1.55;margin:0">— Alex</p>
<hr style="border:none;border-top:1px solid #eaeaea;margin:32px 0">
<p style="font-size:12px;color:#737373;line-height:1.55;margin:0">
<a href="https://bernstein.run" style="color:#737373">bernstein.run</a> · Bernstein · Unit 4, Park Royal Business Centre, 9-17 Park Royal Road, London NW10 7LQ, United Kingdom
</p>
<p style="font-size:12px;color:#737373;line-height:1.55;margin:8px 0 0">
Don't want these? <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#737373">Unsubscribe</a>.
</p>
</td></tr></table>
</body></html>`;
}

async function sendConfirmation(apiKey: string, email: string): Promise<void> {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [email],
      subject: SUBJECT,
      html: confirmationHtml(),
      headers: { 'List-Unsubscribe': '<{{{RESEND_UNSUBSCRIBE_URL}}}>' },
    }),
  });
  if (!r.ok) {
    console.error('[notify] confirmation send failed', r.status, await r.text());
  }
}

export async function POST(request: Request) {
  let body: { email?: unknown };
  try {
    body = (await request.json().catch(() => ({}))) as { email?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  const email =
    typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY_BERNSTEIN;
  if (!apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[notify] RESEND_API_KEY_BERNSTEIN missing; not persisting (dev fallback).');
    }
    return NextResponse.json({ ok: true, status: 'noop' });
  }

  try {
    if (await alreadyExists(apiKey, email)) {
      return NextResponse.json({ ok: true, status: 'already_subscribed' });
    }
    const upstream = await createContact(apiKey, email);
    if (!upstream.ok) {
      console.error('[notify] resend upstream error', upstream.status, await upstream.text());
      return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
    }
    // Fire-and-await the confirmation email; do not fail the whole request
    // if the send call errors (the contact is already saved).
    await sendConfirmation(apiKey, email).catch((e) => console.error('[notify] confirm fail', e));
    return NextResponse.json({ ok: true, status: 'subscribed' });
  } catch (err) {
    console.error('[notify] unexpected error', err);
    return NextResponse.json({ ok: false, error: 'unexpected' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: 'notify' });
}
