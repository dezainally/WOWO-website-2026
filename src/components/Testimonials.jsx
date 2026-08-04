import React, { useRef } from 'react';
import ShinyText from './ShinyText';
import imageLehenga from '../assets/images/image1.png';
import imageFusion from '../assets/images/image2.jpg';
import imageSherwani from '../assets/images/image3.jpg';
import imageSaree from '../assets/images/image4.jpg';
import heroImage from '../assets/images/heroimage.webp';
import '../styles/Testimonials.css';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Dr. Ananya Reddy',
    location: 'Hyderabad, Telangana',
    role: 'Bridal Couture Patron',
    rating: 5,
    tag: 'Bridal Lehenga',
    image: imageLehenga,
    quote: 'Samatha & the WOWO team made my dream bridal lehenga come to life! The zardozi embroidery and custom fit were beyond perfection. Every single guest at my wedding was captivated by the rich craftsmanship.',
    date: 'Dec 2025'
  },
  {
    id: 2,
    name: 'Priya Kulkarni',
    location: 'Bengaluru, Karnataka',
    role: 'Celebrity Stylist Pick',
    rating: 5,
    tag: 'Kanjeevaram Saree',
    image: imageSaree,
    quote: 'The silk quality of WOWO Kanjeevaram sarees is unmatched. I sourced sarees for an actress during their Bangalore boutique exhibition. The weight, regal drape, and pure zari work radiate genuine heirloom luxury.',
    date: 'Jan 2026'
  },
  {
    id: 3,
    name: 'Shalini Rao',
    location: 'Dallas, USA',
    role: 'International Client',
    rating: 5,
    tag: 'Worldwide Shipping',
    image: heroImage,
    quote: 'Ordering bridal wear from overseas can feel daunting, but WOWO’s 1-on-1 virtual styling session and insured international delivery were seamless. My ensemble arrived tailored to my exact measurements!',
    date: 'Nov 2025'
  },
  {
    id: 4,
    name: 'Dr. Sneha Varma',
    location: 'Chennai, Tamil Nadu',
    role: 'Red Carpet Patron',
    rating: 5,
    tag: 'Fusion Wear',
    image: imageFusion,
    quote: 'Visited their monthly luxury pop-up in Chennai and fell in love with an Indo-Western fusion set. Exceptional personalized attention, premium silk organza, and incredible attention to detail.',
    date: 'Feb 2026'
  },
  {
    id: 5,
    name: 'Vikram & Meera',
    location: 'Mumbai, Maharashtra',
    role: 'Groom & Bride Set',
    rating: 5,
    tag: 'Sherwani & Lehenga',
    image: imageSherwani,
    quote: 'WOWO Studio designed matching couple outfits for our wedding reception. The raw silk sherwani and velvet lehenga complimented each other beautifully. Masterclass in Indian haute couture!',
    date: 'Oct 2025'
  }
];

const Testimonials = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.8;
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.8;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="testimonials-section py-5 position-relative overflow-hidden">
      <div className="container position-relative" style={{ zIndex: 2 }}>

        {/* Section Header */}
        <div className="text-center mb-5 testimonials-header px-3">
          <span className="subtitle-gold">PATRON & CELEBRITY STORIES</span>
          <h2 className="testimonials-title fw-semibold mt-1">
            <ShinyText text="Voices of Elegance & Trust" color="#1c1917" shineColor="#d4af37" speed={3.5} />
          </h2>

          {/* Diamond motif divider line */}
          <div className="testimonials-divider mx-auto my-3">
            <span className="divider-line"></span>
            <span className="divider-diamond">◆</span>
            <span className="divider-line"></span>
          </div>
        </div>

        {/* Testimonials Slider Wrapper */}
        <div className="testimonials-slider-wrapper position-relative">

          {/* Left Navigation Arrow */}
          <button
            type="button"
            className="testimonial-arrow-btn testimonial-arrow-prev d-flex align-items-center justify-content-center border-0"
            onClick={scrollLeft}
            aria-label="Previous Reviews"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
            </svg>
          </button>

          {/* Scrollable Track */}
          <div className="testimonials-track" ref={sliderRef}>
            {TESTIMONIALS_DATA.map((item) => (
              <div key={item.id} className="testimonial-card-item">
                <div className="testimonial-card h-100 rounded-4 bg-white overflow-hidden d-flex flex-column justify-content-between position-relative">

                  {/* Top Outfit Image */}
                  <div className="testimonial-img-box position-relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${item.name} wearing WOWO Studio ${item.tag}`}
                      className="testimonial-img w-100 h-100 object-fit-cover"
                    />
                    <span className="testimonial-tag position-absolute top-0 start-0 m-3 px-2.5 py-1 rounded-pill">
                      {item.tag}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 d-flex flex-column justify-content-between flex-grow-1 position-relative">
                    {/* Decorative Quote Mark */}
                    <div className="quote-mark-bg position-absolute" aria-hidden="true">“</div>

                    <div>
                      {/* Top Row: Stars */}
                      <div className="rating-stars d-flex gap-1 mb-2">
                        {[...Array(item.rating)].map((_, i) => (
                          <span key={i} className="star-icon">★</span>
                        ))}
                      </div>

                      {/* Review Quote Text */}
                      <p className="testimonial-quote mb-4">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* Client Info Footer */}
                    <div className="testimonial-client-info d-flex align-items-center gap-3 pt-3 border-top">
                      <div className="client-avatar-circle d-flex align-items-center justify-content-center fw-bold">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="client-name mb-0">{item.name}</h4>
                        <p className="client-meta mb-0">{item.location} • <span className="text-gold">{item.role}</span></p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            className="testimonial-arrow-btn testimonial-arrow-next d-flex align-items-center justify-content-center border-0"
            onClick={scrollRight}
            aria-label="Next Reviews"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
