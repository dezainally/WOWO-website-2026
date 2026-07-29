import React from 'react';

export const CategoryIcon = ({ id, className = '', size = 18 }) => {
  switch (id) {
    case 'all':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'sarees':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 3c-4.4 0-8 3.6-8 8 0 5.5 8 10 8 10s8-4.5 8-10c0-4.4-3.6-8-8-8z" />
          <path d="M12 7v8" />
          <path d="M8.5 10.5h7" />
          <path d="M9.5 14h5" />
        </svg>
      );
    case 'lehengas':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M8 4h8l1 3H7l1-3z" />
          <path d="M7 7l-4 13h18L17 7" />
          <path d="M12 7v13" />
          <path d="M7.5 14c3 1 6 1 9 0" />
          <path d="M5 17c4.5 1.5 9.5 1.5 14 0" />
        </svg>
      );
    case 'fusion':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M6 3h12l3 5-9 4-9-4 3-5z" />
          <path d="M6 8v12l6 2 6-2V8" />
          <path d="M12 12l4 4" />
          <path d="M12 12l-4 4" />
        </svg>
      );
    case 'sherwanis':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M15 3H9l-2 4v14h10V7l-2-4z" />
          <path d="M12 3v18" />
          <path d="M9 7h6" />
          <circle cx="12" cy="10" r="0.75" fill="currentColor" />
          <circle cx="12" cy="13" r="0.75" fill="currentColor" />
          <circle cx="12" cy="16" r="0.75" fill="currentColor" />
        </svg>
      );
    case 'dupattas':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M4 5c4 0 6 3 10 3s6-3 6-3v11c0 0-2 3-6 3s-6-3-10-3V5z" />
          <path d="M4 10c4 0 6 3 10 3s6-3 6-3" />
          <path d="M4 15c4 0 6 3 10 3s6-3 6-3" />
        </svg>
      );
    case 'gowns':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M9 3h6l1 4-4 2 4 12H8l4-12-4-2 1-4z" />
          <path d="M10 9h4" />
          <path d="M7 21c3.5-1 6.5-1 10 0" />
        </svg>
      );
    default:
      return null;
  }
};

export default CategoryIcon;
