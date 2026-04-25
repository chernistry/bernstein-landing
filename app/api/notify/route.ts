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
  process.env.BERNSTEIN_AUDIENCE_ID ?? 'REDACTED-AUDIENCE-ID-DA86';

const FROM = 'Bernstein <hello@bernstein.run>';
const SUBJECT = 'Welcome.';

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
  // Cleaned-up email: drops the global `a` color reset that was killing the
  // CTA contrast (dark text on dark button), drops the install code block
  // that competed with the CTA for attention, and bumps paragraph spacing.
  // Bulletproof button uses bgcolor + nested <span> so Gmail / Outlook
  // cannot accidentally invert the text colour.
  const FONT_BODY = `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", system-ui, Roboto, Helvetica, Arial, sans-serif`;
  const FONT_MONO = `ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>Welcome.</title>
<style>
  body, table, td, p, h1 { margin: 0; padding: 0; }
  img { border: 0; line-height: 100%; outline: none; text-decoration: none; }
  table { border-collapse: collapse !important; }
  /* Mobile */
  @media only screen and (max-width: 480px) {
    .container { width: 100% !important; }
    .pad-x  { padding-left: 24px !important; padding-right: 24px !important; }
    .h1     { font-size: 26px !important; line-height: 1.2 !important; }
  }
  /* Dark mode — for clients that honour prefers-color-scheme.
     Note: Gmail does its own algorithmic invert and ignores this. */
  @media (prefers-color-scheme: dark) {
    body, .bg, .surface { background: #0B0C10 !important; }
    .ink       { color: #F2F2F4 !important; }
    .secondary { color: #A8A8B2 !important; }
    .muted     { color: #707078 !important; }
    .accent-rule { background: #2D6CF6 !important; }
    .eyebrow   { color: #2D6CF6 !important; }
    .rule      { border-color: #20212A !important; }
    /* Light button on dark — explicit, with nested span override */
    .btn-cell  { background: #F2F2F4 !important; }
    .btn-text  { color: #0B0C10 !important; }
    .footer-link { color: #707078 !important; }
  }
</style>
</head>
<body class="bg" style="margin:0;padding:0;background:#FAFAFA;font-family:${FONT_BODY};-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;">
<!-- Preheader -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#FAFAFA;opacity:0;">
Occasional notes from bernstein.run. No daily noise.&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;
</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="bg" style="background:#FAFAFA;">
  <tr>
    <td align="center" style="padding:0;">
      <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="container surface" style="max-width:600px;width:100%;background:#FFFFFF;">
        <!-- Top accent rule -->
        <tr><td class="accent-rule" style="height:3px;background:#0A0A0A;line-height:3px;font-size:0;">&nbsp;</td></tr>

        <!-- Hero -->
        <tr>
          <td class="pad-x" style="padding:56px 48px 16px 48px;">
            <p class="eyebrow" style="margin:0 0 24px 0;font-family:${FONT_MONO};font-size:11px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#737380;">
              bernstein.run
            </p>
            <h1 class="h1 ink" style="margin:0;font-family:${FONT_BODY};font-size:34px;line-height:1.12;font-weight:600;letter-spacing:-0.028em;color:#0A0A0A;">
              You&rsquo;re subscribed.
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td class="pad-x" style="padding:24px 48px 8px 48px;">
            <p class="secondary" style="margin:0 0 24px 0;font-family:${FONT_BODY};font-size:16px;line-height:1.65;color:#3F3F46;">
              You&rsquo;ll get occasional notes from bernstein.run &mdash; only when there&rsquo;s something actually worth opening. Releases, an essay, the very rare announcement.
            </p>

            <p class="secondary" style="margin:0 0 40px 0;font-family:${FONT_BODY};font-size:16px;line-height:1.65;color:#3F3F46;">
              No daily noise. No drip campaigns. No &ldquo;just checking in.&rdquo;
            </p>

            <!-- Bulletproof CTA: bgcolor on td + explicit color on nested span -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 40px 0;">
              <tr>
                <td class="btn-cell" align="center" bgcolor="#0A0A0A" style="border-radius:8px;background:#0A0A0A;">
                  <a href="https://bernstein.run/quickstart" target="_blank" style="display:inline-block;padding:14px 28px;font-family:${FONT_BODY};font-size:15px;font-weight:500;line-height:1;text-decoration:none;border-radius:8px;letter-spacing:-0.005em;">
                    <span class="btn-text" style="color:#FFFFFF;">Open the quickstart</span>
                  </a>
                </td>
              </tr>
            </table>

            <p class="secondary" style="margin:0 0 8px 0;font-family:${FONT_BODY};font-size:15px;line-height:1.65;color:#3F3F46;">
              If anything breaks, surprises you, or feels missing &mdash; reply to this email. It lands in my inbox.
            </p>

            <p class="ink" style="margin:24px 0 0 0;font-family:${FONT_BODY};font-size:16px;line-height:1.65;color:#0A0A0A;">
              &mdash; Alex
            </p>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td class="pad-x" style="padding:48px 48px 0 48px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td class="rule" style="border-top:1px solid #EAEAEA;height:1px;line-height:1px;font-size:0;">&nbsp;</td></tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="pad-x" style="padding:20px 48px 48px 48px;">
            <p class="muted" style="margin:0 0 8px 0;font-family:${FONT_BODY};font-size:12px;line-height:1.6;color:#8A8A92;">
              <a class="footer-link" href="https://bernstein.run" style="color:#8A8A92;text-decoration:none;">bernstein.run</a> &middot; Multi-agent orchestration for CLI coding agents
            </p>
            <p class="muted" style="margin:0 0 12px 0;font-family:${FONT_BODY};font-size:12px;line-height:1.6;color:#8A8A92;">
              Bernstein &middot; Unit 4, Park Royal Business Centre, 9&ndash;17 Park Royal Road, London NW10 7LQ, United Kingdom
            </p>
            <p class="muted" style="margin:0;font-family:${FONT_BODY};font-size:12px;line-height:1.6;color:#8A8A92;">
              Don&rsquo;t want these? <a class="footer-link" href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#8A8A92;text-decoration:underline;">Unsubscribe</a>.
            </p>
          </td>
        </tr>
      </table>
      <!--[if mso]>
      </td></tr></table>
      <![endif]-->
    </td>
  </tr>
</table>
</body>
</html>`;
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
