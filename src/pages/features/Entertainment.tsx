
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { Music, Tv, Gamepad, Film } from "lucide-react";

const Entertainment = () => {
  return (
    <Layout>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
          <h1 className="text-4xl font-bold text-white mb-8">RV Entertainment System</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Complete Entertainment Suite</h2>
              <div className="space-y-4 text-gray-300 mb-6">
                <p>
                  Transform your RV into the ultimate entertainment hub with our comprehensive 
                  entertainment system designed specifically for life on the road.
                </p>
                <p>
                  Our integrated solution combines premium audio, visual and gaming systems that 
                  deliver exceptional performance even in remote locations.
                </p>
              </div>
              <img
                src="/lovable-uploads/831c3ac9-7ade-4fe3-a460-affbfc4123f7.png"
                alt="RV Entertainment System"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>4K Smart TV with satellite and streaming capabilities</li>
                <li>Surround sound system with outdoor speakers</li>
                <li>Gaming console integration with dedicated power management</li>
                <li>Outdoor entertainment package with weatherproof displays</li>
                <li>Bluetooth and WiFi connectivity throughout your RV</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Tv className="h-6 w-6 text-[#5B9BD5] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart TV System</h3>
                <p className="text-gray-300">
                  Enjoy your favorite shows and movies anywhere with our smart TV system that features 
                  built-in streaming apps and satellite connection.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Music className="h-6 w-6 text-[#10B981] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Premium Audio</h3>
                <p className="text-gray-300">
                  Experience concert-quality sound with our customizable audio system that adapts 
                  to both indoor and outdoor environments.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Gamepad className="h-6 w-6 text-[#8B5CF6] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Gaming Integration</h3>
                <p className="text-gray-300">
                  Connect your favorite gaming consoles with our specially designed power 
                  and connectivity solutions for gaming on the go.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Film className="h-6 w-6 text-[#F59E0B] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Outdoor Entertainment</h3>
                <p className="text-gray-300">
                  Take the entertainment outside with weatherproof screens and speakers 
                  perfect for movie nights under the stars.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Entertainment;
