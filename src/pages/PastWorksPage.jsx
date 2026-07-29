import React, { useState } from 'react';
import { PAST_WORKS_DATA } from '../data/pastWorksData';
import { useInquiry } from '../context/InquiryContext';
import '../styles/PastWorksPage.css';

const PastWorksPage = () => {
  const { openInquiryModal } = useInquiry();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'ALL CREATIONS' },
    { id: 'celebrity', label: 'CELEBRITIES & ACTRESSES' },
    { id: 'bridal', label: 'BRIDAL TROUSSEAUS' },
    { id: 'red-carpet', label: 'RED CARPET GALAS' },
    { id: 'handloom', label: 'HANDLOOM ARCHIVE' }
  ];

  const filteredWorks = activeCategory === 'all'
    ? PAST_WORKS_DATA
    : PAST_WORKS_DATA.filter(w => w.category === activeCategory);

  return (
    <div className="past-works-page py-5">
      <div className="container-fluid px-lg-5">

        {/* Page Hero Header */}
        <div className="text-center mb-5 past-works-header max-w-800 mx-auto px-3">
          <span className="subtitle-gold">SINCE 2020 COUTURE ARCHIVE</span>
          <h1 className="past-works-title fw-semibold mt-1">Celebrity & Bespoke Boutique Creations</h1>

          <div className="past-works-divider mx-auto my-3">
            <span className="divider-line"></span>
            <span className="divider-diamond">◆</span>
            <span className="divider-line"></span>
          </div>

          <p className="past-works-desc text-muted">
            Explore our curated archive of handcrafted luxury ensembles created for celebrities, film actresses, and royal brides since 2020. Each bespoke piece represents hundreds of artisan hours, pure silk weaves, and master craftsmanship.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="d-flex justify-content-center flex-wrap gap-2 gap-md-3 mb-5 category-filter-pills px-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`category-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Works Gallery Grid */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4 mb-5">
          {filteredWorks.map((work) => (
            <div key={work.id} className="col">
              <div className="past-work-card h-100 bg-white rounded-4 overflow-hidden d-flex flex-column shadow-sm">

                {/* Image Container */}
                <div className="past-work-img-box position-relative overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="past-work-img w-100 h-100 object-fit-cover"
                  />
                  {/* <span className="year-badge position-absolute top-0 start-0 m-3 px-3 py-1 rounded-pill">
                    {work.year} ARCHIVE
                  </span> */}
                </div>

                {/* Card Details Body */}
                <div className="p-4 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    {/* Celebrity Name */}
                    <div className="d-flex align-items-center gap-1.5 mb-2 text-gold-dark fw-semibold small">
                      <span>✨</span>
                      <span>{work.celebrity}</span>
                    </div>

                    <h3 className="past-work-card-title mb-2">{work.title}</h3>



                    <div className="craft-info-box p-3 rounded-3 mb-4">
                      <p className="small text-muted mb-1">
                        <strong>Fabric:</strong> {work.fabric}
                      </p>
                      <p className="small text-muted mb-1">
                        <strong>Craftsmanship:</strong> {work.craftDetails}
                      </p>

                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openInquiryModal({ name: `${work.title} (${work.celebrity})` })}
                    className="btn btn-inquire-custom w-100 text-uppercase"
                  >
                    Inquire Similar Design
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PastWorksPage;
