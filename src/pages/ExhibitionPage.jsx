import React, { useState } from 'react';
import ShinyText from '../components/ShinyText';
import { UPCOMING_EXHIBITIONS, EXHIBITION_GALLERY, PAST_HIGHLIGHTS } from '../data/exhibitionsData';
import { useInquiry } from '../context/InquiryContext';
import NewsletterSection from '../components/NewsletterSection';
import heroImage from '../assets/images/heroimage.webp';
import '../styles/ExhibitionPage.css';

const ExhibitionPage = () => {
  const { openWhatsApp } = useInquiry();

  // Gallery Lightbox Modal State
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [mediaFilter, setMediaFilter] = useState('all');

  const [rsvpData, setRsvpData] = useState({
    name: '',
    phone: '',
    city: 'Hyderabad',
    eventInterest: 'Bridal Wedding Couture',
    preferredDate: 'August 14, 2026',
    guestCount: '1-2 Guests'
  });

  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const handleChange = (e) => {
    setRsvpData({ ...rsvpData, [e.target.name]: e.target.value });
  };

  const handleRSVP = (e) => {
    e.preventDefault();
    setRsvpSuccess(true);
  };

  const handleOpenGallery = (galleryItem) => {
    setSelectedGallery(galleryItem);
    setActiveMediaIndex(0);
    setMediaFilter('all');
  };

  const handleCloseGallery = () => {
    setSelectedGallery(null);
    setActiveMediaIndex(0);
    setMediaFilter('all');
  };

  // Filtered media list based on 'all', 'videos', 'images' tab
  const getFilteredMedia = () => {
    if (!selectedGallery || !selectedGallery.media) return [];
    if (mediaFilter === 'videos') {
      return selectedGallery.media.filter(m => m.type === 'video');
    }
    if (mediaFilter === 'images') {
      return selectedGallery.media.filter(m => m.type === 'image');
    }
    return selectedGallery.media;
  };

  const filteredMediaList = getFilteredMedia();
  const activeMedia = filteredMediaList[activeMediaIndex] || filteredMediaList[0] || selectedGallery?.media?.[0];

  const handlePrevMedia = () => {
    if (!filteredMediaList.length) return;
    setActiveMediaIndex((prev) => (prev === 0 ? filteredMediaList.length - 1 : prev - 1));
  };

  const handleNextMedia = () => {
    if (!filteredMediaList.length) return;
    setActiveMediaIndex((prev) => (prev === filteredMediaList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="exhibition-page-wrapper bg-light-sand py-4">

      {/* Hero Banner Section */}
      <div className="exhibition-hero-banner text-center py-5 bg-dark text-white position-relative">
        <div className="container px-3 px-lg-4 position-relative z-1">
          <span className="badge bg-gold px-3 py-2 text-uppercase letter-spacing-3 mb-3">
            Monthly Boutique Trunk Shows
          </span>
          <h1 className="exhibition-hero-title fw-semibold mt-1 mb-3">
            <ShinyText text="WOWO Studio Luxury Exhibitions" color="#ffffff" shineColor="#f3d798" speed={3.5} />
          </h1>
          <p className="exhibition-hero-desc text-light opacity-90 max-w-800 mx-auto mb-4">
            We organize exclusive boutique exhibitions every month, showcasing our latest premium and luxury collections for weddings, festive occasions, parties, and special events across major cities.
          </p>

          <div className="d-flex justify-content-center flex-wrap gap-3">
            <a href="#schedule" className="btn btn-gold-lg rounded-pill">
              View Event Schedule ↓
            </a>
            <a href="#rsvp" className="btn btn-outline-light rounded-pill px-4">
              Register for VIP Access Pass
            </a>
          </div>
        </div>
      </div>

      <div className="container px-3 px-lg-4 py-5">

        {/* Past Highlights Banner Stats */}
        <div className="row g-4 mb-5">
          {PAST_HIGHLIGHTS.map((stat, idx) => (
            <div key={idx} className="col-md-4">
              <div className="stat-card p-4 rounded-4 bg-white border text-center shadow-sm h-100">
                <span className="stat-number text-gold font-heading display-5 fw-bold d-block mb-1">{stat.number}</span>
                <h4 className="fs-6 font-heading mb-1">{stat.label}</h4>
                <p className="small text-muted mb-0">{stat.subtext}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 1: Upcoming Monthly Exhibition Announcements */}
        <section id="schedule" className="mb-5 pt-3">
          <div className="text-center mb-5 max-w-700 mx-auto">
            <span className="subtitle-gold">MONTHLY POP-UP DATES</span>
            <h2 className="font-heading fw-semibold fs-2 mt-1">
              <ShinyText text="Upcoming Exhibition Schedule" color="#1c1917" shineColor="#d4af37" speed={3.5} />
            </h2>
            <p className="small text-muted">
              Book your private appointment or walk in during exhibition hours for bespoke bridal consultations.
            </p>
          </div>

          <div className="row g-4">
            {UPCOMING_EXHIBITIONS.map((ex) => (
              <div key={ex.id} className="col-lg-4 col-md-6">
                <div className="exhibition-event-card bg-white rounded-4 overflow-hidden border h-100 d-flex flex-column shadow-sm">
                  <div className="ex-img-wrapper position-relative overflow-hidden">
                    <img src={ex.image} alt={ex.title} className="ex-img w-100" />
                    <span className="badge bg-gold position-absolute top-3 start-3">{ex.badge}</span>
                  </div>

                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="ex-city-badge fw-bold">{ex.city} Exhibition</span>
                      <span className="status-badge-green">{ex.status}</span>
                    </div>

                    <h3 className="ex-title fs-5 mb-2">{ex.title}</h3>
                    <p className="ex-venue small text-muted mb-3">📍 <strong>Venue:</strong> {ex.venue}</p>

                    <div className="ex-time-box p-2.5 rounded bg-light-sand border mb-3 px-2">
                      <p className="small mb-1"><strong>Dates:</strong> {ex.dates}</p>
                      <p className="small mb-0 text-muted"><strong>Hours:</strong> {ex.time}</p>
                    </div>

                    <h5 className="fs-7 fw-bold mb-2">Exhibition Privileges:</h5>
                    <ul className="list-unstyled small text-muted mb-4">
                      {ex.highlights.map((h, i) => (
                        <li key={i} className="mb-1">✨ {h}</li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      <a href="#rsvp" className="btn btn-dark w-100 py-2.5 rounded-pill cinzel-font">
                        Register for VIP Access Pass
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Exhibition Gallery (Past Events with Video & Photo Lightbox) */}
        <section className="mb-5 py-4">
          <div className="text-center mb-5 max-w-700 mx-auto">
            <span className="subtitle-gold">EVENT HIGHLIGHTS & MEDIA</span>
            <h2 className="font-heading fw-semibold fs-2 mt-1">
              <ShinyText text="Glimpses From Previous Exhibitions" color="#1c1917" shineColor="#d4af37" speed={3.5} />
            </h2>
            <p className="small text-muted">
              Click on any exhibition card below to explore videos, photos, runway highlights & backstage glimpses from our past events.
            </p>
          </div>

          <div className="row g-4">
            {EXHIBITION_GALLERY.map((g) => (
              <div key={g.id} className="col-md-4 col-sm-6">
                <div
                  className="gallery-item-card position-relative overflow-hidden border shadow-sm rounded-4 cursor-pointer"
                  onClick={() => handleOpenGallery(g)}
                  title={`Click to view ${g.title} photo & video gallery`}
                >
                  <img src={g.image} alt={g.title} className="gallery-img w-100" />

                  {/* Play & Media Badge Overlay Icon */}
                  <div className="gallery-play-badge d-flex align-items-center justify-content-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>

                  <div className="gallery-overlay p-3 d-flex flex-column justify-content-end">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <span className="badge bg-gold">{g.location} • {g.year}</span>

                    </div>
                    <h5 className="text-white fs-6 mb-1 cinzel-font">{g.title}</h5>
                    <span className="gallery-view-hint">🎬 Click to view videos & photos ↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: VIP Exhibition Registration / Contact Form */}
        <section id="rsvp" className="exhibition-rsvp-section p-4 p-md-5 bg-white rounded-4 border shadow-sm my-5">
          <div className="row align-items-center g-4 g-lg-5">

            <div className="col-lg-5">
              <span className="subtitle-gold">VIP ACCESS REGISTRATION</span>
              <h2 className="font-heading fw-semibold fs-2 mt-1 mb-3">
                <ShinyText text="Reserve Your Invitation Pass" color="#1c1917" shineColor="#d4af37" speed={3.5} />
              </h2>
              <p className="text-muted small line-height-16 mb-4">
                Registering for our monthly boutique exhibitions guarantees priority entry, private 1-on-1 stylist sessions with Samatha Chowdary, and complimentary high-tea.
              </p>

              <div className="p-3 rounded-3 bg-light-sand border mb-4">
                <h5 className="fs-6 font-heading mb-2">Need Immediate Event Info?</h5>
                <p className="small text-muted mb-3">Call our Exhibition Concierge Desk directly or message us on WhatsApp.</p>
                <div className="d-flex gap-2">
                  <button type="button" onClick={() => openWhatsApp('Exhibition VIP Pass')} className="btn btn-success btn-sm px-3 rounded-pill">
                    💬 WhatsApp Concierge
                  </button>
                  <a href="tel:+919666748789" className="btn btn-outline-dark btn-sm px-3 rounded-pill">
                    📞 Call +91 96667 48789
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              {!rsvpSuccess ? (
                <form onSubmit={handleRSVP} className="p-4 bg-light-sand rounded-3 border">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label-custom">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter your name"
                        value={rsvpData.name}
                        onChange={handleChange}
                        className="form-control form-input-custom"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label-custom">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={rsvpData.phone}
                        onChange={handleChange}
                        className="form-control form-input-custom"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label-custom">Select Exhibition City *</label>
                      <select
                        name="city"
                        value={rsvpData.city}
                        onChange={handleChange}
                        className="form-select form-input-custom"
                      >
                        <option value="Hyderabad">Hyderabad (Aug 14-16, 2026)</option>
                        <option value="Mumbai">Mumbai (Sep 08-10, 2026)</option>
                        <option value="Bengaluru">Bengaluru (Oct 18-20, 2026)</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label-custom">Occasion Interest</label>
                      <select
                        name="eventInterest"
                        value={rsvpData.eventInterest}
                        onChange={handleChange}
                        className="form-select form-input-custom"
                      >
                        <option value="Bridal Wedding Couture">Bridal Wedding Lehenga</option>
                        <option value="Kanjeevaram & Banarasi Sarees">Kanjeevaram & Banarasi Sarees</option>
                        <option value="Groom Sherwani & Wear">Groom Sherwani</option>
                        <option value="Festive & Party Wear">Festive & Party Wear</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn-gold-lg w-100 rounded-3 py-3 text-center">
                        Confirm Exhibition VIP Registration
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="text-center p-4 bg-white rounded-3 border">
                  <div className="success-icon-badge mx-auto mb-3">✓</div>
                  <h3 className="font-heading fw-semibold">Registration Confirmed!</h3>
                  <p className="small text-muted mt-2">
                    Thank you, <strong>{rsvpData.name}</strong>. Your VIP Pass for the <strong>{rsvpData.city} Exhibition</strong> has been reserved. Our concierge will send your digital barcode pass to <strong>{rsvpData.phone}</strong>.
                  </p>
                </div>
              )}
            </div>

          </div>
        </section>

      </div>

      {/* Interactive Exhibition Gallery Lightbox Modal */}
      {selectedGallery && (
        <div className="ex-modal-overlay" onClick={handleCloseGallery}>
          <div className="ex-modal-container" onClick={(e) => e.stopPropagation()}>

            {/* Modal Header */}
            <div className="ex-modal-header d-flex align-items-center justify-content-between px-4 py-3">
              <div>
                <h3 className="ex-modal-title mb-0">{selectedGallery.title}</h3>
                <span className="ex-modal-subtitle">
                  📍 {selectedGallery.venue || 'Boutique Venue'} • {selectedGallery.location} ({selectedGallery.year})
                </span>
              </div>
              <button
                type="button"
                className="ex-modal-close-btn border-0"
                onClick={handleCloseGallery}
                title="Close Gallery"
              >
                ✕
              </button>
            </div>

            {/* Filter Tabs Bar */}
            <div className="ex-modal-tabs-bar d-flex align-items-center justify-content-between px-4 py-2 bg-dark border-bottom border-secondary border-opacity-25">
              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  className={`ex-modal-filter-tab ${mediaFilter === 'all' ? 'active' : ''}`}
                  onClick={() => { setMediaFilter('all'); setActiveMediaIndex(0); }}
                >
                  All Media ({selectedGallery.media?.length || 0})
                </button>
                <button
                  type="button"
                  className={`ex-modal-filter-tab ${mediaFilter === 'videos' ? 'active' : ''}`}
                  onClick={() => { setMediaFilter('videos'); setActiveMediaIndex(0); }}
                >
                  🎥 Videos ({selectedGallery.media?.filter(m => m.type === 'video').length || 0})
                </button>
                <button
                  type="button"
                  className={`ex-modal-filter-tab ${mediaFilter === 'images' ? 'active' : ''}`}
                  onClick={() => { setMediaFilter('images'); setActiveMediaIndex(0); }}
                >
                  📷 Photos ({selectedGallery.media?.filter(m => m.type === 'image').length || 0})
                </button>
              </div>
              <span className="small text-gold-light d-none d-sm-inline font-heading">
                Item {activeMediaIndex + 1} of {filteredMediaList.length}
              </span>
            </div>

            {/* Main Media Display Stage */}
            <div className="ex-modal-stage">
              {activeMedia ? (
                <div className="ex-media-stage-inner d-flex flex-column align-items-center justify-content-center w-100 h-100 position-relative">
                  {activeMedia.type === 'video' ? (
                    <video
                      key={activeMedia.url || activeMedia.src}
                      src={activeMedia.url || activeMedia.src}
                      controls
                      autoPlay
                      className="ex-modal-media"
                    />
                  ) : (
                    <img
                      src={activeMedia.url || activeMedia.src}
                      alt={activeMedia.title || activeMedia.caption || selectedGallery.title}
                      className="ex-modal-media"
                    />
                  )}

                  {/* Caption Bar */}
                  <div className="ex-media-caption-badge mt-3 px-3 py-1.5 rounded-pill text-white small d-flex align-items-center gap-2">
                    <span>{activeMedia.type === 'video' ? '🎥' : '📷'} {activeMedia.title || activeMedia.caption}</span>
                    {activeMedia.caption && <span className="text-gold opacity-90">• {activeMedia.caption}</span>}
                  </div>

                  {/* Navigation Arrows */}
                  {filteredMediaList.length > 1 && (
                    <>
                      <button type="button" className="ex-modal-nav-btn ex-modal-prev" onClick={handlePrevMedia} title="Previous Media">
                        ‹
                      </button>
                      <button type="button" className="ex-modal-nav-btn ex-modal-next" onClick={handleNextMedia} title="Next Media">
                        ›
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-white p-4">No media available for this filter.</div>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            <div className="ex-modal-thumbnails-bar d-flex align-items-center justify-content-center">
              {filteredMediaList.map((mediaItem, index) => {
                const mediaSrc = mediaItem.url || mediaItem.src || selectedGallery.image;
                return (
                  <button
                    key={mediaItem.id || index}
                    type="button"
                    className={`ex-thumb-btn ${activeMediaIndex === index ? 'active' : ''}`}
                    onClick={() => setActiveMediaIndex(index)}
                    title={mediaItem.title || `Media ${index + 1}`}
                  >
                    <img src={mediaSrc} alt={mediaItem.title || `Thumb ${index + 1}`} className="ex-thumb-img" />
                    <span className="ex-thumb-type-badge">
                      {mediaItem.type === 'video' ? '🎥' : '📷'}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      )}

      <NewsletterSection />
    </div>
  );
};

export default ExhibitionPage;
