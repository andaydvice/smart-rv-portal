import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RVLifeButton, RVLifeButtonProps } from './RVLifeButton';
import { RVLifeTrustBadge, RVLifeTrustBadgeProps } from './RVLifeTrustBadge';
import { ArrowDown } from 'lucide-react';
import '@/styles/affiliate/rv-life-pro.css';

export interface RVLifeHeroSectionProps {
  headline: string;
  subheadline?: string;
  description?: string;
  cta?: {
    primary?: {
      text: string;
      onClick?: () => void;
      href?: string;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
      href?: string;
    };
  };
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundOverlay?: boolean;
  overlayOpacity?: number;
  trustIndicators?: Array<Omit<RVLifeTrustBadgeProps, 'delay'>>;
  height?: 'small' | 'medium' | 'large' | 'full';
  alignment?: 'left' | 'center' | 'right';
  showScrollIndicator?: boolean;
  className?: string;
}

/**
 * RVLifeHeroSection - Full-width hero component for landing pages
 *
 * Features:
 * - Full-width hero with background image or video
 * - Overlay for text readability
 * - Large headline + subheadline + primary CTA
 * - Trust indicator area
 * - Multiple height and alignment options
 * - Scroll indicator
 * - Smooth animations
 *
 * Accessibility:
 * - Proper heading hierarchy
 * - Keyboard navigation
 * - High contrast text
 * - Focus-visible states
 */
export const RVLifeHeroSection: React.FC<RVLifeHeroSectionProps> = ({
  headline,
  subheadline,
  description,
  cta,
  backgroundImage,
  backgroundVideo,
  backgroundOverlay = true,
  overlayOpacity = 0.7,
  trustIndicators,
  height = 'large',
  alignment = 'center',
  showScrollIndicator = true,
  className,
}) => {
  const heightClasses = {
    small: 'min-h-[400px] md:min-h-[500px]',
    medium: 'min-h-[500px] md:min-h-[600px]',
    large: 'min-h-[600px] md:min-h-[700px]',
    full: 'min-h-screen',
  };

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    const nextSection = containerRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className={cn(
        'relative w-full',
        heightClasses[height],
        'flex items-center justify-center',
        'overflow-hidden',
        className
      )}
    >
      {/* Background Image */}
      {backgroundImage && !backgroundVideo && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      )}

      {/* Background Video */}
      {backgroundVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      {backgroundOverlay && (backgroundImage || backgroundVideo) && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: `rgba(44, 62, 80, ${overlayOpacity})`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Gradient Overlay for better text readability */}
      {(backgroundImage || backgroundVideo) && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"
          aria-hidden="true"
        />
      )}

      {/* Content Container */}
      <div className="relative z-10 w-full rv-container py-12 md:py-20">
        <div className={cn('flex flex-col gap-6 md:gap-8 max-w-5xl mx-auto', alignmentClasses[alignment])}>
          {/* Headline */}
          <motion.h1
            className={cn(
              'rv-headline-hero',
              (backgroundImage || backgroundVideo) && 'text-white'
            )}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {headline}
          </motion.h1>

          {/* Subheadline */}
          {subheadline && (
            <motion.h2
              className={cn(
                'rv-headline-secondary font-normal',
                (backgroundImage || backgroundVideo) ? 'text-white/90' : 'text-[var(--rv-text-secondary)]'
              )}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {subheadline}
            </motion.h2>
          )}

          {/* Description */}
          {description && (
            <motion.p
              className={cn(
                'rv-body-large max-w-3xl',
                (backgroundImage || backgroundVideo) ? 'text-white/80' : 'text-[var(--rv-text-secondary)]',
                alignment === 'center' && 'mx-auto'
              )}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {description}
            </motion.p>
          )}

          {/* CTA Buttons */}
          {cta && (cta.primary || cta.secondary) && (
            <motion.div
              className={cn(
                'flex flex-col sm:flex-row gap-4',
                alignment === 'center' && 'justify-center',
                alignment === 'right' && 'justify-end'
              )}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              {cta.primary && (
                <RVLifeButton
                  variant="primary"
                  size="large"
                  onClick={cta.primary.onClick}
                  href={cta.primary.href}
                >
                  {cta.primary.text}
                </RVLifeButton>
              )}
              {cta.secondary && (
                <RVLifeButton
                  variant="secondary"
                  size="large"
                  onClick={cta.secondary.onClick}
                  href={cta.secondary.href}
                  className={(backgroundImage || backgroundVideo) ? 'border-white text-white hover:bg-white hover:text-[var(--rv-life-primary-blue)]' : ''}
                >
                  {cta.secondary.text}
                </RVLifeButton>
              )}
            </motion.div>
          )}

          {/* Trust Indicators */}
          {trustIndicators && trustIndicators.length > 0 && (
            <motion.div
              className={cn(
                'flex flex-wrap gap-4 mt-4',
                alignment === 'center' && 'justify-center',
                alignment === 'right' && 'justify-end'
              )}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              {trustIndicators.map((indicator, index) => (
                <RVLifeTrustBadge
                  key={index}
                  {...indicator}
                  delay={0.6 + (index * 0.1)}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.button
          className={cn(
            'absolute bottom-8 left-1/2 transform -translate-x-1/2',
            'flex flex-col items-center gap-2',
            'text-sm font-medium',
            (backgroundImage || backgroundVideo) ? 'text-white' : 'text-[var(--rv-text-secondary)]',
            'transition-all duration-300 hover:gap-3',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rv-life-accent-orange)] focus-visible:ring-offset-2 rounded-lg p-2'
          )}
          onClick={handleScrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1, ease: [0.4, 0, 0.2, 1] }}
          aria-label="Scroll to next section"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </motion.button>
      )}
    </section>
  );
};

