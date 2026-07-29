import React, { useEffect, useState } from 'react';
import API from '../api/api';

const ProductsManagerPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'sarees',
    categoryName: 'Sarees',
    priceText: 'Price on Request',
    shortDesc: '',
    description: '',
    fabric: 'Pure Mulberry Silk',
    craft: 'Artisanal Handloom Weaving',
    imagesText: '',
    inStock: true
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      sku: `WOWO-${Date.now().toString().slice(-4)}`,
      category: 'sarees',
      categoryName: 'Sarees',
      priceText: 'Price on Request',
      shortDesc: '',
      description: '',
      fabric: 'Pure Mulberry Silk with Zari',
      craft: 'Artisanal Handloom Weaving',
      imagesText: '',
      inStock: true
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (p) => {
    setEditingId(p._id);
    setFormData({
      name: p.name,
      sku: p.sku,
      category: p.category,
      categoryName: p.categoryName || 'Couture',
      priceText: p.priceText || 'Price on Request',
      shortDesc: p.shortDesc || '',
      description: p.description || '',
      fabric: p.fabric || '',
      craft: p.craft || '',
      imagesText: (p.images || []).join('\n'),
      inStock: p.inStock !== false
    });
    setShowModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const imagesList = formData.imagesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      images: imagesList.length ? imagesList : ['/assets/images/image1.png']
    };

    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, payload);
      } else {
        await API.post('/products', payload);
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  const handleToggleStock = async (product) => {
    try {
      await API.put(`/products/${product._id}`, {
        inStock: !product.inStock
      });
      fetchProducts();
    } catch (err) {
      alert('Failed to update stock status');
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span className="subtitle-gold">CATALOG INVENTORY</span>
          <h2 className="font-heading fw-bold text-white fs-3 mt-1">Products Management</h2>
        </div>
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="btn btn-gold rounded-pill px-4"
        >
          + Add New Couture Piece
        </button>
      </div>

      {/* Products Table */}
      <div className="card bg-dark border-secondary border-opacity-25 rounded-4 shadow-sm overflow-hidden text-white">
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead className="table-secondary bg-opacity-25 small text-uppercase">
              <tr>
                <th className="py-3 px-4">Preview</th>
                <th>Product Name & SKU</th>
                <th>Category</th>
                <th>Price Status</th>
                <th>Fabric / Craft</th>
                <th>In Stock</th>
                <th className="text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    Loading inventory list...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    No products found. Click "+ Add New Couture Piece" to create one.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id}>
                    <td className="py-3 px-4">
                      <img
                        src={p.images?.[0] || '/assets/images/image1.png'}
                        alt={p.name}
                        className="rounded"
                        style={{ width: '50px', height: '65px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>
                      <strong className="d-block text-white fs-6">{p.name}</strong>
                      <span className="small text-gold">SKU: {p.sku}</span>
                    </td>
                    <td>
                      <span className="badge bg-secondary bg-opacity-50 text-uppercase">{p.category}</span>
                    </td>
                    <td>
                      <span className="badge bg-gold text-dark font-heading fw-bold">{p.priceText}</span>
                    </td>
                    <td>
                      <span className="small text-muted d-block">{p.fabric}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleToggleStock(p)}
                        className={`btn btn-sm ${p.inStock ? 'btn-outline-success' : 'btn-outline-danger'} rounded-pill py-1 px-3`}
                      >
                        {p.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                      </button>
                    </td>
                    <td className="text-end px-4">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(p)}
                        className="btn btn-outline-warning btn-sm me-2 rounded-pill px-3"
                      >
                        Edit ✏️
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(p._id, p.name)}
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

      {/* Add / Edit Product Modal */}
      {showModal && (
        <div className="modal d-block bg-dark bg-opacity-75" tabIndex="-1" style={{ zIndex: 1050 }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-dark text-white border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="modal-title font-heading text-gold">
                  {editingId ? 'Edit Product' : 'Add New Couture Piece'}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <form onSubmit={handleSaveProduct}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label small text-uppercase">Product Name *</label>
                      <input
                        type="text"
                        required
                        className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small text-uppercase">SKU Code *</label>
                      <input
                        type="text"
                        required
                        className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small text-uppercase">Category *</label>
                      <select
                        className="form-select bg-secondary bg-opacity-10 text-white border-secondary"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="sarees">Sarees & Half Sarees</option>
                        <option value="lehengas">Bridal Lehengas</option>
                        <option value="fusion">Fusion Wear</option>
                        <option value="sherwanis">Sherwanis</option>
                        <option value="dupattas">Dupattas</option>
                        <option value="gowns">Dresses & Gowns</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small text-uppercase">Price Display Text</label>
                      <input
                        type="text"
                        className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
                        placeholder="e.g. 7999/- or Price on Request"
                        value={formData.priceText}
                        onChange={(e) => setFormData({ ...formData, priceText: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small text-uppercase">Fabric Composition</label>
                      <input
                        type="text"
                        className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
                        value={formData.fabric}
                        onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small text-uppercase">Craftsmanship</label>
                      <input
                        type="text"
                        className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
                        value={formData.craft}
                        onChange={(e) => setFormData({ ...formData, craft: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small text-uppercase">Short Description</label>
                      <textarea
                        rows="2"
                        className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
                        value={formData.shortDesc}
                        onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <label className="form-label small text-uppercase">Image URLs (One per line)</label>
                      <textarea
                        rows="3"
                        className="form-control bg-secondary bg-opacity-10 text-white border-secondary"
                        placeholder="e.g. /assets/images/image1.png"
                        value={formData.imagesText}
                        onChange={(e) => setFormData({ ...formData, imagesText: e.target.value })}
                      ></textarea>
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
                    Save Product Changes
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

export default ProductsManagerPage;
