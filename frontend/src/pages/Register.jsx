import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/auth';
import Loader from '../components/common/Loader';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    role: null,
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const { register } = useAuth();
  const navigate = useNavigate();

  const formatError = (rawError) => {
    if (!rawError) return 'Registration failed. Please try again.';
    if (typeof rawError === 'string') return rawError;
    if (rawError.message) return rawError.message;
    if (typeof rawError === 'object') {
      const parts = Object.entries(rawError).map(([field, value]) => {
        const text = Array.isArray(value) ? value.join(', ') : String(value);
        if (field === 'non_field_errors') return text;
        return `${field}: ${text}`;
      });
      return parts.filter(Boolean).join(' | ') || 'Registration failed. Please try again.';
    }
    return 'Registration failed. Please try again.';
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await authAPI.getRoles();
        setRoles(data.results || data);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      } finally {
        setLoadingRoles(false);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    // Backend requires `password_confirm` as well.
    const submitData = { ...formData };
    // Ensure role is properly formatted (optional).
    if (submitData.role === '' || submitData.role === null) {
      submitData.role = null;
    }

    const result = await register(submitData);

    if (result.success) {
      navigate('/learn');
    } else {
      setError(formatError(result.error));
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>✨ Register</h1>
          <p>Create your account to start learning sign language</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message" role="alert">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              aria-required="true"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_confirm">Confirm Password</label>
              <input
                type="password"
                id="password_confirm"
                name="password_confirm"
                value={formData.password_confirm}
                onChange={handleChange}
                required
                minLength={8}
                aria-required="true"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            {loadingRoles ? (
              <Loader />
            ) : (
              <select
                id="role"
                name="role"
                value={formData.role || ''}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value || null })
                }
                aria-required="true"
              >
                <option value="">Select your role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name} - {role.description}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={loading}
            aria-label="Register"
          >
            {loading ? <Loader /> : '✨ Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="link">
              🔑 Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

