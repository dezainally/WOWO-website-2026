import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalExhibitions: 0,
    totalInquiries: 0,
    newInquiries: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, exRes, inqRes] = await Promise.all([
          API.get('/products'),
          API.get('/exhibitions'),
          API.get('/inquiries').catch(() => ({ data: [] }))
        ]);

        const inqs = inqRes.data || [];

        setStats({
          totalProducts: prodRes.data.length || 0,
          totalExhibitions: exRes.data.length || 0,
          totalInquiries: inqs.length || 0,
          newInquiries: inqs.filter(i => i.status === 'NEW').length || 0
        });
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span className="subtitle-gold">EXECUTIVE OVERVIEW</span>
          <h2 className="font-heading fw-bold text-white fs-3 mt-1">Dashboard Analytics</h2>
        </div>
        <Link to="/products" className="btn btn-gold rounded-pill px-4">
          + Add New Product
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="row g-4 mb-5">
        <div className="col-md-3 col-sm-6">
          <div className="card bg-dark border-secondary border-opacity-25 text-white p-4 rounded-4 shadow-sm">
            <span className="small text-muted text-uppercase tracking-wider">Total Products</span>
            <div className="display-6 fw-bold text-gold my-1">{loading ? '...' : stats.totalProducts}</div>
            <span className="small text-success">Active in Catalog</span>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="card bg-dark border-secondary border-opacity-25 text-white p-4 rounded-4 shadow-sm">
            <span className="small text-muted text-uppercase tracking-wider">Exhibitions & Pop-ups</span>
            <div className="display-6 fw-bold text-gold my-1">{loading ? '...' : stats.totalExhibitions}</div>
            <span className="small text-info">Upcoming & Galleries</span>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="card bg-dark border-secondary border-opacity-25 text-white p-4 rounded-4 shadow-sm">
            <span className="small text-muted text-uppercase tracking-wider">Total Customer Leads</span>
            <div className="display-6 fw-bold text-gold my-1">{loading ? '...' : stats.totalInquiries}</div>
            <span className="small text-warning">Price & RSVP Requests</span>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="card bg-dark border-secondary border-opacity-25 text-white p-4 rounded-4 shadow-sm">
            <span className="small text-muted text-uppercase tracking-wider">New Unread Leads</span>
            <div className="display-6 fw-bold text-danger my-1">{loading ? '...' : stats.newInquiries}</div>
            <span className="small text-light">Requires Outreach</span>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <h4 className="font-heading text-white fs-5 mb-3">Quick Control Actions</h4>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card bg-secondary bg-opacity-10 border-secondary border-opacity-25 p-4 rounded-4 text-white h-100">
            <h5 className="font-heading text-gold mb-2">🛍️ Manage Couture Products</h5>
            <p className="small text-muted mb-4">Add new bridal lehengas or Kanjeevarams, update prices, change fabrics, and upload high-res imagery.</p>
            <Link to="/products" className="btn btn-outline-gold rounded-pill mt-auto align-self-start">
              Go to Product Manager →
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-secondary bg-opacity-10 border-secondary border-opacity-25 p-4 rounded-4 text-white h-100">
            <h5 className="font-heading text-gold mb-2">📅 Exhibition Trunk Shows</h5>
            <p className="small text-muted mb-4">Add upcoming pop-up dates for Hyderabad, Mumbai, or Bengaluru. Manage video walkthroughs and photo galleries.</p>
            <Link to="/exhibitions" className="btn btn-outline-gold rounded-pill mt-auto align-self-start">
              Go to Exhibition Manager →
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-secondary bg-opacity-10 border-secondary border-opacity-25 p-4 rounded-4 text-white h-100">
            <h5 className="font-heading text-gold mb-2">🖼️ Announcement & Hero Banner</h5>
            <p className="small text-muted mb-4">Update top ticker announcement text, promo call button, and main home hero banner text instantly.</p>
            <Link to="/banners" className="btn btn-outline-gold rounded-pill mt-auto align-self-start">
              Edit Banner Settings →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
