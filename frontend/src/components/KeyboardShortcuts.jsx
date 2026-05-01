import React, { useEffect } from 'react';
import './KeyboardShortcuts.css';

/**
 * KeyboardShortcuts.jsx — Phase 5
 * Keyboard shortcuts overlay modal
 * Triggered by pressing "?" key or clicking a button
 * Full-screen overlay with organized shortcut list
 */

const KeyboardShortcuts = ({ isOpen = false, onClose = () => {} }) => {
  /**
   * Close on Escape key
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  /**
   * Trap focus inside modal when open
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      const modal = document.querySelector('.shortcuts-modal');
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);
    return () => window.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="shortcuts-overlay" onClick={onClose} role="presentation">
      {/* Modal Container */}
      <div className="shortcuts-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="shortcuts-title">
        {/* Header */}
        <div className="shortcuts-header">
          <h1 id="shortcuts-title" className="text-2xl font-black text-gray-900">
            ⌨️ Keyboard Shortcuts
          </h1>
          <button
            onClick={onClose}
            className="close-button"
            aria-label="Close shortcuts modal"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="shortcuts-content">
          <div className="shortcuts-grid">
            {/* Video Controls Section */}
            <div className="shortcut-section">
              <h2 className="section-title">🎬 Video Controls</h2>
              <div className="shortcuts-list">
                <div className="shortcut-row">
                  <kbd className="shortcut-key">Space</kbd>
                  <span className="shortcut-description">Play / Pause</span>
                </div>
                <div className="shortcut-row">
                  <kbd className="shortcut-key">→</kbd>
                  <span className="shortcut-description">Skip 5s forward</span>
                </div>
                <div className="shortcut-row">
                  <kbd className="shortcut-key">←</kbd>
                  <span className="shortcut-description">Skip 5s back</span>
                </div>
                <div className="shortcut-row">
                  <kbd className="shortcut-key">M</kbd>
                  <span className="shortcut-description">Mute / Unmute</span>
                </div>
                <div className="shortcut-row">
                  <kbd className="shortcut-key">F</kbd>
                  <span className="shortcut-description">Fullscreen</span>
                </div>
                <div className="shortcut-row">
                  <kbd className="shortcut-key">C</kbd>
                  <span className="shortcut-description">Toggle Captions</span>
                </div>
              </div>
            </div>

            {/* Practice Mode Section */}
            <div className="shortcut-section">
              <h2 className="section-title">🤟 Practice Mode</h2>
              <div className="shortcuts-list">
                <div className="shortcut-row">
                  <kbd className="shortcut-key">R</kbd>
                  <span className="shortcut-description">Replay current sign</span>
                </div>
                <div className="shortcut-row">
                  <kbd className="shortcut-key">S</kbd>
                  <span className="shortcut-description">Slow motion toggle (0.5x)</span>
                </div>
                <div className="shortcut-row">
                  <kbd className="shortcut-key">N</kbd>
                  <span className="shortcut-description">Next lesson</span>
                </div>
                <div className="shortcut-row">
                  <kbd className="shortcut-key">P</kbd>
                  <span className="shortcut-description">Previous lesson</span>
                </div>
              </div>
            </div>

            {/* General Section */}
            <div className="shortcut-section">
              <h2 className="section-title">⚙️ General</h2>
              <div className="shortcuts-list">
                <div className="shortcut-row">
                  <kbd className="shortcut-key">?</kbd>
                  <span className="shortcut-description">Show / Hide shortcuts</span>
                </div>
                <div className="shortcut-row">
                  <kbd className="shortcut-key">Escape</kbd>
                  <span className="shortcut-description">Close modal / Go back</span>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="shortcut-section">
              <h2 className="section-title">💡 Tips</h2>
              <div className="shortcuts-list">
                <div className="shortcut-row">
                  <span className="shortcut-key">Focus</span>
                  <span className="shortcut-description">Click on any element to focus it</span>
                </div>
                <div className="shortcut-row">
                  <span className="shortcut-key">Tab</span>
                  <span className="shortcut-description">Navigate between interactive elements</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shortcuts-footer">
          <p className="text-sm text-gray-600">Press <kbd className="inline-kbd">Escape</kbd> or click outside to close</p>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcuts;
