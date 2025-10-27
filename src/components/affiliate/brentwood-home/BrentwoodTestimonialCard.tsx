import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Star, CheckCircle } from 'lucide-react';
import '@/styles/affiliate/brentwood-home.css';

export interface BrentwoodTestimonialCardProps {
  quote: string;
  author: {
    name: string;
    title?: string;
    location?: string;
    avatar?: string;
  };
  rating?: number;
  verified?: boolean;
  date?: string;
  className?: string;
  delay?: number;
}

/**
 * BrentwoodTestimonialCard - REAL testimonial display only
 *
 * CRITICAL: Only use with verified, real testimonials
 * Never use with fabricated content
 *
 * Features:
 * - Elegant quote display
 * - Author attribution with avatar
 * - Star ratings
 * - Verified badge
 * - Date display
 * - Soft, trustworthy design
 */
export const BrentwoodTestimonialCard: React.FC<BrentwoodTestimonialCardProps> = ({
  quote,
  author,
  rating,
  verified = false,
  date,
  className,
  delay = 0,
}) => {
  return (
    <motion.div
      className={cn(
        'brentwood-card-base p-6 md:p-8',
        'border-l-4 border-[var(--brentwood-secondary-purple)]',
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
      {/* Quote */}
      <blockquote className="mb-6">
        <p className="brentwood-body-base text-[var(--brentwood-text-secondary)] italic">
          "{quote}"
        </p>
      </blockquote>

      {/* Rating */}
      {rating && (
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-4 h-4',
                i < rating
                  ? 'fill-[var(--brentwood-accent-gold)] text-[var(--brentwood-accent-gold)]'
                  : 'fill-gray-200 text-gray-200'
              )}
            />
          ))}
        </div>
      )}

      {/* Author Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            className="w-12 h-12 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[var(--brentwood-primary-blue)] bg-opacity-10 flex items-center justify-center">
            <span className="text-[var(--brentwood-primary-blue)] font-semibold text-lg">
              {author.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Author Details */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-[var(--brentwood-text-primary)]">
              {author.name}
            </p>
            {verified && (
              <CheckCircle className="w-4 h-4 text-[var(--brentwood-success-green)]" />
            )}
          </div>
          {author.title && (
            <p className="text-sm text-[var(--brentwood-text-muted)]">
              {author.title}
            </p>
          )}
          {author.location && (
            <p className="text-sm text-[var(--brentwood-text-muted)]">
              {author.location}
            </p>
          )}
          {date && (
            <p className="text-xs text-[var(--brentwood-text-muted)] mt-1">
              {date}
            </p>
          )}
        </div>
      </div>

      {/* Verified Badge */}
      {verified && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="text-xs text-[var(--brentwood-success-green)] font-medium flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Verified Purchase
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default BrentwoodTestimonialCard;
