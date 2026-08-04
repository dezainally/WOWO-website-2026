import { PRODUCTS_DATA } from '../data/productsData';
import { UPCOMING_EXHIBITIONS, EXHIBITION_GALLERY } from '../data/exhibitionsData';

const API_BASE_URL = 'http://localhost:5050/api';

/**
 * Fetch products from backend API, with fallback to local productsData.js
 */
export const fetchProducts = async (category = 'all', search = '') => {
  try {
    const query = new URLSearchParams();
    if (category && category !== 'all') query.append('category', category);
    if (search) query.append('search', search);

    const response = await fetch(`${API_BASE_URL}/products?${query.toString()}`);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (error) {
    console.warn('Backend API offline, serving local products data fallback');
  }

  // Local fallback filtering
  let items = [...PRODUCTS_DATA];
  if (category && category !== 'all') {
    items = items.filter(p => p.category === category);
  }
  if (search) {
    items = items.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));
  }
  return items;
};

/**
 * Fetch single product detail by ID or SKU
 */
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (response.ok) {
      const data = await response.json();
      if (data) return data;
    }
  } catch (error) {
    console.warn('Backend API offline, serving local product detail fallback');
  }

  return PRODUCTS_DATA.find(p => String(p.id) === String(id) || p.sku === String(id)) || PRODUCTS_DATA[0];
};

/**
 * Submit Customer Inquiry (Price Request / VIP Exhibition RSVP)
 */
export const submitInquiry = async (inquiryData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inquiryData)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('Could not post to backend API inbox:', error);
  }
  return { status: 'submitted_locally' };
};
