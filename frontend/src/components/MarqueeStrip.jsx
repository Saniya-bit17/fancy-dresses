import React from 'react';

export default function MarqueeStrip() {
  const items = [
    'Made to measure',
    'Hand-embroidered',
    'Silk, tulle & organza',
    'Ships in 3 weeks',
    'Courtyard Atelier, Jaipur',
    'Three fittings per gown',
    'Pure bias-cut craftsmanship'
  ];

  return (
    <div 
      aria-hidden="true"
      style={{
        background: 'var(--plum)',
        color: 'var(--ivory-soft)',
        padding: '16px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        position: 'relative'
      }}
    >
      <div 
        style={{
          display: 'inline-flex',
          gap: '56px',
          animation: 'scrollTrack 36s linear infinite',
          fontFamily: "'Fraunces', serif",
          fontStyle: 'italic',
          fontSize: '1.15rem'
        }}
      >
        {/* Double array for seamless loop */}
        {[...items, ...items].map((text, idx) => (
          <span 
            key={idx} 
            style={{ 
              opacity: 0.88,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '28px'
            }}
          >
            {text}
            <span style={{ fontSize: '0.6rem', color: 'var(--gold-light)', opacity: 0.6 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
