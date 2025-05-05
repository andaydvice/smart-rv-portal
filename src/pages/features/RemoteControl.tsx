
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

const RemoteControl = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Immediately preload critical images without delay
    preloadCriticalImages([
      '/lovable-uploads/cdb72cba-3fb1-44e9-8aea-bde00743141a.png', // Hero image
      '/lovable-uploads/1052608d-e42b-4079-9281-20406179ce4d.png', // Smartphone control
      '/lovable-uploads/af7df254-2b02-454a-a483-7e1e230dc571.png', // System integration
      '/lovable-uploads/58df06da-2491-453e-9f4d-11154ddb1104.png'  // Control interface
    ]);
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
