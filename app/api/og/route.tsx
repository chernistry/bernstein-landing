import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Bernstein';
  const isDefault = !searchParams.get('title');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          background: '#131316',
          color: '#f0f0f2',
          fontFamily: 'Inter, system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(110,110,128,0.15) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)',
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(100,100,180,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Top bar with logo and stats */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Terminal icon */}
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(110,110,180,0.15)',
                border: '1px solid rgba(110,110,180,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: '#8888bb',
              }}
            >
              &gt;_
            </div>
            <span style={{ fontSize: 22, color: '#a0a0b0', fontWeight: 500, letterSpacing: '-0.01em' }}>
              bernstein.run
            </span>
          </div>

          {/* Social proof pills */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: 14,
                color: '#c0c0d0',
              }}
            >
              <span style={{ color: '#ffcc00' }}>&#9733;</span> 125+ stars
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: 14,
                color: '#c0c0d0',
              }}
            >
              17 adapters
            </div>
          </div>
        </div>

        {/* Main title */}
        <div style={{ display: 'flex', flexDirection: 'column', zIndex: 1, flex: 1, justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: isDefault ? 56 : 48,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              maxWidth: '900px',
            }}
          >
            {isDefault
              ? 'Orchestrate parallel AI agents on your codebase'
              : title}
          </div>
          {isDefault && (
            <div style={{ display: 'flex', fontSize: 20, color: '#6e6e80', marginTop: 20, maxWidth: '700px', lineHeight: 1.5 }}>
              Run Claude Code, Codex, and Gemini CLI simultaneously. Deterministic scheduling. Quality gates. Any model.
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                padding: '8px 20px',
                borderRadius: '6px',
                background: '#3a3a5c',
                color: '#e0e0f0',
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              pipx install bernstein
            </div>
          </div>
          <div style={{ fontSize: 14, color: '#6e6e80' }}>
            Open source &middot; Apache 2.0
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
