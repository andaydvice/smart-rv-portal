import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import SystemArchitectureSection from "@/components/documentation/sections/SystemArchitectureSection";
import NetworkInfrastructureSection from "@/components/documentation/sections/NetworkInfrastructureSection";
import PowerManagementSection from "@/components/documentation/sections/PowerManagementSection";
import SecuritySection from "@/components/documentation/sections/SecuritySection";

const CompleteDocumentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
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

          <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-12 border border-gray-700">
            <img
              src="/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png"
              alt="Smart RV Complete System Documentation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
              <h1 className="text-3xl font-bold text-white mb-3">Complete System Documentation</h1>
              <p className="text-base text-gray-200 max-w-2xl">
                Comprehensive technical documentation covering all aspects of your Smart RV System
              </p>
            </div>
          </div>

          <div className="space-y-6 border border-gray-700 rounded-lg p-6 bg-gray-800/50">
            <Accordion type="single" collapsible>
              <div className="space-y-8">
                <SystemArchitectureSection />
                <NetworkInfrastructureSection />
                <PowerManagementSection />
                <SecuritySection />
              </div>
            </Accordion>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompleteDocumentation;