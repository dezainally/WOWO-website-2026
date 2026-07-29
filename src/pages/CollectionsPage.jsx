import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ShinyText from '../components/ShinyText';
import { PRODUCTS_DATA, CATEGORIES_DATA } from '../data/productsData';
import { fetchPublicProducts } from '../utils/api';
import { useInquiry } from '../context/InquiryContext';
import CategoryIcon from '../components/CategoryIcon';
import { animateCardsGSAP } from '../utils/useGSAPIntro';
import NewsletterSection from '../components/NewsletterSection';
import '../styles/CollectionsPage.css';

const CollectionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';

  const [productsList, setProductsList] = useState(PRODUCTS_DATA);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const { openInquiryModal, openWhatsApp } = useInquiry();

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
    setSelectedCategory(catId);
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ cat: catId });
    }
    setTimeout(() => {
      animateCardsGSAP('.catalog-product-card');
    }, 50);
  };

  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      const matchesCat = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        (product.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.shortDesc || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.sku || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.fabric || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [productsList, selectedCategory, searchQuery]);

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

        {/* Search & Sort Bar */}
        <div className="catalog-toolbar p-3 bg-white rounded-3 border mb-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 shadow-sm">
          <div className="search-input-wrapper w-100 w-md-50">
            <input
              type="text"
              placeholder="Search by name, fabric (e.g. Kanjeevaram, Silk, Lehenga)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control form-input-custom ps-4"
            />
          </div>

          <div className="d-flex align-items-center gap-3 w-100 w-md-auto justify-content-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select form-input-custom text-nowrap w-auto"
            >
              <option value="featured">Featured Collections</option>
              <option value="newest">Newest Arrivals 2026</option>
              <option value="popular">Boutique Favorites</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar (Centered with Icons) */}
        <div className="d-flex align-items-center justify-content-center flex-wrap gap-2 gap-md-3 mb-5 pb-2 border-bottom">
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`category-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategorySelect(cat.id)}
            >
              <CategoryIcon id={cat.id} size={16} />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div key={product._id || product.id || product.sku} className="col-lg-3 col-md-4 col-sm-6">
                <div className="catalog-product-card bg-white rounded-3 overflow-hidden border h-100 position-relative d-flex flex-column">

                  {/* Image Link */}
                  <Link to={`/product/${product._id || product.id || product.sku}`} className="catalog-img-wrapper overflow-hidden d-block">
                    <img
                      src={product.images?.[0] || '/assets/images/image1.png'}
                      alt={product.name}
                      className="catalog-product-img w-100"
                    />
                  </Link>

                  {/* Body Content */}
                  <div className="p-3 d-flex flex-column flex-grow-1">
                    <span className="catalog-sku-text mb-1">SKU: {product.sku}</span>
                    <Link to={`/product/${product._id || product.id || product.sku}`} className="text-decoration-none text-dark">
                      <h3 className="catalog-product-name fw-semibold mb-1">{product.name}</h3>
                    </Link>
                    <p className="catalog-fabric-text mb-2">{product.fabric || product.shortDesc}</p>

                    <div className="mt-auto pt-3 border-top">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="price-on-request-badge">{product.priceText || 'Price on Request'}</span>
                      </div>

                      <div className="d-grid gap-2">
                        <button
                          type="button"
                          onClick={() => openInquiryModal(product)}
                          className="btn-request-price-catalog w-100"
                        >
                          Request Price & Details
                        </button>
                        <button
                          type="button"
                          onClick={() => openWhatsApp(product.name)}
                          className="btn-whatsapp-catalog w-100 d-flex align-items-center justify-content-center gap-1.5"
                        >
                          💬 Inquire on WhatsApp
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 bg-white rounded-3 border">
            <h4 className="font-heading">No Couture Pieces Match Your Filter</h4>
            <p className="text-muted small mb-3">Try adjusting your search query or selecting another category.</p>
            <button
              type="button"
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="btn btn-outline-dark rounded-pill px-4"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      <NewsletterSection />
    </div>
  );
};

export default CollectionsPage;
