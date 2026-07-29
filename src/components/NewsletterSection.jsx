import React, { useState } from 'react';
import ShinyText from './ShinyText';
import '../styles/NewsletterSection.css';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="newsletter-section py-5">
      <div className="container px-3 px-lg-4">
        <div className="newsletter-box text-center p-4 p-md-5 rounded-4 position-relative overflow-hidden">
          <div className="newsletter-bg-decor"></div>

          <div className="position-relative z-1 max-w-650 mx-auto">
            <span className="newsletter-section-tag">JOIN THE WOWO CIRCLE</span>
            <h2 className="newsletter-section-title fw-semibold mt-2 mb-3">
              <ShinyText text="Be First to Access Private Exhibition Invites & New Arrivals" color="#ffffffff" shineColor="#d4af37" speed={3.5} />
            </h2>
            <p className="newsletter-section-desc mb-4">
              Subscribe to receive exclusive invitations to our monthly boutique pop-up exhibitions, private bridal styling appointments, and secret seasonal drops.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubmit} className="newsletter-form d-flex flex-column flex-sm-row gap-2 max-w-500 mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control newsletter-input"
                />
                <button type="submit" className="btn-newsletter-subscribe text-nowrap">
                  Subscribe to VIP Circle
                </button>
              </form>
            ) : (
              <div className="newsletter-success-box p-3 rounded-3 bg-white text-dark max-w-500 mx-auto border border-gold">
                <p className="mb-0 fw-semibold text-gold">
                  ✨ Thank you for subscribing! Check <strong>{email}</strong> for your VIP exhibition welcome pass.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
