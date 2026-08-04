import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ShinyText from '../components/ShinyText';
import { CATEGORIES_DATA } from '../data/productsData';
import { fetchProducts } from '../utils/api';
import CategoryIcon from '../components/CategoryIcon';
import ProductCard from '../components/ProductCard';
import { animateCardsGSAP } from '../utils/useGSAPIntro';
import NewsletterSection from '../components/NewsletterSection';
import wowoFaviconHeading from '../assets/wowo-favicon-heading.png';
import '../styles/CollectionsPage.css';

const CollectionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts(selectedCategory, searchQuery);
      setProducts(data);
      setLoading(false);
      setTimeout(() => {
        animateCardsGSAP('.catalog-product-card');
      }, 50);
    };

    loadProducts();
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ cat: catId });
    }
  };

  return (
    <div className="collections-page-wrapper bg-light-sand py-4">

      {/* Page Header */}
      <div className="catalog-header-banner text-center py-5 bg-dark text-white position-relative">
        <div className="container px-3">
          <span className="subtitle-gold letter-spacing-3">EXCLUSIVE LUXURY CATALOG</span>
          <h1 className="catalog-header-title fw-semibold mt-2 mb-3">
            <ShinyText text="WOWO Boutique Collections" color="#ffffff" shineColor="#f3d798" speed={3.5} />
          </h1>
          <p className="catalog-header-desc text-light opacity-80 max-w-700 mx-auto mb-0">
            Browse our latest bridal lehengas, pure silk Kanjeevarams, handloom sarees, and fusion couture. Select any piece to request custom sizing, color choices, and private fitting prices.
          </p>
        </div>
      </div>

      <div className="container px-3 px-lg-4 py-5">

        {/* Toolbar: Search Input + Bespoke Creations Counter */}
        <div className="catalog-toolbar p-3 p-md-3.5 bg-white rounded-4 border mb-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 shadow-sm">
          <div className="search-box-wrapper w-100 max-w-500 position-relative d-flex align-items-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon ms-3 position-absolute">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search by product name, SKU or craft..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control form-input-custom ps-5"
            />
            {searchQuery && (
              <button
                className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted text-decoration-none me-2"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="catalog-counter d-flex align-items-center gap-2 text-muted small">
            <span>Showing <strong className="text-dark">{products.length}</strong> Bespoke Creations</span>
            <span className="counter-divider-line"></span>
            <img src={wowoFaviconHeading} alt="WOWO Brand Symbol" style={{ width: '45px', height: 'auto' }} className="brand-symbol-img" />
          </div>
        </div>

        {/* Centered Category Pill Filters Bar */}
        <div className="d-flex justify-content-center flex-wrap gap-2 gap-md-2.5 mb-5 category-filter-pills px-2">
          {CATEGORIES_DATA.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`category-pill-btn d-flex align-items-center gap-2 px-3.5 py-2.5 rounded-pill text-uppercase ${isActive ? 'active' : ''}`}
              >
                <CategoryIcon categoryId={cat.id} isActive={isActive} size={16} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="text-center py-5 text-muted">
            <div className="spinner-border text-gold mb-3" role="status"></div>
            <p className="small">Fetching Luxury Collections...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="row g-4">
            {products.map((product) => (
              <div key={product._id || product.id} className="col-lg-3 col-md-4 col-sm-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 bg-white rounded-4 border p-5 max-w-600 mx-auto">
            <div className="display-4 text-muted mb-3">✨</div>
            <h4 className="font-heading">No Couture Pieces Match Your Filter</h4>
            <p className="text-muted small mb-4">Try clearing your search or switching categories.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setSearchParams({}); }}
              className="btn btn-gold rounded-pill px-4"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      <NewsletterSection />
    </div>
  );
};

export default CollectionsPage;
