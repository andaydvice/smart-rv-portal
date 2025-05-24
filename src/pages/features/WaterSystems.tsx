import { motion } from "framer-motion";
import { Droplet, WavesIcon } from "lucide-react";
// MODIFIED: Removed Link and Button imports as they are no longer used after removing the CTA
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";

const WaterSystems = () => {
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
            <Droplet className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Smart Water Systems</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-blue-400">Fresh Water Management</h2>
              </div>
              <div className="relative aspect-video mb-6">
                <img 
                  src="/lovable-uploads/3af8fc31-188d-477e-8ab5-b94bd8c4ec77.png"
                  alt="Fresh Water Management System"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Real-time tank level monitoring</li>
                <li>Smart water filtration with monitoring</li>
                <li>Flow rate and usage analytics</li>
                <li>Leak detection with automatic shut-off</li>
                <li>Conservation recommendations</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-blue-400">Waste Water Management</h2>
              </div>
              <div className="relative aspect-video mb-6">
                <img 
                  src="/lovable-uploads/85e4d897-10d7-4f90-b231-597f7fcfdffc.png"
                  alt="Waste Water Management System"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Grey and black water tank level monitoring</li>
                <li>Automated tank treatment dosing</li>
                <li>Waste management alerts and notifications</li>
                <li>Remote tank evacuation control</li>
                <li>Environmental compliance assistance</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700 mb-12">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Advanced Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="text-xl font-medium text-white mb-2">Smart Shower</h3>
                <p className="text-gray-300">Pre-programmable temperature and flow settings with water conservation mode.</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="text-xl font-medium text-white mb-2">Water Quality</h3>
                <p className="text-gray-300">Real-time water quality monitoring with alerts for impurities or contamination.</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="text-xl font-medium text-white mb-2">Winterization</h3>
                <p className="text-gray-300">One-touch winterization process to protect your entire water system.</p>
              </div>
            </div>
          </div>

          {/* MODIFIED: Removed the CTA button section */}
        </div>
      </motion.div>
    </Layout>
  );
};

export default WaterSystems;
