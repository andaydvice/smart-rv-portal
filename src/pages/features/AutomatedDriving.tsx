
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Car, Navigation, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { VideoSection } from "@/components/ui/VideoSection";

const AutomatedDriving = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
          <div className="flex items-center gap-4 mb-8">
            <Car className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Automated Driving Assistance</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[48px]">
                <h2 className="text-2xl font-semibold text-blue-400">Advanced Driver Assistance Systems (ADAS)</h2>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-emerald-400" />
                  <span className="text-white">Safety Features</span>
                </div>
              </div>
              <VideoSection
                videoId="towing-safety-demo"
                title="ADAS Safety Features Demo"
                description="Experience advanced driver assistance systems protecting your RV journey"
                className="mt-4 mb-6"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Adaptive cruise control for maintaining safe distances</li>
                <li>Lane keeping assist with haptic feedback</li>
                <li>Collision avoidance system with emergency braking</li>
                <li>Blind spot monitoring and detection</li>
                <li>Parking assistance with 360° camera view</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[48px] mb-4">
                <h2 className="text-2xl font-semibold text-blue-400">GPS and Navigation Integration</h2>
                <div className="flex items-center gap-3">
                  <Navigation className="h-6 w-6 text-purple-400" />
                  <span className="text-white">Smart Navigation</span>
                </div>
              </div>
              <VideoSection
                videoId="rv-trip-planning"
                title="Smart Navigation Demo"
                description="See RV-specific navigation with real-time traffic and route optimization"
                className="mt-4 mb-6"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Real time traffic updates and route optimization</li>
                <li>RV specific route planning considering vehicle dimensions</li>
                <li>Points of interest and campsite recommendations</li>
                <li>Weather aware navigation with alerts</li>
                <li>Offline map support for remote areas</li>
              </ul>
            </div>
          </div>

          <OptimizedAffiliateGrid
            title="Safety & Navigation Support"
            subtitle="Enhanced safety systems and emergency assistance for automated driving"
            partners={[
              {
                name: 'RV Life',
                url: 'https://rvlife.com',
                title: 'RV Life Safe Navigation',
                description: 'Professional GPS navigation with advanced safety features and road condition alerts.',
                features: ['RV-safe routing', 'Real-time traffic alerts', 'Road condition monitoring', 'Safety notifications']
              },
              {
                name: 'Good Sam',
                url: 'https://goodsam.com',
                title: 'Good Sam Emergency Response',
                description: 'Emergency assistance and support when automated systems need human intervention.',
                features: ['Emergency assistance', 'Technical support', 'Roadside help', '24/7 availability']
              }
            ]}
            gridCols="2"
            className="mb-16"
          />
          
          <AffiliateDisclosure className="mb-8" />

          <div className="text-center mb-16">
            <Link to="/products">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Explore Top Deals
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default AutomatedDriving;
