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
const SustainabilitySection = lazy(() => import("@/components/sections/SustainabilitySection").then(mod => ({ 
  default: mod.SustainabilitySection 
})));
const TechnologySection = lazy(() => import("@/components/sections/TechnologySection").then(mod => ({
  default: mod.TechnologySection
})));

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
        <TrustStrip />
        <TestimonialsSection />
        
        {/* Critical above-the-fold content loads immediately */}
        <FeaturesSection />
        
        <Suspense fallback={<LoadingFallback />}>
          <TechnologySection />
        </Suspense>
        {/* Premium affiliate section with customer-focused benefits */}
        <HomepageAffiliateSection />
        
        {/* Strategic affiliate partnerships - customer focused */}
        <section className="py-16 px-4 bg-gradient-to-br from-connectivity-darkBg to-[#0A0F1A]" style={{ contentVisibility: "auto", containIntrinsicSize: "1200px" }}>
          <div className="max-w-6xl mx-auto">
            <OptimizedAffiliateGrid
              title="Complete Smart RV Solutions Ecosystem"
              subtitle="Everything you need for smart RV living - from solar power to connectivity, all with proven quality and reliability."
              partners={[
                { partner: 'overlandsolar' as const, title: 'Solar Power Leader', description: 'Complete off-grid solar solutions with premium quality and proven reliability for intelligent power management' },
                { partner: 'rvlife' as const, title: 'Smart Technology', description: 'Professional Smart RV Hub systems and digital tools trusted worldwide for intelligent RV control' },
                { partner: 'weboost' as const, title: 'Cellular Boosters', description: 'Professional signal boosters for reliable cellular connectivity anywhere you travel' },
                { partner: 'goodsam' as const, title: 'RV Services', description: 'Premium RV services and support trusted by professionals for safe intelligent travel' }
              ]}
              gridCols="4"
            />
          </div>
        </section>
        
        <Suspense fallback={<LoadingFallback />}>
          <SustainabilitySection />
        </Suspense>
        <ContactSection />
        <div className="px-4">
          <AffiliateDisclosure compact className="max-w-6xl mx-auto my-8" />
        </div>
      </motion.div>
    </Layout>
  );
};

export default Index;
