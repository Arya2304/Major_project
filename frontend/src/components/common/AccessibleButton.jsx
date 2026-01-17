import { forwardRef } from 'react';

/**
 * Highly accessible button component with:
 * - Large touch targets (minimum 56x56px)
 * - High contrast colors
 * - Clear focus indicators
 * - ARIA attributes
 * - Keyboard support
 */
const AccessibleButton = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'default',
      icon,
      iconPosition = 'left',
      className = '',
      disabled = false,
      loading = false,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      inline-flex items-center justify-center gap-3
      font-bold text-lg
      rounded-xl
      transition-all duration-200
      focus-visible:ring-4 focus-visible:ring-primary-300 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      min-h-[56px] min-w-[56px]
    `;

    const variantClasses = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
      secondary: 'bg-bg-accent text-text-primary border-2 border-primary-600 hover:bg-primary-50',
      danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
      ghost: 'bg-transparent text-text-primary hover:bg-bg-accent',
    };

    const sizeClasses = {
      default: 'px-6 py-3',
      large: 'px-8 py-4 text-xl',
      small: 'px-4 py-2 text-base',
      icon: 'p-4',
    };

    const classes = `
      ${baseClasses}
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    const iconElement = icon && (
      <span className="text-2xl" aria-hidden="true">
        {icon}
      </span>
    );

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="animate-spin" aria-hidden="true">⏳</span>
            <span className="sr-only">Loading</span>
          </>
        ) : (
          <>
            {iconPosition === 'left' && iconElement}
            {children}
            {iconPosition === 'right' && iconElement}
          </>
        )}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;

