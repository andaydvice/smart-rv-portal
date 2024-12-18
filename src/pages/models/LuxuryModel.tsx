import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Wrench, Building, Cpu } from "lucide-react";
import { ModelCategory } from "@/components/luxury-models/ModelCategory";
import { luxuryModels } from "@/data/luxury-models";

const LuxuryModel = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="relative w-full h-[60vh] overflow-hidden">
          <img
            src="/lovable-uploads/8137a7b0-17f6-4adc-a1b8-c790843192e0.png"
            alt="Luxury Class RV with slide-out in mountain setting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute top-8 left-0 w-full px-4">
            <div className="container mx-auto">
              <a href="https://preview--smart-rv-portal.lovable.app/models">
                <Button variant="outline" className="bg-white/10 backdrop-blur-sm text-white hover:text-white hover:bg-white/20 active:bg-white/30 border-blue-400">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Models
                </Button>
              </a>
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
            <h1 className="text-5xl font-bold text-white mb-4">Luxury RV Living</h1>
          </div>
        </div>

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
              {Object.values(luxuryModels).map((category, index) => (
                <ModelCategory key={index} {...category} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <Link to="/models/compare">
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-blue-500/50 hover:text-white"
              >
                Compare All Models <ArrowLeft className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.main>
    </>
  );
};

export default LuxuryModel;
