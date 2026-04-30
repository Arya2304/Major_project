import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import BottomNavbar from '../common/BottomNavbar';

/**
 * PublicLayout Component — Phase 2
 * Wrapper for all non-authenticated pages (Home, Courses, About, etc.)
 * Structure: Navbar > Main Content > Footer
 * Features: skip link, semantic structure, light background
 */
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-bg-secondary">
      {/* Accessibility: Skip to main content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main
        id="main-content"
        className="flex-1 pb-20"
        role="main"
      >
        <Outlet />
      </main>

      {/* Bottom Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNavbar />
    </div>
  );
};

export default PublicLayout;
