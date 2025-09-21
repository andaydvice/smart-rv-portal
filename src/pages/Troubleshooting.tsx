
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SmartSystemGuide from "@/components/troubleshooting/SmartSystemGuide";
import ConnectivityGuide from "@/components/connectivity/ConnectivityGuide";
import TroubleshootingFlowchart from "@/components/troubleshooting/TroubleshootingFlowchart";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { scrollToTop } from "@/utils/scrollToTop";

const Troubleshooting = () => {
  useEffect(() => {
    scrollToTop();
    // Performance hint: pre-load sections
    const sections = [
      import('@/components/troubleshooting/SmartSystemGuide'),
      import('@/components/connectivity/ConnectivityGuide'),
      import('@/components/troubleshooting/TroubleshootingFlowchart')
    ];
    // Optional: Performance tracking
    console.log('Troubleshooting page loaded');
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <Layout>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {/* Hero Section */}
        <section className="relative w-full h-[30vh] md:h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <img 
            src="/lovable-uploads/a6746652-04f0-4f89-a55d-b241e7bd972a.png" 
            alt="Smart RV Interior"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
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

        {/* Main Content */}
        <section className="w-full bg-[#080F1F] py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 md:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <SmartSystemGuide />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <TroubleshootingFlowchart />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <ConnectivityGuide />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <OptimizedAffiliateGrid
                title="Expert Support & Emergency Services"
                subtitle="Get professional help when you need it most with our trusted partners"
                partners={[
                  {
                    name: 'Good Sam',
                    url: 'https://goodsam.com',
                    title: 'Good Sam Emergency Roadside',
                    description: 'Nation\'s most trusted RV roadside assistance with 24/7 emergency support and technical troubleshooting',
                    features: ['24/7 Emergency Support', 'Technical Phone Support', 'Nationwide Coverage', 'RV-Specific Services'],
                    buttonText: 'Get Emergency Coverage'
                  },
                  {
                    name: 'RV Life',
                    url: 'https://rvlife.com',
                    title: 'RV Life System Monitoring',
                    description: 'Advanced monitoring systems that prevent problems before they happen with real-time diagnostics',
                    features: ['Real-Time Diagnostics', 'Preventive Alerts', 'Remote Monitoring', 'Expert Installation'],
                    buttonText: 'Shop Monitoring Systems'
                  }
                ]}
                gridCols="2"
              />
              <div className="px-4">
                <AffiliateDisclosure className="max-w-6xl mx-auto my-8" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
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
      </motion.div>
    </Layout>
  );
};

export default Troubleshooting;
