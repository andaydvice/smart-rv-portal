import { motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/models/compact/HeroSection";
import RVTypeCard from "@/components/models/compact/RVTypeCard";
import { rvTypes } from "@/data/rvTypes";

const CompactModel = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-12">
            {rvTypes.map((type, index) => (
              <RVTypeCard key={index} {...type} index={index} />
            ))}
          </div>
        </div>
      </motion.main>
    </>
  );
};

export default CompactModel;