import { motion } from "framer-motion";
import { Thermometer, Droplet, Fan, Clock, Shield } from "lucide-react";
// MODIFIED: Removed Button and Link imports as they are no longer used
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { VideoSection } from "@/components/ui/VideoSection";

const ClimateControl = () => {
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
                src="/smart-climate-control-hero.jpeg"
                alt="Smart climate control system interface with family in luxury RV interior showing temperature monitoring and HVAC controls"
                className="w-full h-full object-cover object-center"
                style={{ objectPosition: '50% 30%' }}
              />
              {/* Text Overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <div className="text-center px-6 max-w-4xl">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Thermometer className="h-10 w-10 md:h-12 md:w-12 text-[#5B9BD5]" />
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">Smart Climate Control</h1>
                  </div>
                  <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                    Advanced temperature management with intelligent humidity control and air filtration for perfect comfort automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-[#5B9BD5]">Advanced Temperature Management</h2>
              </div>
              <VideoSection
                videoId="smart-systems-demo"
                title="Temperature Management Demo"
                description="See how smart climate control maintains perfect comfort automatically"
                className="mb-6"
              />
              <p className="text-[#E2E8FF] mb-6 text-left">
                Experience unparalleled comfort with our precision climate control system. Dynamic temperature zones allow different areas of your RV to maintain independent climate settings, while smart sensors continuously optimize for energy efficiency.
              </p>
              <ul className="list-disc list-inside space-y-3 text-[#E2E8FF] text-left">
                <li>Multi zone temperature control</li>
                <li>Smart scheduling for pre heating/cooling</li>
                <li>Learning algorithms adapt to your preferences</li>
                <li>Voice command integration</li>
                <li>Remote control via smartphone app</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-[#5B9BD5]">Humidity Control & Air Quality</h2>
              </div>
              <VideoSection
                videoId="connectivity-demo"
                title="Air Quality Control Demo"
                description="Experience intelligent air filtration and humidity management"
                className="mb-6"
              />
              <p className="text-[#E2E8FF] mb-6 text-left">
                Maintain the perfect atmospheric balance with intelligent humidity control and advanced air filtration. Our system automatically adjusts to prevent condensation and mold while ensuring allergens and pollutants are removed from your living space.
              </p>
              <ul className="list-disc list-inside space-y-3 text-[#E2E8FF] text-left">
                <li>Precision humidity level management</li>
                <li>HEPA filtration system</li>
                <li>Air quality monitoring with alerts</li>
                <li>Automated ventilation control</li>
                <li>Anti condensation technology</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700 mb-12">
            <h2 className="text-2xl font-semibold text-[#5B9BD5] mb-6">System Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center">
                <Fan className="h-8 w-8 text-[#5B9BD5] mb-3" />
                <h3 className="text-xl font-medium text-white mb-2">Energy Efficient</h3>
                {/* MODIFIED: Expanded content for Energy Efficient */}
                <div className="text-[#E2E8FF] text-left space-y-2">
                  <p>Smart algorithms optimize energy usage by up to 30 percent compared to traditional systems.</p>
                  <p>The system learns your habits to reduce power consumption during off peak hours or when you are away.</p>
                  <p>It also provides real time feedback on energy use, helping you make informed decisions.</p>
                  <p>This leads to lower utility bills and a reduced environmental footprint on your travels.</p>
                </div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center">
                <Clock className="h-8 w-8 text-[#5B9BD5] mb-3" />
                <h3 className="text-xl font-medium text-white mb-2">Scheduling</h3>
                {/* MODIFIED: Expanded content for Scheduling */}
                <div className="text-[#E2E8FF] text-left space-y-2">
                  <p>Set climate preferences based on time, location, or specific activity patterns.</p>
                  <p>Program your RV to pre cool or pre heat before your arrival for immediate comfort.</p>
                  <p>Create custom schedules for weekdays, weekends, or different travel itineraries.</p>
                  <p>Geofencing can even trigger climate adjustments as you approach or leave your RV.</p>
                </div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center">
                <Shield className="h-8 w-8 text-[#5B9BD5] mb-3" />
                <h3 className="text-xl font-medium text-white mb-2">Health Protection</h3>
                {/* MODIFIED: Expanded content for Health Protection */}
                <div className="text-[#E2E8FF] text-left space-y-2">
                  <p>Advanced filtration removes allergens, bacteria, and volatile organic compounds for cleaner air.</p>
                  <p>The system monitors air quality levels and can automatically increase ventilation if needed.</p>
                  <p>This helps reduce respiratory irritants and promotes a healthier indoor environment.</p>
                  <p>Receive alerts for filter replacements to ensure optimal performance at all times.</p>
                </div>
              </div>
            </div>
          </div>

          <OptimizedAffiliateGrid
            title="Climate Control Solutions"
            subtitle="Professional climate systems and monitoring for optimal comfort"
            partners={[
              {
                partner: 'invertersrus',
                title: 'Victron Climate Power Solutions',
                description: 'Professional power monitoring and optimization for efficient climate control systems.',
                features: ['Power usage monitoring', 'Energy optimization', 'Remote monitoring', 'System diagnostics']
              },
              {
                partner: 'goodsam',
                title: 'Good Sam HVAC Support',
                description: 'Professional HVAC installation, maintenance, and emergency repair services.',
                features: ['HVAC installation', 'Emergency repairs', 'Maintenance services', 'System consultation']
              }
            ]}
            gridCols="2"
            className="mt-16"
          />
          <div className="px-4">
            <AffiliateDisclosure className="max-w-7xl mx-auto my-8" />
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default ClimateControl;
