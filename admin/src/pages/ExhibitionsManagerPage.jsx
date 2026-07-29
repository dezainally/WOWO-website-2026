import React, { useEffect, useState } from 'react';
import API from '../api/api';

const ExhibitionsManagerPage = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    city: 'Hyderabad',
    venue: '',
    dates: '',
    time: '10:30 AM - 8:30 PM',
    status: 'Upcoming Next',
    badge: 'Exclusive Pop-up',
    description: '',
    image: '/assets/images/heroimage.webp',
    isPastExhibition: false
  });

  const fetchExhibitions = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/exhibitions');
      setExhibitions(data);
    } catch (err) {
      console.error('Error fetching exhibitions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      city: 'Hyderabad',
      venue: 'Taj Krishna, Jubilee Hall, Banjara Hills',
      dates: 'August 14 - 16, 2026',
      time: '10:30 AM - 8:30 PM',
      status: 'Upcoming Next',
      badge: 'Exclusive Pop-up',
      description: '',
      image: '/assets/images/heroimage.webp',
      isPastExhibition: false
    });
    setShowModal(true);
  };

  const handleSaveExhibition = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/exhibitions/${editingId}`, formData);
      } else {
        await API.post('/exhibitions', formData);
      }
      setShowModal(false);
      fetchExhibitions();
    } catch (err) {
      alert('Failed to save exhibition');
    }
  };

  const handleDeleteExhibition = async (id, title) => {
    if (window.confirm(`Delete exhibition "${title}"?`)) {
      try {
        await API.delete(`/exhibitions/${id}`);
        fetchExhibitions();
      } catch (err) {
        alert('Failed to delete exhibition');
      }
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span className="subtitle-gold">EVENTS & POP-UPS</span>
          <h2 className="font-heading fw-bold text-white fs-3 mt-1">Exhibitions & Gallery Manager</h2>
        </div>
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="btn btn-gold rounded-pill px-4"
        >
          + Add New Exhibition / Pop-up
        </button>
      </div>

      <div className="card bg-dark border-secondary border-opacity-25 rounded-4 shadow-sm overflow-hidden text-white">
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead className="table-secondary bg-opacity-25 small text-uppercase">
              <tr>
                <th className="py-3 px-4">Banner</th>
                <th>Exhibition Title & City</th>
                <th>Venue Details</th>
                <th>Dates & Time</th>
                <th>Type</th>
                <th className="text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    Loading exhibitions...
                  </td>
                </tr>
              ) : (
                exhibitions.map((ex) => (
                  <tr key={ex._id}>
                    <td className="py-3 px-4">
                      <img
                        src={ex.image}
                        alt={ex.title}
                        className="rounded"
                        style={{ width: '60px', height: '45px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>
                      <strong className="d-block text-white fs-6">{ex.title}</strong>
                      <span className="badge bg-gold text-dark ms-0">{ex.city}</span>
                    </td>
                    <td>
                      <span className="small text-muted">{ex.venue}</span>
                    </td>
                    <td>
                      <span className="small text-light d-block">{ex.dates}</span>
                      <span className="small text-muted">{ex.time}</span>
                    </td>
                    <td>
                      <span className={`badge ${ex.isPastExhibition ? 'bg-secondary' : 'bg-success'}`}>
                        {ex.isPastExhibition ? 'Past Gallery' : 'Upcoming Event'}
                      </span>
                    </td>
                    <td className="text-end px-4">
                      <button
                        type="button"
                        onClick={() => handleDeleteExhibition(ex._id, ex.title)}
                        className="btn btn-outline-danger btn-sm rounded-pill px-3"
                      >
                        Delete 🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Exhibition Modal */}
      {showModal && (
        <div className="modal d-block bg-dark bg-opacity-75" tabIndex="-1" style={{ zIndex: 1050 }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-dark text-white border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="modal-title font-heading text-gold">Add Exhibition Pop-up Event</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <form onSubmit={handleSaveExhibition}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label small text-uppercase">Event Title *</label>
                      <input
                        type="text"
                        required
                        className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small text-uppercase">City *</label>
                      <input
                        type="text"
                        required
                        className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small text-uppercase">Venue Address *</label>
                      <input
                        type="text"
                        required
                        className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
                        value={formData.venue}
                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small text-uppercase">Event Dates *</label>
                      <input
                        type="text"
                        required
                        className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
                        value={formData.dates}
                        onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small text-uppercase">Timings</label>
                      <input
                        type="text"
                        className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-secondary">
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill px-4"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-gold rounded-pill px-4">
                    Save Exhibition
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExhibitionsManagerPage;
