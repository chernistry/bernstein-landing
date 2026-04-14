export function AgentsGrid() {
  const agents = [
    { name: 'Claude Code', models: 'Opus, Sonnet, Haiku' },
    { name: 'Codex CLI', models: 'GPT-5.4, GPT-5.4-mini' },
    { name: 'Gemini CLI', models: 'Gemini 3.1 Pro, 3 Flash' },
    { name: 'Cursor', models: 'Any model via Cursor' },
    { name: 'Aider', models: 'Any OpenAI/Anthropic' },
    { name: 'Ollama', models: 'Local, fully offline' },
    { name: 'Amp', models: 'Sourcegraph Amp' },
    { name: 'Goose', models: 'Block Goose CLI' },
    { name: 'Roo Code', models: 'VS Code extension CLI' },
    { name: 'Kiro', models: 'AWS Kiro CLI' },
    { name: 'Qwen', models: 'Alibaba Qwen Agent' },
    { name: '+18 more', models: 'Generic CLI adapter' },
  ];

  return (
    <section id="agents">
      <div className="section-header">
        <h2>Works with every major coding agent</h2>
        <p>Mix local models for boilerplate with cloud models for architecture. In the same run.</p>
      </div>
      <div className="agents-grid">
        {agents.map((agent) => (
          <div className="agent-card" key={agent.name}>
            <div>
              <div className="agent-name">{agent.name}</div>
              <div className="agent-models">{agent.models}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
