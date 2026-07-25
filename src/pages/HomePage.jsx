import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import CuratedSeason from '../components/CuratedSeason';
import ShopStyles from '../components/ShopStyles';
import VideoSection from '../components/VideoSection';
import Testimonials from '../components/Testimonials';
import NewsletterSection from '../components/NewsletterSection';
import { UPCOMING_EXHIBITIONS } from '../data/exhibitionsData';
import { useInquiry } from '../context/InquiryContext';
import '../styles/HomePage.css';

const HomePage = () => {
  const { openInquiryModal } = useInquiry();
  const nextExhibition = UPCOMING_EXHIBITIONS[0];

  return (
    <div className="home-page-wrapper">
      {/* Hero Banner Section */}
      <HeroSection />

      {/* Curated Categories Grid */}
      <CuratedSeason />

      {/* Interactive Catalog Marquee with Request Price */}
      <ShopStyles />

      {/* Artisanal Heritage Video & 4 Quality Points */}
      <VideoSection />

      {/* Dedicated Monthly Exhibition Feature Banner */}
      <section className="exhibition-spotlight-section py-5">
        <div className="container px-3 px-lg-4">
          <div className="exhibition-banner-card p-4 p-md-5 rounded-4 position-relative overflow-hidden">
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <span className="badge bg-gold px-3 py-2 text-uppercase letter-spacing-2 mb-3">
                  Monthly Luxury Pop-ups
                </span>
                <h2 className="exhibition-spotlight-title fw-semibold text-white mb-3">
                  Experience WOWO Studio’s Exclusive Boutique Exhibitions
                </h2>
                <p className="exhibition-spotlight-text text-light opacity-90 mb-4">
                  Every month, we bring our royal wedding couture, pure silk Kanjeevarams, and handcrafted festive ensembles directly to major luxury hubs across India. Reserve your VIP pass for private stylist consultations and unreleased trunk show drops.
                </p>

                <div className="d-flex flex-wrap align-items-center gap-3">
                  <Link to="/exhibitions" className="btn btn-gold-lg rounded-pill">
                    View Monthly Exhibition Schedule →
                  </Link>
                  <button type="button" onClick={() => openInquiryModal()} className="btn btn-outline-light rounded-pill px-4">
                    Book VIP Trunk Show Invite
                  </button>
                </div>
              </div>

              {/* Card Thumbnail */}
              <div className="col-lg-5">
                <div className="next-exhibition-mini-card p-4 rounded-3 bg-white text-dark shadow-lg">
                  <span className="status-badge-green mb-2 d-inline-block">{nextExhibition.status}</span>
                  <h4 className="font-heading mb-1">{nextExhibition.title}</h4>
                  <p className="small text-muted mb-2">📍 {nextExhibition.city} — {nextExhibition.venue}</p>
                  <p className="small fw-semibold text-gold mb-3">🗓️ {nextExhibition.dates} ({nextExhibition.time})</p>
                  <Link to="/exhibitions" className="btn btn-sm btn-dark w-100 py-2">
                    Register for Event Access
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Boutique Trust & Styling Services Section */}
      <section className="boutique-trust-section py-5 bg-white">
        <div className="container px-3 px-lg-4">
          <div className="text-center mb-5 max-w-700 mx-auto">
            <span className="subtitle-gold">THE BOUTIQUE EXPERIENCE</span>
            <h2 className="font-heading fw-semibold fs-2 mt-1">Why High-Fashion Patrons Choose WOWO</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="trust-card text-center p-4 rounded-3 border h-100">
                <div className="trust-icon-badge mb-3 mx-auto">✨</div>
                <h4 className="fs-6 fw-bold mb-2">100% Handcrafted Weaves</h4>
                <p className="small text-muted mb-0">Sourced directly from authentic weaver clusters across Kanchipuram & Varanasi.</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="trust-card text-center p-4 rounded-3 border h-100">
                <div className="trust-icon-badge mb-3 mx-auto">🪡</div>
                <h4 className="fs-6 fw-bold mb-2">Bespoke Fit Guarantee</h4>
                <p className="small text-muted mb-0">Tailored individually to your exact measurements by master boutique artisans.</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="trust-card text-center p-4 rounded-3 border h-100">
                <div className="trust-icon-badge mb-3 mx-auto">👑</div>
                <h4 className="fs-6 fw-bold mb-2">1-on-1 Designer Sessions</h4>
                <p className="small text-muted mb-0">Direct consultation with Chief Stylist Samatha Chowdary for wedding trousseaus.</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="trust-card text-center p-4 rounded-3 border h-100">
                <div className="trust-icon-badge mb-3 mx-auto">✈️</div>
                <h4 className="fs-6 fw-bold mb-2">Worldwide Insured Shipping</h4>
                <p className="small text-muted mb-0">Doorstep delivery across USA, UK, UAE, Australia, and worldwide with full insurance.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Patron Stories & Reviews Section */}
      <Testimonials />

      {/* Pre-footer Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
