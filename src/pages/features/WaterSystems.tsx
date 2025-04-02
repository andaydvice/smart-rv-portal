
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Droplet, RefreshCw, Filter, Waves } from "lucide-react";

const WaterSystems = () => {
  useEffect(() => {
    // Force update and ensure page is visible
    console.log("WaterSystems page mounted - forcing update");
    
    // Scroll to top of page
    window.scrollTo(0, 0);
    
    // Force background color and visibility
    document.body.style.backgroundColor = '#080F1F';
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    
    // Log to console to verify component mounted
    console.log("Water Systems page fully rendered");
  }, []);

  return (
    <Layout>
      <div className="flex-grow bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-8">RV Water Systems</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                  <Droplet className="h-6 w-6 text-connectivity-accent mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Fresh Water Management</h3>
                  <p className="text-gray-300">
                    Monitor fresh water levels, usage patterns, and quality with our integrated sensor system. 
                    Receive alerts when levels are low or when it's time to replace filters.
                  </p>
                </div>

                <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                  <RefreshCw className="h-6 w-6 text-[#10B981] mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Waste Water Management</h3>
                  <p className="text-gray-300">
                    Track gray and black water tank levels with precision sensors. Receive notifications 
                    when tanks need emptying and get guidance to nearby dump stations.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                  <Filter className="h-6 w-6 text-[#8B5CF6] mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Filtration System</h3>
                  <p className="text-gray-300">
                    Our multi-stage filtration system ensures safe, clean drinking water regardless 
                    of your source, with automated maintenance schedules and filter life tracking.
                  </p>
                </div>

                <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                  <Waves className="h-6 w-6 text-[#F59E0B] mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Winterization & Maintenance</h3>
                  <p className="text-gray-300">
                    Protect your system with automated winterization protocols and maintenance reminders, 
                    ensuring your water system remains in peak condition year-round.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default WaterSystems;
