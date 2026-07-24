import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data/productsData';
import { useInquiry } from '../context/InquiryContext';
import '../styles/ShopStyles.css';

const ShopStyles = () => {
  const { openInquiryModal } = useInquiry();
  const [activeCategory, setActiveCategory] = useState('all');
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS_DATA 
    : PRODUCTS_DATA.filter(p => p.category === activeCategory);

  // Repeat for continuous marquee look
  const displayProducts = [...filteredProducts, ...filteredProducts];

  return (
    <section className="shop-styles-section py-5">
      <div className="container">

        {/* Section Title & Subheading */}
        <div className="text-center mb-4 shop-styles-header px-3">
          <span className="subtitle-gold">CURATED STYLES</span>
          <h2 className="shop-styles-title mt-1">EXPLORE OUR SIGNATURE COUTURE</h2>
        </div>

        {/* Sub-Category Filter Tags */}
        <div className="d-flex justify-content-center flex-wrap gap-2 gap-md-3 mb-5 category-filter-bar px-3">
          <button
            type="button"
            className={`category-tag border-0 ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Pieces
          </button>
          <button
            type="button"
            className={`category-tag border-0 ${activeCategory === 'sarees' ? 'active' : ''}`}
            onClick={() => setActiveCategory('sarees')}
          >
            Sarees & Half Sarees
          </button>
          <button
            type="button"
            className={`category-tag border-0 ${activeCategory === 'lehengas' ? 'active' : ''}`}
            onClick={() => setActiveCategory('lehengas')}
          >
            Bridal Lehengas
          </button>
          <button
            type="button"
            className={`category-tag border-0 ${activeCategory === 'fusion' ? 'active' : ''}`}
            onClick={() => setActiveCategory('fusion')}
          >
            Fusion Wear
          </button>
          <button
            type="button"
            className={`category-tag border-0 ${activeCategory === 'sherwanis' ? 'active' : ''}`}
            onClick={() => setActiveCategory('sherwanis')}
          >
            Sherwanis
          </button>
          <button
            type="button"
            className={`category-tag border-0 ${activeCategory === 'gowns' ? 'active' : ''}`}
            onClick={() => setActiveCategory('gowns')}
          >
            Evening Gowns
          </button>
        </div>

        {/* Continuous Looping Product Track */}
        <div className="marquee-products-wrapper">
          <div className="marquee-products-track">
            {displayProducts.map((product, index) => {
              const isWishlisted = !!wishlist[product.id];
              const pImg = product.images ? product.images[0] : product.image;
              return (
                <div key={`${product.id}-${index}`} className="product-card-wrapper">
                  <div className="product-card position-relative bg-white">

                    {/* Tag Badge */}
                    {product.tag && (
                      <span className="product-tag-badge position-absolute">{product.tag}</span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      className={`wishlist-toggle-btn position-absolute d-flex align-items-center justify-content-center ${isWishlisted ? 'active' : ''}`}
                      onClick={(e) => toggleWishlist(e, product.id)}
                      aria-label="Add to Wishlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
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

                    {/* Product Image Link */}
                    <Link to={`/product/${product.id}`} className="product-card-link text-decoration-none">
                      <div className="product-img-wrapper overflow-hidden">
                        <img
                          src={pImg}
                          alt={product.name}
                          className="product-img w-100"
                        />
                      </div>
                    </Link>

                    {/* Meta Details & Request Price Action */}
                    <div className="product-details mt-3 text-center px-2">
                      <Link to={`/product/${product.id}`} className="text-decoration-none color-dark">
                        <h4 className="product-name">{product.name}</h4>
                      </Link>
                      <p className="product-price-on-request">{product.priceText || 'Price on Request'}</p>
                      
                      <button
                        type="button"
                        onClick={() => openInquiryModal(product)}
                        className="btn-request-price-card w-100 mt-2"
                      >
                        Request Price
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-5">
          <Link to="/collections" className="btn btn-outline-dark px-4 py-2.5 rounded-pill font-heading">
            View Complete Boutique Catalog →
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ShopStyles;
