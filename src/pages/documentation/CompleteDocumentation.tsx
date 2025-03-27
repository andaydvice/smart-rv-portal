
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
import Layout from "@/components/layout/Layout";

const CompleteDocumentation = () => {
  return (
    <Layout>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <Link to="/documentation">
            <Button
              variant="outline"
              className="bg-white/5 text-[#60A5FA] border-white/20 hover:bg-white/10 hover:text-[#60A5FA] focus:text-[#60A5FA] active:text-[#60A5FA]"
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
              <h1 className="text-3xl font-bold text-[#60A5FA] mb-3">Complete System Documentation</h1>
              <p className="text-base text-gray-200 max-w-2xl mx-auto">
                Comprehensive technical documentation covering all aspects of your Smart RV System
              </p>
            </div>
          </div>

          <div className="border border-gray-700 rounded-lg p-6 bg-[#091020]">
            <Accordion type="single" collapsible className="space-y-6">
              <SystemArchitectureSection />
              <NetworkInfrastructureSection />
              <PowerManagementSection />
              <SecuritySection />
            </Accordion>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default CompleteDocumentation;
