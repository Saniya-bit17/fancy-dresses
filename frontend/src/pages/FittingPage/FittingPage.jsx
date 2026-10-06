import React, { useState } from 'react';
import { FITTING_STEPS, FITTING_FAQS } from '../../data/fittingSteps';

export default function FittingPage({ onOpenBooking }) {
  const [activeFaq, setActiveFaq] = useState(0);

  const anatomicalPoints = [
    '1. High Bust & Apex Circumference',
    '2. Underbust Ribcage Span',
    '3. True Natural Waist at Navel',
    '4. High Hip & Full Seat Measurement',
    '5. Shoulder Point to Apex Length',
    '6. Across Chest & Across Back Width',
    '7. Shoulder Seam to Wrist Length',
    '8. Bicep & Forearm Circumference',
    '9. Hollow-to-Waist Front & Back',
    '10. Waist to Floor with Target Heel Height',
    '11. Nape of Neck to Train Drop',
    '12. Postural Lean & Incline Angle'
  ];

  return (
    <div style={{ paddingBottom: '96px' }}>
      {/* Page Header */}
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
            Precision Couture Methodology
          </span>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',
            color: 'var(--ivory)',
            marginBottom: '18px'
          }}>
            How a Fitting Works
          </h1>
          <p style={{
            maxWidth: '56ch',
            margin: '0 auto',
            color: '#cbb9c0',
            fontSize: '1.1rem',
            lineHeight: 1.65
          }}>
            Three conversations between us and the mirror. No standard sizes, no compromises. Here is how your bespoke gown comes to life.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: '72px' }}>
        {/* Step-by-Step Deep Dive */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {FITTING_STEPS.map((stepItem, idx) => (
            <div
              key={stepItem.step}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr 1fr',
                gap: '36px',
                padding: '40px 32px',
                background: idx % 2 === 0 ? 'var(--ivory-soft)' : '#ffffff',
                border: '1px solid var(--line)',
                borderRadius: '2px',
                alignItems: 'center'
              }}
              className="fitting-row"
            >
              {/* Step Number */}
              <div>
                <span style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '3.6rem',
                  color: 'var(--wine)',
                  lineHeight: 1,
                  display: 'block'
                }}>
                  {stepItem.step}
                </span>
                <span style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#7c6570'
                }}>
                  Stage {idx + 1}
                </span>
              </div>

              {/* Step Core Info */}
              <div>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>
                  {stepItem.title}
                </h2>
                <div style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: 'italic',
                  color: 'var(--wine)',
                  fontSize: '1.05rem',
                  marginBottom: '14px'
                }}>
                  {stepItem.tagline}
                </div>
                <p style={{ fontSize: '0.98rem', color: '#4a3a42', lineHeight: 1.65, margin: 0 }}>
                  {stepItem.description}
                </p>
              </div>

              {/* Specifications */}
              <div style={{
                background: 'rgba(246, 239, 228, 0.6)',
                border: '1px solid var(--line)',
                padding: '20px',
                borderRadius: '2px',
                fontSize: '0.9rem'
              }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong style={{ color: 'var(--plum)' }}>Typical Duration: </strong>
                  <span>{stepItem.duration}</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--plum)' }}>Materials Used: </strong>
                  <span>{stepItem.materials}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The 12 Anatomical Measurement Checklist */}
        <div style={{
          marginTop: '88px',
          background: 'var(--ivory-soft)',
          border: '1px solid var(--line)',
          padding: '48px',
          borderRadius: '2px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic',
              fontSize: '1.05rem',
              color: 'var(--wine)',
              display: 'block',
              marginBottom: '8px'
            }}>
              The Atelier Blueprint
            </span>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
              The Twelve Anatomical Points
            </h2>
            <p style={{ maxWidth: '52ch', margin: '0 auto', color: '#5c4a52' }}>
              During your measurement session (in person or via guided video), our tailor records twelve specific vectors:
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px'
          }} className="points-grid">
            {anatomicalPoints.map((point, index) => (
              <div
                key={index}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(185, 141, 74, 0.4)',
                  padding: '14px 18px',
                  borderRadius: '2px',
                  fontSize: '0.9rem',
                  color: 'var(--ink)'
                }}
              >
                {point}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={() => onOpenBooking()}
              className="btn-primary"
            >
              Book Your Free Measurement Session
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div style={{ marginTop: '88px' }}>
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
                Have Questions?
              </span>
              <h2>Frequently Asked Questions</h2>
            </div>
          </div>

          <div style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FITTING_FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    border: '1px solid var(--line)',
                    background: '#ffffff',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      fontFamily: "'Fraunces', serif",
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      color: 'var(--ink)'
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ fontSize: '1.4rem', color: 'var(--wine)' }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: '0 24px 24px',
                      color: '#4a3a42',
                      fontSize: '0.96rem',
                      lineHeight: 1.65,
                      borderTop: '1px solid rgba(185, 141, 74, 0.2)',
                      paddingTop: '16px'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .fitting-row { grid-template-columns: 1fr !important; gap: 20px !important; }
          .points-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
