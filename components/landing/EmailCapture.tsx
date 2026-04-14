'use client';

import { useState, type FormEvent } from 'react';

export function EmailCapture() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get('email_address') as string;
    setStatus('submitting');
    try {
      await fetch('https://app.kit.com/forms/9325480/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'email_address=' + encodeURIComponent(email),
        mode: 'no-cors',
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="email-section">
      <div className="email-inner">
        <p className="email-kicker">Something new is coming</p>
        <h2>Be the first to know</h2>
        <p>We&apos;re building hosted orchestration and a cloud runtime. Early subscribers get first access, architecture deep-dives, and a voice in what ships next.</p>
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
            style={status === 'success' ? { background: '#16a34a' } : undefined}
          >
            {status === 'submitting' ? 'Submitting\u2026' : status === 'success' ? 'You\u2019re in \u2713' : 'Get early access'}
          </button>
        </form>
        <p className="email-note">
          {status === 'success'
            ? 'Check your inbox to confirm.'
            : status === 'error'
              ? 'Something went wrong. Try again.'
              : 'No spam. Unsubscribe anytime.'}
        </p>
      </div>
    </div>
  );
}
