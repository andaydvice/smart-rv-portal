import { motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Home, Wrench, Building, Cpu } from "lucide-react";
import { ModelCategory } from "@/components/luxury-models/ModelCategory";
import { luxuryModels } from "@/data/luxury-models";
import { Link } from "react-router-dom";
import { LuxuryHero } from "@/components/luxury-models/LuxuryHero";

const LuxuryModel = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderModelCategories = () => {
    const categories = Object.values(luxuryModels);
    return categories.map((category, index) => {
      if (index === 0) {
        return (
          <div key={index}>
            <ModelCategory {...category} />
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 my-8">
              <img 
                src="/lovable-uploads/1e3c2aa7-d13d-4cbd-a98a-37066b326f1d.png"
                alt="Luxury RV with outdoor lounge setup at sunset"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        );
      }
      if (index === 1) {
        return (
          <div key={index}>
            <ModelCategory {...category} />
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 my-8">
              <img 
                src="/lovable-uploads/5f18c537-149c-494e-9adf-6a1c096e3e3a.png"
                alt="Luxury RV with outdoor setup by the lake at sunset"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        );
      }
      return <ModelCategory key={index} {...category} />;
    });
  };

  return (
    <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <LuxuryHero />

        <div className="container mx-auto px-4 pt-12 relative z-10">
          <div className="bg-gray-800/50 rounded-lg p-8 backdrop-blur-sm mb-4">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-blue-400">
                  Unrivaled Luxury: Class A Diesel Pushers & Custom Coaches
                </h2>
                <h3 className="text-2xl font-semibold text-blue-400">
                  From $1.3M | Custom Excellence
                </h3>
                <p className="text-gray-300 text-lg">
                  Each model represents the pinnacle of mobile living, where cutting edge technology meets timeless elegance.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white">Key Features</h2>
                <ul className="grid gap-6">
                  <li className="flex items-start gap-3">
                    <Home className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">
                      <span className="font-semibold text-white">Residential Masterpieces:</span> Heated marble floors, custom cabinetry, premium appliances
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Wrench className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">
                      <span className="font-semibold text-white">Advanced Engineering:</span> Air ride suspension, multiplex wiring, independent power systems
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Building className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">
                      <span className="font-semibold text-white">Elite Construction:</span> Aircraft grade materials, thermal windows, vacuum bonded walls
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Cpu className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">
                      <span className="font-semibold text-white">Smart Integration:</span> Whole coach automation, satellite communications, premium security
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 rounded-xl p-6 mt-4"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Complete Guide to Luxury RVs: Authentic Owner Insights 2024</h2>
            <p className="text-gray-300 mb-8 italic">
              Note: Prices are approximate ranges based on 2024 models and can vary significantly based on options, customizations, and dealer location. 
              Many of these manufacturers also offer custom builds that can exceed these ranges.
            </p>

            <div className="space-y-8">
              {renderModelCategories()}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16 mb-24"
          >
            <Link to="/models/compare">
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-blue-500/50 hover:text-white"
              >
                Compare All Models
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.main>
    </>
  );
};

export default LuxuryModel;