import { CopyButton } from '@/components/CopyButton';
import { fetchPackageStats, formatDownloadsProof } from '@/lib/pkg-stats';
import { HeroBackground } from './HeroBackground';

function AgentTerminal() {
  return (
    <div className="hero-term" aria-hidden="true">
      <div className="hero-term-bar">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-term-body">
        <div className="hero-term-line hero-term-line-1">
          <span className="tl-dim">$ bernstein -g &quot;add JWT auth with refresh tokens, tests, docs&quot;</span>
        </div>
        <div className="hero-term-line hero-term-line-2">
          <span className="tl-dim">[manager]  decomposed into </span>
          <span className="tl-green">4 tasks</span>
        </div>
        <div className="hero-term-line hero-term-line-3">
          <span className="tl-a1">[agent-1]</span>
          <span className="tl-dim"> sonnet  src/auth/middleware.py  </span>
          <span className="tl-green">&#10003; 2m14s</span>
        </div>
        <div className="hero-term-line hero-term-line-4">
          <span className="tl-a2">[agent-2]</span>
          <span className="tl-dim"> codex   tests/test_auth.py      </span>
          <span className="tl-green">&#10003; 1m58s</span>
        </div>
        <div className="hero-term-line hero-term-line-5">
          <span className="tl-a3">[agent-3]</span>
          <span className="tl-dim"> haiku   docs/auth.md            </span>
          <span className="tl-green">&#10003; 42s</span>
        </div>
        <div className="hero-term-line hero-term-line-6">
          <span className="tl-a4">[agent-4]</span>
          <span className="tl-dim"> gemini  src/auth/refresh.py     </span>
          <span className="tl-amber">&#8635; retry</span>
        </div>
        <div className="hero-term-line hero-term-line-7">
          <span className="tl-dim">[verify]  lint · types · tests · pii      </span>
          <span className="tl-green">&#8594; merge</span>
        </div>
      </div>
    </div>
  );
}

export async function Hero() {
  const { monthly_downloads } = await fetchPackageStats();
  const downloads = formatDownloadsProof(monthly_downloads);
  const proofLine = downloads
    ? `${downloads} monthly downloads · Apache 2.0 · 31 agent adapters`
    : 'Apache 2.0 · 31 agent adapters · Open source';

  return (
    <div className="hero hero-split">
      <HeroBackground />
      <div className="hero-copy">
        <h1>
          AI coding agents,
          <br />
          <span className="hero-h1-sub">working together.</span>
        </h1>
        <p className="hero-sub">
          Tell it what you want built. It splits the work across several
          AI agents (Claude Code, Codex, Gemini&nbsp;CLI, and 34 more),
          runs the tests, and merges only the code that actually passes.
        </p>
        <div className="hero-actions">
          <a href="https://github.com/chernistry/bernstein" className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            View on GitHub
          </a>
          <a href="https://bernstein.readthedocs.io/" className="btn btn-secondary">Documentation</a>
        </div>
        <div className="install-block">
          <div className="install-code"><span className="prompt">$</span> <span className="cmd">curl -fsSL https://bernstein.run/install.sh | sh</span><span className="cursor" /></div>
          <CopyButton text="curl -fsSL https://bernstein.run/install.sh | sh" />
        </div>
        <p className="hero-install-alt">
          Prefer a manual install? <code>pipx install bernstein</code> · Windows: <a href="https://bernstein.run/install.ps1">install.ps1</a>
        </p>
        <p className="hero-proof">{proofLine}</p>
      </div>
      <div className="hero-visual">
        <AgentTerminal />
      </div>
    </div>
  );
}
