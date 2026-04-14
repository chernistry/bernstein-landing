'use client';

import { useEffect, useState } from 'react';
import { MobileMenu } from './MobileMenu';

const SECTION_IDS = ['how', 'agents', 'features', 'compare'] as const;

export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  /* Scroll spy via IntersectionObserver */
  useEffect(() => {
    const entries = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          entries.set(entry.target.id, entry.isIntersecting);
        }
        for (const id of SECTION_IDS) {
          if (entries.get(id)) {
            setActive(id);
            return;
          }
        }
      },
      { rootMargin: '-52px 0px -40% 0px', threshold: 0 }
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  /* Nav background transition on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a href="#main" className="skip-to-content">
        Skip to main content
      </a>

      <header className={scrolled ? 'nav-scrolled' : 'nav-top'}>
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            bernstein<span className="run">.run</span>
          </a>
          <nav className="nav-links">
            <a
              href="/#how"
              className={active === 'how' ? 'nav-active' : undefined}
            >
              How it works
            </a>
            <a
              href="/#agents"
              className={active === 'agents' ? 'nav-active' : undefined}
            >
              Agents
            </a>
            <a
              href="/#features"
              className={active === 'features' ? 'nav-active' : undefined}
            >
              Features
            </a>
            <a
              href="/#compare"
              className={active === 'compare' ? 'nav-active' : undefined}
            >
              Compare
            </a>
            <a href="/blog">Blog</a>
            <a
              href="https://github.com/chernistry/bernstein"
              className="nav-github"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </a>
          </nav>
          <MobileMenu />
        </div>
      </header>
    </>
  );
}
