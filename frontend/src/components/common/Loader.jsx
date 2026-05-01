import React from 'react';

/**
 * Loader Component — Phase 2
 * Branded animated spinner using saffron accent color
 * Variants: size (sm, md, lg) and optional label text
 */
const Loader = ({ size = 'md', label = 'Loading...', fullPage = false }) => {
  // Size configuration
  const sizeConfig = {
    sm: {
      spinner: 'w-8 h-8 border-3',
      text: 'text-sm',
      container: fullPage ? 'min-h-screen' : 'min-h-[120px]',
    },
    md: {
      spinner: 'w-12 h-12 border-4',
      text: 'text-base',
      container: fullPage ? 'min-h-screen' : 'min-h-[200px]',
    },
    lg: {
      spinner: 'w-16 h-16 border-4',
      text: 'text-lg',
      container: fullPage ? 'min-h-screen' : 'min-h-[300px]',
    },
  };

  const config = sizeConfig[size] || sizeConfig.md;

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 w-full ${config.container}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Spinner */}
      <div
        className={`${config.spinner} border-gray-200 border-t-accent-500 border-r-accent-500 rounded-full animate-spin`}
        aria-hidden="true"
      />

      {/* Label */}
      {label && (
        <p className={`${config.text} font-medium text-gray-600`}>
          {label}
        </p>
      )}

      {/* Accessibility: Hidden but readable by screen readers */}
      <span className="sr-only">Loading content, please wait...</span>
    </div>
  );
};

export default Loader;

