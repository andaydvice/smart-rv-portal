import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, AlertCircle } from 'lucide-react';
import { BrentwoodButton } from './BrentwoodButton';
import { TrustBadges, TrustBadgeProps } from './TrustBadges';
import '@/styles/affiliate/brentwood-home.css';

export interface BrentwoodPricingCardProps {
  name: string;
  description?: string;
  price: {
    original?: number;
    current: number;
    currency?: string;
    period?: string;
  };
  discountCode?: {
    code: string;
    savings: string;
  };
  features: string[];
  cta: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  trustBadges?: Array<TrustBadgeProps>;
  popularBadge?: boolean;
  limitedTime?: {
    text: string;
  };
  delay?: number;
  className?: string;
}

/**
 * BrentwoodPricingCard - Premium pricing display for mattresses
 *
 * Features:
 * - Original vs. sale pricing
 * - Discount code display
 * - Feature list
 * - Trust badges
 * - Popular badge
 * - Limited time offers
 * - Elegant design
 */
export const BrentwoodPricingCard: React.FC<BrentwoodPricingCardProps> = ({
  name,
  description,
  price,
  discountCode,
  features,
  cta,
  trustBadges,
  popularBadge = false,
  limitedTime,
  delay = 0,
  className,
}) => {
  return (
    <motion.div
      className={cn(
        'brentwood-card-base relative overflow-hidden',
        popularBadge &&
          'border-2 border-[var(--brentwood-accent-gold)] ring-4 ring-[var(--brentwood-accent-gold)] ring-opacity-10',
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
      {/* Popular Badge */}
      {popularBadge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[var(--brentwood-accent-gold)] to-[var(--brentwood-accent-gold-light)] text-white shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="text-center pb-6 border-b border-gray-200">
          <h3 className="brentwood-headline-tertiary mb-2">{name}</h3>
          {description && (
            <p className="brentwood-body-base text-[var(--brentwood-text-secondary)]">
              {description}
            </p>
          )}
        </div>

        {/* Pricing */}
        <div className="text-center py-4">
          {price.original && (
            <div className="mb-2">
              <span className="text-2xl text-[var(--brentwood-text-muted)] line-through">
                {price.currency || '$'}
                {price.original}
              </span>
              <span className="ml-2 text-sm font-semibold text-[var(--brentwood-success-green)]">
                Save ${(price.original - price.current).toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl font-bold text-[var(--brentwood-primary-blue)]">
              {price.currency || '$'}
              {price.current}
            </span>
            {price.period && (
              <span className="text-lg text-[var(--brentwood-text-muted)]">
                /{price.period}
              </span>
            )}
          </div>
        </div>

        {/* Discount Code */}
        {discountCode && (
          <div className="bg-gradient-to-r from-[var(--brentwood-accent-gold)]/10 to-[var(--brentwood-secondary-purple)]/10 border border-[var(--brentwood-accent-gold)] rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-[var(--brentwood-text-primary)] mb-1">
                Use code at checkout:
              </p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <code className="text-2xl font-bold text-[var(--brentwood-accent-gold)] font-mono bg-white px-4 py-2 rounded border-2 border-dashed border-[var(--brentwood-accent-gold)]">
                  {discountCode.code}
                </code>
              </div>
              <p className="text-sm text-[var(--brentwood-success-green)] font-semibold">
                {discountCode.savings}
              </p>
            </div>
          </div>
        )}

        {/* Limited Time */}
        {limitedTime && (
          <div className="bg-[var(--brentwood-warning-red)]/10 border border-[var(--brentwood-warning-red)] rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-[var(--brentwood-warning-red)] flex-shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-[var(--brentwood-warning-red)]">
                {limitedTime.text}
              </p>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="space-y-3 py-4">
          <p className="text-sm font-semibold text-[var(--brentwood-text-primary)] mb-4">
            What's included:
          </p>
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[var(--brentwood-success-green)] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[var(--brentwood-text-secondary)]">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-4">
          <BrentwoodButton
            variant={popularBadge ? 'luxury' : 'primary'}
            size="large"
            onClick={cta.onClick}
            href={cta.href}
            fullWidth
          >
            {cta.text}
          </BrentwoodButton>
        </div>

        {/* Trust Badges */}
        {trustBadges && trustBadges.length > 0 && (
          <div className="pt-6 border-t border-gray-200">
            <TrustBadges badges={trustBadges} layout="stacked" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BrentwoodPricingCard;
