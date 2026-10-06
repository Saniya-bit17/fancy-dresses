import React, { useState } from 'react';

export default function Header({ currentPage, setCurrentPage, onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'collection', label: 'Collection' },
    { id: 'atelier', label: 'Atelier' },
    { id: 'fitting', label: 'Fitting' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(246, 239, 228, 0.94)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--line)',
      transition: 'var(--transition-smooth)'
    }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 32px',
        maxWidth: 'var(--maxw)',
        margin: '0 auto'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '1.55rem',
            letterSpacing: '0.02em',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          Maison <em style={{ fontStyle: 'italic', color: 'var(--wine)', fontWeight: 400 }}>Solène</em>
        </div>

        {/* Desktop Navigation Links */}
        <div style={{
          display: 'flex',
          gap: '32px',
          fontSize: '0.95rem',
          alignItems: 'center'
        }} className="desktop-nav">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? 'var(--wine)' : 'var(--ink)',
                  fontWeight: isActive ? 500 : 400,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '4px 0',
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s ease'
                }}
              >
                {item.label}
                <span style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  height: '1px',
                  width: isActive ? '100%' : '0%',
                  background: 'var(--wine)',
                  transition: 'width 0.3s ease'
                }} />
              </button>
            );
          })}
        </div>

        {/* Actions & CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={onOpenBooking}
            className="btn-primary"
            style={{
              padding: '10px 20px',
              fontSize: '0.88rem',
              borderRadius: '2px',
              whiteSpace: 'nowrap'
            }}
          >
            Book a fitting
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              background: 'transparent',
              border: '1px solid var(--line)',
              borderRadius: '2px',
              padding: '8px 12px',
              cursor: 'pointer',
              color: 'var(--ink)'
            }}
            aria-label="Toggle navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--ivory-soft)',
          borderBottom: '1px solid var(--line)',
          padding: '20px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                textAlign: 'left',
                background: 'none',
                border: 'none',
                fontSize: '1.05rem',
                color: currentPage === item.id ? 'var(--wine)' : 'var(--ink)',
                fontWeight: currentPage === item.id ? 600 : 400,
                padding: '8px 0',
                borderBottom: '1px solid rgba(185, 141, 74, 0.15)',
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="btn-primary"
            style={{ marginTop: '8px', width: '100%' }}
          >
            Book a fitting
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
