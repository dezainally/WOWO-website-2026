import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS_DATA, CATEGORIES_DATA } from '../data/productsData';
import { useInquiry } from '../context/InquiryContext';
import NewsletterSection from '../components/NewsletterSection';
import '../styles/CollectionsPage.css';

const CollectionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const { openInquiryModal, openWhatsApp } = useInquiry();

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ cat: catId });
    }
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesCat = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.sku.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="collections-page-wrapper bg-light-sand py-4">
      {/* Page Header */}
      <div className="catalog-header-banner text-center py-5 bg-dark text-white position-relative">
        <div className="container px-3">
          <span className="subtitle-gold letter-spacing-3">EXCLUSIVE LUXURY CATALOG</span>
          <h1 className="catalog-header-title mt-2 mb-3">WOWO Boutique Collections</h1>
          <p className="catalog-header-desc text-light opacity-80 max-w-700 mx-auto mb-0">
            Browse our latest bridal lehengas, pure silk Kanjeevarams, handloom sarees, and fusion couture. Select any piece to request custom sizing, color choices, and private fitting prices.
          </p>
        </div>
      </div>

      <div className="container px-3 px-lg-4 py-5">
        
        {/* Search & Sort Bar */}
        <div className="catalog-toolbar p-3 bg-white rounded-3 border mb-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 shadow-sm">
          {/* Search Box */}
          <div className="search-input-group w-100 max-w-400 position-relative">
            <input
              type="text"
              placeholder="Search by saree name, lehenga, SKU or fabric..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control form-input-custom ps-4"
            />
          </div>

          <div className="d-flex align-items-center gap-3 w-100 w-md-auto justify-content-end">
            <span className="small text-muted text-nowrap">Showing {filteredProducts.length} Couture Pieces</span>
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

        {/* Category Pills Bar */}
        <div className="d-flex align-items-center flex-wrap gap-2 mb-5 pb-2 border-bottom">
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`category-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategorySelect(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
                <div className="catalog-product-card bg-white rounded-3 overflow-hidden border h-100 position-relative d-flex flex-column">
                  
                  {/* Tag Badge */}
                  {product.tag && (
                    <span className="catalog-tag-badge position-absolute">{product.tag}</span>
                  )}

                  {/* Image Link */}
                  <Link to={`/product/${product.id}`} className="catalog-img-wrapper overflow-hidden d-block">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="catalog-product-img w-100"
                    />
                  </Link>

                  {/* Body Content */}
                  <div className="p-3 d-flex flex-column flex-grow-1">
                    <span className="catalog-sku-text mb-1">SKU: {product.sku}</span>
                    <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                      <h3 className="catalog-product-name mb-1">{product.name}</h3>
                    </Link>
                    <p className="catalog-fabric-text mb-2">{product.fabric}</p>

                    <div className="mt-auto pt-3 border-top">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="price-on-request-badge">{product.priceText}</span>
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
