import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ShinyText from '../components/ShinyText';
import { PRODUCTS_DATA } from '../data/productsData';
import { fetchPublicProducts } from '../utils/api';
import { useInquiry } from '../context/InquiryContext';
import NewsletterSection from '../components/NewsletterSection';
import '../styles/ProductDetailPage.css';

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

  return (
    <div className="pdp-wrapper bg-light-sand py-4 py-md-5">
      <div className="container px-3 px-lg-4">

        {/* Breadcrumb Bar */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small mb-0">
            <li className="breadcrumb-item">
              <Link to="/" className="text-muted text-decoration-none">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/collections" className="text-muted text-decoration-none">Collections</Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Main PDP Grid */}
        <div className="row g-4 g-lg-5 mb-5">

          {/* Left Column: Image Stage & Thumbnails */}
          <div className="col-lg-7">
            <div className="d-flex flex-column-reverse flex-md-row gap-3">

              {/* Thumbnails Strip */}
              <div className="pdp-thumbnail-strip d-flex flex-row flex-md-column gap-2 overflow-auto">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`pdp-thumb-item ${activeImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`${product.name} thumb ${idx + 1}`} className="w-100 h-100 object-fit-cover" />
                  </div>
                ))}
              </div>

              {/* Main Stage with Zoom Hint Pill */}
              <div className="pdp-main-stage position-relative overflow-hidden flex-grow-1">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="pdp-main-img w-100 h-100 object-fit-cover"
                  onClick={() => setIsLightboxOpen(true)}
                />

                {/* Click to Zoom Pill Overlay */}
                <div
                  className="pdp-zoom-pill position-absolute d-flex align-items-center gap-1.5"
                  onClick={() => setIsLightboxOpen(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0 .707 0l4.096-4.096V8.5a.5.5 0 0 0 1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0 0 1h2.414L5.434 9.096a.5.5 0 0 0 .394.828" />
                  </svg>
                  <span>Click to Zoom</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Details & Inquiry Actions */}
          <div className="col-lg-5">
            <div className="pdp-details-panel d-flex flex-column h-100 justify-content-between">

              <div>
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <span className="pdp-category-text">{product.categoryName || 'Boutique Couture'}</span>
                  <span className="pdp-sku-text">SKU: {product.sku}</span>
                </div>

                <h1 className="pdp-title font-heading mb-3">{product.name}</h1>

                {/* Pricing & Stock Card */}
                <div className="pdp-price-card p-3 rounded-3 mb-4">
                  <span className="boutique-pricing-label mb-1">BOUTIQUE PRICING</span>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h2 className="price-on-request-title mb-0">{product.priceText || 'Price on Request'}</h2>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="stock-badge-green">
                      <span className="checkmark-icon">✓</span> In Stock • Made-to-Order Fitting Available
                    </span>
                  </div>
                </div>

                <p className="pdp-short-desc mb-4">{product.shortDesc}</p>

                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={() => openInquiryModal(product)}
                  className="btn-pdp-primary w-100 mb-3 text-uppercase"
                >
                  REQUEST PRICE & CUSTOM FITTING
                </button>

                {/* Secondary Action Buttons (WhatsApp & Call) */}
                <div className="row g-2 mb-4">
                  <div className="col-6">
                    <button
                      type="button"
                      onClick={() => openWhatsApp(product.name)}
                      className="btn-pdp-whatsapp w-100 d-flex align-items-center justify-content-center gap-2"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.206.331-1.154 4.217 4.316-1.132.375.251z"/>
                      </svg>
                      <span>Inquire via WhatsApp</span>
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      onClick={callNow}
                      className="btn-pdp-call w-100 d-flex align-items-center justify-content-center gap-1.5"
                    >
                      📞 Call Boutique
                    </button>
                  </div>
                </div>

                {/* Tabs Section */}
                <div className="pdp-tabs-container border-top pt-3">
                  <div className="d-flex gap-3 border-bottom pb-2 mb-3">
                    <button
                      type="button"
                      className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                      onClick={() => setActiveTab('description')}
                    >
                      Description
                    </button>
                    <button
                      type="button"
                      className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                      onClick={() => setActiveTab('specs')}
                    >
                      Fabric & Craftsmanship
                    </button>
                    <button
                      type="button"
                      className={`tab-btn ${activeTab === 'care' ? 'active' : ''}`}
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
        </div>

        {/* Related Products Carousel Section */}
        <div className="related-products-section my-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="font-heading fw-semibold fs-3">
              <ShinyText text="You May Also Admire" color="#1c1917" shineColor="#d4af37" speed={3.5} />
            </h3>
            <Link to="/collections" className="text-gold text-decoration-none small fw-semibold">
              View All Collections →
            </Link>
          </div>

          <div className="row g-4">
            {relatedProducts.map((rel) => (
              <div key={rel._id || rel.id || rel.sku} className="col-lg-3 col-sm-6">
                <div className="catalog-product-card bg-white rounded-3 overflow-hidden border h-100 position-relative d-flex flex-column">
                  
                  {/* Image Link */}
                  <Link to={`/product/${rel._id || rel.id || rel.sku}`} className="catalog-img-wrapper overflow-hidden d-block">
                    <img
                      src={rel.images?.[0] || '/assets/images/image1.png'}
                      alt={rel.name}
                      className="catalog-product-img w-100"
                    />
                  </Link>

                  {/* Body Content */}
                  <div className="p-3 d-flex flex-column flex-grow-1">
                    <span className="catalog-sku-text mb-1">SKU: {rel.sku}</span>
                    <Link to={`/product/${rel._id || rel.id || rel.sku}`} className="text-decoration-none text-dark">
                      <h3 className="catalog-product-name fw-semibold mb-1">{rel.name}</h3>
                    </Link>
                    <p className="catalog-fabric-text mb-2">{rel.fabric}</p>

                    <div className="mt-auto pt-3 border-top">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="price-on-request-badge">{rel.priceText || 'Price on Request'}</span>
                      </div>

                      <div className="d-grid gap-2">
                        <button
                          type="button"
                          onClick={() => openInquiryModal(rel)}
                          className="btn-request-price-catalog w-100"
                        >
                          Request Price & Details
                        </button>
                        <button
                          type="button"
                          onClick={() => openWhatsApp(rel.name)}
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
