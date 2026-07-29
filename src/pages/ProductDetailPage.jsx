import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data/productsData';
import { useInquiry } from '../context/InquiryContext';
import NewsletterSection from '../components/NewsletterSection';
import '../styles/ProductDetailPage.css';

import { fetchPublicProducts } from '../utils/api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { openInquiryModal, openWhatsApp, callNow } = useInquiry();

  const [productsList, setProductsList] = useState(PRODUCTS_DATA);
  const [product, setProduct] = useState(() => {
    return PRODUCTS_DATA.find((p) => p._id === id || p.id === id || p.sku === id) || PRODUCTS_DATA[0];
  });

  useEffect(() => {
    const loadLiveProducts = async () => {
      const liveData = await fetchPublicProducts();
      if (liveData && Array.isArray(liveData) && liveData.length > 0) {
        setProductsList(liveData);
        const matched = liveData.find((p) => p._id === id || p.id === id || p.sku === id);
        if (matched) {
          setProduct(matched);
        }
      }
    };
    loadLiveProducts();
  }, [id]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  // Fullscreen Lightbox & Zoom state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  const relatedProducts = productsList.filter((p) => (p._id || p.id) !== (product._id || product.id)).slice(0, 4);

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.5, 1));
  };

  const handleResetZoom = () => {
    setZoomScale(1);
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    setZoomScale(1);
  };

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    setZoomScale(1);
  };

  // Keyboard navigation & Escape key support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setZoomScale(1);
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, product.images.length]);

  return (
    <div className="product-detail-page bg-light-sand py-4">
      <div className="container px-3 px-lg-4">

        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small font-inter">
            <li className="breadcrumb-item"><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/collections" className="text-muted text-decoration-none">Collections</Link></li>
            <li className="breadcrumb-item"><Link to={`/collections?cat=${product.category}`} className="text-muted text-decoration-none">{product.categoryName}</Link></li>
            <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        {/* Main Product Stage */}
        <div className="bg-white rounded-4 border p-4 p-lg-5 shadow-sm mb-5">
          <div className="row g-4 g-lg-5">

            {/* Left Column: Image Gallery & Thumbnails */}
            <div className="col-lg-6">
              <div className="product-gallery-container position-relative">
                {/* Main Large Display Image Stage (Clickable for Fullscreen & Zoom) */}
                <div
                  className="main-image-stage rounded-3 overflow-hidden border mb-3 position-relative"
                  onClick={() => setIsLightboxOpen(true)}
                  title="Click for Fullscreen View & Zoom"
                >
                  <img
                    src={product.images[activeImageIndex] || product.images[0]}
                    alt={product.name}
                    className="pdp-main-img w-100"
                  />
                  <span className="zoom-hint-badge position-absolute">
                    🔍 Click to Fullscreen & Zoom
                  </span>
                </div>

                {/* Thumbnail Selector Strip */}
                <div className="d-flex align-items-center gap-3 thumbnail-strip">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`thumbnail-btn border-0 rounded-2 p-0 overflow-hidden ${activeImageIndex === idx ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <img src={img} alt={`${product.name} view ${idx + 1}`} className="thumbnail-img w-100 h-100" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Details, Specifications, & Inquiry Actions */}
            <div className="col-lg-6 d-flex flex-column">
              <div className="pdp-header border-bottom pb-3 mb-4">
                <span className="pdp-category-tag text-uppercase">{product.categoryName} • SKU: {product.sku}</span>
                <h1 className="pdp-title fw-semibold mt-1 mb-2">{product.name}</h1>
                <p className="pdp-short-desc text-muted mb-3">{product.shortDesc}</p>

                <div className="pdp-price-badge-box p-3 rounded-3 bg-light-sand border d-flex align-items-center justify-content-between">
                  <div>
                    <span className="small text-muted d-block">Boutique Pricing:</span>
                    <strong className="fs-5 text-gold font-heading">{product.priceText}</strong>
                  </div>
                  <span className="stock-status-badge">
                    In Stock • Made-to-Order Fitting Available
                  </span>
                </div>
              </div>

              {/* Primary Call to Actions: Request Price, WhatsApp, Call Now */}
              <div className="pdp-actions-box mb-4">
                <button
                  type="button"
                  onClick={() => openInquiryModal(product)}
                  className="btn-pdp-request-price w-100 py-3 mb-3 d-flex align-items-center justify-content-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414A1 1 0 0 0 3.707 12.293L1 15.586A1 1 0 0 1 0 14.828V2zm2-1a1 1 0 0 0-1 1v12.828l2.293-2.293A2 2 0 0 1 4.707 12H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z" />
                  </svg>
                  REQUEST PRICE & CUSTOM FITTING
                </button>

                <div className="row g-2">
                  <div className="col-sm-6">
                    <button
                      type="button"
                      onClick={() => openWhatsApp(product.name)}
                      className="btn-pdp-whatsapp w-100 py-2.5 d-flex align-items-center justify-content-center gap-2"
                    >
                      💬 WhatsApp Inquiry
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <button
                      type="button"
                      onClick={callNow}
                      className="btn-pdp-call w-100 py-2.5 d-flex align-items-center justify-content-center gap-2"
                    >
                      📞 Call Stylist
                    </button>
                  </div>
                </div>
              </div>

              {/* Information Accordion Tabs */}
              <div className="pdp-tabs-container">
                <div className="d-flex border-bottom gap-4 mb-3">
                  <button
                    type="button"
                    className={`tab-btn bg-transparent border-0 pb-2 ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => setActiveTab('description')}
                  >
                    Couture Story
                  </button>
                  <button
                    type="button"
                    className={`tab-btn bg-transparent border-0 pb-2 ${activeTab === 'specs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('specs')}
                  >
                    Fabric & Craft
                  </button>
                  <button
                    type="button"
                    className={`tab-btn bg-transparent border-0 pb-2 ${activeTab === 'care' ? 'active' : ''}`}
                    onClick={() => setActiveTab('care')}
                  >
                    Fitting & Care
                  </button>
                </div>

                <div className="tab-content-area">
                  {activeTab === 'description' && (
                    <div className="pdp-tab-pane">
                      <p className="small text-muted line-height-16 mb-2">{product.description}</p>
                      <p className="small text-gold fw-semibold mb-0">Recommended for: {product.occasion}</p>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="pdp-tab-pane">
                      <ul className="list-unstyled small text-muted mb-0">
                        <li className="mb-2"><strong>Fabric Composition:</strong> {product.fabric}</li>
                        <li className="mb-2"><strong>Artisan Craftsmanship:</strong> {product.craft}</li>
                        <li className="mb-0"><strong>Embellishments:</strong> Authentic Zardosi, Dabka & Metallic Threadwork</li>
                      </ul>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <div className="pdp-tab-pane">
                      <ul className="list-unstyled small text-muted mb-0">
                        <li className="mb-2"><strong>Custom Tailoring Time:</strong> {product.leadTime}</li>
                        <li className="mb-2"><strong>Garment Care:</strong> {product.care}</li>
                        <li className="mb-0"><strong>Private Exhibition Fitting:</strong> Available upon RSVP at monthly trunk shows.</li>
                      </ul>
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Related Products Carousel Section */}
        <div className="related-products-section my-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="font-heading fw-semibold fs-3">You May Also Admire</h3>
            <Link to="/collections" className="text-gold text-decoration-none small fw-semibold">
              View All Collections →
            </Link>
          </div>

          <div className="row g-4">
            {relatedProducts.map((rel) => (
              <div key={rel.id} className="col-lg-3 col-sm-6">
                <div className="catalog-product-card bg-white rounded-3 overflow-hidden border h-100">
                  <Link to={`/product/${rel.id}`} className="catalog-img-wrapper d-block overflow-hidden">
                    <img src={rel.images[0]} alt={rel.name} className="catalog-product-img w-100" />
                  </Link>
                  <div className="p-3">
                    <h4 className="catalog-product-name fs-6 mb-1">{rel.name}</h4>
                    <p className="price-on-request-badge mb-2">{rel.priceText}</p>
                    <button
                      type="button"
                      onClick={() => openInquiryModal(rel)}
                      className="btn-request-price-catalog w-100"
                    >
                      Request Price
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Fullscreen Lightbox & Interactive Zoom Modal */}
      {isLightboxOpen && (
        <div
          className="pdp-lightbox-overlay"
          onClick={() => { setIsLightboxOpen(false); setZoomScale(1); }}
        >
          {/* Top Control Toolbar (Zoom & Close Buttons) */}
          <div className="pdp-lightbox-toolbar" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="pdp-lightbox-btn"
              onClick={handleZoomOut}
              disabled={zoomScale <= 1}
              aria-label="Zoom Out"
              title="Zoom Out"
            >
              −
            </button>
            <span className="pdp-lightbox-zoom-level">{Math.round(zoomScale * 100)}%</span>
            <button
              type="button"
              className="pdp-lightbox-btn"
              onClick={handleZoomIn}
              disabled={zoomScale >= 3}
              aria-label="Zoom In"
              title="Zoom In"
            >
              +
            </button>
            <button
              type="button"
              className="pdp-lightbox-btn"
              onClick={handleResetZoom}
              aria-label="Reset Zoom"
              title="Reset Zoom"
            >
              ↺
            </button>
            <button
              type="button"
              className="pdp-lightbox-btn"
              onClick={() => { setIsLightboxOpen(false); setZoomScale(1); }}
              aria-label="Close Lightbox"
              title="Close (Esc)"
            >
              ✕
            </button>
          </div>

          {/* Previous Image Arrow */}
          {product.images.length > 1 && (
            <button
              type="button"
              className="pdp-lightbox-arrow pdp-lightbox-arrow-prev border-0"
              onClick={handlePrevImage}
              aria-label="Previous Image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
              </svg>
            </button>
          )}

          {/* Zoomable Main Image Stage */}
          <div className="pdp-lightbox-img-wrapper" onClick={(e) => e.stopPropagation()}>
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="pdp-lightbox-img"
              style={{ transform: `scale(${zoomScale})` }}
            />
          </div>

          {/* Next Image Arrow */}
          {product.images.length > 1 && (
            <button
              type="button"
              className="pdp-lightbox-arrow pdp-lightbox-arrow-next border-0"
              onClick={handleNextImage}
              aria-label="Next Image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>
          )}
        </div>
      )}

      <NewsletterSection />
    </div>
  );
};

export default ProductDetailPage;
