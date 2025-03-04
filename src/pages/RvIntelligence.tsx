
import React from "react";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const RvIntelligence = () => {
  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-[#080F1F]"
      >
        <Navbar />
        
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              RV Intelligence
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mb-12">
              Smart technology that transforms the way you travel, providing real-time insights and automated control systems for your luxury RV experience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {/* Feature cards */}
              <div className="bg-[#151A22] p-8 rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold text-[#5B9BD5] mb-4">Smart Monitoring</h3>
                <p className="text-white/70 mb-6">
                  Real-time monitoring of all RV systems with intelligent alerts and automated responses.
                </p>
                <Button variant="outline" className="border-[#5B9BD5] text-[#5B9BD5]">
                  Learn More
                </Button>
              </div>
              
              <div className="bg-[#151A22] p-8 rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold text-[#5B9BD5] mb-4">Advanced Analytics</h3>
                <p className="text-white/70 mb-6">
                  Optimize your travel with data-driven insights on power usage, route efficiency, and more.
                </p>
                <Button variant="outline" className="border-[#5B9BD5] text-[#5B9BD5]">
                  Learn More
                </Button>
              </div>
              
              <div className="bg-[#151A22] p-8 rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold text-[#5B9BD5] mb-4">Predictive Maintenance</h3>
                <p className="text-white/70 mb-6">
                  AI-powered predictive algorithms that detect issues before they become problems.
                </p>
                <Button variant="outline" className="border-[#5B9BD5] text-[#5B9BD5]">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </Layout>
  );
};

export default RvIntelligence;
