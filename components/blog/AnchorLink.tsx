'use client';

import { useState } from 'react';

// Per-heading anchor: on click it updates the URL hash AND copies the
// deep-link to the clipboard, with a brief "Link copied" affordance.
// Rendered by the custom MDX h2/h3 so readers can share sections.
export function AnchorLink({ slug, label }: { slug: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const onClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${slug}`;
      if (navigator.clipboard?.writeText) {
        event.preventDefault();
        await navigator.clipboard.writeText(url);
        history.replaceState(null, '', `#${slug}`);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }
    } catch {
      /* clipboard unavailable — fall through to default navigation */
    }
  };

  return (
    <a
      href={`#${slug}`}
      className="anchor-link"
      aria-label={`Copy link to ${label}`}
      onClick={onClick}
    >
      {copied ? (
        // Check glyph
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        // Chain-link glyph
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6.5 9.5L9.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M9 5.5L10.5 4C11.6 2.9 13.4 2.9 14.5 4V4C15.6 5.1 15.6 6.9 14.5 8L12.5 10C11.4 11.1 9.6 11.1 8.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 10.5L5.5 12C4.4 13.1 2.6 13.1 1.5 12V12C0.4 10.9 0.4 9.1 1.5 8L3.5 6C4.6 4.9 6.4 4.9 7.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span className="anchor-link-toast" aria-live="polite">
        {copied ? 'Link copied' : ''}
      </span>
    </a>
  );
}
