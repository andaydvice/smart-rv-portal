
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AdventureHero from "@/components/adventure/AdventureHero";
import AdventureCategoryCard from "@/components/adventure/AdventureCategoryCard";
import KeyFeaturesCard from "@/components/adventure/KeyFeaturesCard";
import { adventureCategories, keyFeatures } from "@/data/adventure-data";
import Layout from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { useEffect } from "react";

const AdventureModel = () => {
  useEffect(() => {
    console.log("[AdventureModel] Component mounted");
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 w-full">
        <AdventureHero />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full px-4 pb-24"
          style={{ backgroundColor: "#1B2028" }}
        >
          <Container className="pt-16">
            <h2 className="text-2xl mb-8 text-gray-300">
              Explore Our Off Road RV Collection
            </h2>

            <div className="space-y-6">
              <AdventureCategoryCard categories={adventureCategories} />
              <KeyFeaturesCard features={keyFeatures} />
            </div>
          </Container>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AdventureModel;
