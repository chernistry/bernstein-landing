import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * One-click unsubscribe URL signing for Bernstein newsletter.
 *
 * Generates an HMAC-SHA256 token over (audience_id, email, expiry) so the
 * unsubscribe endpoint can verify the link came from us without storing
 * per-link state. Tokens are valid for 365 days from issuance.
 */
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 365;

function getSecret(): string {
  const s = process.env.UNSUB_SIGNING_SECRET;
  if (!s || s.length < 32) {
    throw new Error('UNSUB_SIGNING_SECRET missing or too short (need ≥32 chars)');
  }
  return s;
}

function sign(audienceId: string, email: string, expiry: number): string {
  const payload = `${audienceId}|${email.toLowerCase()}|${expiry}`;
  return createHmac('sha256', getSecret()).update(payload).digest('hex');
}

export function buildUnsubUrl(opts: {
  origin: string;
  audienceId: string;
  email: string;
  ttlSeconds?: number;
}): string {
  const expiry = Math.floor(Date.now() / 1000) + (opts.ttlSeconds ?? TOKEN_TTL_SECONDS);
  const token = sign(opts.audienceId, opts.email, expiry);
  const params = new URLSearchParams({
    a: opts.audienceId,
    e: opts.email.toLowerCase(),
    x: String(expiry),
    t: token,
  });
  return `${opts.origin}/api/unsubscribe?${params.toString()}`;
}

export interface VerifyResult {
  ok: boolean;
  audienceId?: string;
  email?: string;
  reason?: 'missing' | 'expired' | 'bad_signature';
}

export function verifyUnsubToken(query: URLSearchParams): VerifyResult {
  const a = query.get('a');
  const e = query.get('e');
  const x = query.get('x');
  const t = query.get('t');
  if (!a || !e || !x || !t) return { ok: false, reason: 'missing' };

  const expiry = Number(x);
  if (!Number.isFinite(expiry) || expiry < Math.floor(Date.now() / 1000)) {
    return { ok: false, reason: 'expired' };
  }

  const expected = sign(a, e, expiry);
  const expectedBuf = Buffer.from(expected, 'hex');
  const givenBuf = Buffer.from(t, 'hex');
  if (expectedBuf.length !== givenBuf.length) return { ok: false, reason: 'bad_signature' };
  if (!timingSafeEqual(expectedBuf, givenBuf)) return { ok: false, reason: 'bad_signature' };

  return { ok: true, audienceId: a, email: e };
}
