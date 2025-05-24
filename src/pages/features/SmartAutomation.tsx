import { motion } from "framer-motion";
import { Home, WifiIcon, Cog, BatteryCharging } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";

const SmartAutomation = () => {
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
            <Cog className="h-8 w-8 text-[#5B9BD5]" />
            <h1 className="text-4xl font-bold text-white">Smart Automation</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-[#5B9BD5]">Home Automation</h2>
              </div>
              <div className="relative aspect-video mb-6">
                <img 
                  src="/lovable-uploads/ee026535-e835-46ae-b779-be457eb8ff04.png" 
                  alt="Home Automation Interface"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="text-[#E2E8FF] mb-6 text-left">
                Take control of your entire RV with our innovative home automation system. Control lighting, climate, entertainment, and security with intuitive voice commands or from your smartphone.
              </p>
              <ul className="list-disc list-inside space-y-3 text-[#E2E8FF] text-left">
                <li>One touch scene settings (morning, evening, away mode)</li>
                <li>Voice controlled system integration</li>
                <li>Custom scheduling for all devices</li>
                <li>Energy usage optimization</li>
                <li>Remote monitoring and control</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-[#5B9BD5]">Smart Energy Management</h2>
              </div>
              <div className="relative aspect-video mb-6">
                <img 
                  src="/lovable-uploads/b6a46bec-1ca8-4f7b-89fa-37bb5415d9fa.png"
                  alt="Energy Management Dashboard"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="text-[#E2E8FF] mb-6 text-left">
                Maximize power efficiency with intelligent energy management. Our system automatically balances power loads, prioritizes essential systems, and provides detailed consumption analytics.
              </p>
              <ul className="list-disc list-inside space-y-3 text-[#E2E8FF] text-left">
                <li>Automated load shedding during peak usage</li>
                <li>Battery health monitoring and optimization</li>
                <li>Solar integration with efficiency tracking</li>
                <li>Predictive energy usage forecasts</li>
                <li>Intelligent appliance power scheduling</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700 mb-12">
            <h2 className="text-2xl font-semibold text-[#5B9BD5] mb-6">Integrated Systems</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center">
                <Home className="h-8 w-8 text-[#5B9BD5] mb-3" />
                <h3 className="text-xl font-medium text-white mb-2">Smart Living</h3>
                <p className="text-[#E2E8FF] text-left">Seamless integration with lighting, climate control, entertainment, and security systems.</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center">
                <WifiIcon className="h-8 w-8 text-[#5B9BD5] mb-3" />
                <h3 className="text-xl font-medium text-white mb-2">Connectivity</h3>
                <p className="text-[#E2E8FF] text-left">Reliable connectivity with mobile app control and cloud based management.</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center">
                <BatteryCharging className="h-8 w-8 text-[#5B9BD5] mb-3" />
                <h3 className="text-xl font-medium text-white mb-2">Power Management</h3>
                <p className="text-[#E2E8FF] text-left">Intelligent power distribution with real time monitoring and automated efficiency.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default SmartAutomation;
