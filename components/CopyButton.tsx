'use client';
import { useState } from 'react';

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={`copy-btn ${copied ? 'copied' : ''} ${className ?? ''}`}
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
