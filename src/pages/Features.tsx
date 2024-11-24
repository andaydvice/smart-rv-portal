import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Navigation, Shield, Battery } from "lucide-react";

const Features = () => {
  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen pt-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Smart RV Features</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/features/navigation" className="block">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
                <Navigation className="h-8 w-8 text-blue-500 mb-4" />
                <h2 className="text-2xl font-semibold text-blue-400 mb-4">Navigation System</h2>
                <p className="text-gray-300">Advanced GPS navigation specifically designed for RVs, with route planning that considers vehicle height, weight, and road restrictions.</p>
              </div>
            </Link>

            <Link to="/features/security" className="block">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-emerald-500 transition-colors">
                <Shield className="h-8 w-8 text-emerald-500 mb-4" />
                <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Security System</h2>
                <p className="text-gray-300">Comprehensive security features including smart locks, cameras, and motion sensors to keep your RV safe wherever you go.</p>
              </div>
            </Link>

            <Link to="/features/power" className="block">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors">
                <Battery className="h-8 w-8 text-yellow-500 mb-4" />
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Power Management</h2>
                <p className="text-gray-300">Intelligent power distribution system that monitors and optimizes energy usage across all RV systems.</p>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Features;