import { motion } from "framer-motion";
import { Droplet } from "lucide-react"; // MODIFIED: Removed WavesIcon as it's not used.
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
                <li>Real time tank level monitoring</li>
                <li>Smart water filtration with monitoring</li>
                <li>Flow rate and usage analytics</li>
                <li>Leak detection with automatic shut off</li>
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
                {/* MODIFIED: Expanded content for Smart Shower, ensuring text-left and new lines per sentence */}
                <div className="text-gray-300 space-y-2 text-left">
                  <p>Enjoy pre programmable temperature and flow settings for a personalized experience.</p>
                  <p>The system includes an intelligent water conservation mode to reduce waste.</p>
                  <p>Create individual user profiles for customized shower preferences.</p>
                  <p>Benefit from real time display of water usage to monitor consumption.</p>
                  <p>A water recirculation feature can save water while it reaches your desired temperature.</p>
                </div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="text-xl font-medium text-white mb-2">Water Quality</h3>
                {/* MODIFIED: Expanded content for Water Quality, ensuring text-left and new lines per sentence */}
                <div className="text-gray-300 space-y-2 text-left">
                  <p>Benefit from continuous real time water quality monitoring throughout your RV.</p>
                  <p>Receive instant alerts for impurities, contaminants, or significant changes in water parameters.</p>
                  <p>The system can track key indicators such as pH levels and total dissolved solids.</p>
                  <p>Get timely notifications for water filter replacements based on usage and quality readings.</p>
                  <p>Access historical water quality data to observe trends and ensure consistent safety.</p>
                </div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="text-xl font-medium text-white mb-2">Winterization</h3>
                {/* MODIFIED: Expanded content for Winterization, ensuring text-left and new lines per sentence */}
                <div className="text-gray-300 space-y-2 text-left">
                  <p>Activate a simplified one touch winterization process to protect your entire water system.</p>
                  <p>This automated sequence helps prevent pipe damage from freezing temperatures.</p>
                  <p>The system intelligently manages draining pipes and can guide antifreeze application if needed.</p>
                  <p>Receive clear on screen prompts and confirmations for each step of the process.</p>
                  <p>A corresponding de winterization mode facilitates an easy setup for the travel season.</p>
                </div>
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
