
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Music, Volume2, Radio, Mic2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { FeatureNavigationLinks } from "@/components/navigation/FeatureNavigationLinks";

const AudioSystem = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full pt-24 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Music className="h-8 w-8 text-pink-500" />
            <h1 className="text-4xl font-bold text-white">Audio System</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-pink-400 mb-4">Premium Sound Experience</h2>
              <div className="space-y-4 text-gray-300">
                <p>Immerse yourself in crystal clear audio with our premium sound system.</p>
                <p>Featuring high fidelity speakers and advanced acoustic tuning, experience music like never before in your mobile sanctuary.</p>
              </div>
              <img 
                src="/lovable-uploads/9e2c5b7f-c03c-4d99-9997-0d3de18f61e1.png" 
                alt="Premium Audio System" 
                className="w-full h-64 object-cover rounded-lg my-6"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Multi zone audio control</li>
                <li>Wireless speaker integration</li>
                <li>Bluetooth connectivity</li>
                <li>Surround sound capability</li>
                <li>Outdoor speaker options</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Volume2 className="h-6 w-6 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart Volume Control</h3>
                <p className="text-gray-300">
                  Intelligent volume adjustment based on ambient noise and time of day.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Radio className="h-6 w-6 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Multi Source Input</h3>
                <p className="text-gray-300">
                  Connect multiple audio sources simultaneously and switch seamlessly between them.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Mic2 className="h-6 w-6 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Voice Control</h3>
                <p className="text-gray-300">
                  Control your audio system with simple voice commands for hands free operation.
                </p>
              </div>
            </div>
          </div>
          
          {/* Affiliate Recommendations */}
          <div className="mt-12">
            <OptimizedAffiliateGrid
              title="Professional Audio Installation"
              subtitle="Get expert installation and premium audio equipment for your RV sound system"
              partners={[
                {
                  name: 'RV Life',
                  url: 'https://rvlife.com',
                  title: 'RV Life Premium Audio Installation',
                  description: 'Professional installation of high-end audio systems with custom tuning and integration',
                  features: ['Premium Speaker Installation', 'Custom Audio Tuning', 'Smart Integration', 'Lifetime Support'],
                  buttonText: 'Schedule Audio Installation'
                },
                {
                  name: 'Good Sam',
                  url: 'https://goodsam.com',
                  title: 'Good Sam Audio Maintenance',
                  description: 'Expert maintenance and troubleshooting services for RV audio systems',
                  features: ['System Diagnostics', 'Maintenance Plans', 'Emergency Repairs', 'Technical Support'],
                  buttonText: 'Get Audio Support'
                }
              ]}
              gridCols="2"
            />

            <AffiliateDisclosure className="mt-8" />

            {/* Feature Navigation Links */}
            <FeatureNavigationLinks
              className="mt-12 mb-8"
              relatedFeatures={[
                {
                  title: "Entertainment",
                  path: "/features/entertainment",
                  description: "Complete entertainment system with streaming and gaming"
                },
                {
                  title: "Smart TV",
                  path: "/features/smart-tv",
                  description: "Advanced smart TV integration and streaming capabilities"
                },
                {
                  title: "Remote Control",
                  path: "/features/remote-control",
                  description: "Control your audio system remotely from your device"
                }
              ]}
            />
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default AudioSystem;
