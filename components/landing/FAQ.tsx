"use client";

import { useState, type ReactNode } from "react";
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
      "Bernstein ships 31 adapters: Claude Code, Codex CLI, Gemini CLI, OpenAI Agents SDK, Cursor, Aider, Amp, Kiro, Kilo, Qwen, Goose, Cody, Continue, OpenCode, Ollama, Cloudflare Agents, IaC, GitHub Copilot, Droid (Factory AI), Crush (Charm), Auggie (Augment), Kimi, Rovo Dev (Atlassian), Cline, Codebuff, Pi, Mistral Vibe, Autohand, Forge, Hermes, and a Generic adapter that wraps any CLI tool.",
  },
  {
    question: "How does Bernstein differ from CrewAI or AutoGen?",
    answer:
      "Bernstein’s orchestrator is deterministic Python code — zero LLM tokens spent on coordination. It works with real CLI coding agents (not toy wrappers), provides git worktree isolation per agent, runs quality gates on every output, tracks costs, and uses an epsilon-greedy bandit to route tasks to the best model. CrewAI and AutoGen use LLM-driven coordination and don’t support CLI agents.",
  },
  {
    question: "Can Bernstein run agents in the cloud?",
    answer:
      "Yes. Bernstein includes a Cloudflare Workers integration with Durable Workflows for long-running orchestration, V8 isolate sandboxes for agent execution, R2 storage for artifacts, and KV for state. You can also run it on any server with SSH access.",
  },
  {
    question: "What sandbox backends does Bernstein support?",
    answer:
      "Bernstein abstracts agent isolation behind a SandboxBackend protocol. Out of the box it supports git worktrees (local), Docker containers, and hosted sandboxes from E2B, Modal, Blaxel, Cloudflare, Daytona, Runloop, and Vercel. Swap backends in bernstein.yaml; the orchestrator is unchanged.",
  },
  {
    question: "Can I store .sdd/ state and artifacts in the cloud?",
    answer:
      "Yes. Artifacts (task state, bulletins, metrics, WAL) flow through a BufferedSink wrapper that speaks to pluggable storage backends: local disk, Amazon S3, Google Cloud Storage, Azure Blob Storage, or Cloudflare R2. Configure under the storage block in bernstein.yaml; agents keep reading and writing through the same local-file API.",
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
      "Yes. Bernstein exposes an MCP (Model Context Protocol) server that lets any MCP-compatible client control orchestration — create tasks, check status, approve merges, and monitor costs through standard MCP tool calls.",
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
  {
    question: "What are progressive skill packs?",
    answer:
      "Instead of loading every role prompt at startup, Bernstein ships skills as progressive-disclosure packs. Agents start with a short system prompt and pull extra context on demand through the load_skill MCP tool — only the skills a task actually needs are paid for in tokens. Skills are versioned bundles under templates/skills/ and can be added without shipping a release.",
  },
];

type GroupKey = "getting-started" | "capabilities" | "cloud-storage" | "licensing";

const GROUP_LABELS: Record<GroupKey, string> = {
  "getting-started": "Getting started",
  capabilities: "Capabilities",
  "cloud-storage": "Cloud & storage",
  licensing: "Licensing",
};

// Maps a question (by its starts-with prefix) to its bucket.
function groupFor(question: string): GroupKey {
  if (question.startsWith("What is Bernstein")) return "getting-started";
  if (question.startsWith("How do I install")) return "getting-started";
  if (question.startsWith("What AI coding agents")) return "getting-started";
  if (question.startsWith("Is Bernstein free")) return "licensing";
  if (question.startsWith("Can Bernstein run agents in the cloud")) return "cloud-storage";
  if (question.startsWith("What sandbox backends")) return "cloud-storage";
  if (question.startsWith("Can I store .sdd/")) return "cloud-storage";
  return "capabilities";
}

const GROUP_ORDER: GroupKey[] = [
  "getting-started",
  "capabilities",
  "cloud-storage",
  "licensing",
];

const SUPPORTED_AGENTS = [
  "Claude Code",
  "Codex CLI",
  "Gemini CLI",
  "OpenAI Agents SDK",
  "Cursor",
  "Aider",
  "Amp",
  "Kiro",
  "Kilo",
  "Qwen",
  "Goose",
  "Cody",
  "Continue",
  "OpenCode",
  "Ollama",
  "Cloudflare Agents",
  "IaC",
  "GitHub Copilot",
  "Droid",
  "Crush",
  "Auggie",
  "Kimi",
  "Rovo Dev",
  "Cline",
  "Codebuff",
  "Pi",
  "Mistral Vibe",
  "Autohand",
  "Forge",
  "Hermes",
  "Generic",
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

function renderAnswer(item: FAQItem): ReactNode {
  if (item.question.startsWith("How do I install")) {
    return (
      <>
        <p>
          Install with pipx (recommended), or use pip / uv. Homebrew support is
          coming soon. Requires Python 3.12+ and at least one supported CLI
          coding agent installed.
        </p>
        <pre className="faq-code-block" aria-label="Install commands">
          <code>{`pipx install bernstein
pip install bernstein
uv pip install bernstein`}</code>
        </pre>
      </>
    );
  }

  if (item.question.startsWith("What AI coding agents")) {
    return (
      <>
        <p>
          Bernstein ships 31 adapters covering the major CLI coding agents plus
          a generic wrapper for any CLI tool:
        </p>
        <ul className="faq-pill-row" role="list">
          {SUPPORTED_AGENTS.map((name) => (
            <li key={name} className="faq-pill">
              {name}
            </li>
          ))}
        </ul>
      </>
    );
  }

  return <p>{item.answer}</p>;
}

interface AccordionItemProps {
  item: FAQItem;
  index: number;
  open: boolean;
  onToggle: (index: number) => void;
}

function FAQAccordionItem({ item, index, open, onToggle }: AccordionItemProps) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className={`faq-item${open ? " faq-item--open" : ""}`}>
      <button
        id={buttonId}
        className="faq-question"
        onClick={() => onToggle(index)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span>{item.question}</span>
        <ChevronDown />
      </button>
      {open && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="faq-answer"
        >
          {renderAnswer(item)}
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  // Group items while preserving original order inside each bucket.
  const grouped = GROUP_ORDER.map((group) => ({
    group,
    items: FAQ_ITEMS.map((item, originalIndex) => ({ item, originalIndex }))
      .filter(({ item }) => groupFor(item.question) === group),
  })).filter(({ items }) => items.length > 0);

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
      <ScrollReveal>
        <div className="faq-toolbar">
          <button
            type="button"
            className="faq-collapse-all"
            onClick={() => setOpenIndex(null)}
            disabled={openIndex === null}
          >
            Collapse all
          </button>
        </div>
        <div className="faq-list">
          {grouped.map(({ group, items }) => (
            <div key={group} className="faq-group">
              <h3 className="faq-group-eyebrow">{GROUP_LABELS[group]}</h3>
              <div className="faq-group-items">
                {items.map(({ item, originalIndex }) => (
                  <FAQAccordionItem
                    key={originalIndex}
                    item={item}
                    index={originalIndex}
                    open={openIndex === originalIndex}
                    onToggle={handleToggle}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
