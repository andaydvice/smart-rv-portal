import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const DocumentationHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8 mb-12 pt-24"
    >
      <Link to="/troubleshooting">
        <Button
          variant="outline"
          className="bg-white/5 text-white border-white/20 hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Troubleshooting
        </Button>
      </Link>

      <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
        <img
          src="/lovable-uploads/f72886c3-3677-4dfe-8d56-5a784197eda2.png"
          alt="Complete System Documentation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">System Documentation</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Complete documentation and technical specifications for your Smart RV system
        </p>
      </div>
    </motion.div>
  );
};

export default DocumentationHeader;