
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
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-[#080F1F]"
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
