import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SystemArchitectureSection from "@/components/documentation/sections/SystemArchitectureSection";
import NetworkInfrastructureSection from "@/components/documentation/sections/NetworkInfrastructureSection";
import PowerManagementSection from "@/components/documentation/sections/PowerManagementSection";

const CompleteDocumentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-24">
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
            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400">System Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <SystemArchitectureSection />
              </CardContent>
            </Card>

            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400">Network Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <NetworkInfrastructureSection />
              </CardContent>
            </Card>

            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400">Power Management</CardTitle>
              </CardHeader>
              <CardContent>
                <PowerManagementSection />
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompleteDocumentation;