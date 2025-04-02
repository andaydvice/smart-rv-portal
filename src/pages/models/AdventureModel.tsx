
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AdventureHero from "@/components/adventure/AdventureHero";
import AdventureCategoryCard from "@/components/adventure/AdventureCategoryCard";
import KeyFeaturesCard from "@/components/adventure/KeyFeaturesCard";
import { adventureCategories, keyFeatures } from "@/data/adventure-data";
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";
import PageTransition from "@/components/transitions/PageTransition";
import ForceRender from "@/components/recovery/ForceRender";

const AdventureModel = () => {
  useEffect(() => {
    console.log("[AdventureModel] Component mounted");
    window.scrollTo(0, 0);
    
    // Force background color on body and html
    document.documentElement.style.backgroundColor = '#080F1F';
    document.body.style.backgroundColor = '#080F1F';
  }, []);

  return (
    <ForceRender pageName="adventure">
      <Layout>
        <PageTransition>
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
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
          </div>
        </PageTransition>
      </Layout>
    </ForceRender>
  );
};

export default AdventureModel;
