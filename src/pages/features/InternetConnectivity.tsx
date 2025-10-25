
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { Wifi, Globe, Shield, Zap } from "lucide-react";
import ConnectivityGuide from "@/components/connectivity/ConnectivityGuide";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { FeatureNavigationLinks } from "@/components/navigation/FeatureNavigationLinks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Link } from "react-router-dom";

const InternetConnectivity = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen pt-24 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={[{ label: 'Features', href: '/features' }, { label: 'Internet Connectivity' }]} />

          <div className="flex items-center gap-4 mb-8">
            <Wifi className="h-8 w-8 text-cyan-500" />
            <h1 className="text-4xl font-bold text-white">Internet Connectivity</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Always Connected</h2>
              <p className="text-gray-300 mb-6">
                Stay connected wherever your journey takes you with our advanced internet connectivity solutions.
                <br /><br />
                Featuring high speed 5G capabilities and reliable satellite backup.
                <br /><br />
                Never lose touch with what matters most.
              </p>
              <img 
                src="/lovable-uploads/15afbf27-62c7-496b-8042-b625eb5543e5.png" 
                alt="Mobile Internet Connectivity" 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>High speed 5G connectivity</li>
                <li>Dual band WiFi system</li>
                <li>Signal booster integration</li>
                <li>Multiple device support</li>
                <li>Secure network encryption</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Globe className="h-6 w-6 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Global Coverage</h3>
                <p className="text-gray-300">
                  Seamless connectivity across borders with automatic carrier switching and 
                  satellite backup options.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Shield className="h-6 w-6 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Enhanced Security</h3>
                <p className="text-gray-300">
                  Enterprise grade encryption and security protocols keep your data safe 
                  while on the move.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Zap className="h-6 w-6 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart Optimization</h3>
                <p className="text-gray-300">
                  Intelligent bandwidth management and automatic network optimization for 
                  the best possible connection.
                </p>
              </div>
            </div>
          </div>

          <ConnectivityGuide />
          
          <OptimizedAffiliateGrid
            title="Connectivity Solutions"
            subtitle="Get reliable internet access wherever your adventures take you"
            partners={[
              {
                name: 'WeBoost',
                url: 'https://weboost.com',
                title: 'WeBoost Signal Enhancement',
                description: 'Professional cellular signal boosters to maximize your internet connectivity.',
                features: ['Signal strength amplification', 'Multi-carrier support', 'Easy installation', 'Proven results']
              },
              {
                name: 'RV Life',
                url: 'https://rvlife.com',
                title: 'RV Life Trip Wizard',
                description: 'Plan routes with connectivity hotspots and campground internet reviews.',
                features: ['WiFi-enabled campground search', 'Connectivity planning tools', 'User internet reviews']
              }
            ]}
            gridCols="2"
            className="mt-16"
          />

          <AffiliateDisclosure className="mt-8" />

          {/* Feature Navigation Links */}
          <FeatureNavigationLinks
            className="mt-12 mb-8"
            relatedFeatures={[
              {
                title: "Smart TV",
                path: "/features/smart-tv",
                description: "Stream content with fast, reliable internet connectivity"
              },
              {
                title: "Remote Control",
                path: "/features/remote-control",
                description: "Control your RV remotely with internet access"
              },
              {
                title: "Security System",
                path: "/features/security-system",
                description: "Monitor your RV security with connected cameras"
              }
            ]}
          />

          {/* Plan Your Connectivity */}
          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-700/50 rounded-lg p-8 mt-8">
            <h3 className="text-2xl font-bold text-white mb-4">Plan Your Connectivity Setup</h3>
            <p className="text-gray-300 mb-6">Find the right internet solution for your travel style</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/tools/lifestyle-planner" className="bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500 rounded-lg p-4 transition-all">
                <h4 className="text-white font-semibold mb-2">Lifestyle Planner</h4>
                <p className="text-gray-400 text-sm">Match connectivity solutions to your travel plans</p>
              </Link>
              <Link to="/tools/feature-matcher" className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500 rounded-lg p-4 transition-all">
                <h4 className="text-white font-semibold mb-2">Feature Matcher</h4>
                <p className="text-gray-400 text-sm">Compare connectivity features across models</p>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default InternetConnectivity;
