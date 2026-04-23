// Inline-SVG flow diagram for "How it works". All paths are segmented
// so arrows never cross labels; agent colors resolve from CSS tokens.

export function HowItWorksDiagram() {
  const rows = [
    { y: 44, label: '[agent-1] · sonnet', color: 'oklch(0.78 0.1 260)', next: 'janitor', ok: true },
    { y: 80, label: '[agent-2] · codex',  color: 'oklch(0.78 0.1 150)', next: 'janitor', ok: true },
    { y: 116, label: '[agent-3] · haiku',  color: 'oklch(0.82 0.12 60)', next: 'janitor', ok: true },
    { y: 152, label: '[agent-4] · gemini', color: 'oklch(0.78 0.1 0)',   next: 'fail',    ok: false },
  ];

  // Column boundaries — each arrow is drawn inside the gap between two text
  // columns so glyphs never overlap path strokes.
  const X_GOAL = 14;
  const X_GOAL_END = 52;
  const X_SPINE_IN = 72;
  const X_ARR1_END = 112; // arrowhead tip, just before agent-text column
  const X_AGENT = 120;
  const X_ARR2_START = 276; // starts after the longest agent label ends
  const X_ARR2_END = 320;
  const X_NEXT = 328;
  const X_ARR3_START = 398; // starts after "janitor"/"fail" ends
  const X_SPINE_OUT = 446;
  const X_ARR_MERGE_END = 506;
  const X_MERGE = 514;

  const ROW_MERGE_CENTER = rows[1].y; // centre of the 3 successful lanes
  const RETRY_Y = 196;

  return (
    <svg
      className="how-diagram"
      viewBox="0 0 720 220"
      role="img"
      aria-label="Goal fans out to four parallel agents. Three succeed through the janitor and merge to main. The fourth fails and retries with an escalated model via the bandit."
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker
          id="how-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="var(--text-muted)" />
        </marker>
        <marker
          id="how-arrow-accent"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-hover)" />
        </marker>
      </defs>

      {/* goal label */}
      <text x={X_GOAL} y={rows[0].y} className="how-t how-t-muted">goal</text>
      {/* goal -> fan-out spine (horizontal at row 1) */}
      <path d={`M ${X_GOAL_END} ${rows[0].y} L ${X_SPINE_IN} ${rows[0].y}`} className="how-edge" />
      {/* vertical fan-out spine */}
      <path d={`M ${X_SPINE_IN} ${rows[0].y} L ${X_SPINE_IN} ${rows[rows.length - 1].y}`} className="how-edge" />

      {rows.map((r) => (
        <g key={r.label}>
          {/* spine -> agent arrow */}
          <path
            d={`M ${X_SPINE_IN} ${r.y} L ${X_ARR1_END} ${r.y}`}
            className="how-edge"
            markerEnd="url(#how-arrow)"
          />
          {/* agent label */}
          <text x={X_AGENT} y={r.y} className="how-t how-t-mono" fill={r.color}>
            {r.label}
          </text>
          {/* agent -> next arrow */}
          <path
            d={`M ${X_ARR2_START} ${r.y} L ${X_ARR2_END} ${r.y}`}
            className="how-edge"
            markerEnd="url(#how-arrow)"
          />
          {/* next label */}
          <text
            x={X_NEXT}
            y={r.y}
            className={`how-t how-t-mono ${r.ok ? 'how-t-janitor' : 'how-t-fail'}`}
          >
            {r.next}
          </text>
        </g>
      ))}

      {/* janitor -> merge-spine connectors (plain edges, no marker) */}
      {rows.slice(0, 3).map((r) => (
        <path
          key={`to-spine-${r.y}`}
          d={`M ${X_ARR3_START} ${r.y} L ${X_SPINE_OUT} ${r.y}`}
          className="how-edge"
        />
      ))}
      {/* merge spine (vertical) */}
      <path
        d={`M ${X_SPINE_OUT} ${rows[0].y} L ${X_SPINE_OUT} ${rows[2].y}`}
        className="how-edge"
      />
      {/* merge-spine -> merge arrow */}
      <path
        d={`M ${X_SPINE_OUT} ${ROW_MERGE_CENTER} L ${X_ARR_MERGE_END} ${ROW_MERGE_CENTER}`}
        className="how-edge"
        markerEnd="url(#how-arrow)"
      />
      {/* merge label */}
      <text x={X_MERGE} y={ROW_MERGE_CENTER} className="how-t how-t-mono how-t-ok">
        merge → main ✓
      </text>

      {/* retry branch: thin dashed line from under "fail" to the retry row */}
      <path
        d={`M ${X_NEXT + 14} ${rows[3].y + 10} L ${X_NEXT + 14} ${RETRY_Y - 6}`}
        className="how-edge-retry"
      />
      <text x={X_NEXT + 28} y={RETRY_Y} className="how-t how-t-mono how-t-accent">
        ↻ retry w/ escalated model ← bandit
      </text>
    </svg>
  );
}
