import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  ShieldCheck,
  RotateCcw,
  Lock,
  Star,
  Award,
  CheckCircle2,
  ThumbsUp,
  Users,
  Clock
} from 'lucide-react';
import '@/styles/affiliate/rv-life-pro.css';

export type TrustBadgeType =
  | 'moneyback'
  | 'secure'
  | 'rating'
  | 'verified'
  | 'award'
  | 'guarantee'
  | 'satisfaction'
  | 'users'
  | 'support';

export interface RVLifeTrustBadgeProps {
  type: TrustBadgeType;
  text?: string;
  subtext?: string;
  rating?: number;
  size?: 'small' | 'medium' | 'large';
  layout?: 'horizontal' | 'vertical';
  className?: string;
  delay?: number;
}

/**
 * RVLifeTrustBadge - Trust indicator component for affiliate pages
 *
 * Features:
 * - Multiple pre-configured badge types
 * - Small, professional design
 * - Perfect for near pricing and CTAs
 * - Customizable text and layout
 * - Smooth animations
 *
 * Types:
 * - moneyback: Money-back guarantee
 * - secure: Secure payment
 * - rating: Star ratings
 * - verified: Verified badge
 * - award: Award/certification
 * - guarantee: General guarantee
 * - satisfaction: Satisfaction guarantee
 * - users: User count
 * - support: 24/7 support
 */
