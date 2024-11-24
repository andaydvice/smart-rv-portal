import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Music } from "lucide-react";

const AudioSystem = () => {
  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen pt-24 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Music className="h-8 w-8 text-pink-500" />
            <h1 className="text-4xl font-bold text-white">Audio System</h1>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-pink-400 mb-4">Premium Sound</h2>
            <p className="text-gray-300 mb-6">
              Experience superior sound quality with our advanced audio system:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>Multi-zone audio control</li>
              <li>Wireless speaker integration</li>
              <li>Bluetooth connectivity</li>
              <li>Surround sound capability</li>
              <li>Outdoor speaker options</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AudioSystem;