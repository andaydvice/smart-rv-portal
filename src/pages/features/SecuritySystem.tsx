import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Shield } from "lucide-react";

const SecuritySystem = () => {
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
            <Shield className="h-8 w-8 text-emerald-500" />
            <h1 className="text-4xl font-bold text-white">Security System</h1>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">24/7 Protection</h2>
            <p className="text-gray-300 mb-6">
              Our comprehensive security system ensures your peace of mind with:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>Smart door locks with remote access</li>
              <li>Motion sensors and security cameras</li>
              <li>Real-time alerts to your mobile device</li>
              <li>GPS tracking and geofencing</li>
              <li>Emergency response integration</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SecuritySystem;