import React, { useEffect, useState } from 'react';
import API from '../api/api';

const BannersManagerPage = () => {
  const [banner, setBanner] = useState({
    announcementText: '',
    announcementPhone: '',
    heroBadge: '',
    heroTitle: '',
    heroSubtitle: ''
  });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await API.get('/banner');
        setBanner(data);
      } catch (err) {
        console.error('Failed to load banner settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await API.put('/banner', banner);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert('Failed to save banner settings');
    }
  };

  return (
    <div className="p-4" style={{ maxWidth: '800px' }}>
      <div className="mb-4">
        <span className="subtitle-gold">HOME & NAVIGATION</span>
        <h2 className="font-heading fw-bold text-white fs-3 mt-1">Banners & Announcement Settings</h2>
        <p className="small text-muted">Update the top announcement ticker bar and main hero banner headings displayed across wowostudio.com.</p>
      </div>

      {savedSuccess && (
        <div className="alert alert-success small py-2 rounded-3 mb-4">
          ✓ Banner settings updated successfully and synced with live website!
        </div>
      )}

      <form onSubmit={handleSave} className="card bg-dark border-secondary border-opacity-25 p-4 rounded-4 text-white shadow-sm">
        <h5 className="font-heading text-gold mb-3">1. Top Announcement Marquee Bar</h5>

        <div className="mb-3">
          <label className="form-label small text-uppercase">Announcement Ticker Text</label>
          <textarea
            rows="2"
            required
            className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
            value={banner.announcementText}
            onChange={(e) => setBanner({ ...banner, announcementText: e.target.value })}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="form-label small text-uppercase">Call Now Phone Number</label>
          <input
            type="text"
            className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
            value={banner.announcementPhone}
            onChange={(e) => setBanner({ ...banner, announcementPhone: e.target.value })}
          />
        </div>

        <hr className="border-secondary opacity-25 my-4" />

        <h5 className="font-heading text-gold mb-3">2. Home Hero Banner Text</h5>

        <div className="mb-3">
          <label className="form-label small text-uppercase">Hero Tag Badge</label>
          <input
            type="text"
            className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
            value={banner.heroBadge}
            onChange={(e) => setBanner({ ...banner, heroBadge: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label small text-uppercase">Hero Main Title</label>
          <input
            type="text"
            className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
            value={banner.heroTitle}
            onChange={(e) => setBanner({ ...banner, heroTitle: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="form-label small text-uppercase">Hero Subtitle</label>
          <textarea
            rows="2"
            className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
            value={banner.heroSubtitle}
            onChange={(e) => setBanner({ ...banner, heroSubtitle: e.target.value })}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-gold py-3 rounded-pill font-heading fw-bold">
          Save & Publish Live Settings
        </button>
      </form>
    </div>
  );
};

export default BannersManagerPage;
