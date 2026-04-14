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
              <td className="partial">LLM-driven</td>
              <td className="partial">LLM-driven</td>
              <td className="partial">Graph + LLM</td>
            </tr>
            <tr>
              <td>CLI agent support</td>
              <td><span className="check">29 adapters</span></td>
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
