import React, { useState } from 'react';
import { DRESSES, DRESS_SHADES } from '../../data/dresses';

export default function ProductDetailPage({ dressId, onBack, onOpenBooking }) {
  const dress = DRESSES.find((d) => d.id === dressId) || DRESSES[0];
  const [selectedShade, setSelectedShade] = useState(DRESS_SHADES[0]);
  const [measurementMode, setMeasurementMode] = useState('standard');
  const [clientMeasurements, setClientMeasurements] = useState({
    bust: '',
    waist: '',
    hip: '',
    height: ''
  });

  const handleMeasurementChange = (e) => {
    const { name, value } = e.target;
    setClientMeasurements((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ paddingBottom: '96px' }}>
      {/* Breadcrumb Bar */}
      <div style={{
        background: 'var(--ivory-soft)',
        borderBottom: '1px solid var(--line)',
        padding: '16px 0'
      }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
          <button 
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--wine)',
              cursor: 'pointer',
              padding: 0,
              fontWeight: 500
            }}
          >
            ← Back to Collection
          </button>
          <span style={{ color: '#a8929b' }}>/</span>
          <span style={{ color: '#5c4a52' }}>{dress.category}</span>
          <span style={{ color: '#a8929b' }}>/</span>
          <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{dress.name}</span>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="wrap" style={{ marginTop: '48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '64px',
          alignItems: 'start'
        }} className="product-layout">
          {/* Left: Product Atelier Artwork & Canvas */}
          <div>
            <div style={{
              background: dress.artFill || '#ece4d8',
              border: '1px solid var(--line)',
              borderRadius: '2px',
              padding: '60px 40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: 'var(--shadow-subtle)'
            }}>
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--wine)',
                background: 'rgba(255, 255, 255, 0.85)',
                padding: '4px 10px',
                borderRadius: '2px'
              }}>
                {dress.tag}
              </div>

              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontSize: '0.82rem',
                color: '#6e5a64'
              }}>
                Bespoke Atelier Blueprint
              </div>

              {/* Dynamic SVG with selected shade */}
              <svg viewBox="0 0 200 300" style={{ width: '85%', maxHeight: '420px', margin: '20px 0' }}>
                <ellipse cx="100" cy="285" rx="80" ry="10" fill="#2b1522" opacity="0.1" />
                <circle cx="100" cy="30" r="20" fill="none" stroke={selectedShade.hex === '#1c0f16' ? '#b98d4a' : selectedShade.hex} strokeWidth="2.2" />
                <path 
                  d="M70 55 C40 90 30 160 25 240 C70 260 130 260 175 240 C170 160 160 90 130 55" 
                  fill={selectedShade.hex} 
                  opacity="0.22" 
                  stroke={selectedShade.hex === '#1c0f16' ? '#b98d4a' : selectedShade.hex} 
                  strokeWidth="2.2" 
                />
                <line x1="100" y1="55" x2="100" y2="245" stroke="#b98d4a" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.7" />
                <path d="M50 140 Q100 120 150 140" fill="none" stroke="#b98d4a" strokeWidth="1.2" opacity="0.6" />
                <path d="M40 190 Q100 170 160 190" fill="none" stroke="#b98d4a" strokeWidth="1.2" opacity="0.6" />
              </svg>

              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '10px 18px',
                borderRadius: '2px',
                fontSize: '0.86rem',
                border: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: selectedShade.hex,
                  border: `1px solid ${selectedShade.border}`
                }} />
                <span>Rendered in <strong>{selectedShade.name}</strong></span>
              </div>
            </div>

            {/* Atelier Craftsmanship Highlights */}
            <div style={{
              marginTop: '32px',
              border: '1px solid var(--line)',
              background: 'var(--ivory-soft)',
              padding: '28px',
              borderRadius: '2px'
            }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '14px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Atelier Notes & Provenance
              </h4>
              <p style={{ fontSize: '0.94rem', color: '#4a3a42', lineHeight: 1.6, marginBottom: '16px' }}>
                {dress.craftDetails}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.88rem' }}>
                <div>
                  <strong style={{ display: 'block', color: 'var(--wine)' }}>Artisan Hours:</strong>
                  <span>65+ hours handwork</span>
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--wine)' }}>Fittings Included:</strong>
                  <span>3 personal fittings</span>
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--wine)' }}>Lead Time:</strong>
                  <span>{dress.leadTime} to dispatch</span>
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--wine)' }}>Origin:</strong>
                  <span>Jaipur Atelier, Courtyard 4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Meta & Customization Options */}
          <div>
            <span style={{
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--wine)',
              display: 'block',
              marginBottom: '6px'
            }}>
              {dress.category}
            </span>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
              lineHeight: 1.1,
              marginBottom: '12px'
            }}>
              {dress.name}
            </h1>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic',
              fontSize: '1.6rem',
              color: 'var(--wine)',
              marginBottom: '20px'
            }}>
              from {dress.priceFormatted}
              <span style={{ fontSize: '0.88rem', fontStyle: 'normal', color: '#7c6570', marginLeft: '12px', fontFamily: "'Jost', sans-serif" }}>
                (Inclusive of all custom fitting sessions)
              </span>
            </div>

            <p style={{ fontSize: '1.05rem', color: '#4a3a42', lineHeight: 1.65, marginBottom: '28px' }}>
              {dress.description}
            </p>

            {/* Shade Selection (9 Shades) */}
            <div style={{
              padding: '24px',
              border: '1px solid var(--line)',
              background: '#ffffff',
              borderRadius: '2px',
              marginBottom: '28px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  1. Choose Atelier Base Shade
                </span>
                <span style={{ fontSize: '0.88rem', color: 'var(--wine)', fontStyle: 'italic' }}>
                  {selectedShade.name}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {DRESS_SHADES.map((shade) => {
                  const isSelected = selectedShade.name === shade.name;
                  return (
                    <button
                      key={shade.name}
                      onClick={() => setSelectedShade(shade)}
                      title={shade.name}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: shade.hex,
                        border: isSelected ? '3px solid var(--wine)' : `1px solid ${shade.border}`,
                        outline: isSelected ? '2px solid var(--gold-light)' : 'none',
                        outlineOffset: '2px',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease'
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Fabric Composition */}
            <div style={{ marginBottom: '28px' }}>
              <span style={{
                fontSize: '0.88rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '10px'
              }}>
                2. Authentic Fabric Composition
              </span>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {dress.fabrics.map((f, i) => (
                  <div 
                    key={i} 
                    style={{
                      border: '1px solid var(--line)',
                      background: 'var(--ivory-soft)',
                      padding: '10px 16px',
                      borderRadius: '2px',
                      fontSize: '0.9rem'
                    }}
                  >
                    ✓ {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Measurements Input Box */}
            <div style={{
              border: '1px solid var(--line)',
              background: 'var(--ivory-soft)',
              padding: '24px',
              borderRadius: '2px',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  3. Bespoke Measurements
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setMeasurementMode('standard')}
                    style={{
                      fontSize: '0.78rem',
                      padding: '4px 10px',
                      border: '1px solid var(--line)',
                      background: measurementMode === 'standard' ? 'var(--ink)' : 'transparent',
                      color: measurementMode === 'standard' ? 'var(--ivory)' : 'var(--ink)',
                      cursor: 'pointer'
                    }}
                  >
                    Atelier Standard
                  </button>
                  <button
                    onClick={() => setMeasurementMode('custom')}
                    style={{
                      fontSize: '0.78rem',
                      padding: '4px 10px',
                      border: '1px solid var(--line)',
                      background: measurementMode === 'custom' ? 'var(--ink)' : 'transparent',
                      color: measurementMode === 'custom' ? 'var(--ivory)' : 'var(--ink)',
                      cursor: 'pointer'
                    }}
                  >
                    Enter My Centimetres
                  </button>
                </div>
              </div>

              {measurementMode === 'custom' ? (
                <div>
                  <p style={{ fontSize: '0.84rem', color: '#6e5a64', marginBottom: '14px' }}>
                    Enter preliminary measurements in cm. Our tailors verify every contour during your first fitting call.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#5c4a52' }}>Bust (cm)</label>
                      <input
                        type="number"
                        name="bust"
                        placeholder="88"
                        value={clientMeasurements.bust}
                        onChange={handleMeasurementChange}
                        className="form-input"
                        style={{ padding: '8px', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#5c4a52' }}>Waist (cm)</label>
                      <input
                        type="number"
                        name="waist"
                        placeholder="68"
                        value={clientMeasurements.waist}
                        onChange={handleMeasurementChange}
                        className="form-input"
                        style={{ padding: '8px', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#5c4a52' }}>Hips (cm)</label>
                      <input
                        type="number"
                        name="hip"
                        placeholder="94"
                        value={clientMeasurements.hip}
                        onChange={handleMeasurementChange}
                        className="form-input"
                        style={{ padding: '8px', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#5c4a52' }}>Height (cm)</label>
                      <input
                        type="number"
                        name="height"
                        placeholder="168"
                        value={clientMeasurements.height}
                        onChange={handleMeasurementChange}
                        className="form-input"
                        style={{ padding: '8px', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <p style={{ fontSize: '0.9rem', color: '#5c4a52', margin: 0, lineHeight: 1.5 }}>
                  No preliminary numbers needed. Once you reserve your fitting, our atelier sends our guided measurement kit and schedules a 1-on-1 tailor video session.
                </p>
              )}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onOpenBooking(dress)}
                className="btn-primary"
                style={{ flex: 1, padding: '16px 28px', fontSize: '1rem' }}
              >
                Book Fitting for {dress.name}
              </button>
              <button
                onClick={onBack}
                className="btn-outline"
                style={{ padding: '16px 24px' }}
              >
                Explore Other Silhouettes
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .product-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
