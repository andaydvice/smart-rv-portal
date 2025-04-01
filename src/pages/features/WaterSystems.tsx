
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { Droplet, RefreshCw, Filter, Waves } from "lucide-react";

const WaterSystems = () => {
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
          <h1 className="text-4xl font-bold text-white mb-8">RV Water Systems</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-[#5B9BD5] mb-4">Smart Water Management System</h2>
              <div className="space-y-4 text-gray-300 mb-6">
                <p>
                  Our advanced Smart Water Management System offers comprehensive control and monitoring of your RV's water usage, storage, and quality.
                </p>
                <p>
                  Using state-of-the-art sensors and automation, you'll have real-time insights into water levels, temperature, and quality metrics, ensuring you always have clean, safe water wherever your journey takes you.
                </p>
              </div>
              <img
                src="/lovable-uploads/9cb71164-7823-47a1-b788-5afc310ad5e5.png"
                alt="RV Water System"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Real-time tank level monitoring for fresh, gray, and black water</li>
                <li>Automated water purification and filtration system</li>
                <li>Temperature-controlled water heating and circulation</li>
                <li>Leak detection and automatic shut-off valves</li>
                <li>Water usage tracking and conservation recommendations</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Droplet className="h-6 w-6 text-[#5B9BD5] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Fresh Water Management</h3>
                <p className="text-gray-300">
                  Monitor fresh water levels, usage patterns, and quality with our integrated sensor system. 
                  Receive alerts when levels are low or when it's time to replace filters.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <RefreshCw className="h-6 w-6 text-[#10B981] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Waste Water Management</h3>
                <p className="text-gray-300">
                  Track gray and black water tank levels with precision sensors. Receive notifications 
                  when tanks need emptying and get guidance to nearby dump stations.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Filter className="h-6 w-6 text-[#8B5CF6] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Filtration System</h3>
                <p className="text-gray-300">
                  Our multi-stage filtration system ensures safe, clean drinking water regardless 
                  of your source, with automated maintenance schedules and filter life tracking.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Waves className="h-6 w-6 text-[#F59E0B] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Winterization & Maintenance</h3>
                <p className="text-gray-300">
                  Protect your system with automated winterization protocols and maintenance reminders, 
                  ensuring your water system remains in peak condition year-round.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default WaterSystems;
