
import { motion } from "framer-motion";
import { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { rvTypes } from "@/data/rvTypes";
import { preloadCriticalImages, deferOperation } from "@/utils/performance";

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
    window.scrollTo(0, 0);
    
    // Immediately preload the hero image
    preloadCriticalImages(["/lovable-uploads/598a2cb5-ffcb-440a-9943-6c4440749b9f.png"]);
    
    // Preload critical RV images (first 2)
    const criticalImages = rvTypes
      .slice(0, 2)
      .map(type => type.image)
      .filter(Boolean) as string[];
    
    preloadCriticalImages(criticalImages);
    
    // Defer non-critical images
    deferOperation(() => {
      const nonCriticalImages = rvTypes
        .slice(2)
        .map(type => type.image)
        .filter(Boolean) as string[];
      
      if (nonCriticalImages.length > 0) {
        preloadCriticalImages(nonCriticalImages);
      }
    }, 2000);
  }, []);

  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800">
        <Navbar />
        <Suspense fallback={<LoadingPlaceholder />}>
          <HeroSection />
          <div className="container mx-auto px-4 py-12 pb-24">
            <div className="grid gap-12">
              {rvTypes.map((type, index) => (
                <Suspense key={type.title} fallback={<LoadingPlaceholder />}>
                  <RVTypeCard key={index} {...type} index={index} />
                </Suspense>
              ))}
            </div>
          </div>
        </Suspense>
      </div>
    </Layout>
  );
};

export default CompactModel;
