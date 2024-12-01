import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import SystemArchitectureSection from "@/components/documentation/sections/SystemArchitectureSection";
import NetworkInfrastructureSection from "@/components/documentation/sections/NetworkInfrastructureSection";
import PowerManagementSection from "@/components/documentation/sections/PowerManagementSection";

const CompleteDocumentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <Link to="/documentation">
            <Button
              variant="outline"
              className="bg-white/5 text-white border-white/20 hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documentation Overview
            </Button>
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Complete System Documentation</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Comprehensive technical documentation covering all aspects of your Smart RV system
            </p>
          </div>

          <div className="space-y-12">
            <div className="bg-gray-800/90 border-gray-700 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-blue-400 mb-6">System Architecture</h2>
              <SystemArchitectureSection />
            </div>

            <div className="bg-gray-800/90 border-gray-700 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-blue-400 mb-6">Network Infrastructure</h2>
              <NetworkInfrastructureSection />
            </div>

            <div className="bg-gray-800/90 border-gray-700 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-blue-400 mb-6">Power Management</h2>
              <PowerManagementSection />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompleteDocumentation;