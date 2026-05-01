import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaHandSpock, FaBook, FaUser } from 'react-icons/fa';

/**
 * BottomNavbar Component
 * Modern mobile-first bottom navigation bar
 * Features: Fixed positioning, active state highlighting, responsive design
 * Color theme: Blue-based with orange accent for active items
 */
const BottomNavbar = () => {
  const location = useLocation();

  // Navigation items configuration
  const navItems = [
    { path: '/learn', icon: <FaHome />, label: 'Home', id: 'home' },
    { path: '/practice', icon: <FaHandSpock />, label: 'Practice', id: 'practice' },
    { path: '/dictionary', icon: <FaBook />, label: 'Dictionary', id: 'dictionary' },
    { path: '/profile', icon: <FaUser />, label: 'Profile', id: 'profile' },
  ];

  // Check if a route is active
  const isActive = (path) => {
    if (path === '/learn') {
      return location.pathname === '/learn' || location.pathname.startsWith('/learn/');
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
      role="navigation"
      aria-label="Mobile bottom navigation"
    >
      <div className="flex items-center justify-around h-20">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset ${
                active
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
              title={item.label}
            >
              <span
                className={`text-2xl transition-colors duration-200 ${
                  active ? 'text-primary-600' : 'text-gray-600'
                }`}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span
                className={`text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
                  active ? 'text-primary-600' : 'text-gray-600'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavbar;
