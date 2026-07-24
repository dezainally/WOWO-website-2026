import React from 'react';
import { Link } from 'react-router-dom';
import { useInquiry } from '../context/InquiryContext';
import NewsletterSection from '../components/NewsletterSection';
import heroImage from '../assets/images/heroimage.webp';
import image1 from '../assets/images/image1.png';
import '../styles/AboutPage.css';

const AboutPage = () => {
  const { openInquiryModal } = useInquiry();

  return (
    <div className="about-page-wrapper bg-light-sand py-4">
      {/* Header Banner */}
      <div className="about-header-banner text-center py-5 bg-dark text-white position-relative">
        <div className="container px-3">
          <span className="subtitle-gold letter-spacing-3">THE ARTISTRY OF WOWO STUDIO</span>
          <h1 className="about-header-title mt-2 mb-3">Our Legacy & Craftsmanship</h1>
          <p className="about-header-desc text-light opacity-80 max-w-700 mx-auto mb-0">
            Founded by Samatha Chowdary, WOWO Studio is dedicated to preserving authentic Indian handloom traditions while creating contemporary luxury fashion for modern brides and celebrations.
          </p>
        </div>
      </div>

      <div className="container px-3 px-lg-4 py-5">
        
        {/* Story Grid */}
        <div className="row align-items-center g-4 g-lg-5 mb-5">
          <div className="col-lg-6">
            <div className="about-img-stage rounded-4 overflow-hidden border shadow-sm">
              <img src={heroImage} alt="Samatha Chowdary WOWO Studio" className="w-100 h-100 object-cover" />
            </div>
          </div>

          <div className="col-lg-6">
            <span className="subtitle-gold">VISIONARY DESIGN</span>
            <h2 className="font-heading fs-2 mt-1 mb-3">A Passion for Heritage & Pure Silks</h2>
            <p className="text-muted line-height-16 mb-3">
              At WOWO Studio, every weave tells a story of royal grandeur. We collaborate with master artisan families across Kanchipuram, Varanasi, and Chanderi who have inherited weaving secrets through generations.
            </p>
            <p className="text-muted line-height-16 mb-4">
              Rather than mass production, we operate as an exclusive boutique studio. Each bridal outfit, Kanjeevaram saree, and handcrafted sherwani is tailored individually to ensure uncompromised quality and immaculate fit.
            </p>

            <div className="row g-3 mb-4">
              <div className="col-6">
                <div className="p-3 bg-white rounded border text-center">
                  <h4 className="fs-3 font-heading text-gold mb-0">180+</h4>
                  <span className="small text-muted">Weaving Hours per Saree</span>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 bg-white rounded border text-center">
                  <h4 className="fs-3 font-heading text-gold mb-0">100%</h4>
                  <span className="small text-muted">Authentic Pure Silk</span>
                </div>
              </div>
            </div>

            <button type="button" onClick={() => openInquiryModal()} className="btn btn-gold-lg rounded-pill">
              Schedule Private Fitting Session
            </button>
          </div>
        </div>

      </div>

      <NewsletterSection />
    </div>
  );
};

export default AboutPage;
