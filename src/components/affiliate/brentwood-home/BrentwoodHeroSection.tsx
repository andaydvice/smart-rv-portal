import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BrentwoodButton } from './BrentwoodButton';
import { TrustBadges, TrustBadgeProps } from './TrustBadges';
import { ArrowDown } from 'lucide-react';
import '@/styles/affiliate/brentwood-home.css';

export interface BrentwoodHeroSectionProps {
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
  trustIndicators?: Array<Omit<TrustBadgeProps, 'delay'>>;
  height?: 'small' | 'medium' | 'large' | 'full';
  alignment?: 'left' | 'center' | 'right';
  showScrollIndicator?: boolean;
  className?: string;
}

/**
 * BrentwoodHeroSection - Elegant hero component for mattress landing pages
 *
 * Features:
 * - Full-width hero with background image or video
 * - Warm overlay for text readability
 * - Large headline + subheadline + primary CTA
 * - Trust indicator area
 * - Multiple height and alignment options
 * - Scroll indicator
 * - Smooth animations with sleep-focused aesthetic
 *
 * Accessibility:
 * - Proper heading hierarchy
 * - Keyboard navigation
 * - High contrast text
 * - Focus-visible states
 */
export const BrentwoodHeroSection: React.FC<BrentwoodHeroSectionProps> = ({
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

      {/* Warm Overlay */}
      {backgroundOverlay && (backgroundImage || backgroundVideo) && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: `rgba(52, 73, 94, ${overlayOpacity})`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Gradient Overlay for better text readability */}
      {(backgroundImage || backgroundVideo) && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-[var(--brentwood-primary-blue)]/20 via-transparent to-[var(--brentwood-secondary-purple)]/20"
          aria-hidden="true"
        />
      )}

      {/* Content Container */}
      <div className="relative z-10 w-full brentwood-container py-12 md:py-20">
        <div className={cn('flex flex-col gap-6 md:gap-8 max-w-5xl mx-auto', alignmentClasses[alignment])}>
          {/* Headline */}
          <motion.h1
            className={cn(
              'brentwood-headline-hero',
              (backgroundImage || backgroundVideo) && 'text-white drop-shadow-lg'
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
                'brentwood-headline-secondary font-normal',
                (backgroundImage || backgroundVideo) ? 'text-white/90 drop-shadow-lg' : 'text-[var(--brentwood-text-secondary)]'
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
                'brentwood-body-large max-w-3xl',
                (backgroundImage || backgroundVideo) ? 'text-white/80 drop-shadow-lg' : 'text-[var(--brentwood-text-secondary)]',
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
                <BrentwoodButton
                  variant="luxury"
                  size="large"
                  onClick={cta.primary.onClick}
                  href={cta.primary.href}
                >
                  {cta.primary.text}
                </BrentwoodButton>
              )}
              {cta.secondary && (
                <BrentwoodButton
                  variant="secondary"
                  size="large"
                  onClick={cta.secondary.onClick}
                  href={cta.secondary.href}
                  className={(backgroundImage || backgroundVideo) ? 'border-white text-white hover:bg-white hover:text-[var(--brentwood-primary-blue)]' : ''}
                >
                  {cta.secondary.text}
                </BrentwoodButton>
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
              <TrustBadges badges={trustIndicators} />
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
            (backgroundImage || backgroundVideo) ? 'text-white' : 'text-[var(--brentwood-text-secondary)]',
            'transition-all duration-300 hover:gap-3',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brentwood-accent-gold)] focus-visible:ring-offset-2 rounded-lg p-2'
          )}
          onClick={handleScrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1, ease: [0.4, 0, 0.2, 1] }}
          aria-label="Scroll to next section"
        >
          <span>Discover More</span>
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

// Export default
export default BrentwoodHeroSection;
