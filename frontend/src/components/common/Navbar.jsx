import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHandPeace } from 'react-icons/fa';
import StreakCounter from '../StreakCounter';

/**
 * Navbar Component — Phase 2
 * Sticky top navigation with responsive mobile menu
 * Features: active route highlighting, hamburger menu, light mode styling
 * Uses Phase 1 design tokens: indigo primary, saffron accent
 * Phase 5: Added compact StreakCounter display for authenticated users
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Mock streak data - in production this would come from user data
  const userStreak = 5;

  // Navigation links configuration
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Signs', path: '/signs' },
    { label: 'Courses', path: '/courses' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-card"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
            aria-label="SignLearn home"
            onClick={handleLinkClick}
          >
            <FaHandPeace className="text-2xl" />
            <span className="hidden sm:inline font-display">SignLearn</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link text-base font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 rounded px-2 py-1 ${
                  isActive(link.path)
                    ? 'nav-link-active text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Section (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                {/* Streak Counter */}
                <StreakCounter streak={userStreak} size="compact" />
                <div className="flex items-center gap-3 pl-3 border-l border-gray-300">
                  <span className="text-gray-600 text-sm font-medium">
                    {user?.email?.split('@')[0] || 'User'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline text-sm"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="btn btn-outline text-sm"
                  aria-label="Login"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-accent text-sm"
                  aria-label="Register"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                isMenuOpen ? 'rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-500'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Auth Section */}
              {isAuthenticated ? (
                <>
                  {/* Streak Counter */}
                  <div className="px-4 py-3">
                    <StreakCounter streak={userStreak} size="compact" />
                  </div>
                  <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
                    <span className="text-gray-600 text-sm font-medium px-4">
                      {user?.email?.split('@')[0] || 'User'}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline w-full"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
                  <Link
                    to="/login"
                    onClick={handleLinkClick}
                    className="btn btn-outline w-full text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={handleLinkClick}
                    className="btn btn-accent w-full text-center"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

