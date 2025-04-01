
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { SustainabilitySection } from "@/components/sections/SustainabilitySection";
import { ContactSection } from "@/components/sections/ContactSection";
import PageTransition from "@/components/transitions/PageTransition";
import { toast } from "sonner";

const Index = () => {
  useEffect(() => {
    console.log("Index component mounted");
    
    // Show a toast to confirm the page has loaded
    setTimeout(() => {
      toast.success("Welcome to the Smart Road Portal");
    }, 1000);
    
    // Ensure window is scrolled to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <HeroSection />
          <FeaturesSection />
          <TechnologySection />
          <SustainabilitySection />
          <ContactSection />
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Index;
