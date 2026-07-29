import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminNavbar = () => {
  const { admin, logout } = useAuth();

  return (
    <header className="navbar navbar-dark bg-dark sticky-top p-3 border-bottom border-secondary border-opacity-25 shadow-sm">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <span className="fs-5 fw-bold font-heading text-gold tracking-wide">
            👑 WOWO STUDIO <span className="badge bg-gold ms-2 font-inter fs-7 text-dark fw-bold">ADMIN PANEL</span>
          </span>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="text-end d-none d-sm-block">
            <span className="small text-light d-block fw-semibold">{admin?.username || 'Admin'}</span>
            <span className="badge bg-secondary bg-opacity-50 text-gold fs-8">{admin?.role || 'SUPER_ADMIN'}</span>
          </div>
          <button
            type="button"
            onClick={logout}
            className="btn btn-outline-danger btn-sm px-3 rounded-pill"
          >
            Logout 🚪
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
