
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import SystemArchitectureSection from "@/components/documentation/sections/SystemArchitectureSection";
import NetworkInfrastructureSection from "@/components/documentation/sections/NetworkInfrastructureSection";
import PowerManagementSection from "@/components/documentation/sections/PowerManagementSection";
import SecuritySection from "@/components/documentation/sections/SecuritySection";
import Layout from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { LazyImage } from "@/components/ui/LazyImage";
import { generateImagePlaceholder } from "@/utils/performance";
import { useEffect } from "react";
import { preloadCriticalImages } from "@/utils/performance";

const CompleteDocumentation = () => {
  // Preload critical image with multiple methods for guaranteed immediate loading
  useEffect(() => {
    const imageSrc = '/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png';
    
    // Method 1: Create high priority preload link
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imageSrc;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
    
    // Method 2: Use the Image constructor to force browser to load immediately
    const img = new Image();
    img.src = imageSrc;
    img.fetchPriority = 'high';
    
    // Method 3: Also use the performance utility for redundancy
    preloadCriticalImages([imageSrc]);
    
    // Clean up function to remove the link when component unmounts
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <Layout>
      <div className="w-full px-4 pt-24 pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Link to="/documentation">
              <Button
                variant="outline"
                className="bg-white/5 text-[#0EA5E9] border-white/20 hover:bg-white/10 hover:text-white text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Documentation Overview
              </Button>
            </Link>

            <div className="relative w-full max-w-5xl mx-auto h-[400px] rounded-xl overflow-hidden mb-12 border border-gray-700">
              <LazyImage
                src="/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png"
                alt="Smart RV Complete System Documentation"
                className="w-full h-full object-cover"
                blurDataURL={generateImagePlaceholder(800, 400)}
                priority={true}
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
                <h1 className="text-3xl font-bold text-white mb-3 image-overlay-headline">
                  Complete System Documentation
                </h1>
                <p className="text-base text-gray-200 max-w-2xl mx-auto">
                  Comprehensive technical documentation covering all aspects of your Smart RV System
                </p>
              </div>
            </div>

            <div className="border border-gray-700 rounded-lg p-6 bg-[#091020] max-w-5xl mx-auto">
              <Accordion type="single" collapsible className="space-y-6">
                <SystemArchitectureSection />
                <NetworkInfrastructureSection />
                <PowerManagementSection />
                <SecuritySection />
              </Accordion>
            </div>
          </motion.div>
        </Container>
      </div>
    </Layout>
  );
};

export default CompleteDocumentation;
