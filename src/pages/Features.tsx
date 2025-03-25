
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Navigation, Shield, Battery, Tv } from "lucide-react";
import Footer2 from "@/components/ui/Footer2";

const Features = () => {
  // Define the footer links and socials for this page
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { text: "Models", href: "/models" },
        { text: "Technology", href: "/technology" },
        { text: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Features",
      links: [
        { text: "Navigation System", href: "/features/navigation" },
        { text: "Automated Driving", href: "/features/automated-driving" },
        { text: "Smart TV System", href: "/features/smart-tv" }
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
          <h1 className="text-4xl font-bold text-white mb-8">Smart RV Features</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/features/navigation" className="block">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
                <Navigation className="h-8 w-8 text-blue-500 mb-4" />
                <h2 className="text-2xl font-semibold text-blue-400 mb-4">Navigation System</h2>
                <p className="text-gray-300">Advanced GPS navigation specifically designed for RVs, with route planning that considers vehicle height, weight, and road restrictions.</p>
              </div>
            </Link>

            <Link to="/features/security" className="block">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-emerald-500 transition-colors">
                <Shield className="h-8 w-8 text-emerald-500 mb-4" />
                <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Security System</h2>
                <p className="text-gray-300">Comprehensive security features including smart locks, cameras, and motion sensors to keep your RV safe wherever you go.</p>
              </div>
            </Link>

            <Link to="/features/power" className="block">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors">
                <Battery className="h-8 w-8 text-yellow-500 mb-4" />
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Power Management</h2>
                <p className="text-gray-300">Intelligent power distribution system that monitors and optimizes energy usage across all RV systems.</p>
              </div>
            </Link>
            
            <Link to="/features/smart-tv" className="block">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors">
                <Tv className="h-8 w-8 text-purple-500 mb-4" />
                <h2 className="text-2xl font-semibold text-purple-400 mb-4">Smart TV System</h2>
                <p className="text-gray-300">Premium entertainment system with 4K display, streaming integration, and voice control for the ultimate viewing experience in your RV.</p>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
      <Footer2 
        links={footerLinks}
        socials={footerSocials}
        description="Discover the innovative features that make our Smart RVs exceptional"
      />
    </div>
  );
};

export default Features;
