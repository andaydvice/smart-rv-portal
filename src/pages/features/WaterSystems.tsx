import { motion } from "framer-motion";
import { Droplet } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
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

          <p className="text-gray-300 max-w-3xl mb-6">
            Smart RV water systems provide real time monitoring, filtration, and intelligent conservation for cleaner, safer travel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-blue-400">Fresh Water Management</h2>
              </div>
              <div className="relative aspect-video mb-6">
                <img 
                  src="/lovable-uploads/3af8fc31-188d-477e-8ab5-b94bd8c4ec77.png"
                  alt="Smart RV Fresh Water Management System"
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
                  alt="Smart RV Waste Water Management System"
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

          {/* Affiliate Recommendations */}
          <div className="mt-12">
            <OptimizedAffiliateGrid
              title="Premium Water Filtration Systems"
              subtitle="Ensure clean, safe water throughout your RV adventures with professional-grade filtration"
              partners={[
                {
                  partner: 'rvwaterfilter',
                  title: 'RV Water Filter Store Premium Systems',
                  description: 'Professional-grade water filtration systems designed specifically for RV use with guaranteed clean water',
                  features: ['RV-Specific Filters', 'Professional Installation', 'Water Quality Guarantee', 'Maintenance Support'],
                  path: '/premium-filters',
                  buttonText: 'Shop Premium Filters'
                },
                {
                  partner: 'technorv',
                  title: 'TechnoRV Smart Water Monitoring',
                  description: 'Advanced water monitoring systems that track quality, usage, and system health in real-time',
                  features: ['Real-Time Monitoring', 'Quality Testing', 'Usage Tracking', 'Smart Alerts'],
                  path: '/water-monitoring',
                  buttonText: 'Shop Monitoring Systems'
                }
              ]}
              gridCols="2"
            />
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default WaterSystems;
