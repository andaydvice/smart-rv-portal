import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Shield, Star, Award, TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';
import '@/styles/affiliate/brentwood-home.css';

export interface TrustBadgeProps {
  icon?: React.ReactNode;
  text: string;
  variant?: 'rating' | 'guarantee' | 'social-proof' | 'award' | 'certification' | 'time';
  delay?: number;
}

/**
 * TrustBadges - Display trust signals WITHOUT fake testimonials
 *
 * Features:
 * - Multiple badge variants
 * - Icon support
 * - Animated entrance
 * - Flexible layouts
 * - Honest trust signals only
 *
 * CRITICAL: Never use for fabricated claims
 */
export const TrustBadges: React.FC<{
  badges: Array<Omit<TrustBadgeProps, 'delay'>>;
  layout?: 'horizontal' | 'stacked' | 'grid';
  className?: string;
}> = ({ badges, layout = 'horizontal', className }) => {
  const defaultIcons = {
    rating: <Star className="w-5 h-5" />,
    guarantee: <Shield className="w-5 h-5" />,
    'social-proof': <Users className="w-5 h-5" />,
    award: <Award className="w-5 h-5" />,
    certification: <CheckCircle className="w-5 h-5" />,
    time: <Clock className="w-5 h-5" />,
  };

  const layoutClasses = {
    horizontal: 'flex flex-wrap gap-4 justify-center items-center',
    stacked: 'flex flex-col gap-3',
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
  };

  return (
    <div className={cn(layoutClasses[layout], className)}>
      {badges.map((badge, index) => (
        <TrustBadge
          key={index}
          {...badge}
          icon={badge.icon || (badge.variant && defaultIcons[badge.variant])}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};

/**
 * Individual Trust Badge
 */
export const TrustBadge: React.FC<TrustBadgeProps> = ({
  icon,
  text,
  variant = 'certification',
  delay = 0,
}) => {
  const variantClasses = {
    rating: 'bg-[var(--brentwood-accent-gold)]/10 text-[var(--brentwood-accent-gold)] border-[var(--brentwood-accent-gold)]/20',
    guarantee: 'bg-[var(--brentwood-success-green)]/10 text-[var(--brentwood-success-green)] border-[var(--brentwood-success-green)]/20',
    'social-proof': 'bg-[var(--brentwood-primary-blue)]/10 text-[var(--brentwood-primary-blue)] border-[var(--brentwood-primary-blue)]/20',
    award: 'bg-[var(--brentwood-secondary-purple)]/10 text-[var(--brentwood-secondary-purple)] border-[var(--brentwood-secondary-purple)]/20',
    certification: 'bg-[var(--brentwood-success-green)]/10 text-[var(--brentwood-success-green)] border-[var(--brentwood-success-green)]/20',
    time: 'bg-[var(--brentwood-primary-blue)]/10 text-[var(--brentwood-primary-blue)] border-[var(--brentwood-primary-blue)]/20',
  };

  return (
    <motion.div
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 font-medium text-sm',
        variantClasses[variant]
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay: delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{text}</span>
    </motion.div>
  );
};

export default TrustBadges;
