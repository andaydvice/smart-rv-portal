import { motion } from "framer-motion";
import { Droplet } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { useEffect } from "react";
import { VideoSection } from "@/components/ui/VideoSection";
import { PreloadedHeaderImage } from "@/components/ui/PreloadedHeaderImage";
import { PageSummary } from "@/components/ui/PageSummary";

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
          {/* Header Image with Text Overlay */}
          <div className="mb-12 relative">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <img
                src="/smart-water-systems-hero.jpeg"
                alt="Smart water system control interface with couple in RV examining water filtration monitoring displays and water quality metrics"
                className="w-full h-full object-cover object-center"
                style={{ objectPosition: '50% 30%' }}
              />
              {/* Text Overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <div className="text-center px-6 max-w-4xl">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Droplet className="h-10 w-10 md:h-12 md:w-12 text-blue-400" />
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">Smart Water Systems</h1>
                  </div>
                  <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                    Smart RV water systems provide real time monitoring, filtration, and intelligent conservation for cleaner, safer travel.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Overview */}
          <div className="mb-12">
            <PageSummary
              question="What do Smart RV Water Systems include?"
              answer="Smart water systems monitor fresh and waste water tanks in real-time, provide advanced filtration, detect leaks with automatic shutoff, and offer conservation recommendations. Ensure safe, clean water while maximizing efficiency and preventing costly water damage."
              keyPoints={[
                "Tank Monitoring - Real-time level tracking for fresh, grey, and black water tanks with alerts",
                "Smart Filtration - Multi-stage purification with filter life monitoring and replacement alerts",
                "Leak Detection - Automatic water shutoff when leaks detected to prevent damage",
                "Usage Analytics - Track consumption patterns and receive personalized conservation tips",
                "Quality Monitoring - Test water purity and safety with real-time quality metrics",
                "Pump Control - Smart pump management optimizes pressure and energy consumption"
              ]}
              readingTime="6 min read"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-blue-400">Fresh Water Management</h2>
              </div>
              <VideoSection
                videoId="smart-systems-demo"
                title="Fresh Water Management Demo"
                description="See real-time monitoring and smart conservation in action"
                className="mb-6"
              />
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
              <VideoSection
                videoId="connectivity-demo"
                title="Waste Water Management Demo"
                description="Experience intelligent waste monitoring and automated management"
                className="mb-6"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Grey and black water tank level monitoring</li>
                <li>Automated tank treatment dosing</li>
                <li>Waste management alerts and notifications</li>
                <li>Remote tank evacuation control</li>
                <li>Environmental compliance assistance</li>
              </ul>
            </div>
          </div>

          {/* Smart Water Systems Image */}
          <div className="mt-12 mb-8">
            <PreloadedHeaderImage
              src="/lovable-uploads/smart-water-systems.jpg"
              alt="Modern RV bathroom with smart water system featuring digital shower controls and water monitoring displays"
              className="w-full h-64 md:h-80 object-cover rounded-lg"
              width={800}
              height={320}
              priority="low"
              onImageLoaded={() => console.log('Smart water systems image loaded successfully')}
            />
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
                  name: 'RV Water Filter Store',
                  url: 'https://rvwaterfilterstore.com',
                  title: 'RV Water Filter Store Premium Systems',
                  description: 'Professional-grade water filtration systems designed specifically for RV use with guaranteed clean water',
                  features: ['RV-Specific Filters', 'Professional Installation', 'Water Quality Guarantee', 'Maintenance Support'],
                  buttonText: 'Shop Premium Filters'
                },
                {
                  name: 'RV Water Filter Store',
                  url: 'https://rvwaterfilterstore.com',
                  title: 'RV Water Filter Smart Systems',
                  description: 'Advanced water filtration and monitoring systems that ensure clean, safe water anywhere',
                  features: ['NSF-certified filtration', 'Quality monitoring', 'Easy installation', 'System maintenance'],
                  buttonText: 'Shop Smart Filters'
                }
              ]}
              gridCols="2"
            />
            
            <AffiliateDisclosure className="mt-8" />
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default WaterSystems;
