import { Nav } from '@/components/landing/Nav';
import { Footer } from '@/components/landing/Footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '160px 24px 96px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: '16px' }}>404</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '32px' }}>
          This page doesn&apos;t exist. The orchestrator can&apos;t route to it.
        </p>
        <a href="/" className="btn btn-primary">Back to bernstein.run</a>
      </div>
      <Footer />
    </>
  );
}
