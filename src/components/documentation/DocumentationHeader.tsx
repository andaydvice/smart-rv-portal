
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const DocumentationHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8 mb-12 pt-12 sm:pt-24 container max-w-6xl mx-auto px-4 sm:px-6"
    >
      <Link to="/troubleshooting">
        <Button
          variant="outline"
          className="bg-white/5 text-[#0EA5E9] border-white/20 hover:bg-white/10 hover:text-white text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Troubleshooting
        </Button>
      </Link>

      <div className="relative w-full rounded-xl overflow-hidden mb-8 border border-gray-800">
        <div className="max-h-[400px] overflow-hidden">
          <img
            src="/lovable-uploads/f72886c3-3677-4dfe-8d56-5a784197eda2.png"
            alt="Complete System Documentation"
            className="w-full object-cover"
            style={{ maxHeight: "400px" }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-[1.75rem] font-bold text-[#0EA5E9] mb-4">System Documentation</h1>
        <p className="text-sm text-gray-300 max-w-2xl mx-auto">
          Complete documentation and technical specifications for your Smart RV system
        </p>
      </div>

      <div className="mt-24 text-center">
        <Link to="/documentation/complete">
          <Button 
            variant="outline" 
            className="bg-transparent border-gray-300 text-[#0EA5E9] hover:text-white hover:bg-[#0EA5E9]/25 text-sm py-2 px-4 focus:text-white active:text-white"
          >
            View Complete System Documentation
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default DocumentationHeader;
