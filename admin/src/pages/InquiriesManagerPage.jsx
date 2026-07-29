import React, { useEffect, useState } from 'react';
import API from '../api/api';

const InquiriesManagerPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/inquiries');
      setInquiries(data);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await API.put(`/inquiries/${id}`, { status });
      fetchInquiries();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span className="subtitle-gold">LEADS & RSVPS INBOX</span>
          <h2 className="font-heading fw-bold text-white fs-3 mt-1">Customer Inquiries</h2>
        </div>
      </div>

      <div className="card bg-dark border-secondary border-opacity-25 rounded-4 shadow-sm overflow-hidden text-white">
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead className="table-secondary bg-opacity-25 small text-uppercase">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th>Type</th>
                <th>Customer Name</th>
                <th>Phone Number</th>
                <th>Product / City Details</th>
                <th>Status</th>
                <th className="text-end px-4">Outreach Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    Loading inquiries inbox...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    No customer lead submissions found.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq._id}>
                    <td className="py-3 px-4 small text-muted">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <span className={`badge ${inq.type === 'EXHIBITION_RSVP' ? 'bg-gold text-dark' : 'bg-secondary'}`}>
                        {inq.type}
                      </span>
                    </td>
                    <td>
                      <strong className="text-white d-block">{inq.customerName}</strong>
                    </td>
                    <td>
                      <a href={`https://wa.me/${inq.customerPhone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-success text-decoration-none fw-bold small">
                        💬 {inq.customerPhone}
                      </a>
                    </td>
                    <td>
                      <span className="small text-light d-block">{inq.productName || inq.city || '-'}</span>
                      {inq.productSku && <span className="small text-gold">SKU: {inq.productSku}</span>}
                    </td>
                    <td>
                      <span className={`badge ${inq.status === 'NEW' ? 'bg-danger' : inq.status === 'CONTACTED' ? 'bg-warning text-dark' : 'bg-success'}`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="text-end px-4">
                      {inq.status === 'NEW' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(inq._id, 'CONTACTED')}
                          className="btn btn-outline-warning btn-sm rounded-pill px-3 me-2"
                        >
                          Mark Contacted
                        </button>
                      )}
                      {inq.status !== 'CLOSED' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(inq._id, 'CLOSED')}
                          className="btn btn-outline-success btn-sm rounded-pill px-3"
                        >
                          Close Lead ✓
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InquiriesManagerPage;
