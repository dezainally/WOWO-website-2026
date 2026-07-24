import React, { createContext, useContext, useState, useEffect } from 'react';

const InquiryContext = createContext();

export const InquiryProvider = ({ children }) => {
  // Request Price Modal State
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Newsletter Popup State (5 seconds delay)
  const [isNewsletterPopupOpen, setIsNewsletterPopupOpen] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the popup in session
    const popupDismissed = sessionStorage.getItem('wowo_newsletter_popup_dismissed');
    if (!popupDismissed) {
      const timer = setTimeout(() => {
        setIsNewsletterPopupOpen(true);
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const closeNewsletterPopup = () => {
    setIsNewsletterPopupOpen(false);
    sessionStorage.setItem('wowo_newsletter_popup_dismissed', 'true');
  };

  const openInquiryModal = (product = null) => {
    setSelectedProduct(product);
    setIsInquiryOpen(true);
  };

  const closeInquiryModal = () => {
    setIsInquiryOpen(false);
    setSelectedProduct(null);
  };

  const openWhatsApp = (productName = '') => {
    const text = productName 
      ? `Hello WOWO Studio, I would like to request details and pricing for: ${productName}.`
      : `Hello WOWO Studio, I would like to inquire about your luxury boutique collections.`;
    const url = `https://wa.me/919666748789?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const callNow = () => {
    window.location.href = 'tel:+919666748789';
  };

  return (
    <InquiryContext.Provider
      value={{
        isInquiryOpen,
        selectedProduct,
        openInquiryModal,
        closeInquiryModal,
        isNewsletterPopupOpen,
        closeNewsletterPopup,
        openWhatsApp,
        callNow
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
};
