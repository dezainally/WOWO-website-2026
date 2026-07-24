import React, { useState } from 'react';
import { useInquiry } from '../context/InquiryContext';
import NewsletterSection from '../components/NewsletterSection';
import '../styles/ContactPage.css';

const ContactPage = () => {
  const { openWhatsApp, callNow, openInquiryModal } = useInquiry();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page-wrapper bg-light-sand py-4">
      
      {/* Header Banner */}
      <div className="contact-header-banner text-center py-5 bg-dark text-white position-relative">
        <div className="container px-3">
          <span className="subtitle-gold letter-spacing-3">WE WOULD LOVE TO ASSIST YOU</span>
          <h1 className="contact-header-title mt-2 mb-3">Contact WOWO Studio</h1>
          <p className="contact-header-desc text-light opacity-80 max-w-700 mx-auto mb-0">
            Visit our flagship boutique studio in Jubilee Hills, Hyderabad or reach out to our senior bridal consultants for exhibition details, price requests, and bespoke orders.
          </p>
        </div>
      </div>

      <div className="container px-3 px-lg-4 py-5">
        <div className="row g-4 g-lg-5">
          
          {/* Left Column: Contact Cards */}
          <div className="col-lg-5">
            <div className="contact-info-card bg-white p-4 p-md-5 rounded-4 border shadow-sm h-100">
              <span className="subtitle-gold">FLAGSHIP BOUTIQUE STUDIO</span>
              <h2 className="font-heading fs-3 mt-1 mb-4">Hyderabad Studio</h2>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="contact-icon-box">📍</div>
                <div>
                  <h5 className="fs-6 font-heading mb-1">Store Address</h5>
                  <p className="small text-muted mb-0">
                    Road No. 10, Jubilee Hills,<br />
                    Hyderabad, Telangana - 500033, India
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="contact-icon-box">📞</div>
                <div>
                  <h5 className="fs-6 font-heading mb-1">Phone & Concierge</h5>
                  <p className="small text-muted mb-1">
                    <a href="tel:+919666748789" className="text-dark fw-bold text-decoration-none">+91 96667 48789</a>
                  </p>
                  <span className="small text-muted">Mon - Sat: 10:30 AM to 8:00 PM</span>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="contact-icon-box">💬</div>
                <div>
                  <h5 className="fs-6 font-heading mb-1">Instant WhatsApp Stylist</h5>
                  <button type="button" onClick={() => openWhatsApp()} className="btn btn-success btn-sm px-3 rounded-pill mt-1">
                    Connect on WhatsApp
                  </button>
                </div>
              </div>

              <div className="pt-3 border-top">
                <h5 className="fs-6 font-heading mb-2">Follow Our Social Journey</h5>
                <div className="d-flex gap-2">
                  <a href="https://www.instagram.com/wowobysamathachowdary/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-sm rounded-pill">
                    Instagram
                  </a>
                  <a href="https://www.facebook.com/share/1FjM8gsDzK/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-sm rounded-pill">
                    Facebook
                  </a>
                  <a href="https://wa.me/919666748789" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-sm rounded-pill">
                    WhatsApp
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: General Inquiry Form */}
          <div className="col-lg-7">
            <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm">
              <span className="subtitle-gold">GENERAL & BOUTIQUE INQUIRIES</span>
              <h2 className="font-heading fs-3 mt-1 mb-3">Send Us a Message</h2>
              <p className="small text-muted mb-4">
                Have questions about our upcoming exhibitions, saree finishing, or customized bridal lehengas? Fill out the form below.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label-custom">Your Name *</label>
                      <input type="text" required placeholder="Enter full name" className="form-control form-input-custom" />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label-custom">Phone Number *</label>
                      <input type="tel" required placeholder="+91 98765 43210" className="form-control form-input-custom" />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label-custom">Email Address (Optional)</label>
                      <input type="email" placeholder="name@example.com" className="form-control form-input-custom" />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label-custom">City / Location</label>
                      <input type="text" placeholder="e.g. Hyderabad, USA" className="form-control form-input-custom" />
                    </div>

                    <div className="col-12">
                      <label className="form-label-custom">Inquiry Subject</label>
                      <select className="form-select form-input-custom">
                        <option>Boutique Exhibition Details</option>
                        <option>Bridal Customization & Fitting</option>
                        <option>Saree / Lehenga Price Request</option>
                        <option>International Shipping Query</option>
                        <option>Other Requirements</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label-custom">Your Message *</label>
                      <textarea rows="4" required placeholder="Tell us about your event, preferred dates, or styling requirements..." className="form-control form-input-custom"></textarea>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn-gold-lg w-100 rounded-3 py-3">
                        Submit Message
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="success-icon-badge mx-auto mb-3">✓</div>
                  <h3 className="font-heading">Message Received!</h3>
                  <p className="small text-muted mt-2">
                    Thank you for contacting WOWO Studio. Our boutique team will get back to you shortly.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      <NewsletterSection />
    </div>
  );
};

export default ContactPage;
