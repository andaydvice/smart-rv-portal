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
    <div className="min-h-screen bg-[#0B1221]">
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

          <div className="bg-[#0B1221] rounded-[32px] border border-gray-800/30 p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-[1.75rem] font-medium text-[#60A5FA] leading-tight">
                  Smart System Integration Guide
                </h2>
                <p className="text-gray-300 text-base">
                  Complete setup and troubleshooting guide for your Smart RV systems
                </p>
              </div>

              <div className="space-y-0 pt-2">
                <Accordion type="single" collapsible className="space-y-4">
                  <SystemArchitectureSection />
                  <NetworkInfrastructureSection />
                  <PowerManagementSection />
                  <SecuritySection />
                </Accordion>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompleteDocumentation;