import React, { useState } from 'react';
import { useInquiry } from '../context/InquiryContext';
import heroImage from '../assets/images/heroimage.webp';
import '../styles/NewsletterPopup.css';

const NewsletterPopup = () => {
  const { isNewsletterPopupOpen, closeNewsletterPopup } = useInquiry();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!isNewsletterPopupOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        closeNewsletterPopup();
      }, 2500);
    }
  };

  return (
    <div className="newsletter-popup-overlay d-flex align-items-center justify-content-center px-3" onClick={closeNewsletterPopup}>
      <div className="newsletter-popup-card position-relative overflow-hidden bg-white d-flex flex-column flex-md-row" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          type="button"
          className="newsletter-popup-close border-0 bg-transparent position-absolute"
          onClick={closeNewsletterPopup}
          aria-label="Close Newsletter Popup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
        </button>

        {/* Promotional Image Column */}
        <div className="newsletter-popup-img-col w-100 w-md-50 position-relative overflow-hidden">
          <img src={heroImage} alt="WOWO Circle Exclusive Offer" className="newsletter-popup-img w-100 h-100" />
          <div className="newsletter-popup-img-overlay d-flex align-items-end p-4">
            <span className="newsletter-badge">THE WOWO CIRCLE</span>
          </div>
        </div>

        {/* Content & Form Column */}
        <div className="newsletter-popup-content-col w-100 w-md-50 p-4 p-lg-5 d-flex flex-column justify-content-center">
          {!subscribed ? (
            <div>
              <span className="newsletter-popup-sub">VIP BOUTIQUE INVITATION</span>
              <h3 className="newsletter-popup-title mt-1 mb-2">Unlock Exclusive Passes to Monthly Exhibitions</h3>
              <p className="newsletter-popup-desc mb-4">
                Join the WOWO Studio Circle to receive private preview passes for our monthly luxury exhibitions, new couture releases, and complimentary bridal styling invitations.
              </p>

              <form onSubmit={handleSubmit} className="newsletter-popup-form">
                <div className="mb-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control newsletter-popup-input"
                  />
                </div>
                <button type="submit" className="btn-newsletter-popup-submit w-100">
                  Claim Your VIP Pass
                </button>
              </form>
              <p className="newsletter-privacy-text text-center mt-3 mb-0">
                We respect your privacy. Unsubscribe anytime with one click.
              </p>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="newsletter-success-badge mb-3 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                </svg>
              </div>
              <h4 className="newsletter-popup-title">Welcome to The Circle!</h4>
              <p className="newsletter-popup-desc mt-2">
                Your VIP invitation pass has been sent to <strong>{email}</strong>. We look forward to hosting you at our next boutique exhibition.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default NewsletterPopup;