export const RVLifeTrustBadge: React.FC<RVLifeTrustBadgeProps> = ({
  type,
  text,
  subtext,
  rating = 5,
  size = 'medium',
  layout = 'horizontal',
  className,
  delay = 0,
}) => {
  const badgeConfig = {
    moneyback: {
      icon: RotateCcw,
      defaultText: '30-Day Money Back',
      defaultSubtext: 'Guarantee',
      color: 'var(--rv-life-secondary-green)',
    },
    secure: {
      icon: Lock,
      defaultText: 'Secure Payment',
      defaultSubtext: '256-bit SSL Encryption',
      color: 'var(--rv-life-primary-blue)',
    },
    rating: {
      icon: Star,
      defaultText: `${rating}/5 Rating`,
      defaultSubtext: 'Based on 10,000+ reviews',
      color: 'var(--rv-life-accent-orange)',
    },
    verified: {
      icon: ShieldCheck,
      defaultText: 'Verified Product',
      defaultSubtext: 'Tested & Approved',
      color: 'var(--rv-life-secondary-green)',
    },
    award: {
      icon: Award,
      defaultText: 'Industry Award',
      defaultSubtext: 'Best RV Tool 2024',
      color: 'var(--rv-life-accent-orange)',
    },
    guarantee: {
      icon: CheckCircle2,
      defaultText: '100% Guarantee',
      defaultSubtext: 'Risk-free purchase',
      color: 'var(--rv-life-secondary-green)',
    },
    satisfaction: {
      icon: ThumbsUp,
      defaultText: 'Satisfaction Guaranteed',
      defaultSubtext: '98% Customer Satisfaction',
      color: 'var(--rv-life-secondary-green)',
    },
    users: {
      icon: Users,
      defaultText: '50,000+ RVers',
      defaultSubtext: 'Trust our recommendations',
      color: 'var(--rv-life-primary-blue)',
    },
    support: {
      icon: Clock,
      defaultText: '24/7 Support',
      defaultSubtext: 'Always here to help',
      color: 'var(--rv-life-primary-blue)',
    },
  };

  const config = badgeConfig[type];
  const Icon = config.icon;
  const displayText = text || config.defaultText;
  const displaySubtext = subtext || config.defaultSubtext;

  const sizeClasses = {
    small: {
      icon: 'w-4 h-4',
      text: 'text-xs',
      subtext: 'text-[10px]',
      padding: 'p-2',
      gap: 'gap-2',
    },
    medium: {
      icon: 'w-5 h-5',
      text: 'text-sm',
      subtext: 'text-xs',
      padding: 'p-3',
      gap: 'gap-3',
    },
    large: {
      icon: 'w-6 h-6',
      text: 'text-base',
      subtext: 'text-sm',
      padding: 'p-4',
      gap: 'gap-4',
    },
  };

  const sizes = sizeClasses[size];

  if (layout === 'vertical') {
    return (
      <motion.div
        className={cn(
          'inline-flex flex-col items-center text-center',
          sizes.padding,
          'bg-white rounded-lg shadow-sm border border-gray-100',
          'transition-all duration-300 hover:shadow-md',
          className
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
        <div
          className={cn('mb-2 flex items-center justify-center', sizes.icon)}
          style={{ color: config.color }}
        >
          <Icon className={sizes.icon} />
        </div>
        <div className={cn('font-semibold text-[var(--rv-text-primary)]', sizes.text)}>
          {displayText}
        </div>
        {displaySubtext && (
          <div className={cn('text-[var(--rv-text-muted)] mt-1', sizes.subtext)}>
            {displaySubtext}
          </div>
        )}
      </motion.div>
    );
  }

  // Horizontal layout
  return (
    <motion.div
      className={cn(
        'inline-flex items-center',
        sizes.gap,
        sizes.padding,
        'bg-white rounded-lg shadow-sm border border-gray-100',
        'transition-all duration-300 hover:shadow-md',
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay: delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <div
        className={cn('flex-shrink-0', sizes.icon)}
        style={{ color: config.color }}
      >
        <Icon className={sizes.icon} />
      </div>
      <div className="flex flex-col">
        <div className={cn('font-semibold text-[var(--rv-text-primary)]', sizes.text)}>
          {displayText}
        </div>
        {displaySubtext && (
          <div className={cn('text-[var(--rv-text-muted)]', sizes.subtext)}>
            {displaySubtext}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/**
 * RVLifeTrustBadgeGroup - Group multiple trust badges
 */
export interface RVLifeTrustBadgeGroupProps {
  badges: Array<Omit<RVLifeTrustBadgeProps, 'delay'>>;
  layout?: 'horizontal' | 'vertical' | 'grid';
  centered?: boolean;
  className?: string;
}

export const RVLifeTrustBadgeGroup: React.FC<RVLifeTrustBadgeGroupProps> = ({
  badges,
  layout = 'horizontal',
  centered = false,
  className,
}) => {
  const layoutClasses = {
    horizontal: 'flex flex-wrap gap-4',
    vertical: 'flex flex-col gap-4',
    grid: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
  };

  return (
    <div
      className={cn(
        layoutClasses[layout],
        centered && 'justify-center items-center',
        className
      )}
    >
      {badges.map((badge, index) => (
        <RVLifeTrustBadge key={index} {...badge} delay={index * 0.1} />
      ))}
    </div>
  );
};

/**
 * RVLifeSimpleBadge - Minimalist badge for inline use
 */
export interface RVLifeSimpleBadgeProps {
  icon?: React.ReactNode;
  text: string;
  color?: string;
  className?: string;
}

export const RVLifeSimpleBadge: React.FC<RVLifeSimpleBadgeProps> = ({
  icon,
  text,
  color = 'var(--rv-life-primary-blue)',
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1',
        'text-xs font-semibold rounded-full',
        'border',
        className
      )}
      style={{
        color: color,
        borderColor: color,
        backgroundColor: `${color}10`,
      }}
    >
      {icon && <span className="w-3 h-3">{icon}</span>}
      {text}
    </span>
  );
};

/**
 * RVLifeRatingBadge - Specialized rating display badge
 */
export interface RVLifeRatingBadgeProps {
  rating: number;
  maxRating?: number;
  reviewCount?: number;
  size?: 'small' | 'medium' | 'large';
  showStars?: boolean;
  className?: string;
}

export const RVLifeRatingBadge: React.FC<RVLifeRatingBadgeProps> = ({
  rating,
  maxRating = 5,
  reviewCount,
  size = 'medium',
  showStars = true,
  className,
}) => {
  const sizeClasses = {
    small: {
      star: 'w-3 h-3',
      text: 'text-xs',
      padding: 'px-2 py-1',
    },
    medium: {
      star: 'w-4 h-4',
      text: 'text-sm',
      padding: 'px-3 py-1.5',
    },
    large: {
      star: 'w-5 h-5',
      text: 'text-base',
      padding: 'px-4 py-2',
    },
  };

  const sizes = sizeClasses[size];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2',
        sizes.padding,
        'bg-white rounded-lg shadow-sm border border-gray-100',
        className
      )}
    >
      {showStars && (
        <div className="flex items-center gap-0.5">
          {[...Array(maxRating)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                sizes.star,
                i < Math.floor(rating)
                  ? 'fill-[var(--rv-life-accent-orange)] text-[var(--rv-life-accent-orange)]'
                  : 'fill-gray-200 text-gray-200'
              )}
            />
          ))}
        </div>
      )}
      <div className={cn('font-bold text-[var(--rv-text-primary)]', sizes.text)}>
        {rating.toFixed(1)}
      </div>
      {reviewCount !== undefined && (
        <div className={cn('text-[var(--rv-text-muted)]', sizes.text)}>
          ({reviewCount.toLocaleString()})
        </div>
      )}
    </div>
  );
};

/**
 * RVLifeVerifiedBadge - Special verified/certified badge
 */
export interface RVLifeVerifiedBadgeProps {
  type?: 'verified' | 'certified' | 'recommended';
  text?: string;
  className?: string;
}

export const RVLifeVerifiedBadge: React.FC<RVLifeVerifiedBadgeProps> = ({
  type = 'verified',
  text,
  className,
}) => {
  const config = {
    verified: {
      icon: ShieldCheck,
      text: text || 'Verified',
      color: 'var(--rv-life-secondary-green)',
    },
    certified: {
      icon: Award,
      text: text || 'Certified',
      color: 'var(--rv-life-primary-blue)',
    },
    recommended: {
      icon: ThumbsUp,
      text: text || 'Recommended',
      color: 'var(--rv-life-accent-orange)',
    },
  };

  const { icon: Icon, text: displayText, color } = config[type];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5',
        'rounded-full font-semibold text-sm',
        'shadow-sm',
        className
      )}
      style={{
        backgroundColor: color,
        color: 'white',
      }}
    >
      <Icon className="w-4 h-4" />
      {displayText}
    </div>
  );
};

// Export default
export default RVLifeTrustBadge;
