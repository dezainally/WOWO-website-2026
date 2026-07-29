import React from 'react';
import brandVideo from '../assets/wowo-video.mp4';
import ShinyText from './ShinyText';
import '../styles/VideoSection.css';

const VideoSection = () => {
  const qualityPoints = [
    {
      id: 1,
      title: 'Artisanal Hand-Weaves',
      desc: 'Authentically crafted with pure silks, zari threadwork, and hand-loomed perfection.'
    },
    {
      id: 2,
      title: 'Bespoke Tailoring',
      desc: 'Custom-fit silhouettes designed to complement your unique style and body shape.'
    },
    {
      id: 3,
      title: 'Royal Color Palette',
      desc: 'Thoughtfully curated heritage hues, metallic sheen, and intricate sequin detailing.'
    },
    {
      id: 4,
      title: 'Timeless Heritage Aesthetics',
      desc: 'Heirloom-quality couture created to be celebrated for generations.'
    }
  ];

  return (
    <section className="video-section py-5">
      <div className="container px-3 px-lg-4">
        <div className="row align-items-center g-4 g-lg-5">

          {/* Left Column: Text & Quality Points */}
          <div className="col-lg-8">
            <div className="video-section-content">
              <span className="video-section-subtitle">THE WOWO HERITAGE</span>
              <h2 className="video-section-title fw-semibold mt-2 mb-3">
                <ShinyText text="Crafted with Elegance, Designed for Every Occasion" color="#1c1917" shineColor="#d4af37" speed={3.5} />
              </h2>
              <p className="video-section-description mb-4">
                At WOWO Studio, we celebrate the timeless artistry of Indian luxury couture.
                Every drape is meticulously handcrafted by master artisans, blending royal heritage
                weaving with contemporary sophistication to make every moment unforgettable.
              </p>

              {/* 4 Quality & Unique Style Points */}
              <div className="row g-3 quality-points-grid">
                {qualityPoints.map((point) => (
                  <div key={point.id} className="col-sm-6">
                    <div className="quality-point-card h-100 p-3">
                      <div className="d-flex align-items-start gap-2.5">
                        <div className="point-icon-badge">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="point-title mb-1">{point.title}</h4>
                          <p className="point-desc mb-0">{point.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Autoplay Muted Video (No Controls) */}
          <div className="col-lg-4">
            <div className="video-wrapper position-relative overflow-hidden">
              <video
                src={brandVideo}
                className="w-100 brand-video"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VideoSection;
