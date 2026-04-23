import { fetchPackageStats, type PackageStats } from '@/lib/pkg-stats';
import { StatsClient } from './StatsClient';

export async function Stats() {
  let initial: PackageStats = { monthly_downloads: null, stars: null };
  try {
    initial = await fetchPackageStats();
  } catch {
    // Upstream entirely unreachable during SSR — fall through to client fetch.
  }

  return (
    <StatsClient
      initialStars={initial.stars}
      initialDownloads={initial.monthly_downloads}
    />
  );
}
