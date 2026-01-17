import { useState, useEffect } from 'react';
import { FaKeyboard } from 'react-icons/fa';

/**
 * Keyboard shortcuts help modal for accessibility
 */
const KeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Press ? to toggle shortcuts
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        setIsOpen((prev) => !prev);
      }
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 btn-icon bg-primary-600 text-white"
        aria-label="Show keyboard shortcuts (press ?)"
        title="Keyboard Shortcuts (?)"
      >
        <FaKeyboard className="text-2xl" aria-hidden="true" />
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl w-full bg-white rounded-2xl shadow-2xl z-50 p-8 overflow-y-auto max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="shortcuts-title" className="text-3xl font-bold text-text-primary">
            ⌨️ Keyboard Shortcuts
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="btn-icon text-text-primary"
            aria-label="Close keyboard shortcuts"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <section>
            <h3 className="text-xl font-bold text-text-primary mb-3">Navigation</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-bg-secondary rounded-xl">
                <span className="text-lg">Go to Home</span>
                <kbd className="px-3 py-1 bg-primary-100 text-primary-800 rounded-lg font-mono font-bold">
                  H
                </kbd>
              </div>
              <div className="flex justify-between items-center p-3 bg-bg-secondary rounded-xl">
                <span className="text-lg">Go to Signs</span>
                <kbd className="px-3 py-1 bg-primary-100 text-primary-800 rounded-lg font-mono font-bold">
                  S
                </kbd>
              </div>
              <div className="flex justify-between items-center p-3 bg-bg-secondary rounded-xl">
                <span className="text-lg">Go to Courses</span>
                <kbd className="px-3 py-1 bg-primary-100 text-primary-800 rounded-lg font-mono font-bold">
                  C
                </kbd>
              </div>
              <div className="flex justify-between items-center p-3 bg-bg-secondary rounded-xl">
                <span className="text-lg">Go to Dashboard</span>
                <kbd className="px-3 py-1 bg-primary-100 text-primary-800 rounded-lg font-mono font-bold">
                  D
                </kbd>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-text-primary mb-3">Video Controls</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-bg-secondary rounded-xl">
                <span className="text-lg">Play/Pause</span>
                <kbd className="px-3 py-1 bg-primary-100 text-primary-800 rounded-lg font-mono font-bold">
                  Space
                </kbd>
                <span className="text-sm text-text-light">or</span>
                <kbd className="px-3 py-1 bg-primary-100 text-primary-800 rounded-lg font-mono font-bold">
                  K
                </kbd>
              </div>
              <div className="flex justify-between items-center p-3 bg-bg-secondary rounded-xl">
                <span className="text-lg">Seek Backward 10s</span>
                <kbd className="px-3 py-1 bg-primary-100 text-primary-800 rounded-lg font-mono font-bold">
                  ←
                </kbd>
              </div>
              <div className="flex justify-between items-center p-3 bg-bg-secondary rounded-xl">
                <span className="text-lg">Seek Forward 10s</span>
                <kbd className="px-3 py-1 bg-primary-100 text-primary-800 rounded-lg font-mono font-bold">
                  →
                </kbd>
              </div>
              <div className="flex justify-between items-center p-3 bg-bg-secondary rounded-xl">
                <span className="text-lg">Volume Up</span>
                <kbd className="px-3 py-1 bg-primary-100 text-primary-800 rounded-lg font-mono font-bold">
                  ↑
                </kbd>
              </div>
              <div className="flex justify-between items-center p-3 bg-bg-secondary rounded-xl">
                <span className="text-lg">Volume Down</span>
                <kbd className="px-3 py-1 bg-primary-100 text-primary-800 rounded-lg font-mono font-bold">
                  ↓
                </kbd>
              </div>
              <div className="flex justify-between items-center p-3 bg-bg-secondary rounded-xl">
                <span className="text-lg">Toggle Mute</span>
                <kbd className="px-3 py-1 bg-primary-100 text-primary-800 rounded-lg font-mono font-bold">
                  M
                </kbd>
              </div>
              <div className="flex justify-between items-center p-3 bg-bg-secondary rounded-xl">
                <span className="text-lg">Toggle Fullscreen</span>
                <kbd className="px-3 py-1 bg-primary-100 text-primary-800 rounded-lg font-mono font-bold">
                  F
                </kbd>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-text-primary mb-3">General</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-bg-secondary rounded-xl">
                <span className="text-lg">Show this help</span>
                <kbd className="px-3 py-1 bg-primary-100 text-primary-800 rounded-lg font-mono font-bold">
                  ?
                </kbd>
              </div>
              <div className="flex justify-between items-center p-3 bg-bg-secondary rounded-xl">
                <span className="text-lg">Close modal/menu</span>
                <kbd className="px-3 py-1 bg-primary-100 text-primary-800 rounded-lg font-mono font-bold">
                  Esc
                </kbd>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default KeyboardShortcuts;

