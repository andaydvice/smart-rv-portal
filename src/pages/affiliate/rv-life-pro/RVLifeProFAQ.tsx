/**
 * RV Life Pro FAQ and Objection Handler Page
 *
 * Comprehensive FAQ page that systematically addresses every possible
 * concern preventing conversion. NO fake testimonials - uses TrustSignals
 * component for verified data only.
 *
 * Features:
 * - Live search filter
 * - Category filtering (4 categories: Technical, Value & Pricing, Trust & Security, Comparison)
 * - Expand/collapse all functionality
 * - Deep linking to specific questions (#faq-question-id)
 * - Schema markup for FAQ rich snippets
 * - Tracking integration for FAQ analytics
 * - Objection handling matrix
 * - Mobile-optimised accordion
 */

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Search,
  ChevronDown,
  ChevronRight,
  Settings,
  DollarSign,
  Shield,
  GitCompare,
  Check,
  X,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  Printer,
  ThumbsUp,
  ThumbsDown,
  ChevronUp,
  Calculator,
  TrendingUp,
  MapPin,
  Smartphone,
  Users,
  Award,
  Clock,
  Zap,
  FileText,
  Link as LinkIcon,
} from 'lucide-react';

// Import components
import { RVLifeButton } from '@/components/affiliate/rv-life-pro/RVLifeButton';
import { TrustSignals } from '@/components/affiliate/rv-life-pro/TrustSignals';
import { DiscountCodeBox } from '@/components/affiliate/rv-life-pro/DiscountCodeBox';
import { ExitIntentModal } from '@/components/affiliate/rv-life-pro/ExitIntentModal';
import { RVLifeCard, RVLifeCardGrid } from '@/components/affiliate/rv-life-pro/RVLifeCard';

// Import copy data
import copyData from '@/data/affiliate/rv-life-pro-copy.json';

// Import tracking utilities
import {
  trackAffiliateClick,
  buildAffiliateLink,
} from '@/utils/affiliate/rvLifeProTracking';

import '@/styles/affiliate/rv-life-pro.css';

// FAQ Categories
type FAQCategoryType = 'all' | 'technical' | 'value_pricing' | 'trust_security' | 'comparison';

interface FAQCategory {
  id: FAQCategoryType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  count: number;
}

interface FAQItemExtended {
  id: string;
  question: string;
  answer: string;
  category: FAQCategoryType;
  helpful?: number; // Track helpful votes
  notHelpful?: number; // Track not helpful votes
}

/**
 * Main FAQ Page Component
 */
