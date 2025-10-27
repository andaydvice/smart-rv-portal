import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RVLifeButton } from './RVLifeButton';
import { RVLifeTrustBadge, RVLifeTrustBadgeProps } from './RVLifeTrustBadge';
import { Check, Star, Tag, TrendingUp } from 'lucide-react';
import '@/styles/affiliate/rv-life-pro.css';

export interface RVLifePricingCardProps {
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
  trustBadges?: Array<Omit<RVLifeTrustBadgeProps, 'delay'>>;
  featured?: boolean;
  popularBadge?: boolean;
  limitedTime?: {
    text: string;
    countdown?: Date;
  };
  className?: string;
  delay?: number;
}

/**
 * RVLifePricingCard - Pricing card component for affiliate offers
 *
 * Features:
 * - Highlight discount codes prominently
 * - Feature list with checkmarks
 * - CTA button
 * - Trust badges
 * - Featured/popular highlighting
 * - Limited time offers
 * - Original price strikethrough
 * - Smooth animations
 *
 * Accessibility:
 * - Semantic HTML
 * - ARIA labels for pricing
 * - Keyboard navigation
 * - Focus-visible states
 */
export const RVLifePricingCard: React.FC<RVLifePricingCardProps> = ({
  name,
  description,
  price,
  discountCode,
  features,
  cta,
  trustBadges,
  featured = false,
  popularBadge = false,
  limitedTime,
  className,
  delay = 0,
}) => {
  const [timeLeft, setTimeLeft] = React.useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  React.useEffect(() => {
    if (!limitedTime?.countdown) return;

    const calculateTimeLeft = () => {
      const difference = limitedTime.countdown.getTime() - new Date().getTime();
      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return null;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [limitedTime?.countdown]);

  const discountPercentage = price.original
    ? Math.round(((price.original - price.current) / price.original) * 100)
    : null;

  return (
    <motion.div
      className={cn(
        'rv-card-base relative',
        'p-6 md:p-8',
        'flex flex-col',
        featured && 'ring-2 ring-[var(--rv-life-accent-orange)] shadow-xl scale-105',
        'transition-all duration-300 hover:shadow-2xl',
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
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--rv-life-accent-orange)] to-[var(--rv-life-accent-orange-light)] text-white font-semibold text-sm shadow-lg">
            <Star className="w-4 h-4 fill-current" />
            Most Popular
          </span>
        </div>
      )}

      {/* Featured Badge */}
      {featured && !popularBadge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] text-white font-semibold text-sm shadow-lg">
            <TrendingUp className="w-4 h-4" />
            Best Value
          </span>
        </div>
      )}

      {/* Limited Time Offer */}
      {limitedTime && (
        <div className="mb-4 p-3 rounded-lg bg-[var(--rv-life-warning-red)] bg-opacity-10 border border-[var(--rv-life-warning-red)] border-opacity-30">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-sm font-semibold text-[var(--rv-life-warning-red)]">
              {limitedTime.text}
            </span>
            {timeLeft && (
              <div className="flex items-center gap-2 text-sm font-mono font-bold text-[var(--rv-life-warning-red)]">
                <span className="bg-white px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-white px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-white px-2 py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Name & Description */}
      <div className="mb-6">
        <h3 className="rv-headline-tertiary mb-2">{name}</h3>
        {description && (
          <p className="rv-body-base text-[var(--rv-text-muted)]">{description}</p>
        )}
      </div>

      {/* Pricing */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          {price.original && (
            <span className="text-2xl text-[var(--rv-text-muted)] line-through">
              {price.currency || '$'}
              {price.original.toFixed(2)}
            </span>
          )}
          {discountPercentage && (
            <span className="inline-flex items-center px-2 py-1 rounded bg-[var(--rv-life-secondary-green)] text-white text-sm font-bold">
              Save {discountPercentage}%
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold text-[var(--rv-text-primary)]">
            {price.currency || '$'}
            {price.current.toFixed(2)}
          </span>
          {price.period && (
            <span className="text-xl text-[var(--rv-text-muted)]">/{price.period}</span>
          )}
        </div>
      </div>

      {/* Discount Code */}
      {discountCode && (
        <motion.div
          className="mb-6 p-4 rounded-lg bg-gradient-to-r from-[var(--rv-life-accent-orange)] to-[var(--rv-life-accent-orange-light)]"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white">Exclusive Discount Code</span>
          </div>
          <div className="flex items-center gap-3">
            <code className="flex-1 px-3 py-2 bg-white rounded font-mono font-bold text-lg text-[var(--rv-text-primary)] select-all">
              {discountCode.code}
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(discountCode.code);
              }}
              className="px-3 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded font-semibold text-sm transition-colors"
              aria-label="Copy discount code"
            >
              Copy
            </button>
          </div>
          <p className="mt-2 text-sm text-white font-semibold">
            {discountCode.savings}
          </p>
        </motion.div>
      )}

      {/* Features */}
      <div className="mb-8 flex-1">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: delay + (index * 0.05),
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <Check
                className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--rv-life-secondary-green)]"
              />
              <span className="rv-body-base text-[var(--rv-text-secondary)]">
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="mb-6">
        <RVLifeButton
          variant="primary"
          size="large"
          fullWidth
          onClick={cta.onClick}
          href={cta.href}
        >
          {cta.text}
        </RVLifeButton>
      </div>

      {/* Trust Badges */}
      {trustBadges && trustBadges.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 pt-6 border-t border-gray-200">
          {trustBadges.map((badge, index) => (
            <RVLifeTrustBadge
              key={index}
              {...badge}
              size="small"
              delay={delay + 0.3 + (index * 0.1)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

/**
 * RVLifePricingGrid - Grid layout for multiple pricing cards
 */
export interface RVLifePricingGridProps {
  cards: RVLifePricingCardProps[];
  columns?: 1 | 2 | 3;
  className?: string;
}

export const RVLifePricingGrid: React.FC<RVLifePricingGridProps> = ({
  cards,
  columns = 3,
  className,
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={cn('grid gap-8', columnClasses[columns], className)}>
      {cards.map((card, index) => (
        <RVLifePricingCard key={index} {...card} delay={index * 0.1} />
      ))}
    </div>
  );
};

/**
 * RVLifePricingComparison - Full pricing comparison table
 */
export interface PricingComparisonFeature {
  name: string;
  description?: string;
  plans: {
    [planName: string]: boolean | string;
  };
}

export interface RVLifePricingComparisonProps {
  plans: Array<{
    name: string;
    price: {
      current: number;
      original?: number;
      currency?: string;
      period?: string;
    };
    cta: {
      text: string;
      onClick?: () => void;
      href?: string;
    };
    featured?: boolean;
  }>;
  features: PricingComparisonFeature[];
  className?: string;
}

export const RVLifePricingComparison: React.FC<RVLifePricingComparisonProps> = ({
  plans,
  features,
  className,
}) => {
  return (
    <div className={cn('rv-card-base overflow-x-auto', className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-[var(--rv-life-primary-blue)]">
            <th className="text-left py-6 px-4 font-semibold text-[var(--rv-text-secondary)]">
              Features
            </th>
            {plans.map((plan, index) => (
              <th
                key={index}
                className={cn(
                  'text-center py-6 px-4',
                  plan.featured && 'bg-[var(--rv-life-accent-orange)] bg-opacity-5'
                )}
              >
                <div className="space-y-2">
                  <div className="font-bold text-lg text-[var(--rv-text-primary)]">
                    {plan.name}
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-bold text-[var(--rv-text-primary)]">
                      {plan.price.currency || '$'}
                      {plan.price.current}
                    </span>
                    {plan.price.period && (
                      <span className="text-sm text-[var(--rv-text-muted)]">
                        /{plan.price.period}
                      </span>
                    )}
                  </div>
                  <RVLifeButton
                    variant={plan.featured ? 'primary' : 'secondary'}
                    size="small"
                    onClick={plan.cta.onClick}
                    href={plan.cta.href}
                  >
                    {plan.cta.text}
                  </RVLifeButton>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, featureIndex) => (
            <tr key={featureIndex} className="border-b border-gray-100">
              <td className="py-4 px-4">
                <div>
                  <div className="font-semibold text-[var(--rv-text-primary)]">
                    {feature.name}
                  </div>
                  {feature.description && (
                    <div className="text-sm text-[var(--rv-text-muted)] mt-1">
                      {feature.description}
                    </div>
                  )}
                </div>
              </td>
              {plans.map((plan, planIndex) => (
                <td
                  key={planIndex}
                  className={cn(
                    'py-4 px-4 text-center',
                    plan.featured && 'bg-[var(--rv-life-accent-orange)] bg-opacity-5'
                  )}
                >
                  {typeof feature.plans[plan.name] === 'boolean' ? (
                    feature.plans[plan.name] ? (
                      <Check className="w-6 h-6 text-[var(--rv-life-secondary-green)] mx-auto" />
                    ) : (
                      <span className="text-2xl text-[var(--rv-text-muted)]">—</span>
                    )
                  ) : (
                    <span className="text-sm text-[var(--rv-text-secondary)]">
                      {feature.plans[plan.name]}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export default
export default RVLifePricingCard;
