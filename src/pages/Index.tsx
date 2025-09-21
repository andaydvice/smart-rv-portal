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
              { '@type': 'ListItem', position: 1, name: 'LiTime Battery Systems - Lithium Power Leader', url: 'https://www.litime.com?ref=smartpower' },
              { '@type': 'ListItem', position: 2, name: 'RV Life - Smart Technology', url: 'https://rvlife.com?ref=smarttech' },
              { '@type': 'ListItem', position: 3, name: 'WeBoost - Cellular Boosters', url: 'https://weboost.com?ref=smartrv' },
              { '@type': 'ListItem', position: 4, name: 'Good Sam - RV Services', url: 'https://goodsam.com?ref=smartrv' }
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
