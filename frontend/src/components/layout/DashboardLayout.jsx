import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * DashboardLayout Component — Phase 2
 * Layout wrapper for authenticated/logged-in user pages
 * Features: collapsible sidebar, top bar with user info, dark theme
 * Uses Phase 1 design tokens: indigo primary, dark backgrounds
 */
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Check if route is active
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  // Sidebar navigation items
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/learn', label: 'Learn', icon: '📚' },
    { path: '/dictionary', label: 'Dictionary', icon: '📖' },
    { path: '/practice', label: 'Practice', icon: '✋' },
    { path: '/progress', label: 'Progress', icon: '📈' },
  ];

  const handleLogout = () => {
    logout();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-dark-bg">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-dark-card border-r border-dark-border transition-all duration-300 ease-in-out z-40 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-dark-border flex items-center justify-between">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded ${
              !sidebarOpen && 'w-full justify-center'
            }`}
            aria-label="SignLearn dashboard"
          >
            <span className="text-2xl">🤟</span>
            {sidebarOpen && <span className="font-display font-bold">SignLearn</span>}
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-dark-border hover:text-primary-300'
              } ${!sidebarOpen && 'justify-center px-3'}`}
              aria-current={isActive(item.path) ? 'page' : undefined}
              title={item.label}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-dark-border bg-dark-panel">
          <button
            onClick={handleLogout}
            className={`w-full btn btn-danger text-sm ${!sidebarOpen && 'btn-icon'}`}
            aria-label="Logout from dashboard"
            title="Logout"
          >
            {sidebarOpen ? 'Logout' : '🚪'}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-dark-card border-b border-dark-border shadow-md">
          <div className="px-6 md:px-8 py-4 flex items-center justify-between">
            {/* Left: Sidebar Toggle */}
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-300 hover:bg-dark-border rounded-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              aria-expanded={sidebarOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Right: User Info */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-100">
                  {user?.first_name || user?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-xs text-gray-400">{user?.email || 'user@example.com'}</p>
              </div>

              {/* User Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {(user?.first_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
