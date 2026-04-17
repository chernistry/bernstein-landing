"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is Bernstein?",
    answer:
      "Bernstein is an open-source multi-agent orchestration system that coordinates AI coding agents (like Claude Code, Codex, Gemini CLI) to work in parallel on your codebase. It decomposes goals into tasks, assigns them to agents with isolated git worktrees, and verifies results through quality gates before merging.",
  },
  {
    question: "How do I install Bernstein?",
    answer:
      "Install with pipx install bernstein (recommended), or use pip install bernstein or uv pip install bernstein. Homebrew support is coming soon. Requires Python 3.12+ and at least one supported CLI coding agent installed.",
  },
  {
    question: "What AI coding agents does Bernstein support?",
    answer:
      "Bernstein ships 17 adapters: Claude Code, Codex CLI, Gemini CLI, Cursor, Aider, Amp, Kiro, Kilo, Qwen, Goose, Cody, Continue, OpenCode, Ollama, Cloudflare Agents, IaC, and a Generic adapter that wraps any CLI tool.",
  },
  {
    question: "How does Bernstein differ from CrewAI or AutoGen?",
    answer:
      "Bernstein\u2019s orchestrator is deterministic Python code \u2014 zero LLM tokens spent on coordination. It works with real CLI coding agents (not toy wrappers), provides git worktree isolation per agent, runs quality gates on every output, tracks costs, and uses an epsilon-greedy bandit to route tasks to the best model. CrewAI and AutoGen use LLM-driven coordination and don\u2019t support CLI agents.",
  },
  {
    question: "Can Bernstein run agents in the cloud?",
    answer:
      "Yes. Bernstein includes a Cloudflare Workers integration with Durable Workflows for long-running orchestration, V8 isolate sandboxes for agent execution, R2 storage for artifacts, and KV for state. You can also run it on any server with SSH access.",
  },
  {
    question: "Is Bernstein free?",
    answer:
      "Yes. Bernstein is open-source under the Apache 2.0 license. You only pay for the AI model API usage of the agents themselves (e.g. your Anthropic or OpenAI API key).",
  },
  {
    question: "What is the Bernstein task server API?",
    answer:
      "Bernstein runs a local REST API on port 8052. Endpoints include POST /tasks (create), GET /tasks?status=open (list), POST /tasks/{id}/complete, POST /tasks/{id}/fail, POST /bulletin (cross-agent findings), and GET /status (dashboard). Agents use this API to coordinate without direct communication.",
  },
  {
    question: "Does Bernstein support MCP?",
    answer:
      "Yes. Bernstein exposes an MCP (Model Context Protocol) server that lets any MCP-compatible client control orchestration \u2014 create tasks, check status, approve merges, and monitor costs through standard MCP tool calls.",
  },
  {
    question: "How does quality verification work?",
    answer:
      "Quality gates run automatically on every agent output before merge. They execute lint (Ruff), type checking (Pyright), tests (pytest), and security scans. A cross-model verifier can optionally have a second model review the diff. Only outputs that pass all gates get merged to the target branch.",
  },
  {
    question: "What models does Bernstein use for task routing?",
    answer:
      "Bernstein routes tasks to the optimal model based on complexity: Opus for architecture and hard problems, Sonnet for standard implementation, Haiku for tests and boilerplate. An epsilon-greedy contextual bandit learns which model performs best for each task type over time.",
  },
];

function ChevronDown() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="faq-chevron"
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item${open ? " faq-item--open" : ""}`}>
      <button
        className="faq-question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{item.question}</span>
        <ChevronDown />
      </button>
      {open && (
        <div className="faq-answer">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  return (
    <section className="faq" id="faq">
      <ScrollReveal>
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p className="section-sub">
            Common questions about Bernstein, answered.
          </p>
        </div>
      </ScrollReveal>
      <div className="faq-list">
        {FAQ_ITEMS.map((item, i) => (
          <ScrollReveal key={i} delay={i * 40}>
            <FAQAccordionItem item={item} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
