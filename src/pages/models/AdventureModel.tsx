
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AdventureHero from "@/components/adventure/AdventureHero";
import AdventureCategoryCard from "@/components/adventure/AdventureCategoryCard";
import KeyFeaturesCard from "@/components/adventure/KeyFeaturesCard";
import { adventureCategories, keyFeatures } from "@/data/adventure-data";
import Layout from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { useEffect } from "react";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";

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
          
          {/* Adventure RV Partners */}
          <Container className="pt-16">
            <OptimizedAffiliateGrid
              title="Adventure RV Essentials"
              subtitle="Gear up for off-grid adventures with specialized equipment, expert guidance, and adventure-ready services."
              partners={[
                {
                  partner: 'outdoorsy',
                  title: 'Adventure RV Experiences',
                  description: 'Book unique outdoor adventures and specialized off-road RV experiences in stunning locations.',
                  features: ['Adventure Locations', 'Off-Grid Experiences', 'Specialized RVs', 'Expert Guides'],
                  buttonText: 'Book Adventure'
                },
                {
                  partner: 'technorv',
                  title: 'Off-Grid Technology',
                  description: 'Advanced solar systems, satellite connectivity, and monitoring for remote adventure travel.',
                  features: ['Solar Solutions', 'Satellite Internet', 'Remote Monitoring', 'Off-Grid Power'],
                  buttonText: 'Shop Adventure Tech'
                },
                {
                  partner: 'goodsam',
                  title: 'Adventure Support Services',
                  description: 'Specialized roadside assistance and emergency support for remote and off-grid adventures.',
                  features: ['Remote Area Support', 'Emergency Services', 'Adventure Coverage', 'Expert Assistance'],
                  buttonText: 'Get Adventure Protection'
                },
                {
                  partner: 'rvlife',
                  title: 'Adventure Route Planning',
                  description: 'Discover off-grid destinations, boondocking spots, and adventure routes perfect for exploration.',
                  features: ['Boondocking Locations', 'Off-Grid Routes', 'Adventure Planning', 'Community Insights'],
                  buttonText: 'Plan Adventures'
                },
                {
                  partner: 'rvshare',
                  title: 'Adventure RV Rentals',
                  description: 'Rent adventure-ready RVs equipped for off-grid exploration and outdoor adventures.',
                  features: ['Adventure-Ready RVs', 'Off-Grid Equipment', 'Flexible Rentals', 'Adventure Support'],
                  buttonText: 'Rent Adventure RV'
                },
                {
                  partner: 'rvwaterfilter',
                  title: 'Adventure Water Solutions',
                  description: 'Portable water filtration and purification systems for safe drinking water anywhere.',
                  features: ['Portable Filtration', 'Off-Grid Solutions', 'Pure Water Anywhere', 'Adventure Proven'],
                  buttonText: 'Shop Water Systems'
                }
              ]}
              gridCols="3"
            />
          </Container>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AdventureModel;
