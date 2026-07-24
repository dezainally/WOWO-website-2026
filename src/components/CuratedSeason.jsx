import React from 'react';
import { Link } from 'react-router-dom';
import imageLehenga from '../assets/images/image1.png';
import imageFusion from '../assets/images/image2.jpg';
import imageSherwani from '../assets/images/image3.jpg';
import imageSaree from '../assets/images/image4.jpg';
import '../styles/CuratedSeason.css';

const CuratedSeason = () => {
  const collections = [
    { id: 1, name: 'LEHENGA', image: imageLehenga, path: '/collections?cat=lehengas' },
    { id: 2, name: 'FUSION WEAR', image: imageFusion, path: '/collections?cat=fusion' },
    { id: 3, name: 'SAREES', image: imageSaree, path: '/collections?cat=sarees' },
    { id: 4, name: 'SHERWANIS', image: imageSherwani, path: '/collections?cat=sherwanis' }
  ];

  const features = [
    {
      id: 1,
      title: 'PREMIUM FABRICS',
      subtitle: 'Finest quality materials',
      icon: (
        <div className="curated-feature-icon-circle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a07d32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A9 9 0 0 0 20 11V3h-8a9 9 0 0 0-9 9 9 9 0 0 0 8 8z"></path>
            <path d="M11 20v-9a3 3 0 0 1 3-3h6"></path>
          </svg>
        </div>
      )
    },
    {
      id: 2,
      title: 'TIMELESS DESIGNS',
      subtitle: 'Crafted to perfection',
      icon: (
        <div className="curated-feature-icon-circle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a07d32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6"></circle>
            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"></path>
            <path d="m9 8 2 2 4-4"></path>
          </svg>
        </div>
      )
    },
    {
      id: 3,
      title: 'EXCLUSIVE COLLECTIONS',
      subtitle: 'Limited pieces, endless elegance',
      icon: (
        <div className="curated-feature-icon-circle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a07d32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3h6l2 4-4 2 2 12H9l2-12-4-2z"></path>
            <line x1="8" y1="21" x2="16" y2="21"></line>
          </svg>
        </div>
      )
    },
    {
      id: 4,
      title: 'WORLDWIDE SHIPPING',
      subtitle: 'Delivering elegance globally',
      icon: (
        <div className="curated-feature-icon-circle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a07d32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="1"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
        </div>
      )
    }
  ];

  return (
    <section className="curated-section position-relative py-5 overflow-hidden">
      {/* Botanical Line Art Backgrounds */}
      <div className="curated-bg-floral curated-bg-top-left" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10C50 40 80 90 90 150M30 20C70 60 100 110 120 180M50 10C90 70 140 120 180 160" stroke="#b89851" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 3" />
          <path d="M25 35C15 25 35 15 45 25M55 65C40 50 70 40 85 55M85 105C70 90 100 80 115 95" stroke="#b89851" strokeWidth="1.2" strokeOpacity="0.35" />
        </svg>
      </div>
      <div className="curated-bg-floral curated-bg-top-right" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M190 10C150 40 120 90 110 150M170 20C130 60 100 110 80 180M150 10C110 70 60 120 20 160" stroke="#b89851" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 3" />
          <path d="M175 35C185 25 165 15 155 25M145 65C160 50 130 40 115 55M115 105C130 90 100 80 85 95" stroke="#b89851" strokeWidth="1.2" strokeOpacity="0.35" />
        </svg>
      </div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        {/* Section Header */}
        <div className="text-center mb-5 curated-header-block">
          {/* Top Decorative Motif */}
          <div className="curated-motif mb-3 d-flex justify-content-center">
            <svg width="60" height="16" viewBox="0 0 60 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 0L33 5L38 8L33 11L30 16L27 11L22 8L27 5L30 0Z" fill="#a07d32" fillOpacity="0.7" />
              <path d="M0 8H20M40 8H60" stroke="#a07d32" strokeWidth="1" strokeOpacity="0.5" />
              <circle cx="12" cy="8" r="2" fill="#a07d32" fillOpacity="0.6" />
              <circle cx="48" cy="8" r="2" fill="#a07d32" fillOpacity="0.6" />
            </svg>
          </div>

          <h2 className="curated-title">CURATED THIS SEASON</h2>

          {/* Golden accent line below title */}
          <div className="curated-title-line mx-auto my-3"></div>

          <p className="curated-subtitle">
            A blend of classic silhouettes and our signature shine,<br className="d-none d-md-block" />
            embodied by enigmatic sequins and pure silk weaves.
          </p>

          {/* Explore Collection Button */}
          <div className="mt-4">
            <Link to="/collections" className="btn curated-explore-btn">
              EXPLORE COLLECTION
              <svg className="ms-2" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1L15 6M15 6L10 11M15 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Collections Cards Grid */}
        <div className="row g-3 mb-5">
          {collections.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-lg-3">
              <Link to={item.path} className="curated-card-link">
                <div className="curated-card position-relative overflow-hidden">
                  {/* Background Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="curated-card-img w-100 h-100"
                  />

                  {/* Gradient Overlay */}
                  <div className="curated-card-overlay"></div>

                  {/* Content Overlay */}
                  <div className="curated-card-content p-4 text-center d-flex flex-column align-items-center justify-content-end w-100 h-100 position-absolute top-0 start-0">
                    <h3 className="curated-card-label">{item.name}</h3>

                    {/* Small Accent Line with Diamond */}
                    <div className="curated-card-divider my-2">
                      <span className="curated-diamond"></span>
                    </div>

                    <div className="curated-shop-row d-flex align-items-center justify-content-center gap-2 mt-1">
                      <span className="curated-shop-text">SHOP COLLECTION</span>
                      <span className="curated-arrow-circle d-flex align-items-center justify-content-center">
                        <svg width="12" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 1L15 6M15 6L10 11M15 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Features Bar */}
        <div className="curated-features-bar py-4 px-3">
          <div className="row g-4 text-center align-items-center">
            {features.map((feature, index) => (
              <div key={feature.id} className={`col-12 col-sm-6 col-lg-3 curated-feature-col ${index < features.length - 1 ? 'has-divider' : ''}`}>
                <div className="d-flex align-items-center justify-content-center gap-3 px-2">
                  <div className="curated-feature-icon-wrapper flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="text-start">
                    <h4 className="curated-feature-title mb-1">{feature.title}</h4>
                    <p className="curated-feature-subtitle mb-0">{feature.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CuratedSeason;
