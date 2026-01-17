import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" aria-label="SignLearn Home">
          <span className="logo-icon">👋</span>
          <span className="logo-text">SignLearn</span>
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="nav-link" aria-label="Home">
            🏠 Home
          </Link>
          <Link to="/signs" className="nav-link" aria-label="Learn Signs">
            ✋ Signs
          </Link>
          <Link to="/courses" className="nav-link" aria-label="Courses">
            📚 Courses
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link" aria-label="Dashboard">
                📊 Dashboard
              </Link>
              <div className="user-menu">
                <span className="user-name" aria-label={`Logged in as ${user?.email}`}>
                  👤 {user?.email?.split('@')[0] || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="logout-btn"
                  aria-label="Logout"
                >
                  🚪 Logout
                </button>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline" aria-label="Login">
                🔑 Login
              </Link>
              <Link to="/register" className="btn btn-primary" aria-label="Register">
                ✨ Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

