
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { SustainabilitySection } from "@/components/sections/SustainabilitySection";
import { ContactSection } from "@/components/sections/ContactSection";
import PageTransition from "@/components/transitions/PageTransition";
import { toast } from "sonner";
import CustomLoader from "@/components/ui/CustomLoader";
import ForceRender from "@/components/recovery/ForceRender";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    console.log("Index component mounted");
    
    // Force dark background
    document.body.style.backgroundColor = '#080F1F';
    document.documentElement.style.backgroundColor = '#080F1F';
    
    // Ensure window is scrolled to top
    window.scrollTo(0, 0);
    
    // Set a timeout to simulate content loading and prevent "stuck" loading states
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Show a welcome toast after content is loaded
      toast.success("Welcome to the Smart Road Portal", {
        duration: 3000,
      });
    }, 300); // Short timeout to ensure UI updates
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Layout noFooter>
        <CustomLoader 
          message="Preparing your Smart RV experience..." 
          isFullScreen={true}
        />
      </Layout>
    );
  }

  return (
    <ForceRender pageName="index">
      <Layout>
        <PageTransition>
          <div className="min-h-screen bg-[#080F1F]">
            <HeroSection />
            <FeaturesSection />
            <TechnologySection />
            <SustainabilitySection />
            <ContactSection />
          </div>
        </PageTransition>
      </Layout>
    </ForceRender>
  );
};

export default Index;
