import React, { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HomepageAffiliateSection } from "@/components/affiliate/HomepageAffiliateSection";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Helmet } from "react-helmet-async";
import { TrustStrip } from "@/components/sections/TrustStrip";
import TestimonialsSection from "@/components/sections/testimonials/TestimonialsSection";
// Lazy load components that aren't needed immediately
const FeaturesSection = lazy(() => import("@/components/sections/FeaturesSection").then(mod => ({ 
  default: mod.FeaturesSection 
})));
const SustainabilitySection = lazy(() => import("@/components/sections/SustainabilitySection").then(mod => ({ 
  default: mod.SustainabilitySection 
})));
// MODIFIED: Lazy import for ContactSection removed
// const ContactSection = lazy(() => import("@/components/sections/ContactSection").then(mod => ({ 
//   default: mod.ContactSection 
// })));

const LoadingFallback = () => (
  <div className="w-full py-20 flex items-center justify-center">
    <div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div>
  </div>
);

const Index = () => {
  useEffect(() => {
    console.log("Index component mounted");
    
    // Show a toast to confirm the page has loaded
    setTimeout(() => {
      toast.success("Welcome to the Smart RV Portal");
    }, 1000);
    
    // Force scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Smart RV Technology Hub | Connected, Safe, Efficient</title>
        <meta name="description" content="Explore smart RV technology, connectivity, safety systems, and ROI tools for tech-savvy travelers and digital nomads." />
        <link rel="canonical" href={window.location.origin + "/"} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Smart RV Technology Hub',
            url: window.location.origin + '/',
            potentialAction: {
              '@type': 'SearchAction',
              target: window.location.origin + '/search?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Renogy - Solar Power Leader', url: 'https://renogy.com?ref=smartrenogy' },
              { '@type': 'ListItem', position: 2, name: 'Victron Energy - Power Management', url: 'https://victronenergy.com?ref=smartpower' },
              { '@type': 'ListItem', position: 3, name: 'Winegard - Internet Solutions', url: 'https://winegard.com?ref=smartconnect' },
              { '@type': 'ListItem', position: 4, name: 'Torklift - Towing Accessories', url: 'https://torklift.com?ref=smartlift' }
            ]
          })}
        </script>
      </Helmet>
      <motion.div 
        transition={{ duration: 0.6 }}
        className="min-h-screen w-full"
      >
        <HeroSection />
        <TrustStrip />
        <TestimonialsSection />
        
        <Suspense fallback={<LoadingFallback />}>
          <FeaturesSection />
        </Suspense>
        
        <TechnologySection />
        
        {/* Premium affiliate section with customer-focused benefits */}
        <HomepageAffiliateSection />
        
        {/* Strategic affiliate partnerships - customer focused */}
        <section className="py-16 px-4 bg-gradient-to-br from-connectivity-darkBg to-[#0A0F1A]">
          <div className="max-w-6xl mx-auto">
            <OptimizedAffiliateGrid
              title="Complete Smart RV Solutions Ecosystem"
              subtitle="Everything you need for smart RV living - from solar power to connectivity, all with proven quality and reliability."
              partners={[
                { partner: 'renogy' as const, title: 'Solar Power Leader', description: 'Most trusted solar brand with complete smart RV kits and proven reliability for intelligent power management' },
                { partner: 'victron' as const, title: 'Power Management', description: 'Professional smart RV power monitoring and inverter systems trusted worldwide for intelligent energy control' },
                { partner: 'winegard' as const, title: 'Internet Solutions', description: 'Starlink mounts and connectivity boosters for reliable smart RV internet anywhere you travel' },
                { partner: 'torklift' as const, title: 'Towing Accessories', description: 'Premium tie-downs and smart RV accessories trusted by professionals for safe intelligent travel' }
              ]}
              gridCols="4"
              videoId="complete-rv-ecosystem"
              videoTitle="Complete RV Solutions Demo"
              priority="high"
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
