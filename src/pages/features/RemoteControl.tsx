
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";
import { preloadCriticalImages } from "@/utils/performance";

// Import our new components
import HeroSection from "@/components/features/remote-control/HeroSection";
import MainFeaturesSection from "@/components/features/remote-control/MainFeaturesSection";
import TechnologyBreakdownSection from "@/components/features/remote-control/TechnologyBreakdownSection";
import UseCasesSection from "@/components/features/remote-control/UseCasesSection";
import ControlInterfaceSection from "@/components/features/remote-control/ControlInterfaceSection";
import CallToActionSection from "@/components/features/remote-control/CallToActionSection";
import InterfaceDemoSection from "@/components/features/remote-control/InterfaceDemoSection";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";

const RemoteControl = () => {
  useEffect(() => {
    // Force scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Critical images for this page
    const criticalImages = [
      '/lovable-uploads/cdb72cba-3fb1-44e9-8aea-bde00743141a.png', // Hero image
      '/lovable-uploads/1052608d-e42b-4079-9281-20406179ce4d.png', // Smartphone control
      '/lovable-uploads/af7df254-2b02-454a-a483-7e1e230dc571.png', // System integration
      '/lovable-uploads/927988b5-f130-4e93-847b-20474831470d.png', // Control interface 
      '/lovable-uploads/7b0c607c-52e6-47d2-b5fa-f5cbb912f20a.png'  // New interface demo image
    ];
    
    // Immediately preload critical images without delay
    console.log('Preloading critical images for Remote Control page');
    preloadCriticalImages(criticalImages);
    
    // Also manually preload images to ensure they're cached
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.fetchPriority = 'high';
      img.onload = () => console.log(`Image preloaded: ${src}`);
      img.onerror = () => console.error(`Failed to preload: ${src}`);
    });
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          {/* Main Features Section */}
          <MainFeaturesSection />

          {/* Technology Breakdown Section */}
          <TechnologyBreakdownSection />

          {/* Interface Demo Section - New section */}
          <InterfaceDemoSection />

          {/* Use Cases Section */}
          <UseCasesSection />

          {/* Control Interface Section */}
          <ControlInterfaceSection />

          {/* Remote Control Solutions */}
          <OptimizedAffiliateGrid
            title="Professional Remote Control Solutions"
            subtitle="Enhance your smart RV remote capabilities with professional monitoring and mobile app integration from our trusted partners."
            partners={[
              {
                partner: 'invertersrus',
                title: 'Victron Smart Monitoring',
                description: 'Professional remote monitoring systems with real-time alerts and diagnostics for complete peace of mind.',
                features: [
                  'Real-time system monitoring',
                  'Mobile app integration',
                  'Professional installation',
                  'Expert technical support'
                ]
              },
              {
                partner: 'rvlife',
                title: 'RV Life Mobile Apps',
                description: 'Comprehensive mobile app suite for trip planning, navigation, and remote RV management.',
                features: [
                  'Trip planning tools',
                  'RV-safe GPS navigation',
                  'Remote system access',
                  'Community features'
                ]
              },
              {
                partner: 'goodsam',
                title: 'Good Sam Remote Support',
                description: 'Professional technical support and emergency assistance for your Smart RV Hub systems.',
                features: [
                  '24/7 technical support',
                  'Remote diagnostics',
                  'Emergency assistance',
                  'System troubleshooting'
                ]
              }
            ]}
            gridCols="3"
            className="mb-16"
          />

          {/* Call to Action Section */}
          <CallToActionSection />
        </div>
      </motion.div>
    </Layout>
  );
};

export default RemoteControl;
