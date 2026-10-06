import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import AppointmentModal from './components/AppointmentModal';

// Dedicated Page Modules
import HomePage from './pages/HomePage/HomePage';
import CollectionPage from './pages/CollectionPage/CollectionPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import AtelierPage from './pages/AtelierPage/AtelierPage';
import FittingPage from './pages/FittingPage/FittingPage';
import AppointmentsPage from './pages/AppointmentsPage/AppointmentsPage';
import ContactPage from './pages/ContactPage/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDressId, setSelectedDressId] = useState('solene-gown');
  const [quickViewDress, setQuickViewDress] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingGown, setBookingGown] = useState(null);

  const handleOpenBooking = (gown = null) => {
    setBookingGown(gown);
    setIsBookingOpen(true);
  };

  const handleSelectQuickView = (dress) => {
    setQuickViewDress(dress);
  };

  const handleViewProductDetail = (dressId) => {
    setSelectedDressId(dressId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Global Luxury Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenBooking={() => handleOpenBooking(null)}
      />

      {/* Main Page Routing Switch */}
      <main style={{ flex: 1 }}>
        {currentPage === 'home' && (
          <HomePage
            setCurrentPage={setCurrentPage}
            onSelectDress={handleSelectQuickView}
            onOpenBooking={handleOpenBooking}
            onViewProductDetail={handleViewProductDetail}
          />
        )}

        {currentPage === 'collection' && (
          <CollectionPage
            onSelectDress={handleSelectQuickView}
            onViewProductDetail={handleViewProductDetail}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetailPage
            dressId={selectedDressId}
            onBack={() => setCurrentPage('collection')}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'atelier' && (
          <AtelierPage
            onOpenBooking={() => handleOpenBooking(null)}
          />
        )}

        {currentPage === 'fitting' && (
          <FittingPage
            onOpenBooking={() => handleOpenBooking(null)}
          />
        )}

        {currentPage === 'appointments' && (
          <AppointmentsPage />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Global Luxury Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Global Quick View Modal */}
      {quickViewDress && (
        <QuickViewModal
          dress={quickViewDress}
          onClose={() => setQuickViewDress(null)}
          onSelectGownForBooking={(dress) => handleOpenBooking(dress)}
          onNavigateToDetail={(id) => handleViewProductDetail(id)}
        />
      )}

      {/* Global Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDress={bookingGown}
      />
    </div>
  );
}
