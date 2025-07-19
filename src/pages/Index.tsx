import React, { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { TechnologySection } from "@/components/sections/TechnologySection";
// MODIFIED: Direct import for ContactSection added
import { ContactSection } from "@/components/sections/ContactSection";

import { HomepageAffiliateSection } from "@/components/affiliate/HomepageAffiliateSection";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";

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
      toast.success("Welcome to the Smart Road Portal");
    }, 1000);
    
    // Force scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen w-full"
      >
        <HeroSection />
        
        <Suspense fallback={<LoadingFallback />}>
          <FeaturesSection />
        </Suspense>
        
        {/* Changed from lazy-loaded to direct import */}
        <TechnologySection />
        
        {/* Premium affiliate section with new high-value partners */}
        <HomepageAffiliateSection />
        
        {/* Strategic affiliate partnerships */}
        <section className="py-16 px-4 bg-gradient-to-br from-connectivity-darkBg to-[#0A0F1A]">
          <div className="max-w-6xl mx-auto">
            <OptimizedAffiliateGrid
              title="Complete RV Solutions Ecosystem"
              subtitle="Everything you need for smart RV living - from solar power to connectivity, all with premium commission tracking."
              partners={[
                { partner: 'renogy' as const, title: 'Solar Power Leader', description: 'Most trusted solar brand with complete RV kits and 6% commission' },
                { partner: 'victron' as const, title: 'Power Management', description: 'Professional power monitoring and inverter systems (5% commission)' },
                { partner: 'winegard' as const, title: 'Internet Solutions', description: 'Starlink mounts and connectivity boosters (4.5% commission)' },
                { partner: 'torklift' as const, title: 'Towing Accessories', description: 'Premium tie-downs and RV accessories (8% commission)' }
              ]}
              gridCols="4"
            />
          </div>
        </section>
        
        <Suspense fallback={<LoadingFallback />}>
          <SustainabilitySection />
        </Suspense>
        
        <ContactSection />
      </motion.div>
    </Layout>
  );
};

export default Index;
