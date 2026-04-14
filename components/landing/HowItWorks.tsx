export function HowItWorks() {
  return (
    <section id="how">
      <div className="section-header">
        <h2>How it works</h2>
        <p>Three steps. No babysitting.</p>
      </div>
      <div className="steps">
        <div className="step">
          <div className="step-num">01</div>
          <h3>Set a goal</h3>
          <p>Describe what you want built. Bernstein decomposes it into tasks with the right roles, models, and dependencies.</p>
        </div>
        <div className="step">
          <div className="step-num">02</div>
          <h3>Agents work in parallel</h3>
          <p>Each agent gets its own git worktree. Opus for architecture, Sonnet for implementation, Haiku for tests. Automatically routed.</p>
        </div>
        <div className="step">
          <div className="step-num">03</div>
          <h3>Verified and merged</h3>
          <p>Quality gates run lint, types, and tests on every result. Only verified work gets merged. Failed tasks retry with escalated models.</p>
        </div>
      </div>
    </section>
  );
}
