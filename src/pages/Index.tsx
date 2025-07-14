
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
        className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white"
      >
        <HeroSection />
        
        <Suspense fallback={<LoadingFallback />}>
          <FeaturesSection />
        </Suspense>
        
        {/* Changed from lazy-loaded to direct import */}
        <TechnologySection />
        
        {/* High-commission affiliate section */}
        <HomepageAffiliateSection />
        
        {/* Main affiliate section for homepage */}
        <OptimizedAffiliateGrid
          title="Start Your Smart RV Journey"
          subtitle="Everything you need to upgrade your RV with smart technology and enhance your travel experience."
          partners={[
            { partner: 'technorv', title: 'Smart RV Tech', description: 'Latest smart RV technology and automation systems' },
            { partner: 'rvlife', title: 'Trip Planning', description: 'Plan your routes and discover amazing destinations' },
            { partner: 'goodsam', title: 'RV Community', description: 'Join the largest RV community for support and tips' },
            { partner: 'rvshare', title: 'RV Rentals', description: 'Rent an RV to try before you buy your smart RV' }
          ]}
          gridCols="2"
          className="my-16"
        />
        
        <Suspense fallback={<LoadingFallback />}>
          <SustainabilitySection />
        </Suspense>
        
        {/* MODIFIED: Suspense wrapper removed and ContactSection directly rendered */}
        <ContactSection />
      </motion.div>
    </Layout>
  );
};

export default Index;
