import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown, Search } from 'lucide-react';
import '@/styles/affiliate/brentwood-home.css';

export interface BrentwoodFAQItem {
  question: string;
  answer: string | React.ReactNode;
  category?: 'general' | 'product' | 'shipping' | 'warranty' | 'care';
}

export interface BrentwoodFAQAccordionProps {
  title?: string;
  description?: string;
  faqs: BrentwoodFAQItem[];
  showSearch?: boolean;
  showCategories?: boolean;
  allowMultiple?: boolean;
  className?: string;
}

/**
 * BrentwoodFAQAccordion - Elegant FAQ accordion component
 *
 * Features:
 * - Smooth accordion animations
 * - Search functionality
 * - Category filtering
 * - Single or multiple open items
 * - Accessible keyboard navigation
 * - Schema.org markup ready
 */
export const BrentwoodFAQAccordion: React.FC<BrentwoodFAQAccordionProps> = ({
  title,
  description,
  faqs,
  showSearch = false,
  showCategories = false,
  allowMultiple = false,
  className,
}) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  // Filter FAQs
  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof faq.answer === 'string' &&
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(new Set(faqs.map((faq) => faq.category).filter(Boolean)));

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      {(title || description) && (
        <div className="text-center max-w-3xl mx-auto">
          {title && <h2 className="brentwood-headline-primary mb-4">{title}</h2>}
          {description && (
            <p className="brentwood-body-base text-[var(--brentwood-text-secondary)]">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Search */}
      {showSearch && (
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--brentwood-text-muted)]" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brentwood-primary-blue)] focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Categories */}
      {showCategories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              !selectedCategory
                ? 'bg-[var(--brentwood-primary-blue)] text-white'
                : 'bg-[var(--brentwood-soft-bg)] text-[var(--brentwood-text-secondary)] hover:bg-[var(--brentwood-primary-blue)]/10'
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category!)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors',
                selectedCategory === category
                  ? 'bg-[var(--brentwood-primary-blue)] text-white'
                  : 'bg-[var(--brentwood-soft-bg)] text-[var(--brentwood-text-secondary)] hover:bg-[var(--brentwood-primary-blue)]/10'
              )}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto space-y-3">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[var(--brentwood-text-muted)]">
              No FAQs found. Try a different search term or category.
            </p>
          </div>
        ) : (
          filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="brentwood-card-base overflow-hidden border border-gray-200"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-[var(--brentwood-soft-bg)] transition-colors"
                aria-expanded={openItems.includes(index)}
              >
                <span className="font-semibold text-[var(--brentwood-text-primary)] flex-1">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-[var(--brentwood-text-muted)] flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="px-6 py-4 border-t border-gray-200 bg-[var(--brentwood-soft-bg)]">
                      <div className="brentwood-body-base text-[var(--brentwood-text-secondary)]">
                        {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrentwoodFAQAccordion;
