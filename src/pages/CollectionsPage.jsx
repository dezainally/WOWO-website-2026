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
        (product.sku || '').toLowerCase().includes(searchQuery.toLowerCase());
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
            <span className="small text-muted text-nowrap fw-medium">
              Showing <strong>{filteredProducts.length}</strong> Couture Pieces
            </span>
          </div>
        </div>

        {/* Category Pill Filter Bar */}
        <div className="category-pills-bar d-flex justify-content-center flex-wrap gap-2 mb-5">
          {CATEGORIES_DATA.map((cat) => {
            const isActive = selectedCategory === cat.id;
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

        {/* Products Grid Display */}
        {filteredProducts.length > 0 ? (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div key={product._id || product.id || product.sku} className="col-xl-3 col-lg-4 col-sm-6">
                <div className="catalog-product-card bg-white rounded-3 overflow-hidden border h-100 d-flex flex-column shadow-sm position-relative">
                  <div className="catalog-img-stage overflow-hidden position-relative">
                    <Link to={`/product/${product._id || product.id || product.sku}`}>
                      <img
                        src={product.images?.[0] || '/assets/images/image1.png'}
                        alt={product.name}
                        className="catalog-img w-100"
                      />
                    </Link>
                    {product.tag && (
                      <span className="badge bg-gold position-absolute top-3 start-3 shadow-sm">{product.tag}</span>
                    )}
                  </div>

                  <div className="p-3 d-flex flex-column flex-grow-1">
                    <span className="text-uppercase text-gold small font-heading letter-spacing-1 mb-1">
                      {product.categoryName || 'Couture Piece'}
                    </span>
                    <h3 className="catalog-product-title fs-6 fw-semibold mb-2">
                      <Link to={`/product/${product._id || product.id || product.sku}`} className="text-dark text-decoration-none">
                        {product.name}
                      </Link>
                    </h3>

                    <p className="catalog-short-desc text-muted small line-clamp-2 mb-3">
                      {product.shortDesc}
                    </p>

                    <div className="mt-auto pt-2 border-top d-flex align-items-center justify-content-between">
                      <div>
                        <span className="d-block small text-muted font-heading">BOUTIQUE PRICING</span>
                        <span className="catalog-price-val text-dark font-heading fw-bold">
                          {product.priceText || 'Price on Request'}
                        </span>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          onClick={() => openWhatsApp(product.name)}
                          className="btn btn-success btn-sm px-2.5 rounded-pill"
                          title="WhatsApp Inquiry"
                        >
                          💬
                        </button>
                        <button
                          type="button"
                          onClick={() => openInquiryModal(product)}
                          className="btn btn-outline-dark btn-sm px-3 rounded-pill font-heading"
                        >
                          Inquire
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
            <h4 className="font-heading fw-semibold mb-2">No Couture Pieces Found</h4>
            <p className="text-muted small mb-3">Try adjusting your search criteria or explore another category.</p>
            <button type="button" onClick={() => handleCategorySelect('all')} className="btn btn-gold rounded-pill px-4">
              View All Collections
            </button>
          </div>
        )}

      </div>

      <NewsletterSection />
    </div>
  );
};

export default CollectionsPage;
