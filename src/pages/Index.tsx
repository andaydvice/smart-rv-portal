
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { SustainabilitySection } from "@/components/sections/SustainabilitySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle } from "lucide-react";
import { useEffect as useEffectOnce } from "react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [sectionsLoaded, setSectionsLoaded] = useState({
    hero: false,
    features: false,
    technology: false,
    sustainability: false,
    contact: false
  });

  // Handle loading state
  useEffect(() => {
    console.log("Index component mounted");
    
    // Track loading state
    const loadTimeout = setTimeout(() => {
      setIsLoading(false);
      
      // Show a toast to confirm the page has loaded
      toast.success("Welcome to the Smart Road Portal", {
        id: "welcome-toast", // Prevent duplicate toasts
        duration: 3000
      });
    }, 1000); // Reduced timeout for faster perceived performance
    
    // Handle potential errors
    const handleError = (event: ErrorEvent) => {
      console.error("Page load error:", event.error);
      setLoadError("An error occurred while loading the page");
      setIsLoading(false);
    };
    
    // Track when sections are in viewport and mark them as loaded
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute('data-section');
            if (section && Object.keys(sectionsLoaded).includes(section)) {
              setSectionsLoaded(prev => ({ ...prev, [section]: true }));
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Set up error handling
    window.addEventListener('error', handleError);
    
    return () => {
      clearTimeout(loadTimeout);
      window.removeEventListener('error', handleError);
      observer.disconnect();
    };
  }, []);

  // Fallback UI for loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080F1F] flex flex-col items-center justify-center text-white">
        <Spinner size="lg" className="text-[#5B9BD5] mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Loading Smart Road Portal</h2>
        <p className="text-gray-400">Please wait while we prepare your experience</p>
      </div>
    );
  }
  
  // Fallback UI for error state
  if (loadError) {
    return (
      <div className="min-h-screen bg-[#080F1F] flex flex-col items-center justify-center text-white">
        <div className="bg-red-900/30 p-6 rounded-lg max-w-md text-center border border-red-700">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-semibold mb-2">Unable to Load Page</h2>
          <p className="text-gray-300 mb-4">{loadError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#5B9BD5] hover:bg-[#4B8FE3] px-4 py-2 rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-[#080F1F]"
      >
        <Navbar />
        <div data-section="hero">
          <HeroSection />
        </div>
        <div data-section="features">
          <FeaturesSection />
        </div>
        <div data-section="technology">
          <TechnologySection />
        </div>
        <div data-section="sustainability">
          <SustainabilitySection />
        </div>
        <div data-section="contact">
          <ContactSection />
        </div>
      </motion.div>
    </Layout>
  );
};

export default Index;
