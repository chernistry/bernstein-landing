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
  target: number;
  suffix?: string;
  format?: 'k' | 'comma' | 'plain';
  ready?: boolean;
}

function AnimatedNumber({ target, suffix = '', format = 'plain', ready = true }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(formatNumber(0, format) + suffix);
  const hasAnimated = useRef(false);
  const readyRef = useRef(ready);
  readyRef.current = ready;

  const animate = useCallback(() => {
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(eased * target);
      setDisplay(formatNumber(current, format) + suffix);
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [target, suffix, format]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !ready) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(formatNumber(target, format) + suffix);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current && readyRef.current) {
          hasAnimated.current = true;
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, format, animate, ready]);

  return <span ref={ref}>{display}</span>;
}

export function Stats() {
  const [downloads, setDownloads] = useState(0);
  const [stars, setStars] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/stats')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        // If upstream is down the API returns zeros — only show numbers we trust.
        if (typeof data.monthly_downloads === 'number' && data.monthly_downloads > 0) {
          setDownloads(data.monthly_downloads);
        }
        if (typeof data.stars === 'number' && data.stars > 0) {
          setStars(data.stars);
        }
        setLoaded(true);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('[stats] fetch failed', err);
        setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="stats">
      <div className="stat">
        <div className="stat-num">
          <AnimatedNumber target={stars} suffix="+" ready={loaded} />
        </div>
        <div className="stat-label">GitHub stars</div>
      </div>
      <a
        href="https://pypistats.org/packages/bernstein"
        target="_blank"
        rel="noopener noreferrer"
        className="stat stat-link"
      >
        <div className="stat-num">
          <AnimatedNumber target={downloads} format="comma" ready={loaded} />
        </div>
        <div className="stat-label">Monthly downloads</div>
      </a>
      <div className="stat">
        <div className="stat-num">
          <AnimatedNumber target={18} ready={loaded} />
        </div>
        <div className="stat-label">Agent adapters</div>
      </div>
      <div className="stat">
        <div className="stat-num">
          <AnimatedNumber target={1048} format="comma" ready={loaded} />
        </div>
        <div className="stat-label">Test files</div>
      </div>
    </div>
  );
}
