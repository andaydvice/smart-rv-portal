import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SustainabilitySection } from "@/components/sections/SustainabilitySection";
import { motion } from "framer-motion";

const Index = () => {
  useEffect(() => {
    // Log any feature detection warnings
    console.log("Initializing feature detection logging");
    window.addEventListener("unhandledrejection", (event) => {
      console.warn("Unhandled promise rejection:", event.reason);
    });

    // Scroll to top on mount
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener("unhandledrejection", () => {});
    };
  }, []);

  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <HeroSection />
        <FeaturesSection />
        <TechnologySection />
        <SustainabilitySection />
        <ContactSection />
      </motion.main>
    </>
  );
};

export default Index;