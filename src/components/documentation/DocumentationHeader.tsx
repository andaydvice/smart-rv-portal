import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
          className="mb-8 bg-blue-500/10 text-blue-400 border-blue-400 hover:bg-blue-400/20 hover:text-blue-300 font-bold text-lg"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Troubleshooting
        </Button>
      </Link>

      <h1 className="text-5xl font-bold text-white">System Documentation</h1>
    </motion.div>
  );
};

export default DocumentationHeader;