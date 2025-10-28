import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import '@/styles/affiliate/rv-life-pro.css';

export type RVLifeButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline';
export type RVLifeButtonSize = 'small' | 'medium' | 'large';

export interface RVLifeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: RVLifeButtonVariant;
  size?: RVLifeButtonSize;
  children: React.ReactNode;
  href?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  asChild?: boolean;
}

/**
 * RVLifeButton - Primary CTA component for RV Life Pro affiliate pages
 *
 * Variants:
 * - Primary: Bold orange background for main CTAs
 * - Secondary: Outlined blue border for secondary actions
 * - Tertiary: Text link with underline for subtle actions
 *
 * Features:
 * - WCAG 2.1 AA compliant
 * - 44x44px minimum touch target
 * - Smooth hover animations
 * - Loading states
 * - Icon support
 */
export const RVLifeButton: React.FC<RVLifeButtonProps> = ({
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
      'bg-[var(--rv-life-accent-orange)] text-white font-semibold',
      'shadow-md hover:shadow-lg',
      'hover:bg-[var(--rv-life-accent-orange-hover)]',
      'active:scale-[0.98]',
      'transition-all duration-300',
      'border-2 border-transparent',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rv-life-accent-orange)] focus-visible:ring-offset-2'
    ),
    secondary: cn(
      'bg-transparent text-[var(--rv-life-primary-blue)] font-semibold',
      'border-2 border-[var(--rv-life-primary-blue)]',
      'hover:bg-[var(--rv-life-primary-blue)] hover:text-white',
      'active:scale-[0.98]',
      'transition-all duration-300',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rv-life-primary-blue)] focus-visible:ring-offset-2'
    ),
    tertiary: cn(
      'bg-transparent text-[var(--rv-life-primary-blue)] font-semibold',
      'underline underline-offset-4',
      'hover:text-[var(--rv-life-primary-blue-dark)]',
      'hover:underline-offset-8',
      'transition-all duration-300',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rv-life-primary-blue)] focus-visible:ring-offset-2',
      'shadow-none hover:shadow-none'
    ),
  };

  const buttonClasses = cn(
    'rv-button-base',
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
export const RVLifePrimaryCTA: React.FC<Omit<RVLifeButtonProps, 'variant'>> = (props) => (
  <RVLifeButton variant="primary" size="large" {...props} />
);

export const RVLifeSecondaryCTA: React.FC<Omit<RVLifeButtonProps, 'variant'>> = (props) => (
  <RVLifeButton variant="secondary" size="medium" {...props} />
);

export const RVLifeTextLink: React.FC<Omit<RVLifeButtonProps, 'variant'>> = (props) => (
  <RVLifeButton variant="tertiary" size="medium" {...props} />
);

// Export default
export default RVLifeButton;
