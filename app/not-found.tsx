import { Nav } from '@/components/landing/Nav';
import { Footer } from '@/components/landing/Footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <div className="not-found">
        <h1>404</h1>
        <p>
          This page doesn&apos;t exist. The orchestrator can&apos;t route to it.
        </p>
        <a href="/" className="btn btn-primary">Back to bernstein.run</a>
      </div>
      <Footer />
    </>
  );
}
