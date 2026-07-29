import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="bg-dark text-white p-3 min-vh-100 border-end border-secondary border-opacity-25 sidebar-wrapper">
      <div className="small text-muted text-uppercase tracking-wider px-3 mb-3 fw-bold">
        Management Suite
      </div>
      <div className="nav nav-pills flex-column gap-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `nav-link admin-sidebar-link ${isActive ? 'active' : ''}`}
        >
          📊 Dashboard Overview
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => `nav-link admin-sidebar-link ${isActive ? 'active' : ''}`}
        >
          🛍️ Products Manager
        </NavLink>
        <NavLink
          to="/exhibitions"
          className={({ isActive }) => `nav-link admin-sidebar-link ${isActive ? 'active' : ''}`}
        >
          📅 Exhibitions & Media Gallery
        </NavLink>
        <NavLink
          to="/banners"
          className={({ isActive }) => `nav-link admin-sidebar-link ${isActive ? 'active' : ''}`}
        >
          🖼️ Banners & Ticker Text
        </NavLink>
        <NavLink
          to="/inquiries"
          className={({ isActive }) => `nav-link admin-sidebar-link ${isActive ? 'active' : ''}`}
        >
          📬 Inquiries & VIP RSVPs
        </NavLink>
      </div>

      <div className="mt-5 p-3 rounded bg-secondary bg-opacity-10 border border-secondary border-opacity-25">
        <span className="small text-gold fw-bold d-block mb-1">💡 Hostinger Production Tip</span>
        <p className="small text-muted mb-0">
          Changes made in this Admin Panel automatically sync with your live database and reflect on <strong>wowostudio.com</strong> instantly.
        </p>
      </div>
    </div>
  );
};

export default AdminSidebar;
