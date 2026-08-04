import React from 'react';

export const CategoryIcon = ({ categoryId, id, className = '', size = 20 }) => {
  const targetId = categoryId || id;
  switch (targetId) {
    case 'all':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.5" />
          <rect x="14" y="3.5" width="6.5" height="6.5" rx="1.5" />
          <rect x="14" y="14" width="6.5" height="6.5" rx="1.5" />
          <rect x="3.5" y="14" width="6.5" height="6.5" rx="1.5" />
        </svg>
      );
    case 'sarees':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5v9" />
          <path d="M7.5 12h9" />
          <path d="M9 9l6 6" />
        </svg>
      );
    case 'lehengas':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M8 4h8l1.2 3.5H6.8L8 4z" />
          <path d="M6.8 7.5L3 20h18l-3.8-12.5" />
          <path d="M12 7.5V20" />
          <path d="M5.2 14.5h13.6" />
          <path d="M4 17.5h16" />
        </svg>
      );
    case 'fusion':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M6 3h12l3 5-9 4-9-4 3-5z" />
          <path d="M6 8v12l6 2 6-2V8" />
          <path d="M12 12v8" />
        </svg>
      );
    case 'sherwanis':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M15 3.5H9l-2 4v13.5h10V7.5l-2-4z" />
          <path d="M12 3.5v16.5" />
          <line x1="9" y1="7.5" x2="15" y2="7.5" />
          <circle cx="12" cy="10.5" r="0.8" fill="currentColor" />
          <circle cx="12" cy="13.5" r="0.8" fill="currentColor" />
          <circle cx="12" cy="16.5" r="0.8" fill="currentColor" />
        </svg>
      );
    case 'dupattas':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M3 6.5c4.5 0 6.5 3 10.5 3s6.5-3 10.5-3v7.5c-4 0-6 3-10.5 3S7.5 14 3 14V6.5z" />
          <path d="M3 11c4.5 0 6.5 3 10.5 3s6.5-3 10.5-3" />
        </svg>
      );
    case 'gowns':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M9.5 3.5h5l1.2 4.5-3.7 2.2 3.7 10.3H8.3l3.7-10.3-3.7-2.2 1.2-4.5z" />
          <circle cx="12" cy="10.2" r="0.9" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
};

export default CategoryIcon;
