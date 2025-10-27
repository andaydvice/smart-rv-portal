import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, TrendingUp, Shield, Star } from 'lucide-react';
import '@/styles/affiliate/rv-life-pro.css';

export interface RVLifeFeatureBlockProps {
  icon?: React.ReactNode;
  iconColor?: string;
  title: string;
  description: string | React.ReactNode;
  benefits?: string[];
  proofPoint?: {
    text: string;
    icon?: React.ReactNode;
  };
  screenshot?: {
    src: string;
    alt: string;
  };
  layout?: 'default' | 'left' | 'right' | 'centered';
  className?: string;
  delay?: number;
}

/**
 * RVLifeFeatureBlock - Feature showcase component
 *
 * Features:
 * - Icon + Title + Description layout
 * - Benefit-focused display with bullet points
 * - Optional proof points
 * - Optional screenshot/visual support
 * - Multiple layout options
 * - Smooth scroll animations
 *
 * Layouts:
 * - default: Vertical stack
 * - left: Image on left, content on right
 * - right: Content on left, image on right
 * - centered: Centered content with image below
 */
export const RVLifeFeatureBlock: React.FC<RVLifeFeatureBlockProps> = ({
  icon,
  iconColor = 'var(--rv-life-primary-blue)',
  title,
  description,
  benefits,
  proofPoint,
  screenshot,
  layout = 'default',
  className,
  delay = 0,
}) => {
  const ContentSection = () => (
    <div className="flex-1">
      {/* Icon */}
      {icon && (
        <div className="mb-6">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-xl"
            style={{
              backgroundColor: `${iconColor}15`,
              color: iconColor,
            }}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              {icon}
            </div>
          </div>
        </div>
      )}

      {/* Title */}
      <h3 className="rv-headline-secondary mb-4">
        {title}
      </h3>

      {/* Description */}
      <div className="rv-body-large mb-6 text-[var(--rv-text-secondary)]">
        {typeof description === 'string' ? <p>{description}</p> : description}
      </div>

      {/* Benefits List */}
      {benefits && benefits.length > 0 && (
        <ul className="space-y-3 mb-6">
          {benefits.map((benefit, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: delay + (index * 0.1),
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <Check
                className="w-6 h-6 flex-shrink-0 mt-0.5"
                style={{ color: iconColor }}
              />
              <span className="rv-body-base text-[var(--rv-text-secondary)]">
                {benefit}
              </span>
            </motion.li>
          ))}
        </ul>
      )}

      {/* Proof Point */}
      {proofPoint && (
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
          style={{
            backgroundColor: `${iconColor}10`,
            color: iconColor,
          }}
        >
          {proofPoint.icon || <TrendingUp className="w-5 h-5" />}
          <span className="font-semibold text-sm">
            {proofPoint.text}
          </span>
        </div>
      )}
    </div>
  );

  const ImageSection = () => (
    screenshot && (
      <div className="flex-1">
        <motion.div
          className="relative rounded-lg overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: delay + 0.2,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <img
            src={screenshot.src}
            alt={screenshot.alt}
            className="w-full h-auto object-cover rv-lazy-image rv-loaded"
            loading="lazy"
          />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    )
  );

  // Default layout - vertical stack
  if (layout === 'default') {
    return (
      <motion.div
        className={cn('space-y-6', className)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: delay,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <ContentSection />
        <ImageSection />
      </motion.div>
    );
  }

  // Centered layout
  if (layout === 'centered') {
    return (
      <motion.div
        className={cn('max-w-3xl mx-auto text-center', className)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: delay,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <div className="mb-8">
          {/* Icon */}
          {icon && (
            <div className="flex justify-center mb-6">
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-xl"
                style={{
                  backgroundColor: `${iconColor}15`,
                  color: iconColor,
                }}
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  {icon}
                </div>
              </div>
            </div>
          )}

          {/* Title */}
          <h3 className="rv-headline-primary mb-4">
            {title}
          </h3>

          {/* Description */}
          <div className="rv-body-large mb-6 text-[var(--rv-text-secondary)]">
            {typeof description === 'string' ? <p>{description}</p> : description}
          </div>

          {/* Benefits - inline for centered layout */}
          {benefits && benefits.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {benefits.map((benefit, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--rv-life-light-bg)] rounded-lg text-sm text-[var(--rv-text-secondary)]"
                >
                  <Check className="w-4 h-4" style={{ color: iconColor }} />
                  {benefit}
                </span>
              ))}
            </div>
          )}

          {/* Proof Point */}
          {proofPoint && (
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
              style={{
                backgroundColor: `${iconColor}10`,
                color: iconColor,
              }}
            >
              {proofPoint.icon || <TrendingUp className="w-5 h-5" />}
              <span className="font-semibold text-sm">
                {proofPoint.text}
              </span>
            </div>
          )}
        </div>
        <ImageSection />
      </motion.div>
    );
  }

  // Left/Right layouts
  return (
    <motion.div
      className={cn(
        'flex flex-col gap-8',
        layout === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row',
        'items-center',
        className
      )}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: layout === 'left' ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: delay + 0.1,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <ContentSection />
      </motion.div>
      <motion.div
        className="flex-1 w-full"
        initial={{ opacity: 0, x: layout === 'left' ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: delay + 0.2,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <ImageSection />
      </motion.div>
    </motion.div>
  );
};

/**
 * RVLifeFeatureComparison - Side-by-side comparison table
 */
export interface ComparisonFeature {
  name: string;
  withProduct: boolean | string;
  withoutProduct: boolean | string;
}

export interface RVLifeFeatureComparisonProps {
  title?: string;
  features: ComparisonFeature[];
  productName?: string;
  className?: string;
}

export const RVLifeFeatureComparison: React.FC<RVLifeFeatureComparisonProps> = ({
  title = 'With vs Without',
  features,
  productName = 'Our Product',
  className,
}) => {
  return (
    <motion.div
      className={cn('rv-card-base p-6 md:p-8', className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <h3 className="rv-headline-tertiary mb-6 text-center">
        {title}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-[var(--rv-life-primary-blue)]">
              <th className="text-left py-4 px-4 font-semibold text-[var(--rv-text-secondary)]">
                Feature
              </th>
              <th className="text-center py-4 px-4 font-semibold text-[var(--rv-life-secondary-green)]">
                With {productName}
              </th>
              <th className="text-center py-4 px-4 font-semibold text-[var(--rv-text-muted)]">
                Without
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <motion.tr
                key={index}
                className="border-b border-gray-100"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <td className="py-4 px-4 text-[var(--rv-text-secondary)]">
                  {feature.name}
                </td>
                <td className="py-4 px-4 text-center">
                  {typeof feature.withProduct === 'boolean' ? (
                    feature.withProduct ? (
                      <Check className="w-6 h-6 text-[var(--rv-life-secondary-green)] mx-auto" />
                    ) : (
                      <span className="text-[var(--rv-text-muted)]">—</span>
                    )
                  ) : (
                    <span className="text-sm text-[var(--rv-text-secondary)]">
                      {feature.withProduct}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 text-center">
                  {typeof feature.withoutProduct === 'boolean' ? (
                    feature.withoutProduct ? (
                      <Check className="w-6 h-6 text-[var(--rv-life-secondary-green)] mx-auto" />
                    ) : (
                      <span className="text-2xl text-[var(--rv-text-muted)]">✕</span>
                    )
                  ) : (
                    <span className="text-sm text-[var(--rv-text-muted)]">
                      {feature.withoutProduct}
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

/**
 * RVLifeBenefitsList - Styled benefits list component
 */
export interface RVLifeBenefitsListProps {
  title?: string;
  benefits: Array<{
    text: string;
    icon?: React.ReactNode;
  }>;
  iconColor?: string;
  columns?: 1 | 2;
  className?: string;
}

export const RVLifeBenefitsList: React.FC<RVLifeBenefitsListProps> = ({
  title,
  benefits,
  iconColor = 'var(--rv-life-secondary-green)',
  columns = 1,
  className,
}) => {
  const gridClasses = columns === 2 ? 'md:grid-cols-2' : '';

  return (
    <div className={cn('space-y-6', className)}>
      {title && (
        <h3 className="rv-headline-tertiary">
          {title}
        </h3>
      )}

      <div className={cn('grid grid-cols-1 gap-4', gridClasses)}>
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-3 p-4 rounded-lg bg-[var(--rv-life-off-white)] hover:bg-white transition-colors duration-300"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div style={{ color: iconColor }} className="flex-shrink-0 mt-0.5">
              {benefit.icon || <Check className="w-6 h-6" />}
            </div>
            <span className="rv-body-base text-[var(--rv-text-secondary)]">
              {benefit.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Export default
export default RVLifeFeatureBlock;
