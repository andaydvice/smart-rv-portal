
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
import { ModelNavigationLinks } from "@/components/navigation/ModelNavigationLinks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

const AdventureModel = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Adventure Smart RV Models</title>
        <meta name="description" content="Explore adventure-ready smart RV models built for off-grid travel with rugged capability and connected tech." />
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

            {/* Featured Smart Systems */}
            <div className="mt-16 bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Adventure-Ready Features</h2>
              <p className="text-gray-300 mb-6">Discover the rugged smart systems built for off-grid exploration</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/features/power-management" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-yellow-500 rounded-lg p-4 transition-all">
                  <h3 className="text-white font-semibold mb-2">Off-Grid Power</h3>
                  <p className="text-gray-400 text-sm">Solar and battery systems for extended adventures</p>
                </Link>
                <Link to="/features/navigation-system" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 rounded-lg p-4 transition-all">
                  <h3 className="text-white font-semibold mb-2">Off-Road Navigation</h3>
                  <p className="text-gray-400 text-sm">GPS and mapping for remote terrain</p>
                </Link>
                <Link to="/features/internet-connectivity" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-cyan-500 rounded-lg p-4 transition-all">
                  <h3 className="text-white font-semibold mb-2">Satellite Connectivity</h3>
                  <p className="text-gray-400 text-sm">Stay connected anywhere you explore</p>
                </Link>
              </div>
            </div>

            {/* Model Navigation Links */}
            <ModelNavigationLinks className="mt-12 mb-8" />
          </Container>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AdventureModel;
