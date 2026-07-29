import axios from 'axios';

// Live Production Render API Endpoint
const API = axios.create({
  baseURL: 'https://wowo-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach Authorization Bearer Token automatically to outgoing admin requests
API.interceptors.request.use((config) => {
  const adminInfo = localStorage.getItem('wowo_admin_info');
  if (adminInfo) {
    const parsed = JSON.parse(adminInfo);
    if (parsed.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
