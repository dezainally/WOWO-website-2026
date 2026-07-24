import React from 'react';
import { useInquiry } from '../context/InquiryContext';
import '../styles/FloatingWhatsApp.css';

const FloatingWhatsApp = () => {
  const { openWhatsApp } = useInquiry();

  return (
    <div className="floating-whatsapp-container position-fixed">
      <button
        type="button"
        onClick={() => openWhatsApp()}
        className="floating-whatsapp-btn d-flex align-items-center justify-content-center border-0 shadow"
        aria-label="Instant WhatsApp Chat with Stylist"
      >
        <span className="whatsapp-pulse-ring"></span>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.93a7.9 7.9 0 0 0 1.08 3.971L0 16l4.149-1.086a7.9 7.9 0 0 0 3.846 1.017h.005c4.368 0 7.92-3.56 7.924-7.93a7.9 7.9 0 0 0-2.323-5.657zm-5.607 11.8a6.56 6.56 0 0 1-3.344-.915l-.24-.143-2.487.652.665-2.42-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.69-4.982c-.193-.097-1.14-.562-1.312-.625-.172-.062-.297-.093-.422.093-.125.187-.484.625-.593.75-.11.125-.218.14-.412.043-.193-.097-.818-.302-1.557-.963-.574-.513-.96-1.147-1.072-1.34-.112-.193-.012-.298.085-.395.088-.088.193-.227.29-.34.097-.113.13-.19.193-.317.063-.127.03-.239-.015-.336-.046-.097-.422-1.018-.578-1.392-.153-.367-.305-.317-.422-.323-.108-.005-.233-.005-.357-.005a.7.7 0 0 0-.51.239c-.176.19-.672.656-.672 1.6 0 .943.688 1.854.783 1.983.097.129 1.353 2.067 3.28 2.898.458.197.815.316 1.094.404.46.146.88.125 1.212.076.37-.055 1.14-.466 1.3-.915.16-.45.16-.836.113-.916-.047-.08-.172-.128-.365-.225"/>
        </svg>
      </button>
      <div className="floating-whatsapp-tooltip text-nowrap">
        <span>Chat with Stylist</span>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
