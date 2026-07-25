import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data/productsData';
import { useInquiry } from '../context/InquiryContext';
import '../styles/ShopStyles.css';

const ShopStyles = () => {
  const { openInquiryModal } = useInquiry();
  const [activeCategory, setActiveCategory] = useState('all');
  const [wishlist, setWishlist] = useState({});
  const sliderRef = useRef(null);

  const toggleWishlist = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.75;
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.75;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const categories = [
    { id: 'all', label: 'ALL PIECES' },
    { id: 'sarees', label: 'SAREES & HALF SAREES' },
    { id: 'lehengas', label: 'BRIDAL LEHENGAS' },
    { id: 'fusion', label: 'FUSION WEAR' },
    { id: 'sherwanis', label: 'SHERWANIS' },
    { id: 'gowns', label: 'EVENING GOWNS' }
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === activeCategory);

  return (
    <section className="shop-styles-section container-fluid py-5">
      <div className="container position-relative">

        {/* Section Header with Ornament Motif */}
        <div className="text-center mb-4 shop-styles-header px-3">
          <div className="subtitle-gold-wrapper mb-2 d-flex align-items-center justify-content-center gap-2">
            <span className="subtitle-gold">CURATED STYLES</span>
          </div>

          <h2 className="shop-styles-title fw-semibold">EXPLORE OUR SIGNATURE COUTURE</h2>

          {/* Golden Diamond Divider Line */}
          <div className="shop-styles-divider mx-auto my-3">
            <span className="divider-line"></span>
            <span className="divider-diamond">◆</span>
            <span className="divider-line"></span>
          </div>
        </div>

        {/* Pill Category Filter Tabs */}
        <div className="d-flex justify-content-center flex-wrap gap-2 gap-md-3 mb-4 category-filter-pills px-3">
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

        {/* Product Slider Container with Left / Right Arrows */}
        <div className="shop-slider-wrapper position-relative mb-5">

          {/* Left Arrow Button */}
          <button
            type="button"
            className="slider-arrow-btn slider-arrow-prev d-flex align-items-center justify-content-center border-0"
            onClick={scrollLeft}
            aria-label="Previous Products"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
            </svg>
          </button>

          {/* Slider Scroll Track */}
          <div className="shop-slider-track" ref={sliderRef}>
            {filteredProducts.map((product) => {
              const isWishlisted = !!wishlist[product.id];
              const pImg = product.images ? product.images[0] : product.image;

              return (
                <div key={product.id} className="shop-slider-item">
                  <div className="shop-product-card h-100 bg-white rounded-3 overflow-hidden d-flex flex-column">

                    {/* Top Image Container */}
                    <div className="shop-product-img-box position-relative overflow-hidden">
                      {/* Wishlist Button */}
                      <button
                        type="button"
                        className={`shop-wishlist-btn position-absolute top-0 end-0 m-2 border-0 d-flex align-items-center justify-content-center ${isWishlisted ? 'active' : ''}`}
                        onClick={(e) => toggleWishlist(e, product.id)}
                        aria-label="Add to Wishlist"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          fill={isWishlisted ? '#c92a2a' : 'currentColor'}
                          viewBox="0 0 16 16"
                        >
                          {isWishlisted ? (
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                          ) : (
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01z" />
                          )}
                        </svg>
                      </button>

                      {/* Image Link */}
                      <Link to={`/product/${product.id}`} className="d-block w-100 h-100">
                        <img
                          src={pImg}
                          alt={product.name}
                          className="shop-product-img w-100 h-100 object-fit-cover"
                        />
                      </Link>
                    </div>

                    {/* Bottom Details Section */}
                    <div className="shop-product-details p-3 text-center d-flex flex-column justify-content-between flex-grow-1">
                      <div>
                        <Link to={`/product/${product.id}`} className="text-decoration-none color-dark">
                          <h3 className="shop-product-title fw-semibold">{product.name}</h3>
                        </Link>
                        <p className="shop-product-price mt-1 mb-3">{product.priceText || 'Price on Request'}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => openInquiryModal(product)}
                        className="btn shop-request-btn w-100 text-uppercase"
                      >
                        REQUEST PRICE
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            className="slider-arrow-btn slider-arrow-next d-flex align-items-center justify-content-center border-0"
            onClick={scrollRight}
            aria-label="Next Products"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>

        </div>

        {/* View Complete Boutique Catalog Button */}
        <div className="text-center mt-4">
          <Link to="/collections" className="btn shop-catalog-btn">
            VIEW COMPLETE BOUTIQUE CATALOG &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ShopStyles;
