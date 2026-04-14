export function Compare() {
  return (
    <section id="compare">
      <div className="section-header">
        <h2>How it compares</h2>
        <p>Different category, different architecture.</p>
      </div>
      <div className="table-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th></th>
              <th>Bernstein</th>
              <th>CrewAI</th>
              <th>AutoGen</th>
              <th>LangGraph</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Orchestrator</td>
              <td>Deterministic code</td>
              <td className="partial" aria-label="Partial: LLM-driven">~ LLM-driven</td>
              <td className="partial" aria-label="Partial: LLM-driven">~ LLM-driven</td>
              <td className="partial" aria-label="Partial: Graph + LLM">~ Graph + LLM</td>
            </tr>
            <tr>
              <td>CLI agent support</td>
              <td aria-label="Yes: 21 adapters"><span className="check">&#10003; 21 adapters</span></td>
              <td aria-label="No"><span className="cross">&#10007; No</span></td>
              <td aria-label="No"><span className="cross">&#10007; No</span></td>
              <td aria-label="No"><span className="cross">&#10007; No</span></td>
            </tr>
            <tr>
              <td>Git isolation</td>
              <td aria-label="Yes: Worktrees"><span className="check">&#10003; Worktrees</span></td>
              <td aria-label="No"><span className="cross">&#10007; No</span></td>
              <td aria-label="No"><span className="cross">&#10007; No</span></td>
              <td aria-label="No"><span className="cross">&#10007; No</span></td>
            </tr>
            <tr>
              <td>Quality gates</td>
              <td aria-label="Yes: Built-in"><span className="check">&#10003; Built-in</span></td>
              <td aria-label="No"><span className="cross">&#10007; No</span></td>
              <td aria-label="No"><span className="cross">&#10007; No</span></td>
              <td className="partial" aria-label="Partial: Partial">~ Partial</td>
            </tr>
            <tr>
              <td>Cost tracking</td>
              <td aria-label="Yes: Per-agent"><span className="check">&#10003; Per-agent</span></td>
              <td aria-label="No"><span className="cross">&#10007; No</span></td>
              <td aria-label="No"><span className="cross">&#10007; No</span></td>
              <td aria-label="No"><span className="cross">&#10007; No</span></td>
            </tr>
            <tr>
              <td>Cloud execution</td>
              <td aria-label="Yes: &#10003; Cloudflare"><span className="check">&#10003; &#10003; Cloudflare</span></td>
              <td aria-label="No"><span className="cross">&#10007; &#10007;</span></td>
              <td aria-label="No"><span className="cross">&#10007; &#10007;</span></td>
              <td aria-label="No"><span className="cross">&#10007; &#10007;</span></td>
            </tr>
            <tr>
              <td>Self-evolution</td>
              <td aria-label="Yes: Built-in"><span className="check">&#10003; Built-in</span></td>
              <td aria-label="No"><span className="cross">&#10007; No</span></td>
              <td aria-label="No"><span className="cross">&#10007; No</span></td>
              <td aria-label="No"><span className="cross">&#10007; No</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
