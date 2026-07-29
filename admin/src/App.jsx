import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import AdminNavbar from './components/AdminNavbar';
import AdminSidebar from './components/AdminSidebar';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsManagerPage from './pages/ProductsManagerPage';
import ExhibitionsManagerPage from './pages/ExhibitionsManagerPage';
import BannersManagerPage from './pages/BannersManagerPage';
import InquiriesManagerPage from './pages/InquiriesManagerPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Protected Route Wrapper Component
const ProtectedAdminRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) {
    return <div className="p-5 text-center text-white bg-dark min-vh-100">Verifying Admin Permissions...</div>;
  }

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark">
      <AdminNavbar />
      <div className="d-flex flex-grow-1">
        <AdminSidebar />
        <main className="flex-grow-1 overflow-auto bg-dark">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Admin Suite Routes */}
        <Route path="/dashboard" element={<ProtectedAdminRoute><DashboardPage /></ProtectedAdminRoute>} />
        <Route path="/products" element={<ProtectedAdminRoute><ProductsManagerPage /></ProtectedAdminRoute>} />
        <Route path="/exhibitions" element={<ProtectedAdminRoute><ExhibitionsManagerPage /></ProtectedAdminRoute>} />
        <Route path="/banners" element={<ProtectedAdminRoute><BannersManagerPage /></ProtectedAdminRoute>} />
        <Route path="/inquiries" element={<ProtectedAdminRoute><InquiriesManagerPage /></ProtectedAdminRoute>} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
