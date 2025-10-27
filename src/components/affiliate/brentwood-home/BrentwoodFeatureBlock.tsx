import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import '@/styles/affiliate/brentwood-home.css';

export interface BrentwoodFeatureBlockProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits?: string[];
  image?: {
    src: string;
    alt: string;
  };
  layout?: 'left' | 'right';
  delay?: number;
  className?: string;
}

/**
 * BrentwoodFeatureBlock - Feature showcase with image
 *
 * Features:
 * - Side-by-side image and content layout
 * - Icon support
 * - Benefit list
 * - Left/right layout options
 * - Smooth animations
 * - Responsive design
 */
export const BrentwoodFeatureBlock: React.FC<BrentwoodFeatureBlockProps> = ({
  icon,
  title,
  description,
  benefits,
  image,
  layout = 'right',
  delay = 0,
  className,
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 lg:grid-cols-2 gap-8 items-center',
        layout === 'right' ? 'lg:grid-flow-col' : 'lg:grid-flow-col-dense',
        className
      )}
    >
      {/* Content Side */}
      <motion.div
        className={cn('space-y-6', layout === 'right' ? 'lg:order-1' : 'lg:order-2')}
        initial={{ opacity: 0, x: layout === 'right' ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Icon */}
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-lg"
          style={{
            backgroundColor: 'var(--brentwood-primary-blue)15',
            color: 'var(--brentwood-primary-blue)',
          }}
        >
          <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
        </div>

        {/* Title */}
        <h3 className="brentwood-headline-secondary">{title}</h3>

        {/* Description */}
        <p className="brentwood-body-large text-[var(--brentwood-text-secondary)]">
          {description}
        </p>

        {/* Benefits */}
        {benefits && benefits.length > 0 && (
          <div className="space-y-3 pt-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: delay + 0.1 + index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <Check className="w-5 h-5 text-[var(--brentwood-success-green)] flex-shrink-0 mt-0.5" />
                <span className="brentwood-body-base text-[var(--brentwood-text-secondary)]">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Image Side */}
      {image && (
        <motion.div
          className={cn(layout === 'right' ? 'lg:order-2' : 'lg:order-1')}
          initial={{ opacity: 0, x: layout === 'right' ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      )}

      {/* Placeholder if no image */}
      {!image && (
        <div
          className={cn(
            'aspect-video rounded-lg bg-gradient-to-br from-[var(--brentwood-primary-blue)]/10 to-[var(--brentwood-secondary-purple)]/10 flex items-center justify-center',
            layout === 'right' ? 'lg:order-2' : 'lg:order-1'
          )}
        >
          <div className="w-24 h-24 text-[var(--brentwood-primary-blue)]/30">{icon}</div>
        </div>
      )}
    </div>
  );
};

export default BrentwoodFeatureBlock;
