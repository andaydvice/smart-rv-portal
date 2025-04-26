
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Tv, Cast, Smartphone, Gamepad } from "lucide-react";
import Layout from "@/components/layout/Layout";

const SmartTV = () => {
  return (
    <Layout>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="w-full px-4 pt-24 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Tv className="h-8 w-8 text-purple-500" />
              <h1 className="text-4xl font-bold text-white">Smart TV System</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
                <h2 className="text-2xl font-semibold text-purple-400 mb-4">Entertainment Hub</h2>
                <div className="space-y-4 text-gray-300 mb-6">
                  <p>
                    Experience cinema quality entertainment in your RV with our advanced Smart TV system.
                  </p>
                  <p>
                    Featuring a 4K OLED display with HDR support, our system delivers stunning visuals 
                    and immersive entertainment wherever your journey takes you.
                  </p>
                </div>
                <img 
                  src="/lovable-uploads/831c3ac9-7ade-4fe3-a460-affbfc4123f7.png" 
                  alt="Luxury RV Smart TV Setup" 
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <ul className="list-disc list-inside space-y-3 text-gray-300">
                  <li>4K Ultra HD Display with HDR Support</li>
                  <li>Smart Voice Control Integration</li>
                  <li>Multiroom Viewing Support</li>
                  <li>Mobile Device Casting</li>
                  <li>Gaming Mode with Low Latency</li>
                </ul>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <Cast className="h-6 w-6 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Seamless Streaming</h3>
                  <p className="text-gray-300">
                    Access all your favorite streaming services with built in apps and 
                    lightning fast connectivity.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <Smartphone className="h-6 w-6 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Smart Control</h3>
                  <p className="text-gray-300">
                    Control your TV from anywhere in your RV using our mobile app or voice commands.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <Gamepad className="h-6 w-6 text-pink-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Gaming Ready</h3>
                  <p className="text-gray-300">
                    Enhanced gaming mode with reduced input lag and adaptive refresh rate technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default SmartTV;
