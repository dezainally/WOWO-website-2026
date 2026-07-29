import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check username & password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper min-vh-100 d-flex align-items-center justify-content-center bg-dark p-3">
      <div className="card admin-login-card border-secondary border-opacity-25 bg-dark text-white p-4 p-md-5 shadow-lg w-100" style={{ maxWidth: '450px', borderRadius: '16px' }}>
        <div className="text-center mb-4">
          <span className="subtitle-gold letter-spacing-3 d-block mb-1">LUXURY COUTURE ADMIN</span>
          <h2 className="font-heading fw-bold text-white fs-3">WOWO Studio Control Panel</h2>
          <p className="small text-muted mt-2">Sign in with your admin credentials to manage products, prices, exhibitions & banners.</p>
        </div>

        {error && (
          <div className="alert alert-danger small py-2 text-center mb-4 rounded-3">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small text-uppercase tracking-wide text-light">Admin Username / Email</label>
            <input
              type="text"
              required
              className="form-control bg-secondary bg-opacity-10 border-secondary text-white py-2.5"
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label small text-uppercase tracking-wide text-light">Password</label>
            <input
              type="password"
              required
              className="form-control bg-secondary bg-opacity-10 border-secondary text-white py-2.5"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-gold w-100 py-3 rounded-pill font-heading fw-bold text-uppercase tracking-wider"
          >
            {loading ? 'Authenticating...' : 'Sign In to Admin Dashboard →'}
          </button>
        </form>

        <div className="mt-4 pt-3 border-top border-secondary border-opacity-25 text-center">
          <span className="small text-muted">Default Credentials for Demo:</span>
          <div className="small text-gold mt-1">Username: <strong>admin</strong> | Password: <strong>admin123password</strong></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
