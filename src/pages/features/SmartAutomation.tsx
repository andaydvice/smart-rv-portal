import { motion } from "framer-motion";
import { Home, WifiIcon, Cog, BatteryCharging } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { VideoSection } from "@/components/ui/VideoSection";
import { PreloadedHeaderImage } from "@/components/ui/PreloadedHeaderImage";

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
        {/* Hero Image Section */}
        <div className="relative w-full h-[400px] md:h-[600px] mb-12 overflow-hidden rounded-lg">
          <img
            src="/lovable-uploads/smart-automation-hero.jpg?v=1"
            alt="Smart RV interior with automated lighting, smart displays, and modern automation technology"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            onLoad={() => console.log('Smart automation hero image loaded successfully')}
            onError={(e) => console.error('Hero image failed to load:', e)}
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Cog className="h-12 w-12 text-[#5B9BD5]" />
                <h1 className="text-5xl md:text-6xl font-bold text-white">Smart Automation</h1>
              </div>
              <p className="text-xl text-[#E2E8FF] max-w-2xl mx-auto px-4">
                Experience the future of RV living with intelligent automation systems
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-[#5B9BD5]">Home Automation</h2>
              </div>
              <VideoSection
                videoId="smart-systems-demo"
                title="Home Automation Demo"
                description="Experience complete RV control with voice commands and smart scheduling"
                className="mb-6"
              />
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
              <VideoSection
                videoId="power-management-demo"
                title="Energy Management Demo"
                description="See intelligent power optimization and battery monitoring in action"
                className="mb-6"
              />
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
          
          
          {/* Smart Automation Image */}
          <div className="mb-12 relative">
            <PreloadedHeaderImage
              src="/smart-automation-hero.jpeg"
              alt="Futuristic RV control center with blue LED lighting, multiple screens displaying automation systems, and advanced monitoring interfaces"
              className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
              width={1920}
              height={500}
              priority="high"
              onImageLoaded={() => console.log('Smart automation section PreloadedHeaderImage loaded successfully')}
            />
          </div>
          
          <OptimizedAffiliateGrid
            title="Smart Automation Solutions"
            subtitle="Professional automation systems and monitoring for your smart RV"
            partners={[
              {
                name: 'Inverters R Us',
                url: 'https://invertersrus.com',
                title: 'Victron Smart Integration',
                description: 'Advanced monitoring and control of all your RV power and automation systems.',
                features: ['System integration monitoring', 'Energy optimization', 'Automated alerts', 'Remote diagnostics']
              },
              {
                name: 'RV Life',
                url: 'https://rvlife.com',
                title: 'RV Life Smart Features',
                description: 'Access smart RV features and automation guides through the RV Life app.',
                features: ['Smart RV guides', 'Automation tutorials', 'System recommendations', 'User community']
              },
              {
                name: 'Good Sam',
                url: 'https://goodsam.com',
                title: 'Good Sam Technical Support',
                description: 'Expert technical support for smart automation installations and troubleshooting.',
                features: ['Installation support', 'Technical troubleshooting', 'System consultation', 'Professional guidance']
              }
            ]}
            gridCols="3"
            className="mt-16"
          />
          
          <AffiliateDisclosure className="mt-8" />
        </div>
      </motion.div>
    </Layout>
  );
};

export default SmartAutomation;
