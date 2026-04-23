'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

function formatNumber(value: number, format: 'k' | 'comma' | 'plain'): string {
  if (format === 'k') {
    return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : String(value);
  }
  if (format === 'comma') {
    return value.toLocaleString('en-US');
  }
  return String(value);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

interface AnimatedNumberProps {
  target: number | null;
  suffix?: string;
  format?: 'k' | 'comma' | 'plain';
  /**
   * When target is a live value we animate from 80% of the target (so the
   * first visible digits are already believable); when target is known at
   * mount (e.g. a constant like 31) we animate from 0. Never render animated
   * zeros for fetched values.
   */
  startFraction?: number;
}

function AnimatedNumber({
  target,
  suffix = '',
  format = 'plain',
  startFraction = 0,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(
    target === null ? '—' : formatNumber(Math.round(target * startFraction), format) + suffix,
  );
  const hasAnimated = useRef(false);

  const animate = useCallback((from: number, to: number) => {
    const duration = 1000;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(from + (to - from) * eased);
      setDisplay(formatNumber(current, format) + suffix);
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [format, suffix]);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(formatNumber(target, format) + suffix);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const from = Math.round(target * startFraction);
          animate(from, target);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, format, startFraction, animate]);

  return <span ref={ref}>{display}</span>;
}

interface StatsClientProps {
  initialStars: number | null;
  initialDownloads: number | null;
}

export function StatsClient({ initialStars, initialDownloads }: StatsClientProps) {
  const [stars, setStars] = useState<number | null>(initialStars);
  const [downloads, setDownloads] = useState<number | null>(initialDownloads);

  useEffect(() => {
    // If SSR already produced both numbers, skip the client refetch.
    if (initialStars !== null && initialDownloads !== null) return;

    let cancelled = false;
    fetch('/api/stats')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        if (typeof data.monthly_downloads === 'number' && data.monthly_downloads > 0) {
          setDownloads((prev) => prev ?? data.monthly_downloads);
        }
        if (typeof data.stars === 'number' && data.stars > 0) {
          setStars((prev) => prev ?? data.stars);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('[stats] fetch failed', err);
      });

    return () => {
      cancelled = true;
    };
  }, [initialStars, initialDownloads]);

  return (
    <div className="stats stats-improved">
      <div className="stat">
        <div className="stat-num">
          <AnimatedNumber target={stars} suffix="+" startFraction={0.8} />
        </div>
        <div className="stat-label">GitHub stars</div>
        <div className="stat-sub">{'↑ recent growth'}</div>
      </div>
      <a
        href="https://pypistats.org/packages/bernstein"
        target="_blank"
        rel="noopener noreferrer"
        className="stat stat-link"
      >
        <div className="stat-num">
          <AnimatedNumber target={downloads} format="comma" startFraction={0.8} />
        </div>
        <div className="stat-label">Monthly downloads</div>
        <div className="stat-sub">PyPI</div>
      </a>
      <div className="stat">
        <div className="stat-num">
          <AnimatedNumber target={31} startFraction={0} />
        </div>
        <div className="stat-label">Agent adapters</div>
        <div className="stat-sub">1 generic</div>
      </div>
      <div className="stat">
        <div className="stat-num">
          <AnimatedNumber target={9} startFraction={0} />
        </div>
        <div className="stat-label">Sandbox backends</div>
        <div className="stat-sub">+ 5 cloud sinks</div>
      </div>
    </div>
  );
}
