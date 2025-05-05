
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";
import { deferOperation, preloadCriticalImages } from "@/utils/performance";

// Import our new components
import HeroSection from "@/components/features/remote-control/HeroSection";
import MainFeaturesSection from "@/components/features/remote-control/MainFeaturesSection";
import TechnologyBreakdownSection from "@/components/features/remote-control/TechnologyBreakdownSection";
import UseCasesSection from "@/components/features/remote-control/UseCasesSection";
import ControlInterfaceSection from "@/components/features/remote-control/ControlInterfaceSection";
import CallToActionSection from "@/components/features/remote-control/CallToActionSection";

const RemoteControl = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Preload additional images that will be needed soon
    deferOperation(() => {
      preloadCriticalImages([
        '/lovable-uploads/58df06da-2491-453e-9f4d-11154ddb1104.png',
        '/lovable-uploads/51ac2438-08c7-47ee-b56d-876aa3bbdc80.png',
        '/lovable-uploads/1c1bb4c0-13a3-42f8-9b4d-f0aa74e2adb3.png'
      ]);
    }, 200);
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

          {/* Use Cases Section */}
          <UseCasesSection />

          {/* Control Interface Section */}
          <ControlInterfaceSection />

          {/* Call to Action Section */}
          <CallToActionSection />
        </div>
      </motion.div>
    </Layout>
  );
};

export default RemoteControl;
