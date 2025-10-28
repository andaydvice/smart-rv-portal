import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import '@/styles/affiliate/rv-life-pro.css';

export interface RVLifeTestimonialData {
  quote: string;
  author: {
    name: string;
    location: string;
    rvType?: string;
    photo?: string;
  };
  rating?: number;
  verified?: boolean;
  date?: string;
}

export interface RVLifeTestimonialProps extends RVLifeTestimonialData {
  layout?: 'card' | 'inline' | 'featured';
  className?: string;
  delay?: number;
}

/**
 * RVLifeTestimonial - Social proof component for affiliate pages
 *
 * Features:
 * - Photo + Quote + Name + Location + RV Type format
 * - Multiple layout options (card, inline, featured)
 * - Star rating display
 * - Verified badge option
 * - Responsive design
 * - Smooth animations
 *
 * Accessibility:
 * - Semantic blockquote element
 * - Alt text for images
 * - ARIA labels for ratings
 */
export const RVLifeTestimonial: React.FC<RVLifeTestimonialProps> = ({
  quote,
  author,
  rating = 5,
  verified = false,
  date,
  layout = 'card',
  className,
  delay = 0,
}) => {
  const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            'w-5 h-5',
            i < rating
              ? 'fill-[var(--rv-life-accent-orange)] text-[var(--rv-life-accent-orange)]'
              : 'fill-gray-200 text-gray-200'
          )}
        />
      ))}
    </div>
  );

  if (layout === 'card') {
    return (
      <motion.div
        className={cn(
          'rv-card-base p-6 md:p-8',
          'relative',
          'rv-lift-hover',
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
        {/* Quote Icon */}
        <div className="absolute -top-4 left-6 bg-[var(--rv-life-primary-blue)] rounded-full p-3 shadow-lg">
          <Quote className="w-6 h-6 text-white" />
        </div>

        {/* Rating */}
        <div className="mb-4 pt-4">
          <StarRating rating={rating} />
        </div>

        {/* Quote */}
        <blockquote className="rv-body-large mb-6 text-[var(--rv-text-secondary)] italic">
          "{quote}"
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
          {/* Photo */}
          {author.photo ? (
            <img
              src={author.photo}
              alt={`${author.name} profile picture`}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-[var(--rv-life-light-bg)]"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[var(--rv-life-primary-blue)] flex items-center justify-center text-white font-semibold text-xl">
              {author.name.charAt(0)}
            </div>
          )}

          {/* Author Details */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-[var(--rv-text-primary)]">
                {author.name}
              </p>
              {verified && (
                <ShieldCheck className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
              )}
            </div>
            <p className="text-sm text-[var(--rv-text-muted)]">
              {author.location}
              {author.rvType && ` • ${author.rvType}`}
            </p>
            {date && (
              <p className="text-xs text-[var(--rv-text-muted)] mt-1">
                {date}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  if (layout === 'inline') {
    return (
      <motion.div
        className={cn('flex gap-6 items-start', className)}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: delay,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Photo */}
        <div className="flex-shrink-0">
          {author.photo ? (
            <img
              src={author.photo}
              alt={`${author.name} profile picture`}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover ring-2 ring-[var(--rv-life-light-bg)]"
            />
          ) : (
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--rv-life-primary-blue)] flex items-center justify-center text-white font-semibold text-2xl">
              {author.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <StarRating rating={rating} />
          <blockquote className="rv-body-base mt-3 mb-3 text-[var(--rv-text-secondary)] italic">
            "{quote}"
          </blockquote>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-[var(--rv-text-primary)]">
              {author.name}
            </p>
            {verified && (
              <ShieldCheck className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
            )}
          </div>
          <p className="text-sm text-[var(--rv-text-muted)]">
            {author.location}
            {author.rvType && ` • ${author.rvType}`}
          </p>
        </div>
      </motion.div>
    );
  }

  // Featured layout
  return (
    <motion.div
      className={cn(
        'rv-card-base p-8 md:p-12',
        'text-center max-w-4xl mx-auto',
        'border-2 border-[var(--rv-life-accent-orange)] border-opacity-20',
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {/* Large Quote Icon */}
      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] rounded-full p-4 shadow-lg">
          <Quote className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Rating */}
      <div className="flex justify-center mb-6">
        <StarRating rating={rating} />
      </div>

      {/* Quote */}
      <blockquote className="rv-headline-tertiary mb-8 text-[var(--rv-text-primary)] italic font-normal">
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="flex flex-col items-center">
        {author.photo ? (
          <img
            src={author.photo}
            alt={`${author.name} profile picture`}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-[var(--rv-life-light-bg)] mb-4"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] flex items-center justify-center text-white font-semibold text-2xl mb-4 ring-4 ring-[var(--rv-life-light-bg)]">
            {author.name.charAt(0)}
          </div>
        )}
        <div className="flex items-center gap-2 mb-2">
          <p className="font-bold text-lg text-[var(--rv-text-primary)]">
            {author.name}
          </p>
          {verified && (
            <ShieldCheck className="w-5 h-5 text-[var(--rv-life-secondary-green)]" />
          )}
        </div>
        <p className="text-[var(--rv-text-muted)]">
          {author.location}
          {author.rvType && ` • ${author.rvType}`}
        </p>
      </div>
    </motion.div>
  );
};

/**
 * RVLifeTestimonialGrid - Grid layout for multiple testimonials
 */
export interface RVLifeTestimonialGridProps {
  testimonials: RVLifeTestimonialData[];
  layout?: 'card' | 'inline' | 'featured';
  columns?: 1 | 2 | 3;
  className?: string;
}

export const RVLifeTestimonialGrid: React.FC<RVLifeTestimonialGridProps> = ({
  testimonials,
  layout = 'card',
  columns = 3,
  className,
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  if (layout === 'inline') {
    return (
      <div className={cn('space-y-8', className)}>
        {testimonials.map((testimonial, index) => (
          <RVLifeTestimonial
            key={index}
            {...testimonial}
            layout="inline"
            delay={index * 0.1}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid gap-6', columnClasses[columns], className)}>
      {testimonials.map((testimonial, index) => (
        <RVLifeTestimonial
          key={index}
          {...testimonial}
          layout={layout}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};

/**
 * RVLifeTestimonialCarousel - Rotating testimonial display
 */
export interface RVLifeTestimonialCarouselProps {
  testimonials: RVLifeTestimonialData[];
  autoplay?: boolean;
  interval?: number;
  className?: string;
}

export const RVLifeTestimonialCarousel: React.FC<RVLifeTestimonialCarouselProps> = ({
  testimonials,
  autoplay = true,
  interval = 5000,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, testimonials.length]);

  return (
    <div className={cn('relative', className)}>
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className={cn(
            'transition-opacity duration-500',
            index === currentIndex ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
          )}
        >
          <RVLifeTestimonial {...testimonial} layout="featured" />
        </div>
      ))}

      {/* Indicators */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'bg-[var(--rv-life-accent-orange)] w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Export default
export default RVLifeTestimonial;
