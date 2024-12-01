import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Cpu, Network, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import SystemArchitectureSection from "@/components/documentation/sections/SystemArchitectureSection";
import NetworkInfrastructureSection from "@/components/documentation/sections/NetworkInfrastructureSection";
import PowerManagementSection from "@/components/documentation/sections/PowerManagementSection";
import SecuritySection from "@/components/documentation/sections/SecuritySection";

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

          <div className="relative w-full h-[500px] rounded-xl overflow-hidden mb-12">
            <img
              src="/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png"
              alt="Smart RV Complete System Documentation"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Complete System Documentation</h1>
              <p className="text-lg text-gray-200 max-w-2xl">
                Comprehensive technical documentation covering all aspects of your<br />Smart RV System
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-gray-800/90 border-gray-700 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-blue-400">System Architecture</h2>
              </div>
              <SystemArchitectureSection />
            </div>

            <div className="bg-gray-800/90 border-gray-700 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Network className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-blue-400">Network Infrastructure</h2>
              </div>
              <NetworkInfrastructureSection />
            </div>

            <div className="bg-gray-800/90 border-gray-700 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-blue-400">Power Management</h2>
              </div>
              <PowerManagementSection />
            </div>

            <div className="bg-gray-800/90 border-gray-700 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-blue-400">Security</h2>
              </div>
              <SecuritySection />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompleteDocumentation;