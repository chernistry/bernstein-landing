'use client';

import { useState, type FormEvent } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

export function EmailCapture() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get('email_address') as string;
    setStatus('submitting');
    try {
      const resp = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      // 2xx -> success (covers subscribed / already_subscribed / dev-noop).
      // 4xx/5xx -> error UI.
      if (resp.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <ScrollReveal>
      <div className={`email-section${status === 'success' ? ' success' : ''}`}>
        <div className="email-inner">
          <p className="email-kicker">Something new is coming</p>
          <h2>Be the first to know</h2>
          <p>Monthly newsletter &mdash; one engineering deep-dive per month. No spam, unsub any time.</p>
          <form className="email-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email_address"
              placeholder="you@company.com"
              required
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={status === 'submitting' || status === 'success'}
              className={status === 'success' ? 'email-btn-success' : undefined}
            >
              {status === 'submitting' ? (
                <span className="email-spinner" aria-label="Submitting">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="spin">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                    <path d="M14 8a6 6 0 00-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              ) : status === 'success' ? 'You\u2019re in \u2713' : 'Get early access'}
            </button>
          </form>
          <p className={`email-note${status === 'success' ? ' email-note-success' : ''}`}>
            {status === 'success'
              ? 'Check your inbox to confirm.'
              : status === 'error'
                ? 'Something went wrong. Try again.'
                : 'No spam. Unsubscribe anytime.'}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
