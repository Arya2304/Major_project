import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import KeyboardShortcuts from './KeyboardShortcuts';
import { FaHandPeace, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

/**
 * Footer Component — Phase 2
 * Clean, minimal light-mode footer with navigation, social links, and language info
 * Uses Phase 1 design tokens: light background, indigo accents
 * Phase 5: Added keyboard shortcuts modal integration
 */
const Footer = () => {
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Signs', path: '/signs' },
    { label: 'Courses', path: '/courses' },
    { label: 'About', path: '/about' },
  ];

  const supportLinks = [
    { label: 'Help Center', path: '/help' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Contact', path: '/contact' },
  ];

  // Social media links with accessible labels
  const socialLinks = [
    { icon: <FaFacebook />, label: 'Facebook', url: 'https://facebook.com/signlearn' },
    { icon: <FaTwitter />, label: 'Twitter', url: 'https://twitter.com/signlearn' },
    { icon: <FaInstagram />, label: 'Instagram', url: 'https://instagram.com/signlearn' },
    { icon: <FaYoutube />, label: 'YouTube', url: 'https://youtube.com/signlearn' },
  ];

  // Supported sign languages from Phase 1
  const languages = [
    { code: 'ISL', name: 'Indian Sign Language', flag: '🇮🇳' },
    { code: 'ASL', name: 'American Sign Language', flag: '🇺🇸' },
    { code: 'BSL', name: 'British Sign Language', flag: '🇬🇧' },
  ];

  return (
    <footer
      className="bg-white border-t border-gray-200 mt-16 py-12 md:py-16"
      role="contentinfo"
    >
      <div className="page-container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors mb-4"
              aria-label="SignLearn home"
            >
              <span className="text-2xl">
                <FaHandPeace />
              </span>
              <span className="font-display">SignLearn</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Learning Indian Sign Language, American Sign Language, and British Sign Language through interactive video lessons and community support.
            </p>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} SignLearn. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 rounded px-2 py-1 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 rounded px-2 py-1 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Languages */}
          <div>
            <div className="mb-8">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                Connect
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-600 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500"
                    aria-label={`Visit us on ${social.label}`}
                    title={social.label}
                  >
                    <span className="text-lg">
                      {typeof social.icon === 'string' ? social.icon : social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span
                    key={lang.code}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                      lang.code === 'ISL'
                        ? 'lang-badge-isl'
                        : lang.code === 'ASL'
                        ? 'lang-badge-asl'
                        : 'lang-badge-bsl'
                    }`}
                    title={lang.name}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.code}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            Empowering deaf and hard-of-hearing communities through accessible sign language education.
          </p>
          <div className="flex items-center gap-4">
            {/* Keyboard Shortcuts Button */}
            <button
              onClick={() => setIsShortcutsOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-600 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 text-sm font-medium"
              aria-label="Show keyboard shortcuts (press ? key)"
              title="Keyboard shortcuts (press ?)"
            >
              <span>⌨️</span>
              <span>Shortcuts</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Supported in:</span>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <span key={lang.code} className="text-sm font-semibold text-gray-700">
                    {lang.flag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcuts 
        isOpen={isShortcutsOpen} 
        onClose={() => setIsShortcutsOpen(false)} 
      />
    </footer>
  );
};

export default Footer;

