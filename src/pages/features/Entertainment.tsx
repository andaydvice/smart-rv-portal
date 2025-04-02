
import { motion } from "framer-motion";
import { Tv, Music, Smartphone, Gamepad } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";

const Entertainment = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow pt-24 pb-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Tv className="h-8 w-8 text-[#5B9BD5]" />
            <h1 className="text-4xl font-bold text-white">Entertainment System</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-[#5B9BD5]">Smart TV System</h2>
              </div>
              <div className="relative aspect-video mb-6">
                <img 
                  src="/lovable-uploads/831c3ac9-7ade-4fe3-a460-affbfc4123f7.png" 
                  alt="4K Smart TV System"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="text-[#E2E8FF] mb-6 text-left">
                Experience cinema quality entertainment in your RV with our advanced Smart TV system featuring 4K OLED display with HDR support for stunning visuals and immersive entertainment wherever your journey takes you.
              </p>
              <ul className="list-disc list-inside space-y-3 text-[#E2E8FF] text-left">
                <li>4K Ultra HD Display with HDR Support</li>
                <li>Smart Voice Control Integration</li>
                <li>Multiroom Viewing Support</li>
                <li>Mobile Device Casting</li>
                <li>Gaming Mode with Low Latency</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-[#5B9BD5]">Premium Audio System</h2>
              </div>
              <div className="relative aspect-video mb-6">
                <img 
                  src="/lovable-uploads/5f18c537-149c-494e-9adf-6a1c096e3e3a.png"
                  alt="Premium Audio System"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="text-[#E2E8FF] mb-6 text-left">
                Transform your RV into a concert hall with our premium audio system featuring studio quality sound, multizone audio distribution, and seamless integration with streaming services for the ultimate listening experience.
              </p>
              <ul className="list-disc list-inside space-y-3 text-[#E2E8FF] text-left">
                <li>Premium surround sound speakers</li>
                <li>Wireless subwoofer for deep bass</li>
                <li>Independent zone volume control</li>
                <li>Bluetooth and WiFi connectivity</li>
                <li>Voice controlled music selection</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700 mb-12">
            <h2 className="text-2xl font-semibold text-[#5B9BD5] mb-6">Additional Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center">
                <Gamepad className="h-8 w-8 text-[#5B9BD5] mb-3" />
                <h3 className="text-xl font-medium text-white mb-2">Gaming Support</h3>
                <p className="text-[#E2E8FF] text-left">Connect your favorite gaming console with optimized display settings for responsive gameplay.</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center">
                <Smartphone className="h-8 w-8 text-[#5B9BD5] mb-3" />
                <h3 className="text-xl font-medium text-white mb-2">Mobile Integration</h3>
                <p className="text-[#E2E8FF] text-left">Stream content from your mobile devices with seamless screen mirroring and casting.</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center">
                <Music className="h-8 w-8 text-[#5B9BD5] mb-3" />
                <h3 className="text-xl font-medium text-white mb-2">Outdoor Audio</h3>
                <p className="text-[#E2E8FF] text-left">Weather resistant external speakers for entertainment around your campsite.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/schedule-demo">
              <Button size="lg" className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white text-lg py-6 px-8">
                Schedule an Entertainment System Demo
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Entertainment;
