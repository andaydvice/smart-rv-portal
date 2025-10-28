import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import '@/styles/affiliate/brentwood-home.css';

export type BrentwoodButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'luxury';
export type BrentwoodButtonSize = 'small' | 'medium' | 'large';

export interface BrentwoodButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BrentwoodButtonVariant;
  size?: BrentwoodButtonSize;
  children: React.ReactNode;
  href?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  asChild?: boolean;
}

/**
 * BrentwoodButton - Elegant CTA component for Brentwood Home affiliate pages
 *
 * Variants:
 * - Primary: Blue background for main CTAs (sleep focus)
 * - Secondary: Purple outline for secondary actions (luxury feel)
 * - Tertiary: Text link with gold accent
 * - Luxury: Gold gradient for premium CTAs
 *
 * Features:
 * - WCAG 2.1 AA compliant
 * - 44x44px minimum touch target
 * - Smooth hover animations
 * - Loading states
 * - Icon support
 */
export const BrentwoodButton: React.FC<BrentwoodButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  href,
  loading = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className,
  disabled,
  asChild = false,
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    small: 'px-4 py-2 text-sm min-h-[44px]',
    medium: 'px-6 py-3 text-base min-h-[44px]',
    large: 'px-8 py-4 text-lg min-h-[48px]',
  };

  // Variant classes
  const variantClasses = {
    primary: cn(
      'bg-[var(--brentwood-primary-blue)] text-white font-semibold',
      'shadow-md hover:shadow-lg',
      'hover:bg-[var(--brentwood-primary-blue-dark)]',
      'active:scale-[0.98]',
      'transition-all duration-300',
      'border-2 border-transparent',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brentwood-primary-blue)] focus-visible:ring-offset-2'
    ),
    secondary: cn(
      'bg-transparent text-[var(--brentwood-secondary-purple)] font-semibold',
      'border-2 border-[var(--brentwood-secondary-purple)]',
      'hover:bg-[var(--brentwood-secondary-purple)] hover:text-white',
      'active:scale-[0.98]',
      'transition-all duration-300',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brentwood-secondary-purple)] focus-visible:ring-offset-2'
    ),
    tertiary: cn(
      'bg-transparent text-[var(--brentwood-accent-gold)] font-semibold',
      'underline underline-offset-4',
      'hover:text-[var(--brentwood-accent-gold-dark)]',
      'hover:underline-offset-8',
      'transition-all duration-300',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brentwood-accent-gold)] focus-visible:ring-offset-2',
      'shadow-none hover:shadow-none'
    ),
    luxury: cn(
      'bg-gradient-to-r from-[var(--brentwood-accent-gold)] to-[var(--brentwood-accent-gold-light)] text-white font-bold',
      'shadow-lg hover:shadow-xl',
      'hover:from-[var(--brentwood-accent-gold-dark)] hover:to-[var(--brentwood-accent-gold)]',
      'active:scale-[0.98]',
      'transition-all duration-300',
      'border-2 border-transparent',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brentwood-accent-gold)] focus-visible:ring-offset-2'
    ),
  };

  const buttonClasses = cn(
    'brentwood-button-base',
    'inline-flex items-center justify-center gap-2',
    'rounded-lg font-body',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && 'w-full',
    className
  );

  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && icon}
    </>
  );

  // If href is provided, render as link
  if (href && !disabled && !loading) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        whileHover={{ scale: variant !== 'tertiary' ? 1.02 : 1 }}
        whileTap={{ scale: variant !== 'tertiary' ? 0.98 : 1 }}
        aria-disabled={disabled}
      >
        {content}
      </motion.a>
    );
  }

  // Otherwise render as button
  return (
    <motion.button
      className={buttonClasses}
      disabled={disabled || loading}
      whileHover={{ scale: variant !== 'tertiary' ? 1.02 : 1 }}
      whileTap={{ scale: variant !== 'tertiary' ? 0.98 : 1 }}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
};

/**
 * Preset button configurations for common use cases
 */
export const BrentwoodPrimaryCTA: React.FC<Omit<BrentwoodButtonProps, 'variant'>> = (props) => (
  <BrentwoodButton variant="primary" size="large" {...props} />
);

export const BrentwoodSecondaryCTA: React.FC<Omit<BrentwoodButtonProps, 'variant'>> = (props) => (
  <BrentwoodButton variant="secondary" size="medium" {...props} />
);

export const BrentwoodLuxuryCTA: React.FC<Omit<BrentwoodButtonProps, 'variant'>> = (props) => (
  <BrentwoodButton variant="luxury" size="large" {...props} />
);

export const BrentwoodTextLink: React.FC<Omit<BrentwoodButtonProps, 'variant'>> = (props) => (
  <BrentwoodButton variant="tertiary" size="medium" {...props} />
);

// Export default
export default BrentwoodButton;
