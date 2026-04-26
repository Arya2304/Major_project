import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * IconNavigation Component — Phase 2
 * Bottom mobile navigation with icon + label pairs
 * Features: fixed at bottom on mobile, hidden on desktop (md+)
 * Shows 4-5 items: Home, Signs, Courses, Progress, Dashboard (if authenticated)
 * Active item highlighted with saffron accent
 */
const IconNavigation = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  // Navigation items configuration
  const navItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/signs', icon: '✋', label: 'Signs' },
    { path: '/courses', icon: '📚', label: 'Courses' },
    { path: '/progress', icon: '📈', label: 'Progress' },
  ];

  // Add dashboard if authenticated
  if (isAuthenticated) {
    navItems.push({ path: '/dashboard', icon: '📊', label: 'Dashboard' });
  }

  // Check if a route is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t-4 border-primary-500 shadow-xl z-50"
      role="navigation"
      aria-label="Mobile bottom navigation"
    >
      <div className="flex items-center justify-around h-20">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 ${
                active
                  ? 'text-accent-500 bg-accent-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
            >
              <span className="text-2xl" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-xs font-bold uppercase tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Auth Menu Item */}
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="flex flex-col items-center justify-center gap-1 flex-1 h-full text-gray-700 hover:text-error-500 hover:bg-error-50 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-error-500"
            aria-label="Logout from account"
          >
            <span className="text-2xl" aria-hidden="true">
              🚪
            </span>
            <span className="text-xs font-bold uppercase tracking-wide">
              Logout
            </span>
          </button>
        ) : (
          <Link
            to="/login"
            className="flex flex-col items-center justify-center gap-1 flex-1 h-full text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Login to your account"
          >
            <span className="text-2xl" aria-hidden="true">
              👤
            </span>
            <span className="text-xs font-bold uppercase tracking-wide">
              Login
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default IconNavigation;

