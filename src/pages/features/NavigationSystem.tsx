
import { motion } from "framer-motion";
import { Navigation, Map, Compass, Radar } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";

const NavigationSystem = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
          {/* Hero Section */}
          <div className="relative h-96 mb-16 rounded-lg overflow-hidden">
            <img 
              src="/lovable-uploads/navigation-hero.jpg"
              alt="RV Navigation System Dashboard Interface" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Navigation className="h-12 w-12 text-connectivity-accent" />
                  <h1 className="text-5xl font-bold text-white">Navigation System</h1>
                </div>
                <p className="text-xl text-white/90 max-w-2xl">
                  Advanced GPS navigation designed specifically for RVs with real-time updates and route optimization
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* MODIFIED: Added text-left to this div */}
            <div className="bg-connectivity-darkBg p-8 rounded-lg border border-gray-700 text-left">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Smart Navigation Features</h2>
              <div className="text-gray-300 mb-6 space-y-4">
                <p>Experience next generation navigation with our advanced GPS system designed specifically for RVs.</p>
                
                <p>Our system takes into account vehicle dimensions, road restrictions, and real time traffic updates.</p>
                
                <p>We ensure the safest and most efficient route to your destination.</p>
              </div>
              <img 
                src="/lovable-uploads/9b875f9e-6d50-4ecf-b12a-caafbb8ea530.png"
                alt="RV Navigation System Interface" 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Real time traffic updates and route optimization</li>
                <li>RV specific route planning considering vehicle height and weight</li>
                <li>Offline maps for remote areas</li>
                <li>Integration with campground databases</li>
                <li>Voice guided navigation with customizable alerts</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Map className="h-6 w-6 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart Mapping</h3>
                <p className="text-gray-300">
                  Advanced mapping technology with 3D terrain visualization and satellite imagery for better route planning.
                </p>
              </div>

              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Compass className="h-6 w-6 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Offline Navigation</h3>
                <p className="text-gray-300">
                  Download maps for offline use in remote areas with no cellular coverage.
                </p>
              </div>

              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Radar className="h-6 w-6 text-pink-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Real Time Updates</h3>
                <p className="text-gray-300">
                  Live traffic updates, weather alerts, and road condition information for safer travel.
                </p>
              </div>
            </div>
          </div>
          
          <OptimizedAffiliateGrid
            title="Navigation & Trip Planning"
            subtitle="Navigate safely with RV-specific routing and emergency backup"
            partners={[
              {
                partner: 'rvlife',
                title: 'RV Life Trip Wizard',
                description: 'RV-specific GPS navigation with height/weight restrictions and campground database.',
                features: ['RV-safe routing', 'Campground navigation', 'Offline maps', 'Trip planning tools']
              },
              {
                partner: 'goodsam',
                title: 'Good Sam Emergency Roadside',
                description: 'Emergency assistance when navigation fails or you need roadside help.',
                features: ['24/7 emergency routing', 'Roadside assistance', 'Emergency dispatch', 'Towing services']
              }
            ]}
            gridCols="2"
            className="mt-16"
          />
          
          <AffiliateDisclosure className="mt-8" />
        </div>
      </motion.div>
    </Layout>
  );
};

export default NavigationSystem;
