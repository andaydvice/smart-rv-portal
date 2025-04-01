
import { motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/models/compact/HeroSection";
import RVTypeCard from "@/components/models/compact/RVTypeCard";
import { rvTypes } from "@/data/rvTypes";
import Layout from "@/components/layout/Layout";

const CompactModel = () => {
  useEffect(() => {
    console.log("[CompactModel] Component mounted");
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800">
        <HeroSection />
        <div className="container mx-auto px-4 py-12 pb-24">
          <div className="grid gap-12">
            {rvTypes.map((type, index) => (
              <RVTypeCard key={index} {...type} index={index} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompactModel;
