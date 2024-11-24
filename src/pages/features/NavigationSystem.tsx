import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Navigation } from "lucide-react";

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
          <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">AI-Powered Navigation</h2>
            <p className="text-gray-300 mb-6">
              Our advanced GPS navigation system is specifically designed for RVs, featuring:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>Real-time traffic updates and route optimization</li>
              <li>RV-specific route planning considering vehicle height and weight</li>
              <li>Offline maps for remote areas</li>
              <li>Integration with campground databases</li>
              <li>Voice-guided navigation with customizable alerts</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default NavigationSystem;