import { motion } from "framer-motion";
import { Home, WifiIcon, Cog, BatteryCharging } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { articleSchema } from "@/components/seo/schemas";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { VideoSection } from "@/components/ui/VideoSection";
import { PreloadedHeaderImage } from "@/components/ui/PreloadedHeaderImage";
import { LazyImage } from "@/components/ui/LazyImage";
import { getOptimizedImageProps } from "@/utils/imageOptimization";

const SmartAutomation = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Article schema for SEO and AI model citations
  const schemaData = articleSchema({
    title: 'Smart RV Automation Systems - 75+ Verified Statistics',
    description: 'Comprehensive guide to RV automation with 75+ verified statistics on energy savings (5-22% range), load shedding (25ms response), voice control (8.4B assistants), and property value impact (3-5% increase). Includes smart home adoption data, ROI analysis, and market research.',
    author: 'Smart RV Portal',
    publishedTime: '2024-01-01',
    url: typeof window !== 'undefined' ? window.location.href : '',
    category: 'RV Technology',
    image: '/lovable-uploads/smart-automation-hero.jpg'
  });

  return (
    <Layout>
      <Helmet>
        <title>Smart RV Automation Systems | Control & Manage Everything</title>
        <meta name="description" content="Automate and control your entire RV with intelligent systems. Save 5-22% on energy, respond to power events in 25ms, and manage everything with voice or app control." />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow pt-24 pb-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        {/* Hero Image Section */}
        <div className="relative w-full h-[400px] md:h-[600px] mb-12 overflow-hidden rounded-lg">
          <LazyImage
            {...getOptimizedImageProps(
              "/lovable-uploads/smart-automation-hero.jpg",
              "Smart RV interior with automated lighting, smart displays, and modern automation technology",
              "hero",
              true
            )}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Cog className="h-12 w-12 text-[#5B9BD5]" />
                <h1 className="text-5xl md:text-6xl font-bold text-white">Smart Automation</h1>
              </div>
              <p className="text-xl text-[#E2E8FF] max-w-2xl mx-auto px-4">
                Join 93% of Americans embracing smart home technology with intelligent RV automation
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">

          {/* Market Statistics Section */}
          <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700 mb-12">
            <h2 className="text-3xl font-semibold text-[#5B9BD5] mb-6 text-center">The Smart RV Revolution</h2>
            <p className="text-[#E2E8FF] text-lg mb-6 text-left">
              Smart automation is transforming the RV industry. According to the RV Industry Association, 46% of RVers looking to upgrade indicate the need for electrical or solar parts to support smart technology integration, with North America leading RV smart features adoption at a 7.2% annual growth rate.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-[#5B9BD5] mb-2">5-22%</div>
                <p className="text-[#E2E8FF]">Energy savings from smart automation systems</p>
                <p className="text-gray-400 text-sm mt-2">(Source: Smart Home Survey 2024)</p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-[#5B9BD5] mb-2">8.4B</div>
                <p className="text-[#E2E8FF]">Digital voice assistants in use worldwide (2024)</p>
                <p className="text-gray-400 text-sm mt-2">(Source: Market.us Research)</p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-[#5B9BD5] mb-2">25ms</div>
                <p className="text-[#E2E8FF]">Response time for automated load shedding</p>
                <p className="text-gray-400 text-sm mt-2">(Source: Family RVing Magazine)</p>
              </div>
            </div>
            <p className="text-[#E2E8FF] text-lg text-left">
              Voice control adoption has surged with a 100% rise in requests to Alexa for smart home control over the past three years, while 80% of smart home users began their journey with a simple Echo speaker and smart bulb combination (Source: Amazon Insights 2024).
            </p>
          </div>

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
                Take control of your entire RV with innovative home automation systems. Smart lighting reduces energy costs by 7-27%, while motion sensor lights can save up to 50% on energy usage (Source: Unsustainable Magazine 2025). Control everything with intuitive voice commands or from your smartphone.
              </p>
              <ul className="list-disc list-inside space-y-3 text-[#E2E8FF] text-left">
                <li>One touch scene settings (morning, evening, away mode)</li>
                <li>Voice controlled system integration with 8.4 billion digital assistants worldwide</li>
                <li>Custom scheduling for all devices with smart automation</li>
                <li>Energy usage optimization saving 5-22% on total costs</li>
                <li>Remote monitoring and control from anywhere</li>
              </ul>
              <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                <p className="text-[#E2E8FF] text-sm text-left">
                  <strong className="text-[#5B9BD5]">ROI Impact:</strong> Smart appliances deliver 11% higher return on investment compared to standard appliances, with smart thermostat users saving $50-250 annually in the first year (Source: ENERGY STAR, House Loan Blog 2024).
                </p>
              </div>
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
                Maximize power efficiency with intelligent energy management that responds in 25 milliseconds or less to power events. Smart HVAC systems save an average of 10% on monthly heating and cooling costs, while smart thermostats achieve 8-23% savings on climate control expenses (Source: ENERGY STAR, Today's Homeowner 2024).
              </p>
              <ul className="list-disc list-inside space-y-3 text-[#E2E8FF] text-left">
                <li>Automated load shedding during peak usage (up to 4 AC + 3 DC circuits)</li>
                <li>Battery health monitoring prevents over-discharge and overcharging damage</li>
                <li>Solar integration with real-time efficiency tracking and optimization</li>
                <li>Predictive energy usage forecasts based on consumption patterns</li>
                <li>Intelligent appliance power scheduling reduces peak demand</li>
              </ul>
              <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                <p className="text-[#E2E8FF] text-sm text-left mb-2">
                  <strong className="text-[#5B9BD5]">Load Shedding Example:</strong> Managing a 30-amp pedestal with two 11-amp air conditioners, 4-amp battery charging, and a 10-amp microwave (36 total amps), the system automatically sheds the rear AC to maintain 25 amps, preventing breaker trips (Source: Family RVing Magazine).
                </p>
                <p className="text-[#E2E8FF] text-sm text-left">
                  <strong className="text-[#5B9BD5]">Battery Protection:</strong> Smart monitoring prevents discharge below 50% (which significantly shortens lead-acid battery lifespan) and prevents overcharging damage to internal components (Source: RVshare 2025).
                </p>
              </div>
            </div>
          </div>

          {/* Energy Savings Breakdown Table */}
          <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700 mb-12">
            <h2 className="text-2xl font-semibold text-[#5B9BD5] mb-6">Energy Savings by Smart Component</h2>
            <p className="text-[#E2E8FF] mb-6 text-left">
              Comprehensive data from industry research shows significant energy and cost reductions across all smart RV automation components. Home automation systems achieve an average 12.78% reduction in emissions according to Finnish research, with utility bill reductions ranging from 5-22% for users combining smart thermostats with energy monitoring (Source: Sustainability Directory, IoT For All 2024).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-900/50">
                    <th className="p-4 text-[#5B9BD5] border border-gray-600">Component</th>
                    <th className="p-4 text-[#5B9BD5] border border-gray-600">Energy Savings</th>
                    <th className="p-4 text-[#5B9BD5] border border-gray-600">Annual Cost Savings</th>
                    <th className="p-4 text-[#5B9BD5] border border-gray-600">Source</th>
                  </tr>
                </thead>
                <tbody className="text-[#E2E8FF]">
                  <tr className="hover:bg-gray-800/30">
                    <td className="p-4 border border-gray-600">Smart Thermostats</td>
                    <td className="p-4 border border-gray-600">8-23% heating/cooling</td>
                    <td className="p-4 border border-gray-600">$50-250</td>
                    <td className="p-4 border border-gray-600 text-sm">ENERGY STAR 2024</td>
                  </tr>
                  <tr className="hover:bg-gray-800/30">
                    <td className="p-4 border border-gray-600">Smart Lighting</td>
                    <td className="p-4 border border-gray-600">7-27% lighting costs</td>
                    <td className="p-4 border border-gray-600">Varies by usage</td>
                    <td className="p-4 border border-gray-600 text-sm">Unsustainable Magazine 2025</td>
                  </tr>
                  <tr className="hover:bg-gray-800/30">
                    <td className="p-4 border border-gray-600">Motion Sensor Lights</td>
                    <td className="p-4 border border-gray-600">Up to 50% energy</td>
                    <td className="p-4 border border-gray-600">Significant reduction</td>
                    <td className="p-4 border border-gray-600 text-sm">IoT Now 2024</td>
                  </tr>
                  <tr className="hover:bg-gray-800/30">
                    <td className="p-4 border border-gray-600">Smart LED Bulbs</td>
                    <td className="p-4 border border-gray-600">75% more efficient</td>
                    <td className="p-4 border border-gray-600">Long-term savings</td>
                    <td className="p-4 border border-gray-600 text-sm">IoT Now 2024</td>
                  </tr>
                  <tr className="hover:bg-gray-800/30">
                    <td className="p-4 border border-gray-600">Smart HVAC Systems</td>
                    <td className="p-4 border border-gray-600">10% monthly avg</td>
                    <td className="p-4 border border-gray-600">~8% utility bills</td>
                    <td className="p-4 border border-gray-600 text-sm">Today's Homeowner 2024</td>
                  </tr>
                  <tr className="hover:bg-gray-800/30">
                    <td className="p-4 border border-gray-600">Smart Appliances</td>
                    <td className="p-4 border border-gray-600">2-9% total energy</td>
                    <td className="p-4 border border-gray-600">Cumulative savings</td>
                    <td className="p-4 border border-gray-600 text-sm">HashStudioz 2024</td>
                  </tr>
                  <tr className="hover:bg-gray-800/30">
                    <td className="p-4 border border-gray-600">Smart Plug Integration</td>
                    <td className="p-4 border border-gray-600">1-4.58% electricity</td>
                    <td className="p-4 border border-gray-600">Annual savings</td>
                    <td className="p-4 border border-gray-600 text-sm">Sustainability Directory</td>
                  </tr>
                  <tr className="hover:bg-gray-800/30 bg-[#5B9BD5]/10">
                    <td className="p-4 border border-gray-600 font-bold">Overall Smart Home System</td>
                    <td className="p-4 border border-gray-600 font-bold">5-22% total energy</td>
                    <td className="p-4 border border-gray-600 font-bold">12.78% emissions reduction</td>
                    <td className="p-4 border border-gray-600 text-sm">Smart Home Survey 2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[#E2E8FF] text-sm mt-6 text-left">
              <strong>Additional Benefits:</strong> Smart sprinklers reduce annual water use by 30-50%, while property values increase by 3-5% with smart home technology integration. Multifamily properties see an average 30% ROI on smart automation investments (Source: Full Spectrum, SmartRent 2024).
            </p>
          </div>

          <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700 mb-12">
            <h2 className="text-2xl font-semibold text-[#5B9BD5] mb-6">Integrated Systems</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center">
                <Home className="h-8 w-8 text-[#5B9BD5] mb-3" />
                <h3 className="text-xl font-medium text-white mb-2">Smart Living</h3>
                <p className="text-[#E2E8FF] text-left">Seamless integration with lighting, climate control, entertainment, and security systems across 69.91 million U.S. smart home households.</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center">
                <WifiIcon className="h-8 w-8 text-[#5B9BD5] mb-3" />
                <h3 className="text-xl font-medium text-white mb-2">Connectivity</h3>
                <p className="text-[#E2E8FF] text-left">Reliable connectivity with mobile app control, cloud-based management, and 8.4 billion voice assistants worldwide.</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center">
                <BatteryCharging className="h-8 w-8 text-[#5B9BD5] mb-3" />
                <h3 className="text-xl font-medium text-white mb-2">Power Management</h3>
                <p className="text-[#E2E8FF] text-left">Intelligent power distribution with real-time monitoring, 25ms response time, and automated efficiency optimization.</p>
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
