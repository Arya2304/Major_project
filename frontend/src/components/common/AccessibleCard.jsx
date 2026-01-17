import { forwardRef } from 'react';

/**
 * Accessible card component with:
 * - High contrast borders
 * - Clear focus states
 * - ARIA support
 * - Keyboard navigation
 */
const AccessibleCard = forwardRef(
  (
    {
      children,
      onClick,
      href,
      className = '',
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      role = 'article',
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      card
      ${onClick || href ? 'cursor-pointer' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    const handleKeyDown = (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && (onClick || href)) {
        e.preventDefault();
        if (onClick) onClick(e);
        if (href) window.location.href = href;
      }
    };

    if (href) {
      return (
        <a
          ref={ref}
          href={href}
          className={baseClasses}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </a>
      );
    }

    if (onClick) {
      return (
        <div
          ref={ref}
          className={baseClasses}
          onClick={onClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={baseClasses}
        role={role}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AccessibleCard.displayName = 'AccessibleCard';

export default AccessibleCard;

