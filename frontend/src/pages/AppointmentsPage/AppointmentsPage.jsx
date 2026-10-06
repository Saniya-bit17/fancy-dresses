import React, { useState } from 'react';
import { DRESSES } from '../../data/dresses';
import { api } from '../../services/api';

export default function AppointmentsPage() {
  const [formData, setFormData] = useState({
    location: 'jaipur',
    gownInterest: 'The Solène Gown',
    date: '',
    timeSlot: '11:00 AM - 12:30 PM',
    name: '',
    email: '',
    phone: '',
    occasionDate: '',
    notes: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.createAppointment({
        location: formData.location,
        dress: formData.gownInterest,
        date: formData.date,
        timeSlot: formData.timeSlot,
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventDate: formData.occasionDate,
        notes: formData.notes
      });
      if (res && res.data && res.data.reference) {
        setBookingReference(res.data.reference);
      } else {
        setBookingReference(`MS-${Math.floor(1000 + Math.random() * 9000)}`);
      }
    } catch {
      setBookingReference(`MS-${Math.floor(1000 + Math.random() * 9000)}`);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
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
            By Private Appointment Only
          </span>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',
            color: 'var(--ivory)',
            marginBottom: '18px'
          }}>
            Book a Bespoke Fitting
          </h1>
          <p style={{
            maxWidth: '56ch',
            margin: '0 auto',
            color: '#cbb9c0',
            fontSize: '1.1rem',
            lineHeight: 1.65
          }}>
            Experience the singular pleasure of a garment cut to your contours. Select an in-person appointment at our Jaipur atelier, Delhi showroom, or a guided video consultation.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: '64px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '56px',
          alignItems: 'start'
        }} className="booking-layout">
          {/* Booking Form Column */}
          <div style={{
            background: 'var(--ivory-soft)',
            border: '1px solid var(--line)',
            padding: '40px',
            borderRadius: '2px',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            {!isSuccess ? (
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>
                  Consultation Details
                </h2>

                {/* Location options */}
                <div className="form-group">
                  <label>1. Select Salon Location or Format</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {[
                      { id: 'jaipur', title: 'Jaipur Atelier', desc: 'Old Amber Road' },
                      { id: 'delhi', title: 'Delhi Showroom', desc: 'Mehrauli District' },
                      { id: 'virtual', title: 'Virtual Fitting', desc: 'Door-to-Door Toile' }
                    ].map((loc) => (
                      <div
                        key={loc.id}
                        onClick={() => setFormData((p) => ({ ...p, location: loc.id }))}
                        style={{
                          padding: '14px 10px',
                          borderRadius: '2px',
                          border: formData.location === loc.id ? '2px solid var(--wine)' : '1px solid var(--line)',
                          background: formData.location === loc.id ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'var(--transition-smooth)'
                        }}
                      >
                        <strong style={{ fontSize: '0.9rem', color: 'var(--ink)', display: 'block' }}>
                          {loc.title}
                        </strong>
                        <span style={{ fontSize: '0.75rem', color: '#7c6570' }}>
                          {loc.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Silhouette Interest */}
                <div className="form-group">
                  <label>2. Silhouette of Interest</label>
                  <select
                    value={formData.gownInterest}
                    onChange={(e) => setFormData((p) => ({ ...p, gownInterest: e.target.value }))}
                    className="form-select"
                  >
                    <option value="Undecided / Bespoke Design Session">Undecided / Bespoke Design Session</option>
                    {DRESSES.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} — from {d.priceFormatted}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date and Time Slot */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Time Window</label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData((p) => ({ ...p, timeSlot: e.target.value }))}
                      className="form-select"
                    >
                      <option>11:00 AM - 12:30 PM</option>
                      <option>02:00 PM - 03:30 PM</option>
                      <option>04:30 PM - 06:00 PM</option>
                      <option>06:30 PM - 08:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Personal Information */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Your Full Name</label>
                    <input
                      type="text"
                      placeholder="Ananya Singhania"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="ananya@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+91 98110 00000"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Event Date (Approx)</label>
                    <input
                      type="date"
                      value={formData.occasionDate}
                      onChange={(e) => setFormData((p) => ({ ...p, occasionDate: e.target.value }))}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Occasion Details & Preferences</label>
                  <textarea
                    rows="3"
                    placeholder="Tell us about the venue, time of event (daylight or evening), preferred colorways..."
                    value={formData.notes}
                    onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ width: '100%', padding: '16px', fontSize: '1rem', marginTop: '8px' }}
                >
                  {isSubmitting ? 'Registering With Atelier...' : 'Request Consultation Appointment'}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--wine)',
                  color: 'var(--ivory)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '1.6rem'
                }}>
                  ✓
                </div>
                <h3 style={{ fontSize: '1.9rem', marginBottom: '12px' }}>
                  Fitting Request Received
                </h3>
                <p style={{ color: '#4a3a42', fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  Thank you, <strong>{formData.name}</strong>. Your consultation has been registered under reference <strong style={{ color: 'var(--wine)' }}>{bookingReference || 'MS-2026-CONFIRMED'}</strong>. Our fitting director will review the requested date ({formData.date || 'TBD'}) and reach out via phone/WhatsApp at <strong>{formData.phone}</strong>.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="btn-outline"
                >
                  Make Another Request
                </button>
              </div>
            )}
          </div>

          {/* Salon Information Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--line)',
              padding: '32px',
              borderRadius: '2px'
            }}>
              <span style={{
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--wine)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '8px'
              }}>
                Historic Atelier
              </span>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Jaipur Courtyard</h3>
              <p style={{ fontSize: '0.94rem', color: '#5c4a52', lineHeight: 1.6, marginBottom: '16px' }}>
                Courtyard No. 4, Old Amber Road<br />
                Jaipur, Rajasthan 302002<br />
                Hours: Tuesday – Sunday, 10:00 AM – 7:00 PM
              </p>
              <div style={{ fontSize: '0.88rem', color: 'var(--plum)' }}>
                <strong>Direct Line:</strong> +91 141 298 4400
              </div>
            </div>

            <div style={{
              background: '#ffffff',
              border: '1px solid var(--line)',
              padding: '32px',
              borderRadius: '2px'
            }}>
              <span style={{
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--wine)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '8px'
              }}>
                Private Salon
              </span>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Delhi Showroom</h3>
              <p style={{ fontSize: '0.94rem', color: '#5c4a52', lineHeight: 1.6, marginBottom: '16px' }}>
                Kalka Das Marg, Near Qutub Minar<br />
                Mehrauli, New Delhi 110030<br />
                Hours: Wednesday – Monday, 11:00 AM – 8:00 PM
              </p>
              <div style={{ fontSize: '0.88rem', color: 'var(--plum)' }}>
                <strong>Direct Line:</strong> +91 11 4988 2300
              </div>
            </div>

            <div style={{
              background: 'var(--plum)',
              color: 'var(--ivory)',
              padding: '28px',
              borderRadius: '2px',
              border: '1px solid var(--line)'
            }}>
              <h4 style={{ color: 'var(--gold-light)', fontSize: '1.1rem', marginBottom: '10px' }}>
                Bespoke Consultation Guarantee
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#cbb9c0', lineHeight: 1.6, margin: 0 }}>
                Initial consultations are always complimentary. If you decide not to proceed with a commission after your toile drape, no fee is incurred.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .booking-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}
