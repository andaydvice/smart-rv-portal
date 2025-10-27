import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import '@/styles/affiliate/brentwood-home.css';

export interface BrentwoodStatCardProps {
  stat: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  description?: string;
  className?: string;
  delay?: number;
  variant?: 'default' | 'highlighted';
}

/**
 * BrentwoodStatCard - Display statistics and metrics
 *
 * Features:
 * - Large stat display
 * - Icon support
 * - Trend indicators
 * - Description text
 * - Animated entrance
 * - Elegant design
 */
export const BrentwoodStatCard: React.FC<BrentwoodStatCardProps> = ({
  stat,
  label,
  icon,
  trend,
  description,
  className,
  delay = 0,
  variant = 'default',
}) => {
  return (
    <motion.div
      className={cn(
        'brentwood-card-base p-6 text-center',
        'brentwood-lift-hover',
        variant === 'highlighted' &&
          'bg-gradient-to-br from-white to-[var(--brentwood-soft-bg)] border-2 border-[var(--brentwood-accent-gold)]',
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
          <div className="w-12 h-12 flex items-center justify-center text-[var(--brentwood-primary-blue)]">
            {icon}
          </div>
        </div>
      )}

      {/* Stat */}
      <div className="brentwood-accent-stat mb-2">{stat}</div>

      {/* Label */}
      <div className="brentwood-accent-label text-[var(--brentwood-text-secondary)] mb-2">
        {label}
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-[var(--brentwood-text-muted)] mt-2">{description}</p>
      )}

      {/* Trend */}
      {trend && (
        <div
          className={cn(
            'mt-3 text-sm font-semibold',
            trend.positive
              ? 'text-[var(--brentwood-success-green)]'
              : 'text-[var(--brentwood-warning-red)]'
          )}
        >
          <span className="inline-flex items-center gap-1">
            {trend.positive ? '↑' : '↓'}
            {Math.abs(trend.value)}%
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default BrentwoodStatCard;
