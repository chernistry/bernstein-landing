export function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">bernstein<span>.run</span></span>
          <p className="footer-tagline">Multi-agent orchestration for CLI coding agents</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Product</h4>
            <a href="https://github.com/chernistry/bernstein">GitHub</a>
            <a href="https://pypi.org/project/bernstein/">PyPI</a>
            <a href="https://bernstein.readthedocs.io/">Docs</a>
            <a href="/blog">Blog</a>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <a href="/llms.txt">llms.txt</a>
            <a href="/llms-full.txt">llms-full.txt</a>
            <a href="/ai.txt">ai.txt</a>
            <a href="/sitemap.xml">Sitemap</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="mailto:forte@bernstein.run">forte@bernstein.run</a>
            <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache 2.0</a>
            <a href="/.well-known/security.txt">Security</a>
            <a href="/humans.txt">Humans</a>
          </div>
        </div>
        <div className="footer-badges">
          <a href="https://codetrendy.com" target="_blank" rel="noopener noreferrer" aria-label="Listed on codetrendy.com">
            <img
              src="https://codetrendy.com/api/badge?style=classic"
              alt="Listed on codetrendy.com"
              height="54"
              loading="lazy"
            />
          </a>
        </div>
        <div className="footer-bottom">
          <p>Made by <a href="https://alexchernysh.com">Alex Chernysh</a> · <a href="mailto:forte@bernstein.run">forte@bernstein.run</a></p>
        </div>
      </div>
    </footer>
  );
}
