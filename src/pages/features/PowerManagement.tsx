import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Battery, Sun, Zap, Activity } from "lucide-react";

const PowerManagement = () => {
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
            <Battery className="h-8 w-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-white">Power Management</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Smart Power Features</h2>
              <p className="text-gray-300 mb-6">
                Our intelligent power management system optimizes energy usage and ensures 
                efficient power distribution throughout your RV. With solar integration and 
                smart monitoring, you'll always have the power you need.
              </p>
              <img 
                src="/lovable-uploads/078abbd1-5852-4d5a-a457-154a7421c673.png"
                alt="Power Management System" 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Solar panel integration and monitoring</li>
                <li>Battery level tracking and alerts</li>
                <li>Automated power source switching</li>
                <li>Energy consumption analytics</li>
                <li>Smart appliance power management</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Sun className="h-6 w-6 text-orange-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Solar Integration</h3>
                <p className="text-gray-300">
                  Efficient solar power collection and storage with real-time monitoring.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Zap className="h-6 w-6 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart Distribution</h3>
                <p className="text-gray-300">
                  Intelligent power routing and prioritization for essential systems.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Activity className="h-6 w-6 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Usage Analytics</h3>
                <p className="text-gray-300">
                  Detailed power consumption tracking and optimization recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PowerManagement;