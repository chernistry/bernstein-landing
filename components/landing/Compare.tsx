'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

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
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
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

export function Compare() {
  return (
    <section id="compare">
      <ScrollReveal>
        <div className="section-header">
          <h2>How it compares</h2>
          <p>Different category, different architecture.</p>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={200}>
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
              <TableRowReveal delay={0}>
                <td>Orchestrator</td>
                <td>Deterministic code</td>
                <td className="partial">LLM-driven</td>
                <td className="partial">LLM-driven</td>
                <td className="partial">Graph + LLM</td>
              </TableRowReveal>
              <TableRowReveal delay={80}>
                <td>CLI agent support</td>
                <td><span className="check">29 adapters</span></td>
                <td><span className="cross">No</span></td>
                <td><span className="cross">No</span></td>
                <td><span className="cross">No</span></td>
              </TableRowReveal>
              <TableRowReveal delay={160}>
                <td>Git isolation</td>
                <td><span className="check">Worktrees</span></td>
                <td><span className="cross">No</span></td>
                <td><span className="cross">No</span></td>
                <td><span className="cross">No</span></td>
              </TableRowReveal>
              <TableRowReveal delay={240}>
                <td>Quality gates</td>
                <td><span className="check">Built-in</span></td>
                <td><span className="cross">No</span></td>
                <td><span className="cross">No</span></td>
                <td className="partial">Partial</td>
              </TableRowReveal>
              <TableRowReveal delay={320}>
                <td>Cost tracking</td>
                <td><span className="check">Per-agent</span></td>
                <td><span className="cross">No</span></td>
                <td><span className="cross">No</span></td>
                <td><span className="cross">No</span></td>
              </TableRowReveal>
              <TableRowReveal delay={400}>
                <td>Self-evolution</td>
                <td><span className="check">Built-in</span></td>
                <td><span className="cross">No</span></td>
                <td><span className="cross">No</span></td>
                <td><span className="cross">No</span></td>
              </TableRowReveal>
            </tbody>
          </table>
        </div>
      </ScrollReveal>
    </section>
  );
}
