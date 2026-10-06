import React, { useState } from 'react';
import { DRESS_SHADES } from '../data/dresses';

export default function QuickViewModal({ dress, onClose, onSelectGownForBooking, onNavigateToDetail }) {
  const [selectedShade, setSelectedShade] = useState(DRESS_SHADES[0]);

  if (!dress) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '32px',
          padding: '36px',
          overflow: 'hidden'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            lineHeight: 1,
            cursor: 'pointer',
            color: 'var(--ink)'
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Silhouette Art Display */}
        <div style={{
          background: dress.artFill || 'var(--ivory-soft)',
          border: '1px solid var(--line)',
          borderRadius: '2px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '340px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            fontSize: '0.78rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--wine)',
            fontWeight: 500
          }}>
            {dress.tag}
          </div>

          <svg viewBox="0 0 200 300" style={{ width: '80%', height: 'auto', maxHeight: '280px' }}>
            <circle cx="100" cy="35" r="22" fill="none" stroke={selectedShade.hex === '#1c0f16' ? '#b98d4a' : selectedShade.hex} strokeWidth="2" />
            <path 
              d="M70 65 C40 100 25 180 20 270 C70 290 130 290 180 270 C175 180 160 100 130 65 Z" 
              fill={selectedShade.hex} 
              opacity="0.25" 
              stroke={selectedShade.hex === '#1c0f16' ? '#b98d4a' : selectedShade.hex} 
              strokeWidth="2" 
            />
            <line x1="100" y1="65" x2="100" y2="280" stroke="#b98d4a" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          </svg>

          <div style={{
            marginTop: '16px',
            fontSize: '0.85rem',
            color: '#7c6570',
            fontStyle: 'italic',
            textAlign: 'center'
          }}>
            Showing shade: <strong style={{ color: 'var(--ink)' }}>{selectedShade.name}</strong>
          </div>
        </div>

        {/* Dress Details & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{
              fontSize: '0.82rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--wine)',
              display: 'block',
              marginBottom: '6px'
            }}>
              {dress.category} · {dress.leadTime}
            </span>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '8px', lineHeight: 1.15 }}>
              {dress.name}
            </h2>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic',
              fontSize: '1.3rem',
              color: 'var(--wine)',
              marginBottom: '16px'
            }}>
              from {dress.priceFormatted}
            </div>

            <p style={{ fontSize: '0.92rem', color: '#4a3a42', lineHeight: 1.6, marginBottom: '20px' }}>
              {dress.description}
            </p>

            {/* 9 Base Shade Picker */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.82rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#6e5a64',
                marginBottom: '10px'
              }}>
                Select Atelier Base Shade ({DRESS_SHADES.length} available)
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {DRESS_SHADES.map((shade) => {
                  const isChosen = selectedShade.name === shade.name;
                  return (
                    <button
                      key={shade.name}
                      onClick={() => setSelectedShade(shade)}
                      title={shade.name}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: shade.hex,
                        border: isChosen ? '2px solid var(--wine)' : `1px solid ${shade.border}`,
                        outline: isChosen ? '2px solid var(--gold-light)' : 'none',
                        outlineOffset: '2px',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease'
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Fabrics */}
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '0.8rem', color: '#7c6570', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Atelier Fabrics:
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                {dress.fabrics.map((f, i) => (
                  <span 
                    key={i} 
                    style={{ 
                      fontSize: '0.8rem', 
                      background: 'var(--ivory-soft)', 
                      padding: '4px 8px', 
                      border: '1px solid var(--line)',
                      borderRadius: '2px' 
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                onClose();
                onSelectGownForBooking(dress);
              }}
              className="btn-primary"
              style={{ flex: 1, padding: '12px 18px', fontSize: '0.9rem' }}
            >
              Book Fitting for This Silhouette
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigateToDetail(dress.id);
              }}
              className="btn-outline"
              style={{ padding: '12px 18px', fontSize: '0.9rem' }}
            >
              Full Details
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .modal-content {
            grid-template-columns: 1fr !important;
            padding: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
