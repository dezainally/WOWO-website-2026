import React, { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { InquiryProvider } from './context/InquiryContext';
import { useGSAPIntro } from './utils/useGSAPIntro';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import RequestPriceModal from './components/RequestPriceModal.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import NewsletterPopup from './components/NewsletterPopup.jsx';

import HomePage from './pages/HomePage.jsx';
import CollectionsPage from './pages/CollectionsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import ExhibitionPage from './pages/ExhibitionPage.jsx';
import PastWorksPage from './pages/PastWorksPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

import './App.css';

// Initialize Scroll to Top & GSAP Intro Animations on any route or parameter change
const RoutePageInitializer = () => {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    // Instantly scroll window and document to top for all page redirects & link clicks
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname, location.search, location.hash, location.key]);

  useGSAPIntro();

  return null;
};

function App() {
  return (
    <InquiryProvider>
      <Router>
        <RoutePageInitializer />
        <div className="app-container d-flex flex-column min-vh-100 position-relative">
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/exhibitions" element={<ExhibitionPage />} />
              <Route path="/past-works" element={<PastWorksPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />

          {/* Global Interactive Overlays */}
          <RequestPriceModal />
          <FloatingWhatsApp />
          <NewsletterPopup />
        </div>
      </Router>
    </InquiryProvider>
  );
}

export default App;
