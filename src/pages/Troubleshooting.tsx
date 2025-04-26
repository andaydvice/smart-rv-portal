
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SmartSystemGuide from "@/components/troubleshooting/SmartSystemGuide";
import ConnectivityGuide from "@/components/connectivity/ConnectivityGuide";
import TroubleshootingFlowchart from "@/components/troubleshooting/TroubleshootingFlowchart";
import { scrollToTop } from "@/utils/scrollToTop";

const Troubleshooting = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Layout>
      {/* Hero Section with improved mobile responsiveness */}
      <section className="relative w-full h-[30vh] md:h-[40vh] min-h-[300px] flex items-center justify-center">
        <img 
          src="/lovable-uploads/a6746652-04f0-4f89-a55d-b241e7bd972a.png" 
          alt="Smart RV Interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 text-center px-4 md:px-6"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg">
            Troubleshooting & Setup Guides
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto drop-shadow-md">
            Comprehensive guides and solutions for your Smart RV system
          </p>
        </motion.div>
      </section>

      {/* Main Content with improved spacing and animations */}
      <section className="w-full bg-[#080F1F] py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 md:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SmartSystemGuide />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TroubleshootingFlowchart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ConnectivityGuide />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center pt-4 md:pt-8"
          >
            <Link to="/contact">
              <Button 
                variant="outline" 
                className="bg-transparent border-[#5B9BD5] text-[#5B9BD5] hover:bg-[#5B9BD5]/20 hover:text-white hover:border-[#5B9BD5] transition-all duration-300"
              >
                Need More Help? Contact Support <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Troubleshooting;
