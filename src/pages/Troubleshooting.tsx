
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import SmartSystemGuide from "@/components/troubleshooting/SmartSystemGuide";
import ConnectivityGuide from "@/components/connectivity/ConnectivityGuide";
import TroubleshootingFlowchart from "@/components/troubleshooting/TroubleshootingFlowchart";
import Footer2 from "@/components/ui/Footer2";
import { scrollToTop } from "@/utils/scrollToTop";

const Troubleshooting = () => {
  // Scroll to top on component mount
  useEffect(() => {
    console.log("Troubleshooting page - Scrolling to top");
    scrollToTop();
  }, []);

  // Define the footer links and socials for this page
  const footerLinks = [
    {
      title: "Support",
      links: [
        { text: "Contact Us", href: "/contact" },
        { text: "Documentation", href: "/documentation" },
        { text: "FAQs", href: "/faqs" }
      ]
    },
    {
      title: "Resources",
      links: [
        { text: "Blog", href: "/blog" },
        { text: "Videos", href: "/videos" },
        { text: "Community", href: "/community" }
      ]
    }
  ];

  const footerSocials = [
    { icon: "facebook", href: "https://facebook.com" },
    { icon: "twitter", href: "https://twitter.com" },
    { icon: "instagram", href: "https://instagram.com" },
    { icon: "youtube", href: "https://youtube.com" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#080F1F]">
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Troubleshooting & Setup Guides
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Comprehensive guides and solutions for your Smart RV system
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 container mx-auto px-4 flex-grow bg-[#080F1F]">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SmartSystemGuide />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TroubleshootingFlowchart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ConnectivityGuide />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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
      
      <Footer2 
        links={footerLinks}
        socials={footerSocials}
        description="Helping you troubleshoot and maximize your Smart RV experience"
      />
    </div>
  );
};

export default Troubleshooting;
