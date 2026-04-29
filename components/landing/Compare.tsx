'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

type CellKind = 'yes' | 'no' | 'partial' | 'text';

interface Cell {
  kind: CellKind;
  text: string;
  aria?: string;
}

interface CompareRow {
  label: string;
  cells: Cell[];
  onlyBernstein?: boolean;
}

interface CompareTable {
  headers: string[];
  rows: CompareRow[];
}

const LAST_VERIFIED = 'verified 26 Apr 2026';

// Single merged comparison. One table, one story: which tools are in the
// market, and where each sits on the dimensions that matter when you pick
// an orchestrator for CLI coding agents. AutoGen is dropped — it entered
// maintenance mode in 2025 and its successor (Microsoft Agent Framework)
// is too new to be a useful reference point.
const mergedTable: CompareTable = {
  headers: ['Bernstein', 'emdash', 'Composio', 'CrewAI', 'LangGraph'],
  rows: [
    {
      label: 'Orchestrator',
      cells: [
        { kind: 'text', text: 'Deterministic code' },
        { kind: 'partial', text: '~ Desktop UI', aria: 'Partial: Desktop UI session manager' },
        { kind: 'partial', text: '~ Manual', aria: 'Partial: Manual scheduling' },
        { kind: 'partial', text: '~ LLM-driven', aria: 'Partial: LLM-driven plus code Flows' },
        { kind: 'partial', text: '~ Graph + LLM', aria: 'Partial: Graph + LLM' },
      ],
    },
    {
      label: 'CLI agent support',
      onlyBernstein: true,
      cells: [
        { kind: 'yes', text: '37 adapters', aria: 'Yes: 37 adapters' },
        { kind: 'partial', text: '~ several', aria: 'Partial: several agents' },
        { kind: 'partial', text: '~ few', aria: 'Partial: few agents' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
      ],
    },
    {
      label: 'Git isolation',
      cells: [
        { kind: 'yes', text: 'Worktree / sandbox', aria: 'Yes: Worktrees or cloud sandbox' },
        { kind: 'partial', text: '~ Worktree', aria: 'Partial: Worktrees only' },
        { kind: 'partial', text: '~ Worktree', aria: 'Partial: Worktrees only' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
      ],
    },
    {
      label: 'Quality gates',
      onlyBernstein: true,
      cells: [
        { kind: 'yes', text: 'Built-in', aria: 'Yes: Built-in janitor with concrete signals' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'partial', text: '~ Guardrails', aria: 'Partial: guardrails plus Pydantic output' },
        { kind: 'partial', text: '~ Edges', aria: 'Partial: conditional edges' },
      ],
    },
    {
      label: 'MCP server mode',
      cells: [
        { kind: 'yes', text: 'stdio + HTTP', aria: 'Yes: MCP server with stdio and HTTP' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'partial', text: '~ Tool mode', aria: 'Partial: MCP tool support only' },
      ],
    },
    {
      label: 'A2A support',
      onlyBernstein: true,
      cells: [
        { kind: 'yes', text: 'Native', aria: 'Yes: Native A2A protocol support' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
      ],
    },
    {
      label: 'Cost-aware routing',
      onlyBernstein: true,
      cells: [
        { kind: 'yes', text: 'Bandit', aria: 'Yes: Bandit-based cost-aware routing' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
      ],
    },
    {
      label: 'Cross-model verifier',
      onlyBernstein: true,
      cells: [
        { kind: 'yes', text: 'Built-in', aria: 'Yes: Cross-model verifier' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
      ],
    },
    {
      label: 'Sandbox backends',
      cells: [
        { kind: 'yes', text: '9 backends', aria: 'Yes: 9 sandbox backends' },
        { kind: 'no', text: 'Local only', aria: 'Local desktop only' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'partial', text: '~ Docker', aria: 'Partial: Docker only' },
        { kind: 'partial', text: '~ Docker', aria: 'Partial: Docker only' },
      ],
    },
    {
      label: 'Storage backends',
      cells: [
        { kind: 'yes', text: 'S3 / GCS / R2 / Blob', aria: 'Yes: S3, GCS, R2, Azure Blob' },
        { kind: 'no', text: 'SQLite', aria: 'SQLite only' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'partial', text: '~ LangSmith', aria: 'Partial: via LangSmith' },
      ],
    },
    {
      label: 'Observability',
      cells: [
        { kind: 'yes', text: 'Prometheus + OTel', aria: 'Yes: Prometheus and OpenTelemetry' },
        { kind: 'partial', text: '~ Desktop logs', aria: 'Partial: Desktop logs' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'partial', text: '~ usage_metrics', aria: 'Partial: usage_metrics attribute' },
        { kind: 'partial', text: '~ LangSmith', aria: 'Partial: via LangSmith tracer' },
      ],
    },
    {
      label: 'Retry + bandit',
      onlyBernstein: true,
      cells: [
        { kind: 'yes', text: 'Built-in', aria: 'Yes: Retry and bandit built-in' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
      ],
    },
    {
      label: 'Worktree merge queue',
      onlyBernstein: true,
      cells: [
        { kind: 'yes', text: 'Built-in', aria: 'Yes: Worktree merge queue' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
      ],
    },
    {
      label: 'Chat bridges',
      onlyBernstein: true,
      cells: [
        { kind: 'yes', text: 'Telegram live', aria: 'Yes: Telegram live' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
      ],
    },
    {
      label: 'Remote SSH',
      onlyBernstein: true,
      cells: [
        { kind: 'yes', text: 'ControlMaster reuse', aria: 'Yes: ControlMaster reuse' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
      ],
    },
    {
      label: 'Lifecycle hooks',
      onlyBernstein: true,
      cells: [
        { kind: 'yes', text: 'pre/post × 3', aria: 'Yes: pre/post times 3' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
      ],
    },
    {
      label: 'Auto-PR generation',
      onlyBernstein: true,
      cells: [
        { kind: 'yes', text: 'janitor + cost body', aria: 'Yes: janitor plus cost body' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
      ],
    },
    {
      label: 'Tunnel wrapper',
      onlyBernstein: true,
      cells: [
        { kind: 'yes', text: '4 providers', aria: 'Yes: 4 providers' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
      ],
    },
    {
      label: 'Interactive approval',
      onlyBernstein: true,
      cells: [
        { kind: 'yes', text: 'TUI + web + CLI', aria: 'Yes: TUI plus web plus CLI' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
        { kind: 'no', text: 'No', aria: 'No' },
      ],
    },
    {
      label: 'Primary language',
      cells: [
        { kind: 'text', text: 'Python' },
        { kind: 'text', text: 'TypeScript / Electron' },
        { kind: 'text', text: 'TypeScript' },
        { kind: 'text', text: 'Python' },
        { kind: 'text', text: 'Python / JS' },
      ],
    },
    {
      label: 'License',
      cells: [
        { kind: 'text', text: 'Apache-2.0' },
        { kind: 'text', text: 'MIT' },
        { kind: 'text', text: 'MIT' },
        { kind: 'text', text: 'MIT' },
        { kind: 'text', text: 'MIT' },
      ],
    },
  ],
};

function Chip({ kind, text }: { kind: CellKind; text: string }) {
  if (kind === 'yes') return <span className="check">&#10003; {text}</span>;
  if (kind === 'no') return <span className="cross">&#10007; {text}</span>;
  if (kind === 'partial') return <span>{text}</span>;
  return <span>{text}</span>;
}

function TableRowReveal({ children, delay }: { children: ReactNode; delay: number }) {
  const ref = useRef<HTMLTableRowElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <tr
      ref={ref}
      className={`table-row-reveal ${visible ? 'revealed' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </tr>
  );
}

function CompareTableView({ table }: { table: CompareTable }) {
  return (
    <div className="table-wrap compare-scroll" tabIndex={0} role="region" aria-label="Comparison table, scroll horizontally">
      <table className="compare-table" role="table" aria-label="Feature comparison">
        <thead>
          <tr>
            <th scope="col"></th>
            {table.headers.map((h) => (
              <th key={h} scope="col">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => {
            const partialClass = (kind: CellKind) => (kind === 'partial' ? 'partial' : '');
            return (
              <TableRowReveal key={row.label} delay={Math.min(i * 40, 300)}>
                <td>
                  <span className="compare-row-label">{row.label}</span>
                  {row.onlyBernstein && (
                    <span className="compare-only" aria-label="Only Bernstein supports this">
                      &#9670; only Bernstein
                    </span>
                  )}
                </td>
                {row.cells.map((cell, j) => (
                  <td
                    key={j}
                    className={partialClass(cell.kind)}
                    aria-label={cell.aria ?? cell.text}
                  >
                    <Chip kind={cell.kind} text={cell.text} />
                  </td>
                ))}
              </TableRowReveal>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function Compare() {
  return (
    <section id="compare" aria-labelledby="compare-heading">
      <ScrollReveal>
        <div className="section-header compare-header">
          <div className="compare-header-top">
            <h2 id="compare-heading">How it compares</h2>
            <span className="compare-verified" aria-label={`Last ${LAST_VERIFIED}`}>{LAST_VERIFIED}</span>
          </div>
          <p>
            Python-native, MCP-server-first, widest adapter coverage. One table, the dimensions that matter when you pick an orchestrator for CLI coding agents.
          </p>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={160}>
        <CompareTableView table={mergedTable} />
      </ScrollReveal>
      <ScrollReveal delay={220}>
        <p className="compare-footnote">
          Bootstrapped, Apache 2.0, no hosted control plane. If the table resonates and you invest in developer infrastructure &mdash; <a href="mailto:forte@bernstein.run">forte@bernstein.run</a>.
        </p>
      </ScrollReveal>
    </section>
  );
}
