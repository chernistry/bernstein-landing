export function Compare() {
  return (
    <section id="compare" aria-labelledby="compare-heading">
      <div className="section-header">
        <h2 id="compare-heading">How it compares</h2>
        <p>Different category, different architecture.</p>
      </div>
      <div className="table-wrap" tabIndex={0} role="region" aria-label="Comparison table, scroll horizontally">
        <table className="compare-table" role="table" aria-label="Feature comparison between orchestration tools">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Bernstein</th>
              <th scope="col">CrewAI</th>
              <th scope="col">AutoGen</th>
              <th scope="col">LangGraph</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Orchestrator</td>
              <td>Deterministic code</td>
              <td className="partial">LLM-driven</td>
              <td className="partial">LLM-driven</td>
              <td className="partial">Graph + LLM</td>
            </tr>
            <tr>
              <td>CLI agent support</td>
              <td><span className="check">21 adapters</span></td>
              <td><span className="cross">No</span></td>
              <td><span className="cross">No</span></td>
              <td><span className="cross">No</span></td>
            </tr>
            <tr>
              <td>Git isolation</td>
              <td><span className="check">Worktrees</span></td>
              <td><span className="cross">No</span></td>
              <td><span className="cross">No</span></td>
              <td><span className="cross">No</span></td>
            </tr>
            <tr>
              <td>Quality gates</td>
              <td><span className="check">Built-in</span></td>
              <td><span className="cross">No</span></td>
              <td><span className="cross">No</span></td>
              <td className="partial">Partial</td>
            </tr>
            <tr>
              <td>Cost tracking</td>
              <td><span className="check">Per-agent</span></td>
              <td><span className="cross">No</span></td>
              <td><span className="cross">No</span></td>
              <td><span className="cross">No</span></td>
            </tr>
            <tr>
              <td>Cloud execution</td>
              <td><span className="check">&#10003; Cloudflare</span></td>
              <td><span className="cross">&#10007;</span></td>
              <td><span className="cross">&#10007;</span></td>
              <td><span className="cross">&#10007;</span></td>
            </tr>
            <tr>
              <td>Self-evolution</td>
              <td><span className="check">Built-in</span></td>
              <td><span className="cross">No</span></td>
              <td><span className="cross">No</span></td>
              <td><span className="cross">No</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
