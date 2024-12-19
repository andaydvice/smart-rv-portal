import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AdventureHero from "@/components/adventure/AdventureHero";
import AdventureCategoryCard from "@/components/adventure/AdventureCategoryCard";
import KeyFeaturesCard from "@/components/adventure/KeyFeaturesCard";
import { adventureCategories, keyFeatures } from "@/data/adventure-data";

const AdventureModel = () => {
  return (
    <>
      <Navbar />
      <AdventureHero />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen px-4"
        style={{ backgroundColor: "#1B2028" }}
      >
        <div className="max-w-7xl mx-auto pt-16">
          <h2 className="text-2xl mb-8 text-gray-300">
            Explore Our Off Road RV Collection
          </h2>

          <div className="space-y-6">
            <AdventureCategoryCard categories={adventureCategories} />
            
            <div className="relative w-full h-[500px] mb-8 rounded-xl overflow-hidden bg-gray-900">
              <img 
                src="/lovable-uploads/c1732ddf-458c-4eeb-b6ad-7a817ae9ba17.png"
                alt="Adventure RV at sunset with campfire"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            <KeyFeaturesCard features={keyFeatures} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdventureModel;