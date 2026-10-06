import React from 'react';
import { ATELIER_DATA } from '../../data/atelier';

export default function AtelierPage({ onOpenBooking }) {
  return (
    <div style={{ paddingBottom: '96px' }}>
      {/* Hero Header */}
      <div style={{
        background: 'var(--plum-deep)',
        color: 'var(--ivory)',
        padding: '80px 0 72px',
        borderBottom: '1px solid var(--line)',
        textAlign: 'center'
      }}>
        <div className="wrap">
          <span style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: 'var(--gold-light)',
            display: 'block',
            marginBottom: '12px'
          }}>
            Since 1998 · Jaipur, Rajasthan
          </span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            color: 'var(--ivory)',
            marginBottom: '18px',
            lineHeight: 1.1
          }}>
            The Jaipur Courtyard
          </h1>
          <p style={{
            maxWidth: '54ch',
            margin: '0 auto',
            color: '#cbb9c0',
            fontSize: '1.1rem',
            lineHeight: 1.65
          }}>
            Nine master artisans, single-layer shears, and a generational discipline of precision. Where time slows down so the dress can speak.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        background: 'var(--plum)',
        color: 'var(--ivory)',
        borderBottom: '1px solid var(--line)',
        padding: '36px 0'
      }}>
        <div className="wrap">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            textAlign: 'center'
          }} className="stats-bar">
            {ATELIER_DATA.stats.map((stat, i) => (
              <div key={i}>
                <b style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '2.5rem',
                  color: 'var(--gold-light)',
                  display: 'block'
                }}>
                  {stat.value}
                </b>
                <span style={{ fontSize: '0.88rem', color: '#cbb9c0', letterSpacing: '0.04em' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Story & Workshop Blueprint */}
      <div className="wrap" style={{ marginTop: '72px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center'
        }} className="atelier-split">
          <div>
            <span style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic',
              fontSize: '1.05rem',
              color: 'var(--wine)',
              display: 'block',
              marginBottom: '8px'
            }}>
              The Philosophy
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', lineHeight: 1.15, marginBottom: '20px' }}>
              Cut by hand, never in haste.
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#4a3a42', lineHeight: 1.7, marginBottom: '20px' }}>
              Our atelier has occupied the sun-dappled northern wing of Courtyard No. 4 off the Old Amber Road for over twenty-seven years. Every bolt of Mulberry silk and French organza rests on our marble workbenches for three days to adjust to local humidity before the shears touch the grain.
            </p>
            <p style={{ fontSize: '1.05rem', color: '#4a3a42', lineHeight: 1.7, marginBottom: '28px' }}>
              We reject industrial sizing tables. A human body has posture, asymmetry, breath, and movement. When you order from Maison Solène, a unique physical cardboard sloper is drafted by hand with your name inscribed upon it.
            </p>

            <button
              onClick={() => onOpenBooking()}
              className="btn-primary"
            >
              Book an Atelier Visit in Jaipur
            </button>
          </div>

          {/* Blueprint SVG Diagram */}
          <div style={{
            background: 'var(--ivory-soft)',
            border: '1px solid var(--line)',
            padding: '36px',
            borderRadius: '2px',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--plum)' }}>
              Courtyard No. 4 Workshop Diagram
            </h3>
            <svg viewBox="0 0 400 300" style={{ width: '100%', height: 'auto' }}>
              <rect x="0" y="0" width="400" height="300" fill="#efe4d3" />
              <rect x="20" y="20" width="360" height="260" fill="none" stroke="#b98d4a" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="120" cy="120" r="40" fill="none" stroke="#7c1f3d" strokeWidth="1.5" />
              <text x="120" y="125" textAnchor="middle" fill="#7c1f3d" fontSize="10" fontFamily="sans-serif">Drape Stand</text>
              <circle cx="280" cy="120" r="40" fill="none" stroke="#7c1f3d" strokeWidth="1.5" />
              <text x="280" y="125" textAnchor="middle" fill="#7c1f3d" fontSize="10" fontFamily="sans-serif">Embroidery Frame</text>
              <rect x="80" y="200" width="240" height="50" fill="none" stroke="#b98d4a" strokeWidth="1.5" />
              <text x="200" y="230" textAnchor="middle" fill="#2b1522" fontSize="12" fontFamily="serif">Italian Marble Cutting Table</text>
            </svg>
            <div style={{ fontSize: '0.85rem', color: '#7c6570', fontStyle: 'italic', marginTop: '16px', textAlign: 'center' }}>
              Preserved configuration since October 1998. Jaipur, Rajasthan.
            </div>
          </div>
        </div>

        {/* The 3 Craft Tenets */}
        <div style={{ marginTop: '96px' }}>
          <div className="section-head" style={{ textAlign: 'center', justifyContent: 'center' }}>
            <div>
              <span style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic',
                fontSize: '1rem',
                color: 'var(--wine)',
                display: 'block',
                marginBottom: '6px'
              }}>
                Artisanal Pillars
              </span>
              <h2>The Maison Solène Standard</h2>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px'
          }} className="tenets-grid">
            {ATELIER_DATA.crafts.map((craft, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--ivory-soft)',
                  border: '1px solid var(--line)',
                  padding: '32px 28px',
                  borderRadius: '2px'
                }}
              >
                <span style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '1.4rem',
                  color: 'var(--wine)',
                  display: 'block',
                  marginBottom: '12px'
                }}>
                  0{idx + 1}.
                </span>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>
                  {craft.title}
                </h3>
                <p style={{ color: '#5c4a52', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 }}>
                  {craft.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .stats-bar { grid-template-columns: repeat(2, 1fr) !important; gap: 28px !important; }
          .atelier-split { grid-template-columns: 1fr !important; gap: 40px !important; }
          .tenets-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </div>
  );
}
