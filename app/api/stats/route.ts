import { NextResponse } from 'next/server';

const PYPI_URL = 'https://pypistats.org/api/packages/bernstein/recent';
const GITHUB_URL = 'https://api.github.com/repos/chernistry/bernstein';
const REVALIDATE_SECONDS = 6 * 60 * 60; // 6 hours = ~4 fetches/day

interface CachedStats {
  monthly_downloads: number;
  stars: number;
  fetched_at: string;
}

let cache: CachedStats | null = null;
let cacheTime = 0;

async function fetchFresh(): Promise<CachedStats> {
  const [pypiRes, ghRes] = await Promise.allSettled([
    fetch(PYPI_URL, { next: { revalidate: REVALIDATE_SECONDS } }),
    fetch(GITHUB_URL, { next: { revalidate: REVALIDATE_SECONDS }, headers: { Accept: 'application/vnd.github.v3+json' } }),
  ]);

  let monthly = cache?.monthly_downloads ?? 9500;
  let stars = cache?.stars ?? 125;

  if (pypiRes.status === 'fulfilled' && pypiRes.value.ok) {
    const data = await pypiRes.value.json();
    if (data?.data?.last_month) monthly = data.data.last_month;
  }

  if (ghRes.status === 'fulfilled' && ghRes.value.ok) {
    const data = await ghRes.value.json();
    if (data?.stargazers_count) stars = data.stargazers_count;
  }

  return { monthly_downloads: monthly, stars, fetched_at: new Date().toISOString() };
}

export async function GET() {
  const now = Date.now();
  if (cache && now - cacheTime < REVALIDATE_SECONDS * 1000) {
    return NextResponse.json(cache, {
      headers: { 'Cache-Control': `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=3600` },
    });
  }

  const stats = await fetchFresh();
  cache = stats;
  cacheTime = now;

  return NextResponse.json(stats, {
    headers: { 'Cache-Control': `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=3600` },
  });
}
