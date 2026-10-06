import React, { useState } from 'react';
import MarqueeStrip from '../../components/MarqueeStrip';
import { DRESSES } from '../../data/dresses';
import { api } from '../../services/api';

export default function HomePage({ setCurrentPage, onSelectDress, onOpenBooking, onViewProductDetail }) {
  const [emailInput, setEmailInput] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setNewsletterSuccess(true);
      await api.subscribeNewsletter(emailInput.trim());
      setTimeout(() => {
        setEmailInput('');
        setNewsletterSuccess(false);
      }, 4000);
    }
  };

  return (
    <div>
      {/* ---------- Hero Section ---------- */}
      <section style={{
        position: 'relative',
        padding: '80px 0 96px',
        overflow: 'hidden'
      }}>
        <div 
          className="wrap" 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '40px',
            alignItems: 'center'
          }}
        >
          <div className="hero-copy">
            <span style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: 'var(--wine)',
              marginBottom: '18px',
              display: 'block'
            }}>
              Autumn Occasion, 2026
            </span>
            <h1 style={{
              fontSize: 'clamp(2.7rem, 5.5vw, 4.6rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
              marginBottom: '20px'
            }}>
              Dresses built for<br />
              the room to go<br />
              <i style={{ fontStyle: 'italic', color: 'var(--ink)' }}>quiet</i> when you enter.
            </h1>
            <p style={{
              maxWidth: '44ch',
              margin: '26px 0 36px',
              fontSize: '1.1rem',
              color: '#4a3a42',
              lineHeight: 1.65
            }}>
              Hand-finished evening and occasion wear, cut to the centimetre in our Jaipur atelier. Every gown is made after your measurements are taken — never before.
            </p>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setCurrentPage('collection')} 
                className="btn-primary"
              >
                View the collection
              </button>
              <button 
                onClick={() => setCurrentPage('fitting')} 
                className="btn-ghost"
              >
                How fitting works →
              </button>
            </div>
          </div>

          {/* Hero Art / Sketch */}
          <div 
            style={{ position: 'relative', maxWidth: '380px', margin: '0 auto', width: '100%' }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 340 480" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
              <ellipse cx="170" cy="460" rx="140" ry="14" fill="#2b1522" opacity="0.08" />
              <path d="M170 40 C155 40 145 55 145 72 C145 88 155 98 170 98 C185 98 195 88 195 72 C195 55 185 40 170 40 Z" fill="none" stroke="#b98d4a" strokeWidth="1.6" />
              <path d="M150 95 C130 108 120 118 118 132 L108 175" fill="none" stroke="#b98d4a" strokeWidth="1.6" />
              <path d="M190 95 C210 108 220 118 222 132 L232 175" fill="none" stroke="#b98d4a" strokeWidth="1.6" />
              <path d="M118 132 C90 160 70 230 60 320 C110 345 230 345 280 320 C270 230 250 160 222 132" fill="#d7a79c" opacity="0.35" stroke="#b98d4a" strokeWidth="1.6" />
              <path d="M140 132 L130 420 C150 430 190 430 210 420 L200 132" fill="none" stroke="#b98d4a" strokeWidth="1.2" opacity="0.7" />
              <path d="M60 320 C40 360 35 410 45 450" fill="none" stroke="#b98d4a" strokeWidth="1.6" />
              <path d="M280 320 C300 360 305 410 295 450" fill="none" stroke="#b98d4a" strokeWidth="1.6" />
              <path d="M45 450 C90 468 250 468 295 450" fill="none" stroke="#b98d4a" strokeWidth="1.6" />
              <path d="M120 160 Q170 145 220 160" fill="none" stroke="#b98d4a" strokeWidth="1" opacity="0.5" />
              <path d="M115 190 Q170 178 225 190" fill="none" stroke="#b98d4a" strokeWidth="1" opacity="0.4" />
              <path d="M105 230 Q170 218 235 230" fill="none" stroke="#b98d4a" strokeWidth="1" opacity="0.35" />
            </svg>
          </div>
        </div>
      </section>

      {/* ---------- Marquee Strip ---------- */}
      <MarqueeStrip />

      {/* ---------- Current Collection Grid ---------- */}
      <section className="section" id="collection-preview">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic',
                fontSize: '1rem',
                color: 'var(--wine)',
                display: 'block',
                marginBottom: '6px'
              }}>
                Autumn 2026 Lookbook
              </span>
              <h2>The current collection</h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ marginBottom: '12px' }}>
                Six silhouettes, drawn from this season's atelier sketches. Each is available in nine base shades.
              </p>
              <button 
                onClick={() => setCurrentPage('collection')} 
                className="btn-ghost"
              >
                Browse Full Catalog & Filters →
              </button>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridAutoRows: '130px',
            gap: '20px'
          }} className="lookbook-grid">
            {DRESSES.map((dress) => {
              // Determine grid span styles matching the original HTML lookbook
              const isDark = dress.id === 'solene-gown';
              let spanStyle = {};
              if (dress.id === 'solene-gown') {
                spanStyle = { gridColumn: 'span 3', gridRow: 'span 4', background: 'var(--plum)', color: 'var(--ivory)' };
              } else if (dress.id === 'amara-column') {
                spanStyle = { gridColumn: 'span 3', gridRow: 'span 2', background: 'var(--ivory-soft)' };
              } else if (dress.id === 'rosalind-cape') {
                spanStyle = { gridColumn: 'span 3', gridRow: 'span 2', background: 'var(--ivory-soft)' };
              } else if (dress.id === 'iris-bodice') {
                spanStyle = { gridColumn: 'span 2', gridRow: 'span 3', background: 'var(--blush)' };
              } else if (dress.id === 'vesna-wrap') {
                spanStyle = { gridColumn: 'span 2', gridRow: 'span 3', background: 'var(--ivory-soft)' };
              } else if (dress.id === 'ondine-trail') {
                spanStyle = { gridColumn: 'span 2', gridRow: 'span 3', background: 'var(--gold-light)' };
              }

              return (
                <div
                  key={dress.id}
                  onClick={() => onSelectDress(dress)}
                  style={{
                    ...spanStyle,
                    position: 'relative',
                    border: '1px solid var(--line)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '24px',
                    cursor: 'pointer',
                    transition: 'transform .35s ease, box-shadow .35s ease'
                  }}
                  className="look-card"
                >
                  {/* Decorative sketch SVG */}
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    width: '46%',
                    opacity: 0.9,
                    pointerEvents: 'none'
                  }}>
                    <svg viewBox="0 0 200 300">
                      <circle cx="100" cy="30" r="18" fill="none" stroke={dress.artStroke} strokeWidth="2" />
                      <path 
                        d="M70 55 C40 90 30 160 25 240 C70 260 130 260 175 240 C170 160 160 90 130 55" 
                        fill="none" 
                        stroke={dress.artStroke} 
                        strokeWidth="2" 
                      />
                    </svg>
                  </div>

                  <div>
                    <span style={{
                      fontSize: '0.74rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: isDark ? 'var(--gold-light)' : 'var(--wine)',
                      display: 'block',
                      marginBottom: '4px'
                    }}>
                      {dress.tag}
                    </span>
                    <h3 style={{
                      fontSize: '1.25rem',
                      marginBottom: '4px',
                      color: isDark ? 'var(--ivory)' : 'var(--ink)'
                    }}>
                      {dress.name}
                    </h3>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '4px'
                    }}>
                      <span style={{
                        fontSize: '0.92rem',
                        color: isDark ? 'var(--gold-light)' : 'var(--wine)',
                        fontFamily: "'Fraunces', serif",
                        fontStyle: 'italic'
                      }}>
                        from {dress.priceFormatted}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        textDecoration: 'underline',
                        color: isDark ? 'var(--ivory-soft)' : 'var(--ink)'
                      }}>
                        Inspect Piece →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Atelier Craft Story ---------- */}
      <section className="atelier" id="atelier" style={{
        background: 'var(--plum-deep)',
        color: 'var(--ivory-soft)',
        padding: '96px 0'
      }}>
        <div className="wrap" style={{
          display: 'grid',
          gridTemplateColumns: '0.95fr 1.05fr',
          gap: '64px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic',
              fontSize: '1.05rem',
              color: 'var(--gold-light)',
              display: 'block',
              marginBottom: '12px'
            }}>
              The Courtyard Atelier
            </span>
            <h2 style={{
              color: 'var(--ivory)',
              fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
              lineHeight: 1.15,
              maxWidth: '15ch'
            }}>
              Cut in Jaipur, worn everywhere.
            </h2>
            <p style={{
              color: '#cbb9c0',
              maxWidth: '52ch',
              margin: '22px 0 0',
              fontSize: '1.08rem',
              lineHeight: 1.65
            }}>
              Our atelier has run out of the same courtyard since 1998. Nine tailors, one embroidery table, and a habit of unpicking a seam three times before it's allowed to leave the building.
            </p>

            <div style={{
              display: 'flex',
              gap: '48px',
              marginTop: '40px',
              flexWrap: 'wrap'
            }}>
              <div className="stat">
                <b style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '2.3rem',
                  color: 'var(--gold-light)',
                  display: 'block'
                }}>27</b>
                <span style={{ fontSize: '0.88rem', color: '#a8929b' }}>years of tailoring</span>
              </div>
              <div className="stat">
                <b style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '2.3rem',
                  color: 'var(--gold-light)',
                  display: 'block'
                }}>9</b>
                <span style={{ fontSize: '0.88rem', color: '#a8929b' }}>artisans in-house</span>
              </div>
              <div className="stat">
                <b style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '2.3rem',
                  color: 'var(--gold-light)',
                  display: 'block'
                }}>3</b>
                <span style={{ fontSize: '0.88rem', color: '#a8929b' }}>fittings per gown</span>
              </div>
            </div>

            <div style={{ marginTop: '36px' }}>
              <button
                onClick={() => setCurrentPage('atelier')}
                className="btn-gold"
              >
                Explore The Atelier History →
              </button>
            </div>
          </div>

          {/* Architectural Atelier Blueprint SVG */}
          <div aria-hidden="true" style={{ width: '100%', maxWidth: '420px', margin: '0 auto' }}>
            <svg viewBox="0 0 400 300" style={{ width: '100%', height: 'auto' }}>
              <rect x="0" y="0" width="400" height="300" fill="none" />
              <path d="M40 260 L40 40 L360 40 L360 260" fill="none" stroke="#b98d4a" strokeWidth="1" opacity="0.4" />
              <circle cx="120" cy="120" r="34" fill="none" stroke="#d9b877" strokeWidth="1.4" />
              <path d="M95 150 C85 175 82 210 84 240" fill="none" stroke="#d9b877" strokeWidth="1.4" />
              <path d="M145 150 C155 175 158 210 156 240" fill="none" stroke="#d9b877" strokeWidth="1.4" />
              <path d="M84 240 C110 250 130 250 156 240" fill="none" stroke="#d9b877" strokeWidth="1.4" />
              <circle cx="260" cy="100" r="30" fill="none" stroke="#d9b877" strokeWidth="1.4" />
              <path d="M240 128 C232 155 230 190 233 225" fill="none" stroke="#d9b877" strokeWidth="1.4" />
              <path d="M280 128 C288 155 290 190 287 225" fill="none" stroke="#d9b877" strokeWidth="1.4" />
              <path d="M233 225 C255 234 265 234 287 225" fill="none" stroke="#d9b877" strokeWidth="1.4" />
              <line x1="150" y1="180" x2="230" y2="150" stroke="#d9b877" strokeWidth="1" opacity="0.5" strokeDasharray="3 4" />
            </svg>
          </div>
        </div>
      </section>

      {/* ---------- Fitting Methodology ---------- */}
      <section className="section" id="fitting">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic',
                fontSize: '1rem',
                color: 'var(--wine)',
                display: 'block',
                marginBottom: '6px'
              }}>
                The Bespoke Protocol
              </span>
              <h2>How a fitting works</h2>
            </div>
            <p>
              No off-the-rack sizing. Three conversations between us and the mirror.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '36px',
            marginTop: '56px'
          }} className="fitting-grid">
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '24px' }}>
              <span style={{ fontFamily: "'Fraunces', serif", color: 'var(--wine)', fontSize: '1.1rem', fontWeight: 600 }}>
                01.
              </span>
              <h3 style={{ fontSize: '1.4rem', margin: '8px 0 12px' }}>Measure</h3>
              <p style={{ color: '#5c4a52', fontSize: '0.98rem', lineHeight: 1.6, margin: 0, maxWidth: '32ch' }}>
                A tailor visits, or you send us twelve measurements by video call. We build the first muslin from these alone.
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '24px' }}>
              <span style={{ fontFamily: "'Fraunces', serif", color: 'var(--wine)', fontSize: '1.1rem', fontWeight: 600 }}>
                02.
              </span>
              <h3 style={{ fontSize: '1.4rem', margin: '8px 0 12px' }}>Drape</h3>
              <p style={{ color: '#5c4a52', fontSize: '0.98rem', lineHeight: 1.6, margin: 0, maxWidth: '32ch' }}>
                The muslin is pinned on you, photographed from four angles, and adjusted before a single seam is sewn in silk.
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '24px' }}>
              <span style={{ fontFamily: "'Fraunces', serif", color: 'var(--wine)', fontSize: '1.1rem', fontWeight: 600 }}>
                03.
              </span>
              <h3 style={{ fontSize: '1.4rem', margin: '8px 0 12px' }}>Finish</h3>
              <p style={{ color: '#5c4a52', fontSize: '0.98rem', lineHeight: 1.6, margin: 0, maxWidth: '32ch' }}>
                Embroidery, boning, and hem are completed by hand. A final fitting confirms it before it ships to you.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button
              onClick={() => setCurrentPage('fitting')}
              className="btn-outline"
            >
              View Full Fitting Guide & Measurement Chart →
            </button>
          </div>
        </div>
      </section>

      {/* ---------- Testimonial Quote ---------- */}
      <section className="section" style={{ background: 'var(--ivory-soft)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <q style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)',
            lineHeight: 1.45,
            quotes: 'none',
            color: 'var(--ink)',
            display: 'block'
          }}>
            “I sent them a video of me turning around in my kitchen. Three weeks later, the dress fit better than the one I'd been fitted for in a shop.”
          </q>
          <div style={{
            marginTop: '28px',
            fontSize: '1rem',
            color: '#5c4a52',
            letterSpacing: '0.04em'
          }}>
            — Ritika Malhotra, bride, Udaipur
          </div>
        </div>
      </section>

      {/* ---------- Consultation Inquiry CTA ---------- */}
      <section style={{
        background: 'var(--wine)',
        color: 'var(--ivory)',
        padding: '88px 0',
        textAlign: 'center'
      }}>
        <div className="wrap">
          <span style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: 'var(--gold-light)',
            display: 'block',
            marginBottom: '10px'
          }}>
            Private Commissions
          </span>
          <h2 style={{
            color: 'var(--ivory)',
            fontSize: 'clamp(2.1rem, 4.2vw, 3rem)',
            maxWidth: '22ch',
            margin: '0 auto 18px'
          }}>
            Bring your own occasion to us.
          </h2>
          <p style={{
            color: '#f0d9df',
            maxWidth: '50ch',
            margin: '0 auto 36px',
            fontSize: '1.05rem',
            lineHeight: 1.6
          }}>
            Tell us the date and the room, and we'll tell you what to wear into it. First consultation is free, anywhere in India.
          </p>

          {!newsletterSuccess ? (
            <form 
              onSubmit={handleNewsletterSubmit}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                maxWidth: '480px',
                margin: '0 auto'
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '240px',
                  padding: '14px 18px',
                  border: '1px solid rgba(246, 239, 228, 0.6)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: 'var(--ivory)',
                  borderRadius: '2px',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.98rem'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '14px 28px',
                  background: 'var(--ivory)',
                  color: 'var(--wine)',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background .25s ease'
                }}
              >
                Request a consultation
              </button>
            </form>
          ) : (
            <div style={{
              background: 'rgba(246, 239, 228, 0.15)',
              border: '1px solid var(--gold-light)',
              padding: '16px 28px',
              borderRadius: '2px',
              maxWidth: '480px',
              margin: '0 auto',
              color: 'var(--ivory)'
            }}>
              ✓ Consultation invitation dispatched to <strong>{emailInput}</strong>. We will be in touch promptly.
            </div>
          )}
        </div>
      </section>

      {/* Responsive media styling */}
      <style>{`
        .look-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 34px -20px rgba(40, 15, 25, 0.4);
        }
        @media (max-width: 920px) {
          .lookbook-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 240px !important;
          }
          .look-card {
            grid-column: span 2 !important;
            grid-row: span 2 !important;
          }
          .hero-copy { order: 1; }
          .fitting-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </div>
  );
}
