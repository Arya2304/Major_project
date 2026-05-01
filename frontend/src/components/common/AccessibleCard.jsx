import React, { forwardRef } from 'react';

/**
 * AccessibleCard Component — Phase 2
 * Reusable card component with hover effects, keyboard support, and accessibility
 * - Hover state: subtle lift (translateY) + shadow increase
 * - Visible focus ring for keyboard navigation
 * - Click affordance (cursor-pointer when onClick provided)
 * - Works in both light (public) and dark (dashboard) modes
 * - Optional icon, title, description
 */
const AccessibleCard = forwardRef(
  (
    {
      children,
      onClick,
      title,
      description,
      icon,
      variant = 'light',
      className = '',
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      role = 'article',
      ...props
    },
    ref
  ) => {
    // Variant styles using Phase 1 tokens
    const variantClasses = {
      light: 'card card-hover',
      dark: 'card-dark hover:shadow-lg hover:border-dark-border transition-all duration-200',
      interactive: 'card card-hover cursor-pointer',
      isl: 'card-isl card-hover',
      asl: 'card-asl card-hover',
      bsl: 'card-bsl card-hover',
    };

    const baseClasses = `
      ${variantClasses[variant] || variantClasses.light}
      ${onClick || props.onClick ? 'cursor-pointer' : ''}
      ${className}
    `
      .trim()
      .replace(/\s+/g, ' ');

    // Icon element
    const iconElement = icon && (
      <div className="text-3xl md:text-4xl" aria-hidden="true">
        {icon}
      </div>
    );

    // Keyboard handler for interactive cards
    const handleKeyDown = (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && onClick) {
        e.preventDefault();
        onClick(e);
      }
    };

    // Card content wrapper
    const cardContent = (
      <>
        {iconElement && (
          <div className="flex justify-center mb-4">
            {iconElement}
          </div>
        )}
        {title && (
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 font-display">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </>
    );

    // Interactive card (clickable)
    if (onClick) {
      return (
        <div
          ref={ref}
          className={baseClasses}
          onClick={onClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label={ariaLabel || title}
          aria-describedby={ariaDescribedBy}
          {...props}
        >
          {cardContent}
        </div>
      );
    }

    // Static card (non-interactive)
    return (
      <div
        ref={ref}
        className={baseClasses}
        role={role}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        {...props}
      >
        {cardContent}
      </div>
    );
  }
);

AccessibleCard.displayName = 'AccessibleCard';

export default AccessibleCard;