/**
 * RVLifeHeroSplit - Split hero with content on one side, image on other
 */
export interface RVLifeHeroSplitProps {
  headline: string;
  subheadline?: string;
  description?: string;
  cta?: {
    primary?: {
      text: string;
      onClick?: () => void;
      href?: string;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
      href?: string;
    };
  };
  image: {
    src: string;
    alt: string;
  };
  imagePosition?: 'left' | 'right';
  trustIndicators?: Array<Omit<RVLifeTrustBadgeProps, 'delay'>>;
  backgroundColor?: string;
  className?: string;
}

export const RVLifeHeroSplit: React.FC<RVLifeHeroSplitProps> = ({
  headline,
  subheadline,
  description,
  cta,
  image,
  imagePosition = 'right',
  trustIndicators,
  backgroundColor = 'var(--rv-life-off-white)',
  className,
}) => {
  return (
    <section
      className={cn('w-full py-12 md:py-20', className)}
      style={{ backgroundColor }}
    >
      <div className="rv-container">
        <div
          className={cn(
            'flex flex-col gap-8',
            imagePosition === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row',
            'items-center'
          )}
        >
          {/* Content Side */}
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: imagePosition === 'left' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <h1 className="rv-headline-hero">{headline}</h1>

            {subheadline && (
              <h2 className="rv-headline-secondary font-normal text-[var(--rv-text-secondary)]">
                {subheadline}
              </h2>
            )}

            {description && (
              <p className="rv-body-large text-[var(--rv-text-secondary)]">
                {description}
              </p>
            )}

            {cta && (cta.primary || cta.secondary) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {cta.primary && (
                  <RVLifeButton
                    variant="primary"
                    size="large"
                    onClick={cta.primary.onClick}
                    href={cta.primary.href}
                  >
                    {cta.primary.text}
                  </RVLifeButton>
                )}
                {cta.secondary && (
                  <RVLifeButton
                    variant="secondary"
                    size="large"
                    onClick={cta.secondary.onClick}
                    href={cta.secondary.href}
                  >
                    {cta.secondary.text}
                  </RVLifeButton>
                )}
              </div>
            )}

            {trustIndicators && trustIndicators.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-6">
                {trustIndicators.map((indicator, index) => (
                  <RVLifeTrustBadge key={index} {...indicator} delay={index * 0.1} />
                ))}
              </div>
            )}
          </motion.div>

          {/* Image Side */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: imagePosition === 'left' ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/**
 * RVLifeHeroMinimal - Minimal centered hero
 */
export interface RVLifeHeroMinimalProps {
  headline: string;
  description?: string;
  cta?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
  className?: string;
}

export const RVLifeHeroMinimal: React.FC<RVLifeHeroMinimalProps> = ({
  headline,
  description,
  cta,
  badge,
  className,
}) => {
  return (
    <section className={cn('w-full py-16 md:py-24', className)}>
      <div className="rv-container">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {badge && (
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--rv-life-primary-blue)] bg-opacity-10 text-[var(--rv-life-primary-blue)] font-semibold text-sm">
                {badge.icon}
                {badge.text}
              </span>
            </motion.div>
          )}

          <h1 className="rv-headline-hero">{headline}</h1>

          {description && (
            <p className="rv-body-large text-[var(--rv-text-secondary)] max-w-2xl mx-auto">
              {description}
            </p>
          )}

          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <RVLifeButton
                variant="primary"
                size="large"
                onClick={cta.onClick}
                href={cta.href}
              >
                {cta.text}
              </RVLifeButton>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Export default
export default RVLifeHeroSection;
