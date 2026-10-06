import React from 'react';

export default function Footer({ setCurrentPage }) {
  const handleNav = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--plum-deep)',
      color: 'var(--ivory-soft)',
      padding: '72px 0 40px',
      borderTop: '1px solid var(--line)'
    }}>
      <div className="wrap">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '40px',
          borderBottom: '1px solid rgba(185, 141, 74, 0.25)',
          paddingBottom: '48px',
          marginBottom: '32px'
        }}>
          {/* Brand Info */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '1.6rem',
              letterSpacing: '0.02em',
              marginBottom: '16px',
              color: 'var(--ivory)'
            }}>
              Maison <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>Solène</em>
            </div>
            <p style={{
              fontSize: '0.94rem',
              color: '#a8929b',
              lineHeight: 1.6,
              marginBottom: '24px'
            }}>
              Hand-finished evening and occasion wear, tailored to the centimetre in our Jaipur courtyard atelier since 1998.
            </p>
            <div style={{
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--gold)'
            }}>
              Jaipur · New Delhi · Worldwide
            </div>
          </div>

          {/* Links Columns */}
          <div style={{
            display: 'flex',
            gap: '56px',
            flexWrap: 'wrap'
          }}>
            <div>
              <h4 style={{
                fontSize: '0.9rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--gold-light)',
                marginBottom: '18px',
                fontWeight: 500
              }}>
                Atelier & Salons
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem' }}>
                <button onClick={() => handleNav('atelier')} style={{ background: 'none', border: 'none', color: '#cbb9c0', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
                  Jaipur Atelier (Courtyard 4)
                </button>
                <button onClick={() => handleNav('contact')} style={{ background: 'none', border: 'none', color: '#cbb9c0', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
                  Delhi Showroom (Mehrauli)
                </button>
                <button onClick={() => handleNav('appointments')} style={{ background: 'none', border: 'none', color: '#cbb9c0', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
                  Private Appointments
                </button>
                <button onClick={() => handleNav('fitting')} style={{ background: 'none', border: 'none', color: '#cbb9c0', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
                  Virtual Video Fittings
                </button>
              </div>
            </div>

            <div>
              <h4 style={{
                fontSize: '0.9rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--gold-light)',
                marginBottom: '18px',
                fontWeight: 500
              }}>
                Bespoke Services
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem' }}>
                <button onClick={() => handleNav('collection')} style={{ background: 'none', border: 'none', color: '#cbb9c0', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
                  Autumn 2026 Lookbook
                </button>
                <button onClick={() => handleNav('fitting')} style={{ background: 'none', border: 'none', color: '#cbb9c0', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
                  Measurement Guide
                </button>
                <button onClick={() => handleNav('contact')} style={{ background: 'none', border: 'none', color: '#cbb9c0', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
                  Fabric & Swatch Kits
                </button>
                <button onClick={() => handleNav('contact')} style={{ background: 'none', border: 'none', color: '#cbb9c0', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
                  Lifetime Alterations
                </button>
              </div>
            </div>

            <div>
              <h4 style={{
                fontSize: '0.9rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--gold-light)',
                marginBottom: '18px',
                fontWeight: 500
              }}>
                Connect
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', color: '#cbb9c0' }}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  Instagram @maisonsolene
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  Pinterest Lookbook
                </a>
                <a href="mailto:atelier@maisonsolene.com" style={{ color: 'inherit' }}>
                  atelier@maisonsolene.com
                </a>
                <span>+91 141 298 4400</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.86rem',
          color: '#8a7580'
        }}>
          <div>
            © {new Date().getFullYear()} Maison Solène Atelier. Handcrafted with reverence.
          </div>
          <div style={{ fontStyle: 'italic', fontFamily: "'Fraunces', serif" }}>
            Made to measure, always.
          </div>
        </div>
      </div>
    </footer>
  );
}
