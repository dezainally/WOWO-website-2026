import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInquiry } from '../context/InquiryContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { openInquiryModal } = useInquiry();
  const [isLiked, setIsLiked] = useState(false);

  if (!product) return null;

  const productId = product._id || product.id;
  const mainImage = product.images?.[0] || product.image || '/assets/images/image1.png';
  const tag = product.tag || (product.category === 'sarees' ? 'BESPOKE' : product.category === 'lehengas' ? 'SIGNATURE' : product.category === 'fusion' ? 'EXCLUSIVE' : 'EDIT');
  const priceDisplay = product.priceText ? (product.priceText.includes('/-') ? product.priceText : `${product.priceText}`) : 'Price on Request';

  return (
    <div className="luxury-product-card rounded-4 overflow-hidden border h-100 position-relative d-flex flex-column">

      {/* Top Image Stage */}
      <div className="luxury-card-img-wrapper overflow-hidden position-relative">
        <Link to={`/product/${productId}`} className="d-block w-100 h-100">
          <img
            src={mainImage}
            alt={product.name}
            className="luxury-card-img w-100"
          />
        </Link>



        {/* Top-Right Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`luxury-wishlist-btn position-absolute border-0 d-flex align-items-center justify-content-center ${isLiked ? 'active' : ''}`}
          title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isLiked ? '#e63946' : 'none'} stroke={isLiked ? '#e63946' : '#2b261f'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Card Details Box - Centered Layout */}
      <div className="luxury-card-body p-md-3 text-center d-flex flex-column flex-grow-1">

        {/* Uppercase Serif Title */}
        <Link to={`/product/${productId}`} className="text-decoration-none">
          <h3 className="luxury-card-title font-heading text-uppercase fw-bold mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Italic Serif Price Text */}
        <div className="luxury-card-price font-heading fst-italic mb-3">
          {priceDisplay}
        </div>

        {/* Full Width Dark Olive Request Price Button */}
        <div className="mt-auto">
          <button
            type="button"
            onClick={() => openInquiryModal(product)}
            className="btn-luxury-request-price w-100 rounded-3 text-uppercase fw-bold"
          >
            REQUEST PRICE
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProductCard;
