import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TechnicalTab from "@/components/documentation/TechnicalTab";
import OverviewTab from "@/components/documentation/OverviewTab";
import MaintenanceTab from "@/components/documentation/MaintenanceTab";
import PowerTab from "@/components/documentation/PowerTab";

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
              Back to Documentation
            </Button>
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Complete System Documentation</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Comprehensive documentation covering all aspects of your Smart RV system
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-6">System Overview</h2>
              <OverviewTab />
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-6">Technical Specifications</h2>
              <TechnicalTab />
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-6">Maintenance Guide</h2>
              <MaintenanceTab />
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-6">Power Systems</h2>
              <PowerTab />
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompleteDocumentation;