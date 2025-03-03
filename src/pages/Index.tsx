
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { SustainabilitySection } from "@/components/sections/SustainabilitySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { motion } from "framer-motion";
import { FeatureHighlights } from "@/components/sections/FeatureHighlights";
import Layout from "@/components/layout/Layout";

const Index = () => {
  // Ensure we start at the top of the page
  useEffect(() => {
    // Force scroll to top
    window.scrollTo(0, 0);
    
    // Force visibility of hero section elements
    const forceVisibility = () => {
      const heroElements = document.querySelectorAll('.hero-section, section.h-screen');
      heroElements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.display = 'flex';
          element.style.visibility = 'visible';
          element.style.opacity = '1';
        }
      });
    };
    
    // Run immediately and multiple times to catch any late-rendering elements
    forceVisibility();
    setTimeout(forceVisibility, 100);
    setTimeout(forceVisibility, 500);
    setTimeout(forceVisibility, 1000);
    
    // Additional check for body and root visibility
    document.body.style.display = 'block';
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.display = 'block';
      root.style.visibility = 'visible';
      root.style.opacity = '1';
    }
  }, []);

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-[#080F1F]"
        style={{ display: 'block', visibility: 'visible', opacity: 1 }}
      >
        <Navbar />
        <HeroSection />
        <FeatureHighlights />
        <FeaturesSection />
        <TechnologySection />
        <SustainabilitySection />
        <ContactSection />
      </motion.div>
    </Layout>
  );
};

export default Index;
