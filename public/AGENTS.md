# Bernstein

> Multi-agent orchestration system for AI coding agents. Any model. One command.

## What This Is

Bernstein orchestrates AI coding agents (Claude Code, Codex, Gemini CLI, etc.) to work on software projects in parallel. It decomposes goals into tasks, assigns them to agents with appropriate models and roles, manages git worktree isolation, runs quality gates, and merges verified results.

## How To Use

Install: `pipx install bernstein`

Run with a goal:
```
bernstein -g "Add JWT auth with refresh tokens, tests, and API docs"
```

Run with a plan file:
```
bernstein run plans/my-project.yaml
```

## API

Task server runs at http://127.0.0.1:8052:
- POST /tasks — create a task
- GET /tasks?status=open — list tasks
- POST /tasks/{id}/complete — mark done
- POST /tasks/{id}/fail — mark failed
- GET /status — system dashboard
- POST /bulletin — post cross-agent finding

## MCP Server

Bernstein exposes an MCP server with tools: bernstein_run, bernstein_status, bernstein_tasks, bernstein_cost, bernstein_stop, bernstein_approve, bernstein_health.

## Key Facts

- License: Apache 2.0
- Language: Python 3.12+
- Adapters: 17 (Claude Code, Codex, Gemini, Cursor, Aider, Cloudflare Agents, and 11 more)
- Cloud: Cloudflare Workers with Durable Workflows, V8 sandboxes, R2, D1, Vectorize
- State: File-based (.sdd/), not in-memory
- Orchestrator: Deterministic Python, zero LLM tokens on scheduling
