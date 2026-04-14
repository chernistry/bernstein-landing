'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { href: '/#how', label: 'How it works' },
  { href: '/#agents', label: 'Agents' },
  { href: '/#features', label: 'Features' },
  { href: '/#compare', label: 'Compare' },
  { href: '/blog', label: 'Blog' },
  {
    href: 'https://github.com/chernistry/bernstein',
    label: 'GitHub',
    external: true,
  },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  /* Body scroll lock */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  /* Focus trap */
  useEffect(() => {
    if (!open || !drawerRef.current) return;
    const drawer = drawerRef.current;
    const focusable = drawer.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    drawer.addEventListener('keydown', trap);
    return () => drawer.removeEventListener('keydown', trap);
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        className="mobile-menu-btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-drawer"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <span className={`hamburger ${open ? 'hamburger--open' : ''}`}>
          <span />
          <span />
          <span />
        </span>
      </button>

      {/* Overlay + Drawer */}
      <div
        className={`mobile-overlay ${open ? 'mobile-overlay--visible' : ''}`}
        onClick={close}
        aria-hidden="true"
      />
      <div
        ref={drawerRef}
        id="mobile-drawer"
        className={`mobile-drawer ${open ? 'mobile-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button
          className="mobile-drawer-close"
          onClick={close}
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        </button>
        <nav className="mobile-drawer-nav">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
