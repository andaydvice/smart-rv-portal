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
        {/* Hero Header Image Section */}
        <div className="relative w-full h-[60vh] overflow-hidden">
          <img
            src="/lovable-uploads/8137a7b0-17f6-4adc-a1b8-c790843192e0.png"
            alt="Luxury Class RV with slide-out in mountain setting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
            <h1 className="text-5xl font-bold text-white mb-4">Luxury RV Living</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <Link to="/models">
            <Button variant="outline" className="mb-4 bg-white/10 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Models
            </Button>
          </Link>
          
          <h2 className="text-3xl font-semibold text-blue-400 mb-6 text-center">Starting at $1.3 Million</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-4 mt-8">
            <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-gray-300 mb-4">
                The epitome of mobile luxury begins with Class A diesel pushers and custom coaches
              </p>
              <p className="text-gray-300 mb-8">
                Each model represents the pinnacle of mobile living, where cutting edge technology meets timeless elegance.
              </p>
              <div className="space-y-4 text-gray-300">
                <h2 className="text-2xl font-semibold text-white mb-4">Key Features</h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-blue-400" />
                    Residential Masterpieces: Heated marble floors, custom cabinetry, premium appliances
                  </li>
                  <li className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-emerald-400" />
                    Advanced Engineering: Air ride suspension, multiplex wiring, independent power systems
                  </li>
                  <li className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-yellow-400" />
                    Elite Construction: Aircraft grade materials, thermal windows, vacuum bonded walls
                  </li>
                  <li className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-purple-400" />
                    Smart Integration: Whole coach automation, satellite communications, premium security
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
            <h2 className="text-3xl font-bold text-white mb-6">Complete Guide to Luxury RVs: Authentic Owner Insights 2024</h2>
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
        </div>
      </motion.main>
    </>
  );
};

export default LuxuryModel;
