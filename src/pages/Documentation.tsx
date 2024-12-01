import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/troubleshooting">
            <Button 
              variant="outline" 
              className="mb-6 bg-blue-500/10 text-blue-400 border-blue-400 hover:bg-blue-400/10 hover:text-blue-400"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Troubleshooting
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-white mb-6">System Documentation</h1>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">Smart System Overview</h2>
              <p className="text-gray-300">
                Comprehensive documentation about the Smart RV system architecture, components, and integration points.
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">Technical Specifications</h2>
              <p className="text-gray-300">
                Detailed technical specifications for all Smart RV components and subsystems.
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">Maintenance Guide</h2>
              <p className="text-gray-300">
                Regular maintenance procedures and schedules for optimal system performance.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Documentation;