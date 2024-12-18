import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

const LuxuryModel = () => {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="relative w-full h-[60vh] overflow-hidden">
          <img
            src="/lovable-uploads/8137a7b0-17f6-4adc-a1b8-c790843192e0.png"
            alt="Luxury RV exterior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute top-8 left-0 w-full px-4">
            <div className="container mx-auto">
              <Link to="/models">
                <Button variant="outline" className="bg-white/10 backdrop-blur-sm text-white hover:text-white hover:bg-white/20 active:bg-white/30 border-blue-400">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Models
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Unrivaled Luxury: Class A Diesel Pushers & Custom Coaches
              </h1>
              <p className="text-xl text-blue-400">
                From $1.3M | Custom Excellence
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Luxury Model Features</h2>
            <p className="text-lg text-gray-300">
              Experience the pinnacle of comfort and technology with our luxury RVs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700 group hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Spacious Interiors</h3>
                <p className="text-gray-300 mb-4">
                  Enjoy expansive living spaces designed for relaxation and entertainment.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700 group hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Advanced Technology</h3>
                <p className="text-gray-300 mb-4">
                  Equipped with the latest smart technology for a seamless travel experience.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LuxuryModel;
