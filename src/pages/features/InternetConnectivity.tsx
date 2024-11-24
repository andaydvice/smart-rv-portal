import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Wifi } from "lucide-react";

const InternetConnectivity = () => {
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
            <Wifi className="h-8 w-8 text-cyan-500" />
            <h1 className="text-4xl font-bold text-white">Internet Connectivity</h1>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Always Connected</h2>
            <p className="text-gray-300 mb-6">
              Stay connected wherever your journey takes you with:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>High-speed 5G connectivity</li>
              <li>Dual-band WiFi system</li>
              <li>Signal booster integration</li>
              <li>Multiple device support</li>
              <li>Secure network encryption</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default InternetConnectivity;