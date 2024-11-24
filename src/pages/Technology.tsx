import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const Technology = () => {
  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen pt-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Our Technology</h1>
          <div className="space-y-6">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Smart Integration</h2>
              <p className="text-gray-300">Our proprietary system connects all RV components into one seamless, intelligent network.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-pink-400 mb-4">Mobile Control</h2>
              <p className="text-gray-300">Control every aspect of your RV through our intuitive mobile application.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Technology;