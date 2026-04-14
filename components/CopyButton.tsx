'use client';
import { useCallback, useRef, useState } from 'react';

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);

      // Flash the parent install-block border
      const block = btnRef.current?.closest('.install-block');
      if (block) {
        block.classList.add('just-copied');
        setTimeout(() => block.classList.remove('just-copied'), 2000);
      }

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <>
      <button
        ref={btnRef}
        className={`copy-btn ${copied ? 'copied' : ''} ${className ?? ''}`}
        onClick={handleCopy}
        aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <span className="sr-only" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
    </>
  );
}
