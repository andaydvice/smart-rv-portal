import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Navigation, Shield, Battery, Wifi } from "lucide-react";

const CompactModel = () => {
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
            src="/lovable-uploads/598a2cb5-ffcb-440a-9943-6c4440749b9f.png"
            alt="Compact RVs at sunset with campfires and string lights"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute top-8 left-0 w-full px-4">
            <div className="container mx-auto">
              <Link to="/models">
                <Button 
                  variant="outline" 
                  className="bg-white/10 backdrop-blur-sm text-white hover:text-white hover:bg-white/20 active:bg-white/30 border-blue-400"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Models
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8">
              <h1 className="text-4xl font-bold text-white mb-4">Compact Smart</h1>
              <p className="text-blue-400 text-xl mb-4">Starting at $90,000</p>
              <p className="text-gray-300 mb-8">
                Perfect for weekend getaways, packed with smart features in an efficient, easy-to-maneuver package.
                The Compact Smart RV brings innovation to a smaller footprint without compromising on technology.
              </p>
              <div className="space-y-4 text-gray-300">
                <h2 className="text-2xl font-semibold text-white mb-4">Key Features</h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-blue-400" />
                    City-Optimized Navigation System
                  </li>
                  <li className="flex items-center gap-2">
                    <Battery className="w-5 h-5 text-yellow-400" />
                    Efficient Power Management
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    Smart Security System
                  </li>
                  <li className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-purple-400" />
                    4G/5G Connectivity
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </>
  );
};

export default CompactModel;