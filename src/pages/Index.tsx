
import Navbar from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { SustainabilitySection } from "@/components/sections/SustainabilitySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Index = () => {
  // Add debug logs to track rendering
  useEffect(() => {
    console.log('Index component mounted');
    
    // Ensure all sections are visible after component mounts
    const sections = document.querySelectorAll('section, h1, p, button, img');
    sections.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        console.log(`Ensured visibility for ${el.tagName}`);
      }
    });
    
    return () => console.log('Index component unmounted');
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      style={{ visibility: 'visible', display: 'block' }}
    >
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TechnologySection />
      <SustainabilitySection />
      <ContactSection />
    </motion.div>
  );
};

export default Index;
