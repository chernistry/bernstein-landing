import { NextResponse } from 'next/server';

const PYPI_URL = 'https://pypistats.org/api/packages/bernstein/recent';
const GITHUB_URL = 'https://api.github.com/repos/chernistry/bernstein';
const UA = 'bernstein-landing/1.0 (+https://bernstein.run)';
const REVALIDATE_SECONDS = 30 * 60; // 30 minutes — tighter during launch period
const FAILURE_RETRY_SECONDS = 60;   // retry sooner if upstream is broken

interface CachedStats {
  monthly_downloads: number;
  stars: number;
  fetched_at: string;
}

interface FetchResult {
  monthly?: number;
  stars?: number;
}

let cache: CachedStats | null = null;
let cacheTime = 0;

async function fetchFresh(): Promise<FetchResult> {
  const [pypiRes, ghRes] = await Promise.allSettled([
    fetch(PYPI_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { 'User-Agent': UA, Accept: 'application/json' },
    }),
    fetch(GITHUB_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { 'User-Agent': UA, Accept: 'application/vnd.github.v3+json' },
    }),
  ]);

  const out: FetchResult = {};

  if (pypiRes.status === 'fulfilled' && pypiRes.value.ok) {
    try {
      const data = await pypiRes.value.json();
      if (typeof data?.data?.last_month === 'number') out.monthly = data.data.last_month;
    } catch (e) {
      console.error('[stats] pypi parse failed:', e);
    }
  } else {
    const why = pypiRes.status === 'rejected'
      ? pypiRes.reason
      : `HTTP ${pypiRes.value.status}`;
    console.error('[stats] pypi fetch failed:', why);
  }

  if (ghRes.status === 'fulfilled' && ghRes.value.ok) {
    try {
      const data = await ghRes.value.json();
      if (typeof data?.stargazers_count === 'number') out.stars = data.stargazers_count;
    } catch (e) {
      console.error('[stats] github parse failed:', e);
    }
  } else {
    const why = ghRes.status === 'rejected'
      ? ghRes.reason
      : `HTTP ${ghRes.value.status}`;
    console.error('[stats] github fetch failed:', why);
  }

  return out;
}

export async function GET() {
  const now = Date.now();
  if (cache && now - cacheTime < REVALIDATE_SECONDS * 1000) {
    return NextResponse.json(cache, {
      headers: { 'Cache-Control': `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=3600` },
    });
  }

  const fresh = await fetchFresh();

  // Merge fresh data over last-known-good. If we got at least one number fresh,
  // cache the merged result; otherwise back off with a short retry window.
  if (fresh.monthly !== undefined || fresh.stars !== undefined) {
    const merged: CachedStats = {
      monthly_downloads: fresh.monthly ?? cache?.monthly_downloads ?? 0,
      stars: fresh.stars ?? cache?.stars ?? 0,
      fetched_at: new Date().toISOString(),
    };
    cache = merged;
    cacheTime = now;
    return NextResponse.json(merged, {
      headers: { 'Cache-Control': `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=3600` },
    });
  }

  // Both upstreams failed. Serve last-known cache if we have it, otherwise a
  // sentinel the client can detect. Short cache so we retry soon.
  if (cache) {
    return NextResponse.json(cache, {
      headers: { 'Cache-Control': `public, s-maxage=${FAILURE_RETRY_SECONDS}, stale-while-revalidate=300` },
    });
  }

  return NextResponse.json(
    { monthly_downloads: 0, stars: 0, fetched_at: new Date(0).toISOString() },
    { status: 503, headers: { 'Cache-Control': `public, s-maxage=${FAILURE_RETRY_SECONDS}` } },
  );
}
