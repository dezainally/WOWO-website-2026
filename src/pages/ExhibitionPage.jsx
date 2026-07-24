import React, { useState } from 'react';
import { UPCOMING_EXHIBITIONS, EXHIBITION_GALLERY, PAST_HIGHLIGHTS } from '../data/exhibitionsData';
import { useInquiry } from '../context/InquiryContext';
import NewsletterSection from '../components/NewsletterSection';
import heroImage from '../assets/images/heroimage.webp';
import '../styles/ExhibitionPage.css';

const ExhibitionPage = () => {
  const { openWhatsApp } = useInquiry();

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

  return (
    <div className="exhibition-page-wrapper bg-light-sand py-4">
      
      {/* Hero Banner Section */}
      <div className="exhibition-hero-banner text-center py-5 bg-dark text-white position-relative">
        <div className="container px-3 px-lg-4 position-relative z-1">
          <span className="badge bg-gold px-3 py-2 text-uppercase letter-spacing-3 mb-3">
            Monthly Boutique Trunk Shows
          </span>
          <h1 className="exhibition-hero-title mt-1 mb-3">
            WOWO Studio Luxury Exhibitions
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
            <h2 className="font-heading fs-2 mt-1">Upcoming Exhibition Schedule</h2>
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

                    <div className="ex-time-box p-2.5 rounded bg-light-sand border mb-3">
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
                      <a href="#rsvp" className="btn btn-dark w-100 py-2.5 rounded-pill font-heading">
                        Register for VIP Access Pass
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Exhibition Gallery (Past Events) */}
        <section className="mb-5 py-4">
          <div className="text-center mb-5 max-w-700 mx-auto">
            <span className="subtitle-gold">EVENT HIGHLIGHTS</span>
            <h2 className="font-heading fs-2 mt-1">Glimpses From Previous Exhibitions</h2>
            <p className="small text-muted">A look back at our recent luxury trunk shows and happy brides across India.</p>
          </div>

          <div className="row g-3">
            {EXHIBITION_GALLERY.map((g) => (
              <div key={g.id} className="col-md-4 col-sm-6">
                <div className="gallery-item-card position-relative overflow-hidden rounded-3 border">
                  <img src={g.image} alt={g.title} className="gallery-img w-100" />
                  <div className="gallery-overlay p-3 d-flex flex-column justify-content-end">
                    <span className="badge bg-gold align-self-start mb-1">{g.location} ({g.year})</span>
                    <h5 className="text-white fs-6 mb-0 font-heading">{g.title}</h5>
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
              <h2 className="font-heading fs-2 mt-1 mb-3">Reserve Your Invitation Pass</h2>
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
                  <h3 className="font-heading">Registration Confirmed!</h3>
                  <p className="small text-muted mt-2">
                    Thank you, <strong>{rsvpData.name}</strong>. Your VIP Pass for the <strong>{rsvpData.city} Exhibition</strong> has been reserved. Our concierge will send your digital barcode pass to <strong>{rsvpData.phone}</strong>.
                  </p>
                </div>
              )}
            </div>

          </div>
        </section>

      </div>

      <NewsletterSection />
    </div>
  );
};

export default ExhibitionPage;
