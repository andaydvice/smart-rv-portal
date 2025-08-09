
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { Wifi, Globe, Shield, Zap } from "lucide-react";
import ConnectivityGuide from "@/components/connectivity/ConnectivityGuide";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";

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
                partner: 'technorv',
                title: 'TechnoRV Internet Monitoring',
                description: 'Monitor your connectivity status and optimize network performance.',
                features: ['Real-time connection monitoring', 'Signal strength tracking', 'Network usage analytics']
              },
              {
                partner: 'rvlife',
                title: 'RV Life Trip Wizard',
                description: 'Plan routes with connectivity hotspots and campground internet reviews.',
                features: ['WiFi-enabled campground search', 'Connectivity planning tools', 'User internet reviews']
              }
            ]}
            gridCols="2"
            className="mt-16"
          />
        </div>
      </motion.div>
    </Layout>
  );
};

export default InternetConnectivity;
