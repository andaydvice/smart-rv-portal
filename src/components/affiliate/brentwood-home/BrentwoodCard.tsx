import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BrentwoodButton, BrentwoodButtonProps } from './BrentwoodButton';
import '@/styles/affiliate/brentwood-home.css';

export interface BrentwoodCardProps {
  icon?: React.ReactNode;
  iconBgColor?: string;
  headline: string;
  body: string | React.ReactNode;
  cta?: {
    text: string;
    onClick?: () => void;
    href?: string;
    variant?: BrentwoodButtonProps['variant'];
  };
  className?: string;
  variant?: 'default' | 'highlighted' | 'luxury';
  hover?: boolean;
  delay?: number;
  badge?: string;
}

/**
 * BrentwoodCard - Elegant card component for mattress content
 *
 * Features:
 * - Icon + Headline + Body + Optional CTA structure
 * - Soft white background with warm shadows
 * - Hover lift effect
 * - Customizable icon background colors
 * - Animated entrance with delay support
 * - Luxury variant for premium features
 *
 * Accessibility:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Focus-visible states
 */
export const BrentwoodCard: React.FC<BrentwoodCardProps> = ({
  icon,
  iconBgColor = 'var(--brentwood-primary-blue)',
  headline,
  body,
  cta,
  className,
  variant = 'default',
  hover = true,
  delay = 0,
  badge,
}) => {
  const cardClasses = cn(
    'brentwood-card-base relative',
    'p-6 md:p-8',
    'border border-transparent',
    hover && 'brentwood-lift-hover cursor-pointer',
    variant === 'highlighted' && 'border-[var(--brentwood-accent-gold)] border-2 ring-2 ring-[var(--brentwood-accent-gold)] ring-opacity-20',
    variant === 'luxury' && 'bg-gradient-to-br from-white to-[var(--brentwood-soft-bg)] border-[var(--brentwood-secondary-purple)] border-2',
    className
  );

  return (
    <motion.div
      className={cardClasses}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-3 right-4">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-[var(--brentwood-accent-gold)] text-white shadow-md">
            {badge}
          </span>
        </div>
      )}

      {/* Icon Section */}
      {icon && (
        <div className="mb-4 md:mb-6">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-lg"
            style={{
              backgroundColor: `${iconBgColor}15`,
              color: iconBgColor,
            }}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              {icon}
            </div>
          </div>
        </div>
      )}

      {/* Headline */}
      <h3 className="brentwood-headline-tertiary mb-3 md:mb-4">
        {headline}
      </h3>

      {/* Body Content */}
      <div className="brentwood-body-base mb-6 text-[var(--brentwood-text-secondary)]">
        {typeof body === 'string' ? <p>{body}</p> : body}
      </div>

      {/* CTA Button */}
      {cta && (
        <div className="mt-auto pt-4">
          <BrentwoodButton
            variant={cta.variant || 'secondary'}
            size="medium"
            onClick={cta.onClick}
            href={cta.href}
            className="w-full sm:w-auto"
          >
            {cta.text}
          </BrentwoodButton>
        </div>
      )}

      {/* Highlighted Badge */}
      {variant === 'highlighted' && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-[var(--brentwood-accent-gold)] text-white shadow-md">
            Most Popular
          </span>
        </div>
      )}
    </motion.div>
  );
};

/**
 * BrentwoodCardGrid - Grid layout for multiple cards
 */
export interface BrentwoodCardGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'small' | 'medium' | 'large';
  className?: string;
}

export const BrentwoodCardGrid: React.FC<BrentwoodCardGridProps> = ({
  children,
  columns = 3,
  gap = 'medium',
  className,
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    small: 'gap-4',
    medium: 'gap-6',
    large: 'gap-8',
  };

  return (
    <div
      className={cn(
        'grid',
        columnClasses[columns],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * BrentwoodIconCard - Simplified icon card for features
 */
export interface BrentwoodIconCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor?: string;
  className?: string;
  delay?: number;
}

export const BrentwoodIconCard: React.FC<BrentwoodIconCardProps> = ({
  icon,
  title,
  description,
  iconColor = 'var(--brentwood-primary-blue)',
  className,
  delay = 0,
}) => {
  return (
    <motion.div
      className={cn(
        'flex flex-col items-center text-center p-6',
        'transition-transform duration-300 hover:scale-105',
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {/* Icon */}
      <div
        className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full"
        style={{
          backgroundColor: `${iconColor}15`,
          color: iconColor,
        }}
      >
        <div className="w-8 h-8 flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h4 className="text-xl font-semibold mb-2 text-[var(--brentwood-text-primary)] font-headline">
        {title}
      </h4>

      {/* Description */}
      <p className="brentwood-body-base text-[var(--brentwood-text-secondary)]">
        {description}
      </p>
    </motion.div>
  );
};

// Export all components
export default BrentwoodCard;
