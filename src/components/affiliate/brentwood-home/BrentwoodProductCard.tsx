import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BrentwoodButton } from './BrentwoodButton';
import { Star, Check } from 'lucide-react';
import '@/styles/affiliate/brentwood-home.css';

export interface BrentwoodProductCardProps {
  name: string;
  tagline?: string;
  image: {
    src: string;
    alt: string;
  };
  rating?: {
    stars: number;
    count: number;
  };
  price?: {
    original?: number;
    current: number;
    currency?: string;
    period?: string;
  };
  features: string[];
  cta: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  badge?: string;
  variant?: 'default' | 'featured';
  delay?: number;
  className?: string;
}

/**
 * BrentwoodProductCard - Premium product showcase card for mattresses
 *
 * Features:
 * - Product image with hover zoom
 * - Star ratings with count
 * - Price display with original/sale pricing
 * - Feature list with checkmarks
 * - CTA button
 * - Badge support
 * - Featured variant
 *
 * Designed for mattress product showcases
 */
export const BrentwoodProductCard: React.FC<BrentwoodProductCardProps> = ({
  name,
  tagline,
  image,
  rating,
  price,
  features,
  cta,
  badge,
  variant = 'default',
  delay = 0,
  className,
}) => {
  return (
    <motion.div
      className={cn(
        'brentwood-card-base relative overflow-hidden',
        variant === 'featured' && 'border-2 border-[var(--brentwood-accent-gold)] ring-4 ring-[var(--brentwood-accent-gold)] ring-opacity-10',
        'brentwood-lift-hover',
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
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[var(--brentwood-accent-gold)] text-white shadow-lg">
            {badge}
          </span>
        </div>
      )}

      {/* Featured Badge */}
      {variant === 'featured' && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[var(--brentwood-accent-gold)] to-[var(--brentwood-accent-gold-light)] text-white shadow-lg">
            Best Seller
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[var(--brentwood-soft-bg)] group">
        <motion.img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        {/* Name & Tagline */}
        <div>
          <h3 className="brentwood-headline-tertiary mb-1">{name}</h3>
          {tagline && (
            <p className="text-sm text-[var(--brentwood-text-secondary)] italic">
              {tagline}
            </p>
          )}
        </div>

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    i < rating.stars
                      ? 'fill-[var(--brentwood-accent-gold)] text-[var(--brentwood-accent-gold)]'
                      : 'fill-gray-200 text-gray-200'
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-[var(--brentwood-text-muted)]">
              ({rating.count.toLocaleString()} reviews)
            </span>
          </div>
        )}

        {/* Price */}
        {price && (
          <div className="flex items-baseline gap-2">
            {price.original && (
              <span className="text-lg text-[var(--brentwood-text-muted)] line-through">
                {price.currency || '$'}
                {price.original}
              </span>
            )}
            <span className="text-2xl font-bold text-[var(--brentwood-primary-blue)]">
              {price.currency || '$'}
              {price.current}
            </span>
            {price.period && (
              <span className="text-sm text-[var(--brentwood-text-muted)]">
                {price.period}
              </span>
            )}
          </div>
        )}

        {/* Features */}
        <div className="space-y-2">
          {features.slice(0, 5).map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-[var(--brentwood-success-green)] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[var(--brentwood-text-secondary)]">
                {feature}
              </span>
            </div>
          ))}
          {features.length > 5 && (
            <p className="text-xs text-[var(--brentwood-text-muted)] italic">
              + {features.length - 5} more features
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="pt-4">
          <BrentwoodButton
            variant={variant === 'featured' ? 'luxury' : 'primary'}
            size="medium"
            onClick={cta.onClick}
            href={cta.href}
            fullWidth
          >
            {cta.text}
          </BrentwoodButton>
        </div>
      </div>
    </motion.div>
  );
};

export default BrentwoodProductCard;
