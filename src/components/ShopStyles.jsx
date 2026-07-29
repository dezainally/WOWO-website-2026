import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShinyText from './ShinyText';
import { PRODUCTS_DATA, CATEGORIES_DATA } from '../data/productsData';
import { fetchPublicProducts } from '../utils/api';
import { useInquiry } from '../context/InquiryContext';
import CategoryIcon from './CategoryIcon';
import { animateCardsGSAP } from '../utils/useGSAPIntro';
import '../styles/ShopStyles.css';

const ShopStyles = () => {
  const { openInquiryModal } = useInquiry();
  const [productsList, setProductsList] = useState(PRODUCTS_DATA);
  const [activeCategory, setActiveCategory] = useState('all');
  const [wishlist, setWishlist] = useState({});
  const sliderRef = useRef(null);

  useEffect(() => {
    const loadLiveProducts = async () => {
      const liveData = await fetchPublicProducts();
      if (liveData && Array.isArray(liveData) && liveData.length > 0) {
        setProductsList(liveData);
      }
    };
    loadLiveProducts();
  }, []);

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    setTimeout(() => {
      animateCardsGSAP('.shop-product-card');
    }, 50);
  };

  const toggleWishlist = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredProducts = activeCategory === 'all'
    ? productsList
    : productsList.filter((p) => p.category === activeCategory);

  return (
    <section className="shop-styles-section py-5 bg-white">
      <div className="container px-3 px-lg-4">
        
        {/* Section Header */}
        <div className="text-center mb-4">
          <span className="subtitle-gold letter-spacing-3">CURATED CATALOGUE</span>
          <h2 className="font-heading fw-bold fs-1 mt-1 text-dark">
            <ShinyText text="Shop By Couture Category" color="#1c1917" shineColor="#d4af37" speed={3.5} />
          </h2>
          <p className="text-muted small max-w-600 mx-auto">
            Explore our artisanal creations handcrafted with pure mulberry silks, authentic zari, and bespoke embroidery.
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
          {CATEGORIES_DATA.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`category-pill-btn d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`}
              >
                <CategoryIcon categoryId={cat.id} size={18} color={isActive ? '#ffffff' : '#353926'} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="row g-4">
          {filteredProducts.map((p) => (
            <div key={p._id || p.id || p.sku} className="col-xl-3 col-lg-4 col-sm-6">
              <div className="shop-product-card bg-white rounded-3 overflow-hidden border h-100 d-flex flex-column shadow-sm">
                <div className="catalog-img-stage overflow-hidden position-relative" style={{ height: '320px' }}>
                  <Link to={`/product/${p._id || p.id || p.sku}`}>
                    <img src={p.images?.[0]} alt={p.name} className="catalog-img w-100 h-100 object-fit-cover" />
                  </Link>
                  {p.tag && (
                    <span className="badge bg-gold position-absolute top-3 start-3">{p.tag}</span>
                  )}
                </div>
                <div className="p-3 d-flex flex-column flex-grow-1">
                  <span className="text-uppercase text-gold small font-heading letter-spacing-1 mb-1">
                    {p.categoryName || 'Couture Piece'}
                  </span>
                  <h3 className="fs-6 font-heading fw-bold mb-2">
                    <Link to={`/product/${p._id || p.id || p.sku}`} className="text-dark text-decoration-none">{p.name}</Link>
                  </h3>
                  <p className="small text-muted line-clamp-2 mb-3">{p.shortDesc}</p>
                  
                  <div className="mt-auto pt-2 border-top d-flex align-items-center justify-content-between">
                    <span className="catalog-price-val text-dark font-heading fw-bold">
                      {p.priceText || 'Price on Request'}
                    </span>
                    <button
                      type="button"
                      onClick={() => openInquiryModal(p)}
                      className="btn btn-dark btn-sm rounded-pill px-3 font-heading"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ShopStyles;
