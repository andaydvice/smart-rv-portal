
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

              {/* New Section for Additional Pricing Context */}
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-lg">
                <h3 className="text-xl font-semibold text-connectivity-accent mb-4">
                  Additional Pricing Context (USA, 2025)
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm mb-4">
                  <li>
                    Smart locks like the RVLock V4 or Ultra ES Pro typically cost $100–$250 and feature keyless entry, remote control, and easy DIY installation[10][12].
                  </li>
                  <li>
                    Video DVRs for multi-camera setups range from $391 (basic 5-channel DVR) to $3,200+ for advanced multi-channel, GPS-enabled systems[7].
                  </li>
                </ul>
                <p className="text-xs text-gray-400">
                  All listed prices are current as of 2025 and reflect standard retail rates in the USA. Pricing for specific models and custom builds can vary based on options and dealer. Citations refer to general market research for security system components[2][5][7].
                </p>
              </div>

              <KeyFeaturesCard features={keyFeatures} />
            </div>
          </Container>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AdventureModel;
