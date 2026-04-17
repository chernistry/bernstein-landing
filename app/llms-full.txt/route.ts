import { getAllPosts } from '@/lib/mdx';
import { SITE_URL } from '@/lib/seo';

const BASE_CONTENT = `# Bernstein — Complete Technical Reference

> Open-source multi-agent orchestration system for AI coding agents.
> Orchestrate any AI coding agent. Any model. One command.

## Overview

Bernstein is a Python-based orchestration system that coordinates multiple AI coding agents working in parallel on a single codebase. It decomposes goals into tasks, assigns them to the most appropriate agents and models, isolates work in git worktrees, verifies results through quality gates, and merges verified output.

The orchestrator itself is deterministic Python code — no LLM tokens are spent on coordination, scheduling, or task management. LLMs are only used by the agents themselves to write code.

- **License**: Apache 2.0
- **Language**: Python 3.12+
- **Package Manager**: uv / pip / pipx
- **Author**: Alex Chernysh
- **Website**: https://bernstein.run
- **Repository**: https://github.com/chernistry/bernstein
- **PyPI**: https://pypi.org/project/bernstein/
- **Documentation**: https://bernstein.readthedocs.io/

---

## Installation

### Via pipx (recommended)
\`\`\`bash
pipx install bernstein
\`\`\`

### Via pip
\`\`\`bash
pip install bernstein
\`\`\`

### Via uv
\`\`\`bash
uv tool install bernstein
\`\`\`

### From source
\`\`\`bash
git clone https://github.com/chernistry/bernstein.git
cd bernstein
uv sync
\`\`\`

### Requirements
- Python 3.12 or later
- At least one supported CLI coding agent installed (e.g., Claude Code, Codex CLI, Gemini CLI)
- Git (for worktree isolation)

---

## Quick Start

### One-liner
\`\`\`bash
bernstein -g "add user authentication with JWT tokens"
\`\`\`

### With a plan file
\`\`\`bash
bernstein run plans/my-project.yaml
\`\`\`

### Basic workflow
1. Install Bernstein: \`pipx install bernstein\`
2. cd into your project directory
3. Run: \`bernstein -g "your goal here"\`
4. Bernstein decomposes the goal, spawns agents, and orchestrates the work
5. Review the results in your git history

---

## Architecture

### Design Principles

1. **Deterministic orchestrator**: The orchestrator is pure Python code. No LLM calls for scheduling, routing, or coordination. This makes behavior predictable, debuggable, and fast.

2. **File-based state**: All state lives in the \`.sdd/\` directory — backlog, runtime data, metrics, configuration. No in-memory-only state that would be lost on crash.

3. **Short-lived agents**: Agents handle 1-3 tasks each, then exit. No long-running agent processes. Fresh context per task prevents hallucination drift.

4. **Agent-agnostic**: Works with any CLI coding agent. Currently ships 17 adapters. Adding a new agent requires implementing a simple adapter interface.

5. **Model-per-task routing**: A contextual bandit router learns which model works best for each task type and complexity level. In our own runs, the bandit router cut spend roughly in half compared to uniformly using expensive models. Measure yours with bernstein cost.

### Core Sub-packages

The system is organized into 22 sub-packages under \`src/bernstein/core/\`:

#### Orchestration (\`orchestration/\`)
- Orchestrator lifecycle management
- Tick pipeline (the main event loop)
- Manager prompts and evolution
- Graceful drain and shutdown
- Bootstrap initialization

#### Agents (\`agents/\`)
- Agent spawner (launches CLI agents with appropriate configuration)
- Agent discovery (finds installed agents on the system)
- Heartbeat monitoring
- Idle detection and reaping
- Agent recycling
- Warm pool management

#### Tasks (\`tasks/\`)
- Task store (persistent task state)
- Task lifecycle (created -> assigned -> in_progress -> completed/failed)
- Retry logic with model escalation
- Completion verification
- Batch mode for bulk operations
- Dead letter queue for permanently failed tasks
- Fair scheduler across task priorities

#### Quality (\`quality/\`)
- Quality gates: lint, type checking, test execution, security scanning
- CI monitor integration
- Janitor for cleanup tasks
- Cross-model verifier (second opinion from different model)
- Semantic diff analysis

#### Server (\`server/\`)
- Task server (HTTP API on port 8052)
- API endpoints for task management
- Middleware for authentication and logging

#### Cost (\`cost/\`)
- Per-agent cost tracking
- Anomaly detection (alerts on unusual spending)
- Budget enforcement (hard limits per run)

#### Tokens (\`tokens/\`)
- Token usage monitoring per agent
- Context growth detection
- Auto-intervention when agents exceed token budgets

#### Security (\`security/\`)
- HMAC audit logs (tamper-evident)
- Policy engine for access control
- PII gating (prevents agents from accessing sensitive data)
- Credential scoping per agent

#### Configuration (\`config/\`)
- YAML-based configuration
- 150+ configurable parameters with sensible defaults
- Runtime configuration validation

#### Observability (\`observability/\`)
- Prometheus metrics export
- OpenTelemetry integration
- Grafana dashboard templates

#### Protocols (\`protocols/\`)
- MCP (Model Context Protocol) server mode
- A2A (Agent-to-Agent) protocol support
- Protocol negotiation for multi-system interop

#### Git (\`git/\`)
- Git worktree management (one per agent)
- Merge queue for ordering results
- Branch creation and cleanup

#### Persistence (\`persistence/\`)
- WAL (Write-Ahead Log) crash recovery
- File-based state persistence
- Periodic checkpointing

#### Planning (\`planning/\`)
- Plan file loading (YAML format)
- Goal decomposition into tasks
- Dependency resolution between tasks

#### Routing (\`routing/\`)
- Contextual bandit router
- Model selection based on task complexity
- Effort level selection (low/medium/high)
- Learning from task outcomes

#### Communication (\`communication/\`)
- Bulletin board for cross-agent messaging
- Finding sharing (one agent discovers something, others benefit)
- Blocker reporting

#### Knowledge (\`knowledge/\`)
- Knowledge graph of codebase structure
- Impact analysis (which files affect which)

#### Plugins (\`plugins_core/\`)
- Pluggy-based plugin system
- Extension points for custom quality gates, routers, etc.

---

## Supported Agents (17 Adapters)

| Agent | Description | Models |
|-------|-------------|--------|
| Claude Code | Anthropic's CLI agent | Opus 4.7, Sonnet 4.6, Haiku 4.5 |
| Codex CLI | OpenAI's CLI agent | GPT-5 family |
| Gemini CLI | Google's CLI agent | Gemini 2.5 Pro |
| Cursor | AI-powered editor CLI | Any model via Cursor |
| Aider | Open-source AI pair programmer | Any OpenAI/Anthropic model |
| Amp | Sourcegraph Amp | Sourcegraph models |
| Kiro | AWS Kiro CLI | AWS models |
| Kilo | Kilo coding agent | Any OpenAI-compatible |
| Qwen | Alibaba Qwen Agent | Qwen models |
| Goose | Block Goose CLI | Various |
| Ollama | Local model runner | Any local model |
| Cody | Sourcegraph Cody | Various |
| Continue | Continue.dev CLI | Various |
| OpenCode | Open-source coding agent | Any OpenAI-compatible |
| Cloudflare Agents | Workers + Workflows + Durable Objects | Workers AI |
| IaC | Terraform/Pulumi agent | Various |
| Generic | Adapter for any CLI tool | Any |

The generic adapter allows wrapping any CLI tool that accepts prompts and produces output.

---

## CLI Commands

### \`bernstein run [plan.yaml]\`
Run orchestration with an optional plan file. Without a plan, uses the default goal.

### \`bernstein -g "goal"\`
Set a goal in natural language and start orchestration.

### \`bernstein stop\`
Gracefully stop all running agents and the orchestrator.

### \`bernstein status\`
Show current orchestration status: running agents, task progress, cost.

### \`bernstein agents\`
List discovered agents and their availability.

### \`bernstein evolve\`
Trigger self-evolution: Bernstein plans and executes improvements to itself.

### \`bernstein cost\`
Show cost breakdown per agent, per model, per task.

---

## Task Server API

The task server runs on \`http://127.0.0.1:8052\` during orchestration.

### Endpoints

#### \`POST /tasks\`
Create a new task.
\`\`\`json
{
  "goal": "implement user login endpoint",
  "role": "backend",
  "priority": "high",
  "complexity": "medium"
}
\`\`\`

#### \`GET /tasks?status=open\`
List tasks filtered by status. Statuses: \`open\`, \`assigned\`, \`in_progress\`, \`completed\`, \`failed\`.

#### \`POST /tasks/{id}/complete\`
Mark a task as completed with results.

#### \`POST /tasks/{id}/fail\`
Mark a task as failed with error details.

#### \`POST /tasks/{id}/progress\`
Report intermediate progress.
\`\`\`json
{
  "files_changed": ["src/auth.py", "tests/test_auth.py"],
  "tests_passing": true,
  "errors": []
}
\`\`\`

#### \`POST /bulletin\`
Post a cross-agent finding or blocker.
\`\`\`json
{
  "type": "finding",
  "message": "Database schema uses UUID primary keys, not integers"
}
\`\`\`

#### \`GET /bulletin?since={timestamp}\`
Read recent bulletin board entries.

#### \`GET /status\`
Dashboard summary: agent count, task progress, cost, quality metrics.

---

## Plan Files (YAML)

Plan files describe multi-step projects with stages and steps.

\`\`\`yaml
name: "Add authentication"
stages:
  - name: database
    steps:
      - goal: "Create user table migration"
        role: backend
        complexity: low
      - goal: "Add password hashing utility"
        role: backend
        complexity: low

  - name: api
    depends_on: [database]
    steps:
      - goal: "Implement /login endpoint"
        role: backend
        complexity: medium
        priority: high
      - goal: "Implement /register endpoint"
        role: backend
        complexity: medium

  - name: testing
    depends_on: [api]
    steps:
      - goal: "Write integration tests for auth flow"
        role: qa
        complexity: medium
\`\`\`

### Plan fields
- \`name\`: Project name
- \`stages\`: List of stages
  - \`name\`: Stage identifier
  - \`depends_on\`: List of stage names that must complete first
  - \`steps\`: List of tasks
    - \`goal\`: What to accomplish
    - \`role\`: Agent role (backend, frontend, qa, security, devops, architect, docs, etc.)
    - \`priority\`: low, medium, high, critical
    - \`complexity\`: low, medium, high
    - \`scope\`: File or directory scope hint

---

## Configuration

Bernstein has 150+ configurable parameters. Key ones:

### Environment Variables
- \`BERNSTEIN_MAX_AGENTS\`: Maximum concurrent agents (default: 5)
- \`BERNSTEIN_DEFAULT_MODEL\`: Default model for tasks
- \`BERNSTEIN_BUDGET_LIMIT\`: Maximum cost per run in USD
- \`BERNSTEIN_QUALITY_GATES\`: Comma-separated list of quality gates to run

### Configuration File (\`.sdd/config.yaml\`)
\`\`\`yaml
orchestration:
  max_agents: 5
  tick_interval: 10
  drain_timeout: 300

routing:
  strategy: contextual_bandit
  epsilon: 0.1
  default_model: sonnet

quality:
  gates:
    - lint
    - typecheck
    - test
    - security
  retry_on_failure: true
  max_retries: 2
  escalate_model_on_retry: true

cost:
  budget_limit: 50.00
  alert_threshold: 0.8
  track_per_agent: true

git:
  worktree_base: .worktrees
  auto_merge: true
  merge_strategy: squash
\`\`\`

---

## Quality Gates

Quality gates run automatically on every task result before merge.

### Built-in Gates
1. **Lint** (ruff): Code style and common errors
2. **Type check** (pyright/mypy): Static type verification
3. **Tests** (pytest): Run test suite, check for regressions
4. **Security** (bandit/semgrep): Security vulnerability scanning
5. **Architecture conformance**: Verify changes follow project structure rules

### Gate Behavior
- Tasks that fail quality gates are retried
- On retry, the model may be escalated (e.g., Sonnet -> Opus)
- After max retries, tasks go to the dead letter queue
- Cross-model verification optionally gets a second opinion from a different model

---

## Cost Tracking

Bernstein tracks costs at multiple levels:

- **Per-agent**: How much each spawned agent costs
- **Per-model**: Breakdown by model (Opus vs Sonnet vs Haiku)
- **Per-task**: Cost attributed to each task
- **Per-run**: Total cost for the entire orchestration run

### Budget Enforcement
- Set a hard budget limit per run
- Alert threshold warns when approaching budget
- Automatic drain mode when budget exhausted (finish current tasks, don't start new ones)

### Anomaly Detection
- Detects unusual cost spikes
- Alerts on agents consuming more tokens than expected
- Auto-intervention for runaway agents (context growth detection)

---

## Security Features

- **HMAC audit logs**: Tamper-evident logging of all orchestration actions
- **Policy engine**: Define policies for what agents can and cannot do
- **PII gating**: Prevent agents from accessing files containing PII
- **Credential scoping**: Each agent gets only the credentials it needs
- **Git worktree isolation**: Agents cannot interfere with each other's work

---

## Observability

### Prometheus Metrics
Bernstein exports metrics to Prometheus:
- \`bernstein_tasks_total\` (counter, labels: status, role)
- \`bernstein_agents_active\` (gauge)
- \`bernstein_cost_usd\` (counter, labels: model, agent)
- \`bernstein_quality_gate_results\` (counter, labels: gate, result)
- \`bernstein_tick_duration_seconds\` (histogram)

### OpenTelemetry
Full distributed tracing support via OpenTelemetry:
- Spans for each orchestration tick
- Spans for agent spawn, task assignment, quality gate execution
- Trace context propagation to agents

### Grafana Dashboards
Pre-built dashboard templates for:
- Orchestration overview
- Cost analysis
- Quality trends
- Agent utilization

---

## Protocol Support

### MCP (Model Context Protocol)
Bernstein can run as an MCP server, exposing orchestration capabilities as tools:
- \`bernstein_run\`: Start orchestration
- \`bernstein_status\`: Check status
- \`bernstein_tasks\`: List and manage tasks
- \`bernstein_cost\`: View cost breakdown
- \`bernstein_stop\`: Stop orchestration

### A2A (Agent-to-Agent Protocol)
Support for Google's A2A protocol for inter-agent communication and task delegation.

---

## Roles

Bernstein assigns roles to agents based on task requirements:

| Role | Description |
|------|-------------|
| manager | High-level planning and decomposition |
| vp | Strategic oversight |
| backend | Backend implementation |
| frontend | Frontend implementation |
| qa | Testing and quality assurance |
| security | Security review and hardening |
| devops | CI/CD and infrastructure |
| architect | System design and architecture |
| docs | Documentation |
| reviewer | Code review |
| ml-engineer | Machine learning tasks |
| prompt-engineer | Prompt optimization |
| retrieval | Information retrieval |
| analyst | Analysis tasks |
| resolver | Conflict resolution |
| ci-fixer | CI/CD issue resolution |

---

## How It Compares

| Feature | Bernstein | CrewAI | AutoGen | LangGraph |
|---------|-----------|--------|---------|-----------|
| Orchestrator | Deterministic code | LLM-driven | LLM-driven | Graph + LLM |
| CLI agent support | 17 adapters | No | No | No |
| Git isolation | Worktrees | No | No | No |
| Quality gates | Built-in | No | No | Partial |
| Cost tracking | Per-agent | No | No | No |
| Self-evolution | Built-in | No | No | No |
| File-based state | Yes (.sdd/) | No | No | Checkpoints |
| Model routing | Contextual bandit | Manual | Manual | Manual |

---


## Cloud Execution (Cloudflare)

Bernstein can run agents on Cloudflare's edge network:

- **Workers Runtime**: Execute agents on Cloudflare Workers
- **Durable Workflows**: Map tasks to durable workflows with auto-retry and approval gates
- **V8 Sandbox Isolation**: Secure agent code execution in isolated V8 isolates
- **R2 Workspace Sync**: Upload/download workspace files during cloud execution
- **Workers AI**: Use Cloudflare's AI models for task decomposition and planning
- **D1 Analytics**: Serverless SQLite for usage tracking and billing
- **Vectorize Cache**: Semantic caching for LLM responses with embedding similarity
- **Browser Rendering**: Headless browser bridge for scraping and screenshots
- **MCP Remote Transport**: Expose Bernstein as an MCP server over HTTP
- **Cloud CLI**: \`bernstein cloud init/deploy/run/status/cost\` commands

## FAQ

### What is Bernstein?
Bernstein is an open-source multi-agent orchestration system that coordinates AI coding agents (like Claude Code, Codex, Gemini CLI) to work in parallel on your codebase. It decomposes goals into tasks, assigns them to agents, and verifies the results.

### How does Bernstein differ from CrewAI or AutoGen?
Bernstein's orchestrator is deterministic Python code — no LLM tokens are spent on coordination. It works with real CLI coding agents (not API-only models) and provides git worktree isolation, quality gates, and cost tracking out of the box.

### What agents does Bernstein support?
Bernstein ships 17 adapters for popular coding agents including Claude Code, Codex CLI, Gemini CLI, Cursor, Aider, Amp, Ollama, and more. It also has a generic adapter for wrapping any CLI tool.

### How does task routing work?
Bernstein uses a contextual bandit (epsilon-greedy) router that learns which model works best for each task type and complexity. Simple tasks go to cheaper models (Haiku, Flash), complex architecture tasks go to expensive models (Opus). In our own runs, the bandit router cut spend roughly in half compared to using expensive models for everything. Measure yours with bernstein cost.

### Is Bernstein free?
Yes. Bernstein is open-source under the Apache 2.0 license. You pay only for the AI model API usage of the agents themselves.

### Can I use Bernstein with local models?
Yes. Use the Ollama adapter to run fully local models. You can also mix local and cloud models in the same run.

### How does quality gating work?
After each agent completes a task, Bernstein runs configurable quality gates: linting (ruff), type checking (pyright), test execution (pytest), and security scanning (bandit/semgrep). Failed tasks are retried, potentially with a more capable model. After max retries, tasks go to a dead letter queue for manual review.

### What happens if an agent crashes?
Bernstein monitors agents via heartbeat. If an agent stops responding, it is reaped and the task is reassigned. Work-in-progress in the agent's worktree is preserved for potential recovery.

### Can I define multi-step projects?
Yes. YAML plan files let you define stages with dependencies, and steps with roles, priorities, and complexity levels. Stages execute in dependency order; steps within a stage can execute in parallel.

### Does Bernstein support MCP?
Yes. Bernstein can run as an MCP (Model Context Protocol) server, exposing its orchestration capabilities as tools that other MCP-compatible systems can invoke.

---

## Links

- Website: https://bernstein.run
- GitHub: https://github.com/chernistry/bernstein
- PyPI: https://pypi.org/project/bernstein/
- Documentation: https://bernstein.readthedocs.io/
- Issues: https://github.com/chernistry/bernstein/issues
- Author: https://alexchernysh.com`;

export async function GET() {
  const posts = await getAllPosts();

  let content = BASE_CONTENT;

  if (posts.length > 0) {
    const postList = posts
      .map((p) => `- [${p.fm.title}](https://bernstein.run/blog/${p.slug}) — ${p.fm.description}`)
      .join('\n');
    content += `\n\n---\n\n## Blog Posts\n\n${postList}`;
  }

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' },
  });
}
