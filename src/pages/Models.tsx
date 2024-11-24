import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Shield, Zap } from "lucide-react";

const Models = () => {
  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-6">Our Models</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our range of luxury smart RVs, each designed to provide the ultimate blend of comfort and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700 group hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                  alt="Luxury Class RV"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-blue-400 font-medium">Premium Series</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Luxury Class</h2>
                <p className="text-gray-300 mb-6">
                  Experience unparalleled luxury with our flagship model. Features include:
                </p>
                <ul className="space-y-3 text-gray-300 mb-8">
                  <li className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    Advanced security system with biometric access
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-400" />
                    Solar-powered smart energy management
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-blue-400" />
                    Premium entertainment suite with 4K displays
                  </li>
                </ul>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700 group hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
                  alt="Adventure Class RV"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-medium">Adventure Series</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Adventure Class</h2>
                <p className="text-gray-300 mb-6">
                  Built for the modern explorer, combining durability with smart technology:
                </p>
                <ul className="space-y-3 text-gray-300 mb-8">
                  <li className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-400" />
                    Rugged construction with smart terrain adaptation
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-400" />
                    Extended range battery system
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-purple-400" />
                    Satellite connectivity for remote areas
                  </li>
                </ul>
                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Models;