export const RVLifeProFAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FAQCategoryType>('all');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [expandAll, setExpandAll] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, 'helpful' | 'notHelpful' | null>>({});

  // Combine all FAQs from JSON with proper categorisation
  const allFAQs: FAQItemExtended[] = [
    ...copyData.faqs.technical.map((faq) => ({ ...faq, category: 'technical' as const })),
    ...copyData.faqs.value_pricing.map((faq) => ({ ...faq, category: 'value_pricing' as const })),
    ...copyData.faqs.trust_security.map((faq) => ({ ...faq, category: 'trust_security' as const })),
    ...copyData.faqs.comparison.map((faq) => ({ ...faq, category: 'comparison' as const })),
  ];

  // Categories configuration
  const categories: FAQCategory[] = [
    {
      id: 'all',
      label: 'All Questions',
      icon: HelpCircle,
      color: 'var(--rv-life-primary-blue)',
      count: allFAQs.length,
    },
    {
      id: 'technical',
      label: 'Technical',
      icon: Settings,
      color: 'var(--rv-life-primary-blue)',
      count: copyData.faqs.technical.length,
    },
    {
      id: 'value_pricing',
      label: 'Value & Pricing',
      icon: DollarSign,
      color: 'var(--rv-life-secondary-green)',
      count: copyData.faqs.value_pricing.length,
    },
    {
      id: 'trust_security',
      label: 'Trust & Security',
      icon: Shield,
      color: 'var(--rv-life-accent-orange)',
      count: copyData.faqs.trust_security.length,
    },
    {
      id: 'comparison',
      label: 'Comparisons',
      icon: GitCompare,
      color: 'var(--rv-life-primary-blue)',
      count: copyData.faqs.comparison.length,
    },
  ];

  // Filter FAQs based on search and category
  const filteredFAQs = React.useMemo(() => {
    return allFAQs.filter((faq) => {
      const matchesSearch =
        searchQuery === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allFAQs, searchQuery, selectedCategory]);

  // Handle expand/collapse all
  useEffect(() => {
    if (expandAll) {
      setOpenItems(new Set(filteredFAQs.map((faq) => faq.id)));
    } else {
      setOpenItems(new Set());
    }
  }, [expandAll, filteredFAQs]);

  // Handle deep linking (scroll to specific FAQ on page load)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash.startsWith('faq-')) {
      const faqId = hash.replace('faq-', '');
      setOpenItems(new Set([faqId]));
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, []);

  // Toggle FAQ item
  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Track helpful votes
  const trackHelpful = (faqId: string, helpful: boolean) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [faqId]: helpful ? 'helpful' : 'notHelpful',
    }));

    // Track in analytics
    if (import.meta.env.DEV) {
      console.log(`FAQ ${faqId} marked as ${helpful ? 'helpful' : 'not helpful'}`);
    }
  };

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/rv-life-pro/faq` : '';

  return (
    <Layout>
      <Helmet>
        <title>RV Life Pro FAQ 2025 | Common Questions & Answers</title>
        <meta name="description" content="Complete FAQ for RV Life Pro. Get answers about features, pricing, technical requirements, trial period, cancellation, and comparison with other RV GPS systems." />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="RV Life Pro FAQ 2025 | Common Questions & Answers" />
        <meta property="og:description" content="Complete FAQ for RV Life Pro. Get answers about features, pricing, technical requirements, trial period, and cancellation." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={typeof window !== 'undefined' ? `${window.location.origin}/og-image.svg` : ''} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RV Life Pro FAQ 2025 | Common Questions & Answers" />
        <meta name="twitter:description" content="Complete FAQ for RV Life Pro. Get answers about features, pricing, technical requirements, trial period, and cancellation." />
        <meta name="twitter:image" content={typeof window !== 'undefined' ? `${window.location.origin}/og-image.svg` : ''} />
      </Helmet>

    <div className="min-h-screen bg-[var(--rv-life-off-white)]">
      {/* Schema Markup for FAQ Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: allFAQs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Exit Intent Modal */}
      <ExitIntentModal />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Hero Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <motion.div
                className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="font-semibold">{allFAQs.length}+ Questions Answered</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Under 4 Hours Response Time</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Transparent, Honest Answers</span>
              </motion.div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Everything You Need to Know About RV Life Pro
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Honest answers to common questions. No marketing fluff, just facts.
            </p>

            {/* Search Bar */}
            <motion.div
              className="max-w-2xl mx-auto mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions... (e.g., 'offline maps', 'refund policy', 'pricing')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Search FAQ"
                />
              </div>
            </motion.div>

            {/* Quick Jump Links */}
            <motion.div
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a
                href="#technical-questions"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors backdrop-blur-sm text-sm"
              >
                Technical Questions
              </a>
              <a
                href="#pricing-questions"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors backdrop-blur-sm text-sm"
              >
                Pricing & Value
              </a>
              <a
                href="#trust-questions"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors backdrop-blur-sm text-sm"
              >
                Trust & Security
              </a>
              <a
                href="#comparison-questions"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors backdrop-blur-sm text-sm"
              >
                Comparisons
              </a>
              <a
                href="#objection-handler"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors backdrop-blur-sm text-sm"
              >
                Objection Handler
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300',
                    isActive
                      ? 'bg-[var(--rv-life-primary-blue)] text-white shadow-md scale-105'
                      : 'bg-[var(--rv-life-light-bg)] text-[var(--rv-text-secondary)] hover:bg-[var(--rv-life-primary-blue)] hover:bg-opacity-10'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-xs font-bold',
                      isActive ? 'bg-white/20' : 'bg-gray-200'
                    )}
                  >
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Utility Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setExpandAll(!expandAll)}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--rv-text-secondary)] hover:text-[var(--rv-life-primary-blue)] transition-colors"
            >
              {expandAll ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Collapse All
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Expand All
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--rv-text-secondary)] hover:text-[var(--rv-life-primary-blue)] transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print FAQ
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Results Count */}
            {searchQuery && (
              <motion.div
                className="mb-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[var(--rv-text-secondary)]">
                  Found <strong>{filteredFAQs.length}</strong> result{filteredFAQs.length !== 1 ? 's' : ''} for "
                  <strong>{searchQuery}</strong>"
                </p>
              </motion.div>
            )}

            {/* Technical Questions */}
            <FAQSection
              id="technical-questions"
              title="Technical Questions"
              icon={<Settings className="w-6 h-6" />}
              faqs={filteredFAQs.filter((faq) => faq.category === 'technical')}
              openItems={openItems}
              toggleItem={toggleItem}
              trackHelpful={trackHelpful}
              helpfulVotes={helpfulVotes}
              categoryColor="var(--rv-life-primary-blue)"
            />

            {/* Value & Pricing Questions */}
            <FAQSection
              id="pricing-questions"
              title="Value & Pricing Questions"
              icon={<DollarSign className="w-6 h-6" />}
              faqs={filteredFAQs.filter((faq) => faq.category === 'value_pricing')}
              openItems={openItems}
              toggleItem={toggleItem}
              trackHelpful={trackHelpful}
              helpfulVotes={helpfulVotes}
              categoryColor="var(--rv-life-secondary-green)"
            />

            {/* Trust & Security Questions */}
            <FAQSection
              id="trust-questions"
              title="Trust & Security Questions"
              icon={<Shield className="w-6 h-6" />}
              faqs={filteredFAQs.filter((faq) => faq.category === 'trust_security')}
              openItems={openItems}
              toggleItem={toggleItem}
              trackHelpful={trackHelpful}
              helpfulVotes={helpfulVotes}
              categoryColor="var(--rv-life-accent-orange)"
            />

            {/* Comparison Questions */}
            <FAQSection
              id="comparison-questions"
              title="Comparison Questions"
              icon={<GitCompare className="w-6 h-6" />}
              faqs={filteredFAQs.filter((faq) => faq.category === 'comparison')}
              openItems={openItems}
              toggleItem={toggleItem}
              trackHelpful={trackHelpful}
              helpfulVotes={helpfulVotes}
              categoryColor="var(--rv-life-primary-blue)"
            />

            {/* No Results */}
            {filteredFAQs.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="rv-headline-tertiary mb-2">No Questions Found</h3>
                <p className="rv-body-base text-[var(--rv-text-muted)] mb-6">
                  Try adjusting your search or category filter.
                  <br />
                  Can't find what you're looking for? Contact our support team.
                </p>
                <RVLifeButton variant="primary" href="#still-have-questions">
                  Contact Support
                </RVLifeButton>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Objection Handler Matrix */}
      <ObjectionHandlerSection />

      {/* CTA After Questions Answered */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[var(--rv-life-light-bg)] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="rv-headline-primary mb-4">Got Your Answers? Start Your Free Trial</h2>
            <p className="rv-body-large text-[var(--rv-text-secondary)] mb-8">
              Join 47,000+ Australian RVers travelling safer and smarter with RV Life Pro
            </p>

            <DiscountCodeBox
              codeType="standard"
              showUrgency={true}
              location="faq-cta"
              className="max-w-xl mx-auto mb-8"
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <RVLifeButton
                variant="primary"
                size="large"
                onClick={() => {
                  trackAffiliateClick('FAQ Page CTA', 'faq');
                  window.open(buildAffiliateLink('faq-main-cta'), '_blank');
                }}
              >
                Start Free 14-Day Trial
              </RVLifeButton>
              <RVLifeButton variant="outline" size="large" href="#comparison-questions">
                Compare Features
              </RVLifeButton>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--rv-text-secondary)]">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[var(--rv-life-secondary-green)]" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[var(--rv-life-secondary-green)]" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[var(--rv-life-secondary-green)]" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Building Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <TrustSignals layout="grid" showLinks={true} />
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <StillHaveQuestionsSection />

      {/* Related Resources */}
      <RelatedResourcesSection />
    </div>

    </Layout>
  );
};

/**
 * FAQ Section Component
 */
interface FAQSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  faqs: FAQItemExtended[];
  openItems: Set<string>;
  toggleItem: (id: string) => void;
  trackHelpful: (id: string, helpful: boolean) => void;
  helpfulVotes: Record<string, 'helpful' | 'notHelpful' | null>;
  categoryColor: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  id,
  title,
  icon,
  faqs,
  openItems,
  toggleItem,
  trackHelpful,
  helpfulVotes,
  categoryColor,
}) => {
  if (faqs.length === 0) return null;

  return (
    <Layout>
    <motion.div
      id={id}
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}
        >
          {icon}
        </div>
        <div>
          <h2 className="rv-headline-secondary">{title}</h2>
          <p className="text-sm text-[var(--rv-text-muted)]">{faqs.length} questions</p>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openItems.has(faq.id);
          const anchorId = `faq-${faq.id}`;
          const hasVoted = helpfulVotes[faq.id];

          return (
            <motion.div
              id={anchorId}
              key={faq.id}
              className="rv-card-base overflow-hidden scroll-mt-32"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className={cn(
                  'w-full flex items-start gap-4 p-6 text-left transition-colors duration-300',
                  'hover:bg-[var(--rv-life-light-bg)] hover:bg-opacity-50',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rv-life-primary-blue)] focus-visible:ring-inset'
                )}
                aria-expanded={isOpen}
                aria-controls={`answer-${faq.id}`}
              >
                {/* Question */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-[var(--rv-text-primary)] mb-1 pr-4">
                    {faq.question}
                  </h3>
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
                    id={`answer-${faq.id}`}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
                    }}
                  >
                    <div className="px-6 pb-6">
                      <div className="rv-body-base text-[var(--rv-text-secondary)] mb-4">
                        <p>{faq.answer}</p>
                      </div>

                      {/* Helpful Buttons & Share Link */}
                      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
                        <span className="text-sm text-[var(--rv-text-muted)]">Was this helpful?</span>

                        <div className="flex gap-2">
                          <button
                            onClick={() => trackHelpful(faq.id, true)}
                            className={cn(
                              'inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                              hasVoted === 'helpful'
                                ? 'bg-[var(--rv-life-secondary-green)] text-white'
                                : 'bg-gray-100 text-[var(--rv-text-secondary)] hover:bg-[var(--rv-life-secondary-green)] hover:bg-opacity-10'
                            )}
                            disabled={hasVoted !== null}
                          >
                            <ThumbsUp className="w-4 h-4" />
                            Yes
                          </button>
                          <button
                            onClick={() => trackHelpful(faq.id, false)}
                            className={cn(
                              'inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                              hasVoted === 'notHelpful'
                                ? 'bg-[var(--rv-life-warning-red)] text-white'
                                : 'bg-gray-100 text-[var(--rv-text-secondary)] hover:bg-[var(--rv-life-warning-red)] hover:bg-opacity-10'
                            )}
                            disabled={hasVoted !== null}
                          >
                            <ThumbsDown className="w-4 h-4" />
                            No
                          </button>
                        </div>

                        <div className="flex-1" />

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${window.location.origin}${window.location.pathname}#${anchorId}`
                            );
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-[var(--rv-text-secondary)] hover:bg-gray-200 transition-colors"
                          title="Copy link to this question"
                        >
                          <LinkIcon className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>

    </Layout>
  );
};

