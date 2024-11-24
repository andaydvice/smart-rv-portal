import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Music, Volume2, Radio, Mic2 } from "lucide-react";

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-pink-400 mb-4">Premium Sound Experience</h2>
              <p className="text-gray-300 mb-6">
                Immerse yourself in crystal-clear audio with our premium sound system. 
                Featuring high-fidelity speakers and advanced acoustic tuning, experience 
                music like never before in your mobile sanctuary.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1545454675-3531b543be5d" 
                alt="Premium Audio System" 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Multi-zone audio control</li>
                <li>Wireless speaker integration</li>
                <li>Bluetooth connectivity</li>
                <li>Surround sound capability</li>
                <li>Outdoor speaker options</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Volume2 className="h-6 w-6 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart Volume Control</h3>
                <p className="text-gray-300">
                  Intelligent volume adjustment based on ambient noise and time of day.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Radio className="h-6 w-6 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Multi-Source Input</h3>
                <p className="text-gray-300">
                  Connect multiple audio sources simultaneously and switch seamlessly between them.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Mic2 className="h-6 w-6 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Voice Control</h3>
                <p className="text-gray-300">
                  Control your audio system with simple voice commands for hands-free operation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AudioSystem;