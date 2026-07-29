const API_BASE = 'https://wowo-backend.onrender.com/api';

/**
 * Public Website API Client (Connected to live Render Backend)
 */
export const fetchPublicProducts = async (category = 'all', search = '') => {
  try {
    const res = await fetch(`${API_BASE}/products?category=${category}&search=${search}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.warn('Backend API offline, using fallback dataset:', error);
  }
  return null;
};

export const fetchPublicExhibitions = async () => {
  try {
    const res = await fetch(`${API_BASE}/exhibitions`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.warn('Backend API offline for exhibitions');
  }
  return null;
};

export const fetchPublicBanner = async () => {
  try {
    const res = await fetch(`${API_BASE}/banner`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.warn('Backend API offline for banner');
  }
  return null;
};

export const submitCustomerInquiry = async (inquiryData) => {
  try {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData)
    });
    return res.ok;
  } catch (error) {
    console.warn('Could not submit inquiry to backend:', error);
  }
  return false;
};
