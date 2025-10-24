import { motion } from "framer-motion";
import { Thermometer, Droplet, Fan, Clock, Shield } from "lucide-react";
// MODIFIED: Removed Button and Link imports as they are no longer used
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { VideoSection } from "@/components/ui/VideoSection";
import { LazyImage } from '@/components/ui/LazyImage';
import { getOptimizedImageProps } from '@/utils/imageOptimization';

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

          {/* Climate Control Statistics Section */}
          <div className="bg-gray-800/30 p-8 rounded-lg border border-[#5B9BD5]/30 mb-12">
            <h2 className="text-3xl font-semibold text-[#5B9BD5] mb-6 text-center">RV Climate Control: Power & Efficiency Data</h2>
            <p className="text-[#E2E8FF] text-lg mb-6 text-left">
              Understanding your RV's climate system power consumption is critical for energy management. The most common 13,500 BTU air conditioner uses approximately 1,350 watts running (1,500-1,800W range), with startup surge of 2,700-3,000 watts—that's 2-3x normal operation (Source: RV With Tito, Renogy, Jackery 2024).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-gray-900/50 p-6 rounded-lg text-center border border-gray-700">
                <div className="text-4xl font-bold text-[#5B9BD5] mb-2">15.6 kWh</div>
                <p className="text-[#E2E8FF]">Daily AC consumption (13,500 BTU @ 12 hrs)</p>
                <p className="text-gray-400 text-sm mt-2">(SlashPlan 2024)</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg text-center border border-gray-700">
                <div className="text-4xl font-bold text-[#5B9BD5] mb-2">25-40%</div>
                <p className="text-[#E2E8FF]">Better efficiency in high-performance AC models</p>
                <p className="text-gray-400 text-sm mt-2">(Furrion 2024)</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg text-center border border-gray-700">
                <div className="text-4xl font-bold text-[#5B9BD5] mb-2">60-75%</div>
                <p className="text-[#E2E8FF]">RV propane furnace efficiency (vs 95%+ residential)</p>
                <p className="text-gray-400 text-sm mt-2">(RVshare 2024)</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg text-center border border-gray-700">
                <div className="text-4xl font-bold text-[#5B9BD5] mb-2">10-15%</div>
                <p className="text-[#E2E8FF]">Savings on electric bill with smart thermostats</p>
                <p className="text-gray-400 text-sm mt-2">(RVshare 2024)</p>
              </div>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-[#5B9BD5] mb-4">AC Power Requirements by BTU Rating</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">5,000</div>
                  <div className="text-sm text-gray-400">BTU</div>
                  <div className="text-[#5B9BD5]">300-450W</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">7,000</div>
                  <div className="text-sm text-gray-400">BTU</div>
                  <div className="text-[#5B9BD5]">500-650W</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">10,000</div>
                  <div className="text-sm text-gray-400">BTU</div>
                  <div className="text-[#5B9BD5]">600-750W</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">13,500</div>
                  <div className="text-sm text-gray-400">BTU (common)</div>
                  <div className="text-[#5B9BD5]">1,350W avg</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">15,000</div>
                  <div className="text-sm text-gray-400">BTU</div>
                  <div className="text-[#5B9BD5]">1,200-1,700W</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-4 text-left">
                <strong>Important:</strong> Average RV AC EER rating is 6.0 (half the legal minimum for residential systems at EER 10). High-efficiency models offer 25-40% better performance (Source: RV With Tito, EcoFlow, Growatt 2024).
              </p>
            </div>
          </div>

          {/* Header Image with Text Overlay */}
          <div className="mb-12 relative">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <LazyImage
                {...getOptimizedImageProps({
                  src: "/smart-climate-control-hero.jpeg?v=2",
                  alt: "Smart climate control system interface with family in luxury RV interior showing temperature monitoring and HVAC controls",
                  type: "hero"
                })}
                className="w-full h-full object-cover object-center"
                style={{ objectPosition: '50% 30%' }}
                priority={true}
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
                Smart thermostats can save 10-15% on electric bills through automated scheduling. Modern systems use 12-volt DC power (vs. 24-volt AC residential) with WiFi and Bluetooth connectivity for remote monitoring of temperature, humidity, and even fridge temperatures (Source: RVshare, Micro-Air, WalTech 2024).
              </p>
              <ul className="list-disc list-inside space-y-3 text-[#E2E8FF] text-left">
                <li>Multi-zone temperature control with independent climate settings</li>
                <li>Smart scheduling: 10-15% energy savings while away</li>
                <li>Learning algorithms adapt to your preferences over time</li>
                <li>Voice command integration for hands-free control</li>
                <li>Remote control via smartphone app from anywhere globally</li>
              </ul>
              <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                <p className="text-[#E2E8FF] text-sm text-left">
                  <strong className="text-[#5B9BD5]">Winter Heating Data:</strong> RV propane furnaces (20,000-50,000 BTUs) operate at 60-75% efficiency vs. 95%+ for residential furnaces, with up to 35% heat loss through exhaust. In mild winter (65°F setting): 1-2 gallons/night. In extreme cold (0°F): 30 lb tank lasts less than 3 days on 30 ft RV. Electric space heaters are 100% efficient, making them cost-effective when shore power is available (Source: RVshare, The RV Geeks, Let's RV 2024).
                </p>
              </div>
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
                name: 'Inverters R Us',
                url: 'https://invertersrus.com',
                title: 'Victron Climate Power Solutions',
                description: 'Professional power monitoring and optimization for efficient climate control systems.',
                features: ['Power usage monitoring', 'Energy optimization', 'Remote monitoring', 'System diagnostics']
              },
              {
                name: 'Good Sam',
                url: 'https://goodsam.com',
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
