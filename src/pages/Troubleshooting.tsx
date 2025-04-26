
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
    console.log("Troubleshooting page - Scrolling to top");
    scrollToTop();
  }, []);

  return (
    <Layout>
      {/* Hero Section with improved contrast and spacing */}
      <section className="relative w-full h-[40vh] min-h-[400px] flex items-center justify-center">
        <img 
          src="/lovable-uploads/a6746652-04f0-4f89-a55d-b241e7bd972a.png" 
          alt="Smart RV Interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Darker overlay for better contrast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Troubleshooting & Setup Guides
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Comprehensive guides and solutions for your Smart RV system
          </p>
        </motion.div>
      </section>

      {/* Main Content with improved spacing and max-width */}
      <section className="w-full bg-[#080F1F] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-[32px] overflow-hidden"
          >
            <SmartSystemGuide />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <TroubleshootingFlowchart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <ConnectivityGuide />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center pt-8"
          >
            <Link to="/contact">
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-blue-600/20 hover:text-white hover:border-blue-400 transition-all duration-300"
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
