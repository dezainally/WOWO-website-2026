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
    { id: 3, name: 'SHERWANIS', image: imageSherwani, path: '/collections?cat=sherwanis' },
    { id: 4, name: 'SAREES', image: imageSaree, path: '/collections?cat=sarees' }
  ];

  return (
    <section className="curated-section py-5">
      <div className="container">
        {/* Section Headers */}
        <div className="text-center mb-5 curated-header-block">
          <h2 className="curated-title">CURATED THIS SEASON</h2>
          <p className="curated-subtitle">
            A blend of classic silhouettes and our signature shine,<br className="d-none d-md-block" />
            embodied by enigmatic sequins and pure silk weaves.
          </p>
        </div>
      </div>

      {/* Collections Grid (Full-Width Edge-to-Edge Custom Grid) */}
      <div className="curated-grid-custom">
        {collections.map((item) => (
          <div key={item.id} className="curated-col-custom">
            <Link to={item.path} className="curated-card-link">
              <div className="curated-card position-relative overflow-hidden">

                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="curated-card-img w-100"
                />

                {/* Gradient Overlay for Legibility */}
                <div className="curated-card-overlay"></div>

                {/* Label Text */}
                <div className="curated-card-content d-flex justify-content-center align-items-end position-absolute w-100 h-100">
                  <h3 className="curated-card-label">{item.name}</h3>
                </div>

              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CuratedSeason;
