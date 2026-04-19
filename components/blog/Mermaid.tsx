'use client';

import { useEffect, useRef, useState } from 'react';

interface MermaidProps {
  chart: string;
}

export function normalizeMermaidSvg(svgMarkup: string): string {
  if (typeof DOMParser === 'undefined' || typeof XMLSerializer === 'undefined') {
    return svgMarkup;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(svgMarkup, 'image/svg+xml');
  const svg = doc.querySelector('svg');

  if (!svg) {
    return svgMarkup;
  }

  const currentStyle = svg.getAttribute('style') ?? '';
  const strippedStyle = currentStyle
    .trim()
    .replace(/;?\s*(width|max-width|height|display|margin)\s*:[^;]+;?/gi, '');

  const normalizedStyle = [
    strippedStyle,
    'width: 100%',
    'max-width: 100%',
    'height: auto',
    'max-height: 520px',
    'display: block',
  ]
    .filter(Boolean)
    .join('; ');

  svg.removeAttribute('width');
  svg.removeAttribute('height');
  svg.setAttribute('style', normalizedStyle);
  svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');

  return new XMLSerializer().serializeToString(svg);
}

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current || !chart) {
      return;
    }

    let cancelled = false;
    const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;
    setError(null);

    void import('mermaid')
      .then((module) => {
        if (cancelled) return;
        const mermaid = module.default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
          fontFamily: 'inherit',
          themeVariables: {
            darkMode: true,
            background: 'transparent',
            primaryColor: '#1f1f23',
            primaryTextColor: '#e5e5e7',
            primaryBorderColor: '#3a3a40',
            lineColor: '#6b6b73',
            secondaryColor: '#26262c',
            tertiaryColor: '#2c2c33',
            mainBkg: '#1f1f23',
            secondBkg: '#26262c',
            nodeBorder: '#3a3a40',
            clusterBkg: '#18181b',
            clusterBorder: '#2a2a2f',
            edgeLabelBackground: '#18181b',
            textColor: '#e5e5e7',
          },
        });
        return mermaid.render(id, chart);
      })
      .then((result) => {
        if (!result || cancelled) return;
        setSvg(normalizeMermaidSvg(result.svg));
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Mermaid render error:', err);
        setError('Failed to render diagram.');
      });

    return () => {
      cancelled = true;
    };
  }, [chart]);

  useEffect(() => {
    if (!svg || !ref.current) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const svgEl = ref.current?.querySelector('svg');
        if (!svgEl) return;

        try {
          const bbox = svgEl.getBBox();
          if (bbox.height <= 0 || bbox.width <= 0) return;

          const pad = 20;
          const vbX = Math.floor(bbox.x - pad);
          const vbY = Math.floor(bbox.y - pad);
          const vbW = Math.ceil(bbox.width + pad * 2);
          const vbH = Math.ceil(bbox.height + pad * 2);

          svgEl.setAttribute('viewBox', `${vbX} ${vbY} ${vbW} ${vbH}`);
          svgEl.style.height = 'auto';
          svgEl.style.maxHeight = 'none';
          svgEl.style.width = '100%';
        } catch {
          // getBBox can throw in detached SVG elements
        }
      });
    });
  }, [svg]);

  if (error) {
    return (
      <div className="mermaid-diagram mermaid-diagram--error">
        <p>{error}</p>
        <pre>{chart}</pre>
      </div>
    );
  }

  return (
    <div ref={ref} className="mermaid-diagram">
      <div
        className="mermaid-diagram-canvas"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}

export default Mermaid;
