
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
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Helmet } from "react-helmet-async";

const AdventureModel = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Discover Adventure Smart RV Models | Off-Road & Off-Grid Ready</title>
        <meta name="description" content="Discover adventure-ready smart RV models built for off-grid exploration. Find rugged Class B camper vans, off-road trailers, and overlanding rigs with advanced solar, connectivity, and smart technology." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/models/adventure' : ''} />
      </Helmet>
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
                  name: 'Outdoorsy',
                  url: 'https://outdoorsy.com',
                  title: 'Adventure RV Experiences',
                  description: 'Book unique outdoor adventures and specialized off-road RV experiences in stunning locations.',
                  features: ['Adventure Locations', 'Off-Grid Experiences', 'Specialized RVs', 'Expert Guides'],
                  buttonText: 'Book Adventure'
                },
                {
                  name: 'EcoFlow',
                  url: 'https://ecoflow.com',
                  title: 'Off-Grid Power Solutions',
                  description: 'Premium lithium batteries and power systems for extended off-grid adventures.',
                  features: ['Lithium Power Systems', 'Extended Runtime', 'Remote Monitoring', 'Off-Grid Reliability'],
                  buttonText: 'Shop Power Solutions'
                },
                {
                  name: 'Good Sam',
                  url: 'https://goodsam.com',
                  title: 'Adventure Support Services',
                  description: 'Specialized roadside assistance and emergency support for remote and off-grid adventures.',
                  features: ['Remote Area Support', 'Emergency Services', 'Adventure Coverage', 'Expert Assistance'],
                  buttonText: 'Get Adventure Protection'
                },
                {
                  name: 'RV Life',
                  url: 'https://rvlife.com',
                  title: 'Adventure Route Planning',
                  description: 'Discover off-grid destinations, boondocking spots, and adventure routes perfect for exploration.',
                  features: ['Boondocking Locations', 'Off-Grid Routes', 'Adventure Planning', 'Community Insights'],
                  buttonText: 'Plan Adventures'
                },
                {
                  name: 'RV Share',
                  url: 'https://rvshare.com',
                  title: 'Adventure RV Rentals',
                  description: 'Rent adventure-ready RVs equipped for off-grid exploration and outdoor adventures.',
                  features: ['Adventure-Ready RVs', 'Off-Grid Equipment', 'Flexible Rentals', 'Adventure Support'],
                  buttonText: 'Rent Adventure RV'
                },
                {
                  name: 'RV Water Filter Store',
                  url: 'https://rvwaterfilterstore.com',
                  title: 'Adventure Water Solutions',
                  description: 'Portable water filtration and purification systems for safe drinking water anywhere.',
                  features: ['Portable Filtration', 'Off-Grid Solutions', 'Pure Water Anywhere', 'Adventure Proven'],
                  buttonText: 'Shop Water Systems'
                }
              ]}
              gridCols="3"
            />
            
            <AffiliateDisclosure className="mt-8" />
          </Container>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AdventureModel;
