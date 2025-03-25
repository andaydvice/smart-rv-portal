
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AdventureHero from "@/components/adventure/AdventureHero";
import AdventureCategoryCard from "@/components/adventure/AdventureCategoryCard";
import KeyFeaturesCard from "@/components/adventure/KeyFeaturesCard";
import { adventureCategories, keyFeatures } from "@/data/adventure-data";
import Layout from "@/components/layout/Layout";

const AdventureModel = () => {
  return (
    <Layout>
      <Navbar />
      <AdventureHero />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="px-4 pb-24"
        style={{ backgroundColor: "#1B2028" }}
      >
        <div className="max-w-7xl mx-auto pt-16">
          <h2 className="text-2xl mb-8 text-gray-300">
            Explore Our Off Road RV Collection
          </h2>

          <div className="space-y-6">
            <AdventureCategoryCard categories={adventureCategories} />
            <KeyFeaturesCard features={keyFeatures} />
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default AdventureModel;
