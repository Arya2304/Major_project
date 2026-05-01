import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const formatError = (rawError) => {
    if (!rawError) return 'Login failed. Please try again.';
    if (typeof rawError === 'string') return rawError;
    if (rawError.message) return rawError.message;
    if (typeof rawError === 'object') {
      const parts = Object.entries(rawError).map(([field, value]) => {
        const text = Array.isArray(value) ? value.join(', ') : String(value);
        if (field === 'non_field_errors') return text;
        return `${field}: ${text}`;
      });
      return parts.filter(Boolean).join(' | ') || 'Login failed. Please try again.';
    }
    return 'Login failed. Please try again.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      // Redirect to the page user was trying to access, or learn
      const from = searchParams.get('from') || '/learn';
      navigate(from);
    } else {
      setError(formatError(result.error));
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>🔑 Login</h1>
          <p>Welcome back! Sign in to continue learning</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message" role="alert">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">📧 Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">🔒 Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={loading}
            aria-label="Login"
          >
            {loading ? <Loader /> : '🔑 Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="link">
              ✨ Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

