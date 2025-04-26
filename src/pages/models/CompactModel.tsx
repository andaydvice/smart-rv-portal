
import { motion } from "framer-motion";
import { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { rvTypes } from "@/data/rvTypes";

// Lazy load components that are not immediately visible
const HeroSection = lazy(() => import("@/components/models/compact/HeroSection"));
const RVTypeCard = lazy(() => import("@/components/models/compact/RVTypeCard"));

// Loading placeholder
const LoadingPlaceholder = () => (
  <div className="animate-pulse flex flex-col space-y-4">
    <div className="h-64 bg-gray-800 rounded"></div>
    <div className="h-8 bg-gray-800 rounded w-3/4"></div>
    <div className="h-4 bg-gray-800 rounded w-1/2"></div>
  </div>
);

const CompactModel = () => {
  useEffect(() => {
    console.log("[CompactModel] Component mounted");
    window.scrollTo(0, 0);
    
    // Preload images for better user experience
    const preloadImages = () => {
      rvTypes.forEach(type => {
        if (type.image) {
          const img = new Image();
          img.src = type.image;
        }
      });
    };
    
    // Defer non-critical operations
    setTimeout(preloadImages, 1000);
  }, []);

  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 w-full">
        <Navbar />
        <Suspense fallback={<LoadingPlaceholder />}>
          <HeroSection />
          <div className="w-full px-4 py-12 pb-24">
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-12">
                {rvTypes.map((type, index) => (
                  <Suspense key={type.title} fallback={<LoadingPlaceholder />}>
                    <RVTypeCard key={index} {...type} index={index} />
                  </Suspense>
                ))}
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </Layout>
  );
};

export default CompactModel;
