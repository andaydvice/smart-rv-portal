import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Navigation, Map, Compass, Radar } from "lucide-react";

const NavigationSystem = () => {
  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen pt-24 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Navigation className="h-8 w-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-white">Navigation System</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Smart Navigation Features</h2>
              <p className="text-gray-300 mb-6">
                Experience next-generation navigation with our advanced GPS system designed specifically for RVs. 
                Our system takes into account vehicle dimensions, road restrictions, and real-time traffic updates 
                to ensure the safest and most efficient route to your destination.
              </p>
              <img 
                src="/lovable-uploads/9b875f9e-6d50-4ecf-b12a-caafbb8ea530.png"
                alt="RV Navigation System Interface" 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Real-time traffic updates and route optimization</li>
                <li>RV-specific route planning considering vehicle height and weight</li>
                <li>Offline maps for remote areas</li>
                <li>Integration with campground databases</li>
                <li>Voice-guided navigation with customizable alerts</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Map className="h-6 w-6 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart Mapping</h3>
                <p className="text-gray-300">
                  Advanced mapping technology with 3D terrain visualization and satellite imagery for better route planning.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Compass className="h-6 w-6 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Offline Navigation</h3>
                <p className="text-gray-300">
                  Download maps for offline use in remote areas with no cellular coverage.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Radar className="h-6 w-6 text-pink-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Real-Time Updates</h3>
                <p className="text-gray-300">
                  Live traffic updates, weather alerts, and road condition information for safer travel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default NavigationSystem;