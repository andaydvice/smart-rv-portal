
import React, { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { ContactSection } from "@/components/sections/ContactSection";
import CoreWebVitalsMonitor from "@/components/analytics/CoreWebVitalsMonitor";
import ConversionTracker from "@/components/analytics/ConversionTracker";
import RevenueAttribution from "@/components/analytics/RevenueAttribution";
import SEOHelmet from "@/components/seo/SEOHelmet";
import StructuredData from "@/components/seo/StructuredData";
import InvisibleSEO from "@/components/seo/InvisibleSEO";
import InternationalBanner from "@/components/international/InternationalBanner";

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
      <SEOHelmet 
        title="Smart RV Technology - Luxury RV Living & Mobile Home Solutions"
        description="Discover the future of RV living with smart technology, luxury features, solar power solutions, emergency services, and innovative apps for modern mobile homes."
        keywords="smart RV, luxury RV, RV technology, mobile living, RV apps, solar power, RV emergency, RV storage, smart home, recreational vehicle"
        url={window.location.href}
        type="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Smart RV Technology",
          "url": window.location.origin,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${window.location.origin}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }}
      />
      
      <StructuredData 
        type="Organization" 
        data={{
          name: "Smart RV Technology",
          url: window.location.origin,
          logo: `${window.location.origin}/logo.png`,
          description: "Leading provider of smart RV technology, luxury mobile living solutions, solar power systems, and emergency services for recreational vehicles.",
          contactPoint: {
            telephone: "+1-800-SMART-RV",
            contactType: "customer service"
          },
          sameAs: [
            "https://facebook.com/smartrvtech",
            "https://twitter.com/smartrvtech",
            "https://linkedin.com/company/smartrvtech"
          ]
        }} 
      />
      
      <CoreWebVitalsMonitor pageName="homepage" enableDebugMode={false} />
      <ConversionTracker pageName="homepage" affiliatePartners={['amazon', 'renogy', 'rvlife']} />
      <RevenueAttribution 
        pageName="homepage" 
        category="affiliate_landing"
        products={[
          { id: 'rv-apps', name: 'RV Apps Hub', price: 0, partner: 'rvlife' },
          { id: 'solar-guide', name: 'Solar Power Guide', price: 0, partner: 'renogy' },
          { id: 'emergency-center', name: 'Emergency Center', price: 0, partner: 'amazon' }
        ]}
      />
      
      <InvisibleSEO 
        pageType="homepage"
        pageTitle="Smart RV Technology"
        pageContent="Discover the future of RV living with smart technology, luxury features, solar power solutions, emergency services, and innovative apps for modern mobile homes."
        category="technology"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white"
      >
        {/* International Banner - only shows for non-USA visitors */}
        <InternationalBanner />
        {/* Hero Section starts immediately */}
        <HeroSection />
        
        <Suspense fallback={<LoadingFallback />}>
          <FeaturesSection />
        </Suspense>
        
        {/* Changed from lazy-loaded to direct import */}
        <TechnologySection />
        
        <Suspense fallback={<LoadingFallback />}>
          <SustainabilitySection />
        </Suspense>
        
        {/* Affiliate Revenue Section */}
        <section className="py-16 bg-gradient-to-b from-[#151A22] to-[#080F1F]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Essential RV Resources
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Get equipped with the best tools, apps, and emergency services for your RV adventures.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-[#091020] border border-gray-700 rounded-lg p-6 text-center hover:border-[#5B9BD5]/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#5B9BD5] to-[#4B8FE3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Essential Apps & Tools</h3>
                <p className="text-gray-400 mb-4">GPS navigation, campsite finders, and mobile tech for the modern RVer.</p>
                <NavLink 
                  to="/rv-apps-hub"
                  className="inline-block bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Explore Apps
                </NavLink>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-[#091020] border border-gray-700 rounded-lg p-6 text-center hover:border-[#5B9BD5]/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">☀️</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Solar Power Guide</h3>
                <p className="text-gray-400 mb-4">Complete guide to RV solar systems, equipment, and installation tips.</p>
                <NavLink 
                  to="/solar-power-guide"
                  className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Solar Solutions
                </NavLink>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-[#091020] border border-gray-700 rounded-lg p-6 text-center hover:border-[#5B9BD5]/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚨</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Emergency Preparedness</h3>
                <p className="text-gray-400 mb-4">Safety equipment, roadside assistance, and emergency planning resources.</p>
                <NavLink 
                  to="/rv-emergency-center"
                  className="inline-block bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Stay Safe
                </NavLink>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MODIFIED: Suspense wrapper removed and ContactSection directly rendered */}
        <ContactSection />
      </motion.div>
    </Layout>
  );
};

export default Index;
