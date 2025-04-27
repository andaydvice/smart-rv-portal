
import React, { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { TechnologySection } from "@/components/sections/TechnologySection";

// Lazy load components that aren't needed immediately
const FeaturesSection = lazy(() => import("@/components/sections/FeaturesSection").then(mod => ({ 
  default: mod.FeaturesSection 
})));
const SustainabilitySection = lazy(() => import("@/components/sections/SustainabilitySection").then(mod => ({ 
  default: mod.SustainabilitySection 
})));
const ContactSection = lazy(() => import("@/components/sections/ContactSection").then(mod => ({ 
  default: mod.ContactSection 
})));

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
        
        <Suspense fallback={<LoadingFallback />}>
          <SustainabilitySection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <ContactSection />
        </Suspense>
      </motion.div>
    </Layout>
  );
};

export default Index;
