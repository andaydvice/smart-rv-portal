
import { motion } from "framer-motion";
// Navbar removed as Layout includes it
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
      <div className="bg-deeper-background w-full"> {/* Updated to deeper-background for consistency */}
        <AdventureHero />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full px-4 pb-16" // Reduced pb-24 to pb-16
          style={{ backgroundColor: "#080F1F" }} // Using main page background from branding
        >
          <Container className="pt-12"> {/* Reduced pt-16 to pt-12 */}
            <h2 className="text-3xl font-bold mb-10 text-center text-white"> {/* Centered and styled heading */}
              Explore Our Off-Road RV Collection
            </h2>

            <div className="space-y-10"> {/* Increased space-y-6 to space-y-10 */}
              <AdventureCategoryCard categories={adventureCategories} />
              {/* The "Additional Pricing Context" section previously added here has been removed. */}
              <KeyFeaturesCard features={keyFeatures} />
            </div>
          </Container>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AdventureModel;