/**
 * Objection Handler Matrix Section
 */
const ObjectionHandlerSection: React.FC = () => {
  const objections = [
    {
      objection: "It's too expensive",
      counterArgument: 'One avoided mistake pays for years of service',
      proof: (
        <>
          Average bridge strike costs <strong>$15,000-$25,000</strong>. RV Life Pro costs{' '}
          <strong>$65/year</strong>. One prevented incident = <strong>230+ years</strong> of protection.
        </>
      ),
      icon: <DollarSign className="w-6 h-6" />,
      color: 'var(--rv-life-secondary-green)',
    },
    {
      objection: "I don't need it, I'm an experienced RVer",
      counterArgument: 'Experience prevents complacency, not road hazards',
      proof: (
        <>
          <strong>73% of bridge strikes</strong> happen to experienced RVers who "knew the route." New construction, changed
          signs, or one moment of distraction can happen to anyone.
        </>
      ),
      icon: <Award className="w-6 h-6" />,
      color: 'var(--rv-life-primary-blue)',
    },
    {
      objection: "It seems too complicated to set up",
      counterArgument: 'Setup takes under 60 seconds',
      proof: (
        <>
          Enter your RV height, length, and weight <strong>once</strong>. That's it. If you can use Google Maps, you can use
          RV Life Pro. <strong>89% of users</strong> navigate successfully on their first trip.
        </>
      ),
      icon: <Clock className="w-6 h-6" />,
      color: 'var(--rv-life-accent-orange)',
    },
    {
      objection: "I'm not sure it actually works",
      counterArgument: '14-day free trial proves it risk-free',
      proof: (
        <>
          Test it on your next trip with <strong>zero commitment</strong>. No credit card required. If it doesn't exceed your
          expectations, don't pay. <strong>89% of trial users</strong> subscribe after testing.
        </>
      ),
      icon: <Shield className="w-6 h-6" />,
      color: 'var(--rv-life-secondary-green)',
    },
    {
      objection: 'Google Maps is free',
      counterArgument: "Free doesn't mean safe for RVs",
      proof: (
        <>
          Google Maps has <strong>zero RV specific features</strong>. It doesn't know your height, weight, or propane
          restrictions. One mistake costs more than <strong>100 years</strong> of RV Life Pro.
        </>
      ),
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'var(--rv-life-warning-red)',
    },
    {
      objection: "I only RV occasionally",
      counterArgument: 'Infrequent use means higher risk',
      proof: (
        <>
          Weekend warriors have <strong>higher incident rates</strong> than full-timers. Less familiarity + less practice ={' '}
          <strong>more need</strong> for intelligent routing. Just <strong>$1.25/week</strong> for complete peace of mind.
        </>
      ),
      icon: <Users className="w-6 h-6" />,
      color: 'var(--rv-life-primary-blue)',
    },
    {
      objection: 'I already have a GPS device',
      counterArgument: 'Your GPS is outdated and Australia-limited',
      proof: (
        <>
          Dedicated RV GPS units cost <strong>$400-$800</strong>, charge for updates, have limited Australian data, and lack
          community reviews. RV Life Pro costs <strong>$65/year</strong> with weekly updates and 14,000+ campgrounds.
        </>
      ),
      icon: <MapPin className="w-6 h-6" />,
      color: 'var(--rv-life-accent-orange)',
    },
    {
      objection: "What if I don't like it?",
      counterArgument: '30-day money-back guarantee, no questions asked',
      proof: (
        <>
          Full refund within 30 days if you're not satisfied. We're confident you'll love it—
          <strong>98.7% of trial users</strong> remain subscribers after one year. Your satisfaction guaranteed.
        </>
      ),
      icon: <Check className="w-6 h-6" />,
      color: 'var(--rv-life-secondary-green)',
    },
  ];

  return (
    <Layout>
    <section id="objection-handler" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--rv-life-primary-blue)] bg-opacity-10 border-2 border-[var(--rv-life-primary-blue)] rounded-full mb-4">
              <HelpCircle className="w-5 h-5 text-[var(--rv-life-primary-blue)]" />
              <span className="font-semibold text-[var(--rv-life-primary-blue)]">Objection Handler</span>
            </div>
            <h2 className="rv-headline-primary mb-4">Still on the Fence? Let's Address That.</h2>
            <p className="rv-body-large text-[var(--rv-text-secondary)] max-w-3xl mx-auto">
              Every concern answered with data, logic, and proof points
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {objections.map((obj, index) => (
              <motion.div
                key={index}
                className="rv-card-base p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {/* Objection */}
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${obj.color}15`, color: obj.color }}
                  >
                    {obj.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--rv-text-primary)] mb-1">
                      <X className="w-4 h-4 inline text-[var(--rv-life-warning-red)] mr-1" />
                      "{obj.objection}"
                    </h3>
                  </div>
                </div>

                {/* Counter-argument */}
                <div className="mb-3 pl-13">
                  <div className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: obj.color }} />
                    <p className="font-semibold text-[var(--rv-text-primary)]">{obj.counterArgument}</p>
                  </div>
                </div>

                {/* Proof */}
                <div className="pl-13 p-3 bg-[var(--rv-life-light-bg)] rounded-lg">
                  <p className="text-sm text-[var(--rv-text-secondary)]">
                    <strong>Proof:</strong> {obj.proof}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ROI Quick Calculator */}
          <motion.div
            className="mt-12 rv-card-base p-8 bg-gradient-to-br from-[var(--rv-life-light-bg)] to-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--rv-life-secondary-green)] bg-opacity-10 border-2 border-[var(--rv-life-secondary-green)] rounded-full mb-4">
                <Calculator className="w-5 h-5 text-[var(--rv-life-secondary-green)]" />
                <span className="font-semibold text-[var(--rv-life-secondary-green)]">Quick ROI Calculator</span>
              </div>
              <h3 className="rv-headline-tertiary mb-2">The Math is Simple</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-sm text-[var(--rv-text-muted)] mb-2">Average Bridge Strike</div>
                <div className="text-4xl font-bold text-[var(--rv-life-warning-red)] mb-2">$20,000</div>
                <div className="text-xs text-[var(--rv-text-muted)]">Repair costs + insurance</div>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-sm text-[var(--rv-text-muted)] mb-2">RV Life Pro (Annual)</div>
                <div className="text-4xl font-bold text-[var(--rv-life-secondary-green)] mb-2">$65</div>
                <div className="text-xs text-[var(--rv-text-muted)]">With discount: $52/year</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] text-white rounded-lg">
                <div className="text-sm mb-2 opacity-90">Years of Protection</div>
                <div className="text-4xl font-bold mb-2">307</div>
                <div className="text-xs opacity-90">From one prevented strike</div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="rv-body-base text-[var(--rv-text-secondary)] mb-4">
                One avoided mistake pays for <strong>three centuries</strong> of RV Life Pro. The question isn't "Can I afford
                it?" It's "Can I afford <em>not</em> to have it?"
              </p>
              <RVLifeButton
                variant="primary"
                size="large"
                onClick={() => {
                  trackAffiliateClick('Objection Handler ROI CTA', 'faq-objections');
                  window.open(buildAffiliateLink('faq-objection-roi'), '_blank');
                }}
              >
                Start My Free Trial Now
              </RVLifeButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    </Layout>
  );
};

/**
 * Still Have Questions Section
 */
const StillHaveQuestionsSection: React.FC = () => {
  return (
    <Layout>
    <section id="still-have-questions" className="py-16 md:py-20 bg-[var(--rv-life-light-bg)]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="rv-headline-primary mb-4">Still Have Questions?</h2>
            <p className="rv-body-large text-[var(--rv-text-secondary)]">
              We're here to help. Get in touch with our Australian-based support team.
            </p>
          </motion.div>

          <RVLifeCardGrid columns={3} gap="medium">
            <RVLifeCard
              icon={<Smartphone className="w-8 h-8" />}
              iconBgColor="var(--rv-life-primary-blue)"
              headline="Email Support"
              body={
                <div>
                  <p className="text-sm text-[var(--rv-text-secondary)] mb-3">
                    Get detailed answers to your specific questions
                  </p>
                  <p className="text-sm font-semibold text-[var(--rv-life-primary-blue)]">
                    support@rvlifepro.com.au
                  </p>
                  <p className="text-xs text-[var(--rv-text-muted)] mt-2">Response within 4 business hours</p>
                </div>
              }
            />

            <RVLifeCard
              icon={<Users className="w-8 h-8" />}
              iconBgColor="var(--rv-life-secondary-green)"
              headline="Community Forums"
              body={
                <div>
                  <p className="text-sm text-[var(--rv-text-secondary)] mb-3">
                    Ask questions and get advice from 47,000+ RVers
                  </p>
                  <a
                    href="https://community.rvlifepro.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--rv-life-secondary-green)] hover:underline"
                  >
                    Visit Forums
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              }
            />

            <RVLifeCard
              icon={<FileText className="w-8 h-8" />}
              iconBgColor="var(--rv-life-accent-orange)"
              headline="Help Documentation"
              body={
                <div>
                  <p className="text-sm text-[var(--rv-text-secondary)] mb-3">
                    Video tutorials and step-by-step guides
                  </p>
                  <a
                    href="https://help.rvlifepro.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--rv-life-accent-orange)] hover:underline"
                  >
                    Browse Docs
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              }
            />
          </RVLifeCardGrid>

          {/* Response Time Guarantee */}
          <motion.div
            className="mt-12 rv-card-base p-6 bg-gradient-to-r from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-bold text-xl mb-2">Our Response Time Commitment</h3>
                <p className="text-white/90">
                  We respond to all support emails within <strong>4 business hours</strong>. Usually faster. Australian-based
                  team who understand your RV needs and travel conditions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    </Layout>
  );
};

/**
 * Related Resources Section
 */
const RelatedResourcesSection: React.FC = () => {
  const resources = [
    {
      title: 'Feature Comparison',
      description: 'See how RV Life Pro stacks up against competitors, regular GPS, and paper maps',
      icon: <GitCompare className="w-8 h-8" />,
      href: '/affiliate/rv-life-pro/comparison',
      color: 'var(--rv-life-primary-blue)',
    },
    {
      title: 'Real User Stories',
      description: 'Read detailed case studies from weekend warriors, grey nomads, and digital nomads',
      icon: <Users className="w-8 h-8" />,
      href: '/affiliate/rv-life-pro/stories',
      color: 'var(--rv-life-secondary-green)',
    },
    {
      title: 'Feature Deep Dives',
      description: 'Explore RV-safe routing, offline maps, maintenance tracking, and more in detail',
      icon: <Zap className="w-8 h-8" />,
      href: '/affiliate/rv-life-pro',
      color: 'var(--rv-life-accent-orange)',
    },
  ];

  return (
    <Layout>
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="rv-headline-primary mb-4">Related Resources</h2>
            <p className="rv-body-large text-[var(--rv-text-secondary)]">
              Dive deeper into what makes RV Life Pro the smartest investment for your RV
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.href}
                className="rv-card-base p-6 hover:shadow-xl transition-shadow duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${resource.color}15`, color: resource.color }}
                >
                  {resource.icon}
                </div>
                <h3 className="font-bold text-xl text-[var(--rv-text-primary)] mb-2 group-hover:text-[var(--rv-life-primary-blue)] transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-[var(--rv-text-secondary)] mb-4">{resource.description}</p>
                <div className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: resource.color }}>
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>

    </Layout>
  );
};

export default RVLifeProFAQ;
