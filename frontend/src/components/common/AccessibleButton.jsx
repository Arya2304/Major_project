import React, { forwardRef } from 'react';
import Loader from './Loader';

/**
 * AccessibleButton Component — Phase 2
 * Fully accessible, keyboard-focusable button with multiple variants and states
 * - Variants: primary (indigo), accent (saffron), outline, ghost, danger
 * - Size variants: sm, md, lg, icon
 * - Loading state with spinner inside
 * - Disabled state with proper ARIA attributes
 * - Visible focus ring for keyboard navigation
 * - Full ARIA support (aria-label, aria-disabled, aria-busy, etc.)
 */
const AccessibleButton = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      className = '',
      disabled = false,
      isLoading = false,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Base button styles (all variants share these)
    const baseClasses = `
      inline-flex items-center justify-center gap-2
      font-semibold transition-all duration-200
      focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-95
    `;

    // Variant styles using Phase 1 tokens
    const variantClasses = {
      primary: 'btn-primary',
      accent: 'btn-accent',
      outline: 'btn-outline',
      'outline-accent': 'btn-outline-accent',
      ghost: 'btn-ghost',
      danger: 'btn-danger',
    };

    // Size variants
    const sizeClasses = {
      sm: 'btn-sm text-sm',
      md: 'btn text-base',
      lg: 'btn-lg text-lg',
      icon: 'btn-icon',
    };

    // Combine all classes
    const buttonClasses = `
      ${baseClasses}
      ${variantClasses[variant] || variantClasses.primary}
      ${sizeClasses[size] || sizeClasses.md}
      ${className}
    `
      .trim()
      .replace(/\s+/g, ' ');

    // Icon element
    const iconElement =
      icon && typeof icon === 'string' ? (
        <span className="text-lg md:text-xl" aria-hidden="true">
          {icon}
        </span>
      ) : (
        icon
      );

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || isLoading}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="animate-spin">
              <span aria-hidden="true">⟳</span>
            </div>
            {size !== 'icon' && children && (
              <span className="sr-only">{children} Loading...</span>
            )}
          </>
        ) : (
          <>
            {iconPosition === 'left' && iconElement}
            {children && <span>{children}</span>}
            {iconPosition === 'right' && iconElement}
          </>
        )}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;

