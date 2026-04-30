import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BottomNavbar from '../common/BottomNavbar';
import { FaHandSpock, FaSignOutAlt } from 'react-icons/fa';

/**
 * DashboardLayout Component
 * Layout wrapper for authenticated/logged-in user pages
 * Features: top bar with user info, mobile-first design with bottom navigation
 */
const DashboardLayout = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-secondary">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-md">
        <div className="px-6 md:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/learn"
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
            aria-label="SignLearn"
          >
            <span className="text-2xl text-primary-600">
              <FaHandSpock className="transform -scale-x-100" />
            </span>
            <span className="font-bold text-lg hidden sm:inline">SignLearn</span>
          </Link>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">
                {user?.first_name || user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
            </div>

            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {(user?.first_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors duration-200"
              aria-label="Logout from dashboard"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-4 md:p-6 pb-20">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNavbar />
    </div>
  );
};

export default DashboardLayout;
