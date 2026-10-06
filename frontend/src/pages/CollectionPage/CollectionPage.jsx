import React, { useState } from 'react';
import { DRESSES, DRESS_SHADES } from '../../data/dresses';

export default function CollectionPage({ onSelectDress, onViewProductDetail, onOpenBooking }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const categories = ['All', 'Ball Gown', 'Column', 'Cape Silhouette', 'Bodice & Midi', 'Wrap', 'Haute Occasion'];

  const filteredDresses = DRESSES.filter((dress) => {
    const matchesCategory = selectedCategory === 'All' || dress.category === selectedCategory;
    const matchesSearch = dress.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dress.fabrics.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
      dress.silhouette.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div style={{ paddingBottom: '96px' }}>
      {/* Header Banner */}
      <div style={{
        background: 'var(--plum-deep)',
        color: 'var(--ivory)',
        padding: '72px 0 64px',
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
            marginBottom: '10px'
          }}>
            Autumn Occasion, 2026
          </span>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            color: 'var(--ivory)',
            marginBottom: '16px'
          }}>
            The Bespoke Lookbook
          </h1>
          <p style={{
            maxWidth: '56ch',
            margin: '0 auto',
            color: '#cbb9c0',
            fontSize: '1.05rem',
            lineHeight: 1.6
          }}>
            Each silhouette is crafted upon order using authentic archival techniques in our Jaipur atelier. Customization across nine base shades and personal adjustments are included.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: '48px' }}>
        {/* Controls Bar: Categories & Search */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--line)',
          marginBottom: '40px'
        }}>
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '2px',
                  border: selectedCategory === cat ? '1px solid var(--wine)' : '1px solid rgba(185, 141, 74, 0.4)',
                  background: selectedCategory === cat ? 'var(--wine)' : 'transparent',
                  color: selectedCategory === cat ? 'var(--ivory)' : 'var(--ink)',
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search silhouette or silk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '9px 14px',
                border: '1px solid var(--line)',
                background: 'var(--ivory-soft)',
                borderRadius: '2px',
                fontSize: '0.88rem',
                minWidth: '220px'
              }}
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '9px 14px',
                border: '1px solid var(--line)',
                background: 'var(--ivory-soft)',
                borderRadius: '2px',
                fontSize: '0.88rem',
                color: 'var(--ink)',
                cursor: 'pointer'
              }}
            >
              <option value="default">Curated Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Silhouette Name</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{
          fontSize: '0.88rem',
          color: '#7c6570',
          marginBottom: '32px'
        }}>
          Showing {filteredDresses.length} of {DRESSES.length} bespoke creations
        </div>

        {/* Dress Catalog Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '32px'
        }}>
          {filteredDresses.map((dress) => (
            <div
              key={dress.id}
              style={{
                background: 'var(--ivory-soft)',
                border: '1px solid var(--line)',
                borderRadius: '2px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'var(--transition-smooth)'
              }}
              className="catalog-card"
            >
              {/* Card Silhouette Graphic */}
              <div 
                onClick={() => onSelectDress(dress)}
                style={{
                  background: dress.artFill || '#ece4d8',
                  padding: '40px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  cursor: 'pointer',
                  minHeight: '260px'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  fontSize: '0.74rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--wine)',
                  background: 'rgba(255, 255, 255, 0.7)',
                  padding: '3px 8px',
                  borderRadius: '2px'
                }}>
                  {dress.tag}
                </div>

                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  fontSize: '0.74rem',
                  color: '#6e5a64'
                }}>
                  Lead: {dress.leadTime}
                </div>

                <svg viewBox="0 0 200 300" style={{ width: '60%', maxHeight: '200px' }}>
                  <circle cx="100" cy="30" r="18" fill="none" stroke={dress.artStroke} strokeWidth="2" />
                  <path 
                    d="M70 55 C40 90 30 160 25 240 C70 260 130 260 175 240 C170 160 160 90 130 55" 
                    fill="none" 
                    stroke={dress.artStroke} 
                    strokeWidth="2" 
                  />
                  <line x1="100" y1="55" x2="100" y2="240" stroke={dress.artStroke} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                </svg>
              </div>

              {/* Card Meta Content */}
              <div style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--ink)' }}>
                      {dress.name}
                    </h3>
                    <span style={{
                      fontFamily: "'Fraunces', serif",
                      fontStyle: 'italic',
                      fontSize: '1.15rem',
                      color: 'var(--wine)'
                    }}>
                      from {dress.priceFormatted}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: '#5c4a52', lineHeight: 1.55, marginBottom: '16px' }}>
                    {dress.silhouette}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {dress.fabrics.map((f, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.75rem',
                          background: 'rgba(185, 141, 74, 0.15)',
                          padding: '3px 7px',
                          borderRadius: '2px',
                          color: '#4a3a42'
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    onClick={() => onSelectDress(dress)}
                    className="btn-outline"
                    style={{ padding: '9px 12px', fontSize: '0.84rem' }}
                  >
                    Quick Inspect
                  </button>
                  <button
                    onClick={() => onViewProductDetail(dress.id)}
                    className="btn-primary"
                    style={{ padding: '9px 12px', fontSize: '0.84rem' }}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDresses.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0', color: '#7c6570' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>No silhouettes found matching your criteria.</p>
            <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="btn-outline">
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      <style>{`
        .catalog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 32px -12px rgba(43, 21, 34, 0.25);
        }
      `}</style>
    </div>
  );
}
