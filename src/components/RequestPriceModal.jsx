import React, { useState, useEffect } from 'react';
import { useInquiry } from '../context/InquiryContext';
import '../styles/RequestPriceModal.css';

const RequestPriceModal = () => {
  const { isInquiryOpen, selectedProduct, closeInquiryModal, openWhatsApp } = useInquiry();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    occasion: 'Wedding',
    productName: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        productName: selectedProduct.name || selectedProduct.title || ''
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        productName: 'Bespoke Custom Inquiry'
      }));
    }
    setSubmitted(false);
  }, [selectedProduct, isInquiryOpen]);

  if (!isInquiryOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const text = `*New Price Inquiry - WOWO Studio*
*Product:* ${formData.productName}
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*City:* ${formData.city}
*Occasion:* ${formData.occasion}
${formData.email ? `*Email:* ${formData.email}\n` : ''}*Requirements:* ${formData.message || 'I would like to inquire about price, custom fit, and availability.'}`;
    
    const url = `https://wa.me/919666748789?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    closeInquiryModal();
  };

  return (
    <div className="inquiry-modal-overlay d-flex align-items-center justify-content-center px-3" onClick={closeInquiryModal}>
      <div className="inquiry-modal-card position-relative bg-white" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          type="button"
          className="inquiry-close-btn border-0 bg-transparent"
          onClick={closeInquiryModal}
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header */}
            <div className="inquiry-modal-header text-center mb-4">
              <span className="inquiry-modal-subtitle">BESPOKE BOUTIQUE INQUIRY</span>
              <h3 className="inquiry-modal-title mt-1">Request Price & Customization</h3>
              <p className="inquiry-modal-desc mb-0">
                Each WOWO Studio piece is custom crafted to perfection. Submit your details below to receive pricing & styling advice from our master couture team.
              </p>
            </div>

            {/* Selected Product Summary Badge */}
            {selectedProduct && (
              <div className="selected-product-badge d-flex align-items-center gap-3 p-2.5 mb-4 rounded">
                <img src={selectedProduct.image || (selectedProduct.images && selectedProduct.images[0])} alt={selectedProduct.name} className="selected-product-img" />
                <div>
                  <h5 className="selected-product-name mb-0">{selectedProduct.name}</h5>
                  <span className="selected-product-sku">SKU: {selectedProduct.sku || 'WOWO-EXCLUSIVE'}</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="inquiry-form">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label-custom">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control form-input-custom"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label-custom">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control form-input-custom"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label-custom">City / Location *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Hyderabad, Mumbai, USA"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-control form-input-custom"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label-custom">Occasion / Event</label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="form-select form-input-custom"
                  >
                    <option value="Wedding">Bridal / Groom Wedding</option>
                    <option value="Reception">Grand Reception</option>
                    <option value="Sangeet / Mehendi">Sangeet / Mehendi</option>
                    <option value="Festive Celebration">Festive Celebration</option>
                    <option value="Party / Cocktail">Party / Cocktail Gala</option>
                    <option value="Boutique Exhibition">Boutique Exhibition Visit</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label-custom">Email Address (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control form-input-custom"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label-custom">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="form-control form-input-custom bg-light"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label-custom">Customization Message & Requirements</label>
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Share specific fitting preferences, event dates, or color customization requests..."
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control form-input-custom"
                  ></textarea>
                </div>
              </div>

              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <button type="submit" className="btn-submit-inquiry flex-grow-1">
                  Submit Price Request
                </button>
                <button type="button" onClick={handleWhatsAppSend} className="btn-whatsapp-inquiry d-flex align-items-center justify-content-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.93a7.9 7.9 0 0 0 1.08 3.971L0 16l4.149-1.086a7.9 7.9 0 0 0 3.846 1.017h.005c4.368 0 7.92-3.56 7.924-7.93a7.9 7.9 0 0 0-2.323-5.657zm-5.607 11.8a6.56 6.56 0 0 1-3.344-.915l-.24-.143-2.487.652.665-2.42-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.69-4.982c-.193-.097-1.14-.562-1.312-.625-.172-.062-.297-.093-.422.093-.125.187-.484.625-.593.75-.11.125-.218.14-.412.043-.193-.097-.818-.302-1.557-.963-.574-.513-.96-1.147-1.072-1.34-.112-.193-.012-.298.085-.395.088-.088.193-.227.29-.34.097-.113.13-.19.193-.317.063-.127.03-.239-.015-.336-.046-.097-.422-1.018-.578-1.392-.153-.367-.305-.317-.422-.323-.108-.005-.233-.005-.357-.005a.7.7 0 0 0-.51.239c-.176.19-.672.656-.672 1.6 0 .943.688 1.854.783 1.983.097.129 1.353 2.067 3.28 2.898.458.197.815.316 1.094.404.46.146.88.125 1.212.076.37-.055 1.14-.466 1.3-.915.16-.45.16-.836.113-.916-.047-.08-.172-.128-.365-.225"/>
                  </svg>
                  Instant WhatsApp Inquiry
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-4">
            <div className="success-icon-badge mb-3 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l4.992-6.5a.75.75 0 0 0-.01-1.05z"/>
              </svg>
            </div>
            <h3 className="inquiry-modal-title">Thank You, {formData.name}!</h3>
            <p className="inquiry-modal-desc mt-2 mb-4">
              Your price and customization inquiry for <strong>"{formData.productName}"</strong> has been received. Our senior bridal stylist will contact you at <strong>{formData.phone}</strong> shortly.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button type="button" onClick={handleWhatsAppSend} className="btn-whatsapp-inquiry">
                Connect on WhatsApp Now
              </button>
              <button type="button" onClick={closeInquiryModal} className="btn-submit-inquiry bg-dark text-white border-0 px-4">
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RequestPriceModal;
