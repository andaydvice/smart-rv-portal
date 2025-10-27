import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RVLifeButton, RVLifeButtonProps } from './RVLifeButton';
import '@/styles/affiliate/rv-life-pro.css';

export interface RVLifeCardProps {
  icon?: React.ReactNode;
  iconBgColor?: string;
  headline: string;
  body: string | React.ReactNode;
  cta?: {
    text: string;
    onClick?: () => void;
    href?: string;
    variant?: RVLifeButtonProps['variant'];
  };
  className?: string;
  variant?: 'default' | 'highlighted';
  hover?: boolean;
  delay?: number;
}

/**
 * RVLifeCard - Versatile card component for RV Life Pro content
 *
 * Features:
 * - Icon + Headline + Body + Optional CTA structure
 * - White background with subtle shadow
 * - Hover lift effect
 * - Customizable icon background colors
 * - Animated entrance with delay support
 * - Highlighted variant for featured content
 *
 * Accessibility:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Focus-visible states
 */
export const RVLifeCard: React.FC<RVLifeCardProps> = ({
  icon,
  iconBgColor = 'var(--rv-life-primary-blue)',
  headline,
  body,
  cta,
  className,
  variant = 'default',
  hover = true,
  delay = 0,
}) => {
  const cardClasses = cn(
    'rv-card-base',
    'p-6 md:p-8',
    'border border-transparent',
    hover && 'rv-lift-hover cursor-pointer',
    variant === 'highlighted' && 'border-[var(--rv-life-accent-orange)] border-2 ring-2 ring-[var(--rv-life-accent-orange)] ring-opacity-20',
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
      <h3 className="rv-headline-tertiary mb-3 md:mb-4">
        {headline}
      </h3>

      {/* Body Content */}
      <div className="rv-body-base mb-6 text-[var(--rv-text-secondary)]">
        {typeof body === 'string' ? <p>{body}</p> : body}
      </div>

      {/* CTA Button */}
      {cta && (
        <div className="mt-auto pt-4">
          <RVLifeButton
            variant={cta.variant || 'secondary'}
            size="medium"
            onClick={cta.onClick}
            href={cta.href}
            className="w-full sm:w-auto"
          >
            {cta.text}
          </RVLifeButton>
        </div>
      )}

      {/* Highlighted Badge */}
      {variant === 'highlighted' && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-[var(--rv-life-accent-orange)] text-white shadow-md">
            Featured
          </span>
        </div>
      )}
    </motion.div>
  );
};

/**
 * RVLifeCardGrid - Grid layout for multiple cards
 */
export interface RVLifeCardGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'small' | 'medium' | 'large';
  className?: string;
}

export const RVLifeCardGrid: React.FC<RVLifeCardGridProps> = ({
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
 * RVLifeIconCard - Simplified icon card for features
 */
export interface RVLifeIconCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor?: string;
  className?: string;
  delay?: number;
}

export const RVLifeIconCard: React.FC<RVLifeIconCardProps> = ({
  icon,
  title,
  description,
  iconColor = 'var(--rv-life-primary-blue)',
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
      <h4 className="text-xl font-semibold mb-2 text-[var(--rv-text-primary)]">
        {title}
      </h4>

      {/* Description */}
      <p className="rv-body-base text-[var(--rv-text-secondary)]">
        {description}
      </p>
    </motion.div>
  );
};

/**
 * RVLifeStatCard - Card for displaying statistics
 */
export interface RVLifeStatCardProps {
  stat: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
  delay?: number;
}

export const RVLifeStatCard: React.FC<RVLifeStatCardProps> = ({
  stat,
  label,
  icon,
  trend,
  className,
  delay = 0,
}) => {
  return (
    <motion.div
      className={cn(
        'rv-card-base p-6 text-center',
        'rv-lift-hover',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {/* Icon */}
      {icon && (
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 flex items-center justify-center text-[var(--rv-life-primary-blue)]">
            {icon}
          </div>
        </div>
      )}

      {/* Stat */}
      <div className="rv-accent-stat mb-2">
        {stat}
      </div>

      {/* Label */}
      <div className="rv-accent-label text-[var(--rv-text-secondary)]">
        {label}
      </div>

      {/* Trend */}
      {trend && (
        <div className={cn(
          'mt-3 text-sm font-semibold',
          trend.positive ? 'text-[var(--rv-life-secondary-green)]' : 'text-[var(--rv-life-warning-red)]'
        )}>
          <span className="inline-flex items-center gap-1">
            {trend.positive ? '↑' : '↓'}
            {Math.abs(trend.value)}%
          </span>
        </div>
      )}
    </motion.div>
  );
};

// Export all components
export default RVLifeCard;
