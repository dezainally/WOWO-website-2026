import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ShinyText from '../components/ShinyText';
import ProductCard from '../components/ProductCard';
import { PRODUCTS_DATA } from '../data/productsData';
import { useInquiry } from '../context/InquiryContext';
import NewsletterSection from '../components/NewsletterSection';
import '../styles/ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { openInquiryModal, openWhatsApp, callNow } = useInquiry();

  // Find target product or default to first product
  const product = PRODUCTS_DATA.find((p) => p.id === id) || PRODUCTS_DATA[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  // Fullscreen Lightbox & Zoom state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  // Amazon-style 200% Hover Loupe Zoom state
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePos({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 50, y: 50 });
  };

  const relatedProducts = PRODUCTS_DATA.filter((p) => p.id !== product.id).slice(0, 4);

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
                  <button
                    type="button"
                    className="zoom-hint-badge position-absolute d-flex align-items-center gap-2 border-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLightboxOpen(true);
                    }}
                    title="Click to view fullscreen"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                    <span>Click to view fullscreen</span>
                  </button>
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

                {/* Redesigned Pricing & Made-to-Order Stock Box */}
                <div className="pdp-price-badge-box p-3.5 p-md-4 rounded-4 border d-flex align-items-center justify-content-between mb-4">
                  <div className="pdp-pricing-left">
                    <span className="pdp-pricing-label d-block text-uppercase fw-semibold">BOUTIQUE PRICING</span>
                    <h3 className="pdp-pricing-value font-heading fw-bold mt-1 mb-0">
                      {product.priceText ? product.priceText.toUpperCase() : 'PRICE ON REQUEST'}
                    </h3>
                  </div>

                  {/* Green In Stock & Made-to-Order Badge Container */}
                  <div className="pdp-stock-badge-container p-3 rounded-3 d-flex align-items-start gap-2.5">
                    <div className="pdp-stock-check-circle d-flex align-items-center justify-content-center flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <div className="pdp-stock-title font-heading fw-bold">In Stock</div>
                      <div className="pdp-stock-subtitle small">
                        Made-to-Order Fitting<br />Available
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Call to Actions: Request Price, WhatsApp, Call Stylist */}
              <div className="pdp-actions-box mb-4">
                {/* Dark Olive Primary Button */}
                <button
                  type="button"
                  onClick={() => openInquiryModal(product)}
                  className="btn-pdp-request-price w-100 py-3 mb-3 rounded-3 d-flex align-items-center justify-content-center gap-2.5 shadow-sm"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                    <path d="M8 14h.01"></path>
                    <path d="M12 14h.01"></path>
                    <path d="M16 14h.01"></path>
                  </svg>
                  <span>REQUEST PRICE & CUSTOM FITTING</span>
                </button>

                {/* Secondary Row: WhatsApp & Call Stylist */}
                <div className="row g-3">
                  <div className="col-6">
                    <button
                      type="button"
                      onClick={() => openWhatsApp(product.name, product.sku)}
                      className="btn-pdp-whatsapp w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2 text-uppercase"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span>WHATSAPP INQUIRY</span>
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      onClick={callNow}
                      className="btn-pdp-call w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2 text-uppercase"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>CALL STYLIST</span>
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
            <h3 className="font-heading fw-semibold fs-3">
              <ShinyText text="You May Also Admire" color="#1c1917" shineColor="#d4af37" speed={3.5} />
            </h3>
            <Link to="/collections" className="text-gold text-decoration-none small fw-semibold">
              View All Collections →
            </Link>
          </div>

          <div className="row g-4">
            {relatedProducts.map((rel) => (
              <div key={rel._id || rel.id} className="col-lg-3 col-sm-6">
                <ProductCard product={rel} />
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

          {/* Amazon-Style 200% Hover Loupe Zoom Image Stage */}
          <div
            className="pdp-lightbox-img-wrapper position-relative"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'crosshair' }}
          >
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="pdp-lightbox-img"
              style={{
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                transform: `scale(${isHovered ? 2 : zoomScale})`,
                transition: isHovered ? 'transform 0.15s ease-out' : 'all 0.3s ease',
                willChange: 'transform, transform-origin',
              }}
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
