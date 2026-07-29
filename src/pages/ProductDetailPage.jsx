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

  const images = product?.images && product.images.length ? product.images : ['/assets/images/image1.png'];

  return (
    <div className="pdp-wrapper bg-light-sand py-4 py-md-5">
      <div className="container px-3 px-lg-4">

        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item"><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/collections" className="text-muted text-decoration-none">Collections</Link></li>
            <li className="breadcrumb-item text-capitalize text-muted">{product?.category || 'Couture'}</li>
            <li className="breadcrumb-item active font-heading text-dark fw-semibold" aria-current="page">{product?.name}</li>
          </ol>
        </nav>

        {/* PDP Main Product Showcase Stage */}
        <div className="row g-4 g-xl-5 mb-5">

          {/* Left Column: Vertical Thumbnails + Main 4/5 Aspect Ratio Stage */}
          <div className="col-lg-7">
            <div className="d-flex flex-column-reverse flex-md-row gap-3">
              
              {/* Vertical Thumbnails List */}
              <div className="pdp-thumbnails-wrapper d-flex flex-row flex-md-column gap-2 overflow-auto">
                {images.map((imgUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`pdp-thumb-btn ${activeImageIndex === index ? 'active' : ''}`}
                  >
                    <img src={imgUrl} alt={`${product.name} view ${index + 1}`} className="w-100 h-100 object-fit-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image Stage */}
              <div className="pdp-main-stage position-relative overflow-hidden rounded-3 border bg-white flex-grow-1">
                <img
                  src={images[activeImageIndex] || images[0]}
                  alt={product.name}
                  className="pdp-main-img w-100 h-100 object-fit-cover cursor-zoom-in"
                  onClick={() => { setIsLightboxOpen(true); setZoomScale(1); }}
                />

                {/* Click to Zoom Hint Pill */}
                <div
                  className="pdp-zoom-badge position-absolute bottom-3 start-3 bg-dark bg-opacity-75 text-white px-3 py-1.5 rounded-pill small font-heading cursor-pointer d-flex align-items-center gap-1.5"
                  onClick={() => { setIsLightboxOpen(true); setZoomScale(1); }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  <span>Click to Zoom & View Fullscreen ↗</span>
                </div>

                {images.length > 1 && (
                  <div className="pdp-stage-arrows position-absolute top-50 translate-middle-y w-100 d-flex justify-content-between px-3 pointer-events-none">
                    <button type="button" onClick={handlePrevImage} className="pdp-arrow-btn pointer-events-auto">‹</button>
                    <button type="button" onClick={handleNextImage} className="pdp-arrow-btn pointer-events-auto">›</button>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Right Column: Title, Boutique Price, Specs & Actions */}
          <div className="col-lg-5">
            <div className="pdp-info-panel bg-white p-4 p-md-5 rounded-4 border shadow-sm h-100 d-flex flex-column">
              
              <div className="mb-3">
                <span className="badge bg-gold text-uppercase letter-spacing-2 mb-2">{product.categoryName || 'Bespoke Couture'}</span>
                <h1 className="pdp-product-title font-heading fw-bold fs-2 text-dark mb-1">{product.name}</h1>
                <span className="text-muted small">SKU: <strong>{product.sku}</strong> • Handcrafted in India</span>
              </div>

              {/* Price & In-Stock Box */}
              <div className="pdp-pricing-box p-3.5 rounded-3 bg-light-sand border mb-4">
                <span className="small text-muted font-heading d-block mb-1">BOUTIQUE PRICING</span>
                <div className="d-flex align-items-baseline justify-content-between">
                  <h2 className="font-heading fw-bold text-dark fs-3 mb-0">{product.priceText || 'Price on Request'}</h2>
                  <span className="status-badge-green font-heading fs-7">
                    ✓ In Stock • Fitting Available
                  </span>
                </div>
              </div>

              <p className="text-muted small line-height-16 mb-4">
                {product.shortDesc || product.description}
              </p>

              {/* Action Buttons */}
              <div className="d-grid gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => openInquiryModal(product)}
                  className="btn btn-dark py-3 rounded-3 font-heading fw-semibold letter-spacing-1 text-uppercase"
                >
                  Request Price & Custom Fitting
                </button>

                <div className="row g-2">
                  <div className="col-6">
                    <button
                      type="button"
                      onClick={() => openWhatsApp(product.name)}
                      className="btn btn-success w-100 py-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.206.331-1.154 4.217 4.316-1.132.375.251z"/>
                      </svg>
                      <span>WhatsApp Inquiry</span>
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      onClick={callNow}
                      className="btn btn-outline-dark w-100 py-2.5 rounded-3"
                    >
                      📞 Call Boutique
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Specifications List */}
              <div className="pdp-specs-list mt-auto pt-3 border-top">
                <div className="d-flex justify-content-between py-1.5 border-bottom small">
                  <span className="text-muted">Fabric:</span>
                  <span className="fw-semibold text-dark">{product.fabric || '100% Pure Silk'}</span>
                </div>
                <div className="d-flex justify-content-between py-1.5 border-bottom small">
                  <span className="text-muted">Craftsmanship:</span>
                  <span className="fw-semibold text-dark">{product.craft || 'Handloom Zari Embroidery'}</span>
                </div>
                <div className="d-flex justify-content-between py-1.5 border-bottom small">
                  <span className="text-muted">Lead Time:</span>
                  <span className="fw-semibold text-dark">{product.leadTime || '2 Weeks Handcrafted Delivery'}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Related Products Carousel / Grid */}
        <section className="mt-5 pt-4 border-top">
          <div className="text-center mb-4">
            <span className="subtitle-gold">CURATED SUGGESTIONS</span>
            <h3 className="font-heading fw-semibold fs-3 mt-1">You May Also Admire</h3>
          </div>

          <div className="row g-4">
            {relatedProducts.map((rel) => (
              <div key={rel._id || rel.id || rel.sku} className="col-md-3 col-sm-6">
                <div className="catalog-product-card bg-white rounded-3 overflow-hidden border h-100 d-flex flex-column shadow-sm">
                  <div className="catalog-img-stage overflow-hidden position-relative" style={{ height: '260px' }}>
                    <Link to={`/product/${rel._id || rel.id || rel.sku}`}>
                      <img src={rel.images?.[0]} alt={rel.name} className="catalog-img w-100 h-100 object-fit-cover" />
                    </Link>
                  </div>
                  <div className="p-3 d-flex flex-column flex-grow-1">
                    <h4 className="fs-6 font-heading fw-bold mb-1">
                      <Link to={`/product/${rel._id || rel.id || rel.sku}`} className="text-dark text-decoration-none">{rel.name}</Link>
                    </h4>
                    <span className="small text-gold font-heading fw-semibold mt-auto">{rel.priceText || 'Price on Request'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="pdp-lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
          <div className="pdp-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="pdp-lightbox-close" onClick={() => setIsLightboxOpen(false)}>✕</button>
            <img
              src={images[activeImageIndex]}
              alt={product.name}
              style={{ transform: `scale(${zoomScale})` }}
              className="pdp-lightbox-img"
            />
          </div>
        </div>
      )}

      <NewsletterSection />
    </div>
  );
};

export default ProductDetailPage;
