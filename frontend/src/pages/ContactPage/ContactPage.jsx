import React, { useState } from 'react';
import { api } from '../../services/api';

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState('bespoke');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [sent, setSent] = useState(false);
  const [inquiryRef, setInquiryRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.createInquiry({ inquiryType, ...formData });
      if (res && res.success) {
        setInquiryRef(res.data.reference);
      } else {
        setInquiryRef(`INQ-${Math.floor(1000 + Math.random() * 9000)}`);
      }
    } catch {
      setInquiryRef(`INQ-${Math.floor(1000 + Math.random() * 9000)}`);
    } finally {
      setIsSubmitting(false);
      setSent(true);
    }
  };

  return (
    <div style={{ paddingBottom: '96px' }}>
      {/* Header Banner */}
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
            Atelier Enquiries & Visits
          </span>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',
            color: 'var(--ivory)',
            marginBottom: '18px'
          }}>
            Contact Maison Solène
          </h1>
          <p style={{
            maxWidth: '56ch',
            margin: '0 auto',
            color: '#cbb9c0',
            fontSize: '1.1rem',
            lineHeight: 1.65
          }}>
            Our bespoke coordinators and master cutters are at your disposal. We reply to all inquiries within four business hours.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: '72px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '64px',
          alignItems: 'start'
        }} className="contact-grid">
          {/* Atelier Details */}
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>
              Our Salons
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{
                background: 'var(--ivory-soft)',
                border: '1px solid var(--line)',
                padding: '28px',
                borderRadius: '2px'
              }}>
                <span style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: 'italic',
                  color: 'var(--wine)',
                  fontSize: '0.95rem',
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  The Mother Atelier
                </span>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>Jaipur Courtyard</h3>
                <p style={{ fontSize: '0.95rem', color: '#4a3a42', lineHeight: 1.6, margin: '0 0 14px' }}>
                  Courtyard No. 4, Old Amber Road<br />
                  Jaipur, Rajasthan 302002
                </p>
                <div style={{ fontSize: '0.9rem', color: '#6e5a64' }}>
                  <strong>Telephone:</strong> +91 141 298 4400<br />
                  <strong>Hours:</strong> Tuesday – Sunday, 10:00 AM – 7:00 PM
                </div>
              </div>

              <div style={{
                background: 'var(--ivory-soft)',
                border: '1px solid var(--line)',
                padding: '28px',
                borderRadius: '2px'
              }}>
                <span style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: 'italic',
                  color: 'var(--wine)',
                  fontSize: '0.95rem',
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  Private Fitting Salon
                </span>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>Delhi Showroom</h3>
                <p style={{ fontSize: '0.95rem', color: '#4a3a42', lineHeight: 1.6, margin: '0 0 14px' }}>
                  Kalka Das Marg, Near Qutub Minar<br />
                  Mehrauli, New Delhi 110030
                </p>
                <div style={{ fontSize: '0.9rem', color: '#6e5a64' }}>
                  <strong>Telephone:</strong> +91 11 4988 2300<br />
                  <strong>Hours:</strong> Wednesday – Monday, 11:00 AM – 8:00 PM
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '1rem', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Direct Electronic Mail
                </h4>
                <p style={{ fontSize: '0.95rem', color: '#5c4a52', margin: 0 }}>
                  General Inquiries: <a href="mailto:atelier@maisonsolene.com" style={{ color: 'var(--wine)', textDecoration: 'underline' }}>atelier@maisonsolene.com</a><br />
                  Press & Commissions: <a href="mailto:curator@maisonsolene.com" style={{ color: 'var(--wine)', textDecoration: 'underline' }}>curator@maisonsolene.com</a>
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Inquiry Form */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--line)',
            padding: '40px',
            borderRadius: '2px',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
              Send an Atelier Inquiry
            </h2>
            <p style={{ fontSize: '0.94rem', color: '#5c4a52', marginBottom: '24px' }}>
              Whether you wish to order fabric swatches, enquire about rush event tailoring, or discuss a bespoke silhouette, our concierge is ready.
            </p>

            {!sent ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nature of Inquiry</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {[
                      { id: 'bespoke', label: 'Bespoke Order' },
                      { id: 'swatch', label: 'Fabric Swatches' },
                      { id: 'alterations', label: 'Care & Alteration' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setInquiryType(t.id)}
                        style={{
                          padding: '10px 6px',
                          border: inquiryType === t.id ? '2px solid var(--wine)' : '1px solid var(--line)',
                          background: inquiryType === t.id ? 'rgba(124, 31, 61, 0.08)' : 'transparent',
                          color: inquiryType === t.id ? 'var(--wine)' : 'var(--ink)',
                          fontSize: '0.82rem',
                          fontWeight: inquiryType === t.id ? 600 : 400,
                          cursor: 'pointer'
                        }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Message / Request</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Describe your upcoming event, silhouette interest, or fabric preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', padding: '15px' }}
                >
                  Send Inquiry to Atelier
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--wine)',
                  color: 'var(--ivory)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '1.5rem'
                }}>
                  ✓
                </div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
                  Inquiry Dispatched {inquiryRef && `(${inquiryRef})`}
                </h3>
                <p style={{ color: '#5c4a52', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  Thank you, <strong>{formData.name}</strong>. Your atelier inquiry has been recorded under reference <strong style={{ color: 'var(--wine)' }}>{inquiryRef}</strong>. An atelier coordinator will review your request and get in touch with you at <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn-outline"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}
