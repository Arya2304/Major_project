import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaHandPaper,
  FaBook,
  FaChartLine,
  FaUser,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

/**
 * Icon-based navigation optimized for visual communication
 * Large icons, clear labels, high contrast
 */
const IconNavigation = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home', ariaLabel: 'Go to home page' },
    {
      path: '/signs',
      icon: FaHandPaper,
      label: 'Signs',
      ariaLabel: 'Learn sign language signs',
    },
    {
      path: '/courses',
      icon: FaBook,
      label: 'Courses',
      ariaLabel: 'Browse courses',
    },
  ];

  if (isAuthenticated) {
    navItems.push({
      path: '/dashboard',
      icon: FaChartLine,
      label: 'Dashboard',
      ariaLabel: 'View your learning dashboard',
    });
  }

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-primary-600 shadow-2xl z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-icon ${active ? 'active' : ''}`}
                aria-label={item.ariaLabel}
                aria-current={active ? 'page' : undefined}
              >
                <Icon
                  className={`text-4xl ${active ? 'text-primary-700' : 'text-text-primary'}`}
                  aria-hidden="true"
                />
                <span
                  className={`text-sm font-bold ${active ? 'text-primary-700' : 'text-text-primary'}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}

          {isAuthenticated ? (
            <>
              <div className="nav-icon" aria-label={`Logged in as ${user?.email}`}>
                <FaUser className="text-4xl text-text-primary" aria-hidden="true" />
                <span className="text-sm font-bold text-text-primary">
                  {user?.first_name || user?.email?.split('@')[0] || 'User'}
                </span>
              </div>
              <button
                onClick={logout}
                className="nav-icon"
                aria-label="Logout"
              >
                <FaSignOutAlt className="text-4xl text-red-600" aria-hidden="true" />
                <span className="text-sm font-bold text-red-600">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="nav-icon"
                aria-label="Login to your account"
              >
                <FaUser className="text-4xl text-text-primary" aria-hidden="true" />
                <span className="text-sm font-bold text-text-primary">Login</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default IconNavigation;

