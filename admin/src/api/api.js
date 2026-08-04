import axios from 'axios';

// Create Axios Instance targeting Express API (Port 5050 locally or api.wowostudio.com in production)
const API = axios.create({
  baseURL: 'http://localhost:5050/api',
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
