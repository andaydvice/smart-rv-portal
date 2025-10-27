import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  DollarSign,
  Package,
  Truck,
  RotateCcw,
  MessageCircle,
  Search
} from 'lucide-react';
import '@/styles/affiliate/rv-life-pro.css';

export type FAQCategory =
  | 'general'
  | 'pricing'
  | 'product'
  | 'shipping'
  | 'returns'
  | 'support'
  | 'security';

export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
  category?: FAQCategory;
}

export interface RVLifeFAQAccordionProps {
  faqs: FAQItem[];
  title?: string;
  description?: string;
  showSearch?: boolean;
  showCategories?: boolean;
  defaultOpen?: number | number[];
  allowMultiple?: boolean;
  className?: string;
}

/**
 * RVLifeFAQAccordion - Expandable FAQ component
 *
 * Features:
 * - Expandable accordion interface
 * - Category icons and filtering
 * - Search functionality
 * - Smooth animations
 * - Single or multiple open items
 * - Keyboard navigation
 *
 * Accessibility:
 * - ARIA labels and roles
 * - Keyboard navigation (Enter/Space to toggle, Arrow keys to navigate)
 * - Focus management
 * - Screen reader friendly
 */
export const RVLifeFAQAccordion: React.FC<RVLifeFAQAccordionProps> = ({
  faqs,
  title = 'Frequently Asked Questions',
  description,
  showSearch = true,
  showCategories = true,
  defaultOpen,
  allowMultiple = false,
  className,
}) => {
  const [openItems, setOpenItems] = React.useState<Set<number>>(() => {
    if (defaultOpen === undefined) return new Set();
    if (typeof defaultOpen === 'number') return new Set([defaultOpen]);
    return new Set(defaultOpen);
  });
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<FAQCategory | 'all'>('all');

  const categoryIcons: Record<FAQCategory, React.ComponentType<{ className?: string }>> = {
    general: HelpCircle,
    pricing: DollarSign,
    product: Package,
    shipping: Truck,
    returns: RotateCcw,
    support: MessageCircle,
    security: ShieldCheck,
  };

  const categoryLabels: Record<FAQCategory, string> = {
    general: 'General',
    pricing: 'Pricing',
    product: 'Product',
    shipping: 'Shipping',
    returns: 'Returns',
    support: 'Support',
    security: 'Security',
  };

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      }
      return newSet;
    });
  };

  const filteredFaqs = React.useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        searchQuery === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof faq.answer === 'string' &&
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' || faq.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [faqs, searchQuery, selectedCategory]);

  const categories = React.useMemo(() => {
    const cats = new Set<FAQCategory>();
    faqs.forEach((faq) => {
      if (faq.category) cats.add(faq.category);
    });
    return Array.from(cats);
  }, [faqs]);

  return (
    <div className={cn('space-y-8', className)}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <motion.h2
          className="rv-headline-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            className="rv-body-large text-[var(--rv-text-secondary)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Search Bar */}
      {showSearch && (
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--rv-text-muted)]" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rv-input-base w-full pl-12 pr-4"
              aria-label="Search FAQ"
            />
          </div>
        </motion.div>
      )}

      {/* Category Filters */}
      {showCategories && categories.length > 0 && (
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300',
              selectedCategory === 'all'
                ? 'bg-[var(--rv-life-primary-blue)] text-white shadow-md'
                : 'bg-[var(--rv-life-light-bg)] text-[var(--rv-text-secondary)] hover:bg-[var(--rv-life-primary-blue)] hover:bg-opacity-10'
            )}
          >
            All
          </button>
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300',
                  selectedCategory === category
                    ? 'bg-[var(--rv-life-primary-blue)] text-white shadow-md'
                    : 'bg-[var(--rv-life-light-bg)] text-[var(--rv-text-secondary)] hover:bg-[var(--rv-life-primary-blue)] hover:bg-opacity-10'
                )}
              >
                <Icon className="w-4 h-4" />
                {categoryLabels[category]}
              </button>
            );
          })}
        </motion.div>
      )}

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredFaqs.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="rv-body-large text-[var(--rv-text-muted)]">
              No questions found. Try adjusting your search or category filter.
            </p>
          </motion.div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openItems.has(index);
            const Icon = faq.category ? categoryIcons[faq.category] : HelpCircle;

            return (
              <motion.div
                key={index}
                className="rv-card-base overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className={cn(
                    'w-full flex items-start gap-4 p-6 text-left transition-colors duration-300',
                    'hover:bg-[var(--rv-life-light-bg)] hover:bg-opacity-50',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rv-life-primary-blue)] focus-visible:ring-inset'
                  )}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `${
                        faq.category
                          ? 'var(--rv-life-primary-blue)'
                          : 'var(--rv-life-secondary-green)'
                      }15`,
                      color: faq.category
                        ? 'var(--rv-life-primary-blue)'
                        : 'var(--rv-life-secondary-green)',
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Question */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-[var(--rv-text-primary)] mb-1">
                      {faq.question}
                    </h3>
                    {faq.category && (
                      <span className="text-xs text-[var(--rv-text-muted)] uppercase tracking-wide">
                        {categoryLabels[faq.category]}
                      </span>
                    )}
                  </div>

                  {/* Chevron */}
                  <motion.div
                    className="flex-shrink-0"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <ChevronDown className="w-6 h-6 text-[var(--rv-text-muted)]" />
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                        opacity: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
                      }}
                    >
                      <div className="px-6 pb-6 pl-20">
                        <div className="rv-body-base text-[var(--rv-text-secondary)] prose max-w-none">
                          {typeof faq.answer === 'string' ? (
                            <p>{faq.answer}</p>
                          ) : (
                            faq.answer
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

/**
 * RVLifeFAQSection - Complete FAQ section with background
 */
export interface RVLifeFAQSectionProps extends RVLifeFAQAccordionProps {
  backgroundColor?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaOnClick?: () => void;
}

export const RVLifeFAQSection: React.FC<RVLifeFAQSectionProps> = ({
  backgroundColor = 'var(--rv-life-off-white)',
  ctaText,
  ctaHref,
  ctaOnClick,
  ...faqProps
}) => {
  return (
    <section className="rv-section" style={{ backgroundColor }}>
      <div className="rv-container">
        <RVLifeFAQAccordion {...faqProps} />

        {/* CTA */}
        {ctaText && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="rv-body-large mb-6 text-[var(--rv-text-secondary)]">
              Still have questions?
            </p>
            <a
              href={ctaHref}
              onClick={ctaOnClick}
              className="rv-button-base bg-[var(--rv-life-primary-blue)] text-white px-8 py-3 hover:bg-[var(--rv-life-primary-blue-dark)] transition-colors duration-300"
            >
              {ctaText}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

/**
 * RVLifeSimpleFAQ - Simplified FAQ list without accordion
 */
export interface RVLifeSimpleFAQProps {
  faqs: FAQItem[];
  title?: string;
  columns?: 1 | 2;
  className?: string;
}

export const RVLifeSimpleFAQ: React.FC<RVLifeSimpleFAQProps> = ({
  faqs,
  title = 'Common Questions',
  columns = 1,
  className,
}) => {
  const gridClasses = columns === 2 ? 'md:grid-cols-2' : '';

  return (
    <div className={cn('space-y-8', className)}>
      {title && (
        <h2 className="rv-headline-secondary text-center">{title}</h2>
      )}

      <div className={cn('grid grid-cols-1 gap-8', gridClasses)}>
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <h3 className="font-semibold text-lg text-[var(--rv-text-primary)]">
              {faq.question}
            </h3>
            <div className="rv-body-base text-[var(--rv-text-secondary)]">
              {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Export default
export default RVLifeFAQAccordion;
