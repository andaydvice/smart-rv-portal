import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Navigation, Shield, Battery, Wifi } from "lucide-react";

const CompactModel = () => {
  return (
    <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="container mx-auto px-4 pt-24">
          <Link to="/models">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Models
            </Button>
          </Link>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800"
                alt="Compact Smart RV"
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div>
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