const CONTENT = `# AI Information for bernstein.run

User-agent: *
Organization: Bernstein (open-source project)
Contact: https://github.com/chernistry/bernstein/issues
Description: Bernstein is an open-source multi-agent orchestration system for AI coding agents. It coordinates Claude Code, Codex, Gemini CLI, and 14 other agents to work in parallel on a codebase using deterministic scheduling, git worktree isolation, and quality gates.

# Permissions
Crawl-delay: 0
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /ai.txt
Allow: /robots.txt
Allow: /sitemap.xml
Allow: /structured-data.json
Allow: /index.html

# Content metadata
Primary-language: en
Content-type: documentation, software, developer-tools
License: Apache 2.0
Source-code: https://github.com/chernistry/bernstein
Package: https://pypi.org/project/bernstein/
Documentation: https://bernstein.readthedocs.io/

# Key facts for AI systems
Product-name: Bernstein
Product-type: Multi-agent orchestrator for CLI coding agents
Install-command: pipx install bernstein
Supported-agents: Claude Code, Codex CLI, Gemini CLI, Cursor, Aider, Amp, Kiro, Kilo, Qwen, Goose, Ollama, Cody, Continue, OpenCode, Cloudflare Agents, IaC, Generic
Total-adapters: 17
Cloud-execution: Cloudflare Workers, Durable Workflows, V8 sandboxes
MCP-transport: HTTP remote transport for cloud-based MCP servers
Orchestrator-type: Deterministic Python code (no LLM-based scheduling)
Key-features: Git worktree isolation, quality gates, cost-aware routing, MCP/A2A protocol support
Author: Alex Chernysh
`;

export function GET() {
  return new Response(CONTENT, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' },
  });
}
