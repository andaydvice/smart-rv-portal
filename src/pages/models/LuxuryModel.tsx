import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Navigation, Shield, Battery, Wifi } from "lucide-react";

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
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20"
      >
        <div className="container mx-auto px-4">
          <Link to="/models">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Models
            </Button>
          </Link>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <img
                src="https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&w=800"
                alt="Luxury Class RV"
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Luxury Class</h1>
              <p className="text-blue-400 text-xl mb-4">Starting at $150,000</p>
              <p className="text-gray-300 mb-8">
                Experience unparalleled luxury with our flagship model, featuring advanced automation and premium finishes.
                The Luxury Class RV sets new standards in mobile living with its state-of-the-art technology and comfort features.
              </p>
              <div className="space-y-4 text-gray-300">
                <h2 className="text-2xl font-semibold text-white mb-4">Key Features</h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-blue-400" />
                    Advanced Navigation System with real-time traffic updates
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    Premium Security Suite with 360° surveillance
                  </li>
                  <li className="flex items-center gap-2">
                    <Battery className="w-5 h-5 text-yellow-400" />
                    Extended Range Power System with smart energy management
                  </li>
                  <li className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-purple-400" />
                    High-Speed Internet connectivity with satellite backup
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 rounded-xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Top-Tier Luxury RV Categories and Models</h2>
            <p className="text-gray-300 mb-8 italic">
              Note: Prices are approximate ranges based on 2024 models and can vary significantly based on options, customizations, and dealer location. 
              Many of these manufacturers also offer custom builds that can exceed these ranges.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-blue-400 mb-4">Class A Diesel Pushers (Ultra Luxury)</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                    <span className="font-medium">Newmar King Aire</span>
                    <span className="text-blue-400">$1.5M - $2M+</span>
                  </li>
                  <li className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                    <span className="font-medium">Prevost H3-45 VIP</span>
                    <span className="text-blue-400">$2M - $3M+</span>
                  </li>
                  <li className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                    <span className="font-medium">Newell Coach Custom</span>
                    <span className="text-blue-400">$2M - $3M+</span>
                  </li>
                  <li className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                    <span className="font-medium">Foretravel ih-45</span>
                    <span className="text-blue-400">$1.3M - $1.8M</span>
                  </li>
                  <li className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                    <span className="font-medium">Marathon Coach Custom</span>
                    <span className="text-blue-400">$2M - $2.5M</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </>
  );
};

export default LuxuryModel;