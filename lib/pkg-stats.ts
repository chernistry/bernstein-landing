const PYPI_URL = 'https://pypistats.org/api/packages/bernstein/recent';
const GITHUB_URL = 'https://api.github.com/repos/chernistry/bernstein';
const UA = 'bernstein-landing/1.0 (+https://bernstein.run)';
const REVALIDATE_SECONDS = 3600;

export interface PackageStats {
  monthly_downloads: number | null;
  stars: number | null;
}

// Server-side fetch with Next.js request-level dedupe: calling this from
// both <Hero> and <Stats> in the same render triggers a single upstream
// request per URL thanks to the shared { next: { revalidate } } cache key.
export async function fetchPackageStats(): Promise<PackageStats> {
  const out: PackageStats = { monthly_downloads: null, stars: null };

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

  if (pypiRes.status === 'fulfilled' && pypiRes.value.ok) {
    try {
      const data = await pypiRes.value.json();
      if (typeof data?.data?.last_month === 'number' && data.data.last_month > 0) {
        out.monthly_downloads = data.data.last_month;
      }
    } catch {
      /* em-dash fallback */
    }
  }

  if (ghRes.status === 'fulfilled' && ghRes.value.ok) {
    try {
      const data = await ghRes.value.json();
      if (typeof data?.stargazers_count === 'number' && data.stargazers_count > 0) {
        out.stars = data.stargazers_count;
      }
    } catch {
      /* em-dash fallback */
    }
  }

  return out;
}

// Round down to the nearest thousand for a proof-line ("11,000+"). Returns
// null when upstream was unavailable so callers can render an alt proof.
export function formatDownloadsProof(value: number | null): string | null {
  if (value === null || value <= 0) return null;
  if (value < 1000) return `${value}+`;
  const rounded = Math.floor(value / 1000) * 1000;
  return `${rounded.toLocaleString('en-US')}+`;
}
