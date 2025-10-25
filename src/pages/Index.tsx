import React, { useEffect, lazy, Suspense } from "react";
import Layout from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { motion } from "framer-motion";
import { ContactSection } from "@/components/sections/ContactSection";
import { HomepageAffiliateSection } from "@/components/affiliate/HomepageAffiliateSection";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import SEO from "@/components/seo/SEO";
import { organizationSchema, websiteSchema } from "@/components/seo/schemas";
import { TrustStrip } from "@/components/sections/TrustStrip";
import TestimonialsSection from "@/components/sections/testimonials/TestimonialsSection";
// Critical above-the-fold components are now imported synchronously
import { FeaturesSection } from "@/components/sections/FeaturesSection";
// Keep below-the-fold components lazy for performance
const SustainabilitySection = lazy(() => import("@/components/sections/SustainabilitySection"));
const TechnologySection = lazy(() => import("@/components/sections/TechnologySection"));

import { SectionSkeleton } from "@/components/ui/skeletons";

const LoadingFallback = () => <SectionSkeleton height="h-80" />;

const Index = () => {
  useEffect(() => {
    // Force scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <SEO
        title="Smart RV Technology Hub | Connected, Safe, Efficient Living"
        description="Discover cutting-edge smart RV technology, connectivity solutions, safety systems, and ROI calculators for tech-savvy travelers and digital nomads. Expert reviews, guides, and tools."
        keywords="smart RV technology, RV connectivity, digital nomad, RV safety systems, mobile internet, solar power, RV automation, connected travel"
        ogImage="/og-image.svg"
        ogImageAlt="Smart RV Technology Hub - Connected Living Solutions"
        structuredData={[
          organizationSchema,
          websiteSchema,
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Featured RV Technology Partners',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'RV Life - Smart Technology', url: 'https://rvlife.com' },
              { '@type': 'ListItem', position: 2, name: 'WeBoost - Cellular Boosters', url: 'https://weboost.com' },
              { '@type': 'ListItem', position: 3, name: 'Good Sam - RV Services', url: 'https://goodsam.com' },
              { '@type': 'ListItem', position: 4, name: 'Outdoorsy - RV Rentals', url: 'https://outdoorsy.com' }
            ]
          }
        ]}
      />
      <motion.div 
        initial={false}
        className="min-h-screen w-full"
      >
        <HeroSection />
        
        {/* Quick Navigation to Storage Facilities Map */}
        <div className="bg-connectivity-darkBg py-8 px-4 border-t border-b border-gray-700">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Find RV Storage Facilities</h2>
            <p className="text-gray-300 mb-6">Interactive map with 196+ storage facilities nationwide</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="/storage-facilities" 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#5B9BD5] to-[#4B8FE3] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                View Storage Map
              </a>
            </motion.div>
          </div>
        </div>
        <TrustStrip />
        <TestimonialsSection />

        {/* Featured Tools & Resources Section */}
        <div className="bg-connectivity-darkBg py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Popular RV Technology Tools</h2>
            <p className="text-gray-300 text-lg text-center mb-12 max-w-3xl mx-auto">
              Free AI-powered tools to help you plan, assess, and optimize your RV technology setup.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <motion.a
                href="/tools/readiness-assessment"
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-[#151A22] to-[#1a202c] p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all group"
              >
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  Readiness Assessment
                </h3>
                <p className="text-gray-400 text-sm">
                  Personalized RV technology recommendations based on your experience and goals.
                </p>
              </motion.a>

              <motion.a
                href="/tools/feature-matcher"
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-[#151A22] to-[#1a202c] p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all group"
              >
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                  Feature Matcher
                </h3>
                <p className="text-gray-400 text-sm">
                  Discover which technology features match your specific RV usage plans.
                </p>
              </motion.a>

              <motion.a
                href="/calculators"
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-[#151A22] to-[#1a202c] p-6 rounded-xl border border-gray-700 hover:border-yellow-500 transition-all group"
              >
                <div className="text-4xl mb-3">🧮</div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  Cost Calculators
                </h3>
                <p className="text-gray-400 text-sm">
                  Calculate costs for solar, power, internet, and complete RV technology systems.
                </p>
              </motion.a>

              <motion.a
                href="/tools/intelligent-rv-finder"
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-[#151A22] to-[#1a202c] p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all group"
              >
                <div className="text-4xl mb-3">🚐</div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  RV Finder
                </h3>
                <p className="text-gray-400 text-sm">
                  AI-powered recommendations to find your perfect RV based on lifestyle and budget.
                </p>
              </motion.a>
            </div>

            <div className="text-center">
              <motion.a
                href="/tools"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                View All Tools
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Latest RV Technology Guides */}
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Latest RV Technology Guides</h2>
            <p className="text-gray-300 text-lg text-center mb-12 max-w-3xl mx-auto">
              Expert insights and practical guides for smart RV living, connectivity, and technology.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.a
                href="/blog/top-10-smart-rv-upgrades"
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-[#151A22] to-[#1a202c] rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all group"
              >
                <div className="p-6">
                  <div className="text-sm text-blue-400 font-semibold mb-2">TECH GUIDE</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    Top 10 Smart RV Upgrades
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Essential technology upgrades that transform any RV into a smart home on wheels.
                  </p>
                  <div className="text-blue-400 text-sm font-semibold flex items-center gap-1">
                    Read Guide
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="/blog/solar-power-for-rvs"
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-[#151A22] to-[#1a202c] rounded-xl overflow-hidden border border-gray-700 hover:border-green-500 transition-all group"
              >
                <div className="p-6">
                  <div className="text-sm text-green-400 font-semibold mb-2">POWER GUIDE</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                    Solar Power for RVs
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Complete guide to solar power systems, sizing, installation, and maximizing energy independence.
                  </p>
                  <div className="text-green-400 text-sm font-semibold flex items-center gap-1">
                    Read Guide
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="/blog/smart-rv-security-systems"
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-[#151A22] to-[#1a202c] rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all group"
              >
                <div className="p-6">
                  <div className="text-sm text-purple-400 font-semibold mb-2">SECURITY GUIDE</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    Smart RV Security Systems
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Protect your RV investment with modern security cameras, GPS tracking, and smart alarms.
                  </p>
                  <div className="text-purple-400 text-sm font-semibold flex items-center gap-1">
                    Read Guide
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            </div>

            <div className="text-center">
              <motion.a
                href="/blog"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                View All Articles
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Quick Access to Services */}
        <div className="bg-connectivity-darkBg py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Get Started with Smart RV Technology</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.a
                href="/pricing"
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-8 rounded-xl border border-blue-500/30 hover:border-blue-500 transition-all group"
              >
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  View Pricing
                </h3>
                <p className="text-gray-300 mb-4">
                  Explore our transparent pricing packages from $15k to $65k with professional installation included.
                </p>
                <div className="text-blue-400 font-semibold flex items-center gap-2">
                  See Packages
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </motion.a>

              <motion.a
                href="/products"
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-green-600/20 to-green-800/20 p-8 rounded-xl border border-green-500/30 hover:border-green-500 transition-all group"
              >
                <div className="text-5xl mb-4">🛒</div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                  Browse Products
                </h3>
                <p className="text-gray-300 mb-4">
                  Premium RV technology products from trusted brands with expert installation and support.
                </p>
                <div className="text-green-400 font-semibold flex items-center gap-2">
                  Shop Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-8 rounded-xl border border-purple-500/30 hover:border-purple-500 transition-all group"
              >
                <div className="text-5xl mb-4">📞</div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  Schedule Consultation
                </h3>
                <p className="text-gray-300 mb-4">
                  Free 30-minute consultation with RV technology experts. Virtual or in-person available.
                </p>
                <div className="text-purple-400 font-semibold flex items-center gap-2">
                  Contact Us
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Critical above-the-fold content loads immediately */}
        <FeaturesSection />
        
        <Suspense fallback={<LoadingFallback />}>
          <TechnologySection />
        </Suspense>
        {/* Premium affiliate section with customer-focused benefits */}
        <HomepageAffiliateSection />
        
        {/* Affiliate sections removed during cleanup */}
        
        <Suspense fallback={<LoadingFallback />}>
          <SustainabilitySection />
        </Suspense>
        <ContactSection />
        <div className="px-4">
          <AffiliateDisclosure className="max-w-6xl mx-auto my-8" />
        </div>
      </motion.div>
    </Layout>
  );
};

export default Index;
