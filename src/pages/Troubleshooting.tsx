
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import SmartSystemGuide from "@/components/troubleshooting/SmartSystemGuide";
import ConnectivityGuide from "@/components/connectivity/ConnectivityGuide";
import TroubleshootingFlowchart from "@/components/troubleshooting/TroubleshootingFlowchart";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";

const Troubleshooting = () => {
  useEffect(() => {
    console.log("Troubleshooting page - Scrolling to top");
    scrollToTop();
  }, []);

  return (
    <Layout>
      <Navbar />
      {/* Hero Section */}
      <section className="relative">
        <img 
          src="/lovable-uploads/a6746652-04f0-4f89-a55d-b241e7bd972a.png" 
          alt="Smart RV Interior"
          className="w-full h-[40vh] object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center px-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 image-overlay-headline">
              Troubleshooting & Setup Guides
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Comprehensive guides and solutions for your Smart RV system
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 container mx-auto px-4 flex-grow bg-[#080F1F]">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="border-2 border-[#1a202c]/50 rounded-[32px] overflow-hidden shadow-xl"
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
            className="text-center mt-16"
          >
            <Link to="/contact">
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-blue-600/20 hover:text-white hover:border-blue-400"
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